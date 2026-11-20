import {analyzeMedications,reviewReason,historySnapshot} from './registro-med-review.mjs?v=20261120forms';
import {product,normalize,hondurasDate} from './registro-med-history.mjs?v=20261120forms';

const splitNames = raw => String(raw || '').split(/\s+(?:and|y)\s+|[,;](?!\d)|\s*[&+]\s*/i).map(v=>v.trim()).filter(Boolean);

async function correctionRequest(body) {
  if (getDataMode()!=='appsscript') throw Error('Live connection required');
  const response=await fetchWithTimeout(cfgGet(REG_LS.APPS_SCRIPT_URL),{
    method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},
    body:JSON.stringify({...body,op:'correct_medication',tab:resolveTab('Medicamentos'),email:getClientEmail()})
  },35000);
  const result=await response.json();
  if (!result.ok) throw Error(result.error || 'Correction failed');
  return result;
}

export async function openCorrection(id, targets, refresh) {
  if (document.querySelector('#medCorrection')) return;
  const dialog=document.createElement('dialog');
  dialog.className='med-dialog';dialog.id='medCorrection';dialog.setAttribute('aria-label',t('med_correct'));
  document.body.append(dialog);dialog.showModal();
  dialog.onclose=()=>dialog.remove();
  const node=(tag,text)=>{ const el=document.createElement(tag);if(text!=null)el.textContent=text;return el; };
  const button=(key,fn)=>{const b=node('button',t(key));b.type='button';b.className='ghost';b.onclick=fn;return b;};
  const close=()=>button('med_close',()=>dialog.close());
  let rows=[], issues=[], processed=0;
  async function read(){
    rows=(await fetchTab('Medicamentos',{fresh:true})).filter(r=>r.Patient_ID===id);
    issues=analyzeMedications(rows).issues;
  }
  function message(text,next){
    dialog.replaceChildren(node('h2',t('med_correct')),node('p',text));
    if(next)dialog.append(button('med_next',()=>display(next)));
    dialog.append(close());
  }
  dialog.append(node('p',t('med_loading')),close());
  try {
    await read();
    if (!dialog.open) return;
    const issue=issues.find(i=>i.sources.some(s=>targets.includes(s.Med_ID)));
    if (!issue) {message(t('med_done'));return;}
    await correctionRequest({checkOnly:true});
    if (dialog.open) display(issue);
  } catch {message(t('med_fix_failed'));}

  function display(issue){
    const anchor=issue.sources[0], expected=historySnapshot(rows);
    const form=node('form'),cards=node('div'),controls=node('div'),error=node('p');
    error.setAttribute('role','alert');controls.className='med-actions-bar';
    const token=crypto.randomUUID();
    const original=node('div');original.className='source-entry';
    original.textContent=issue.sources.map(m=>[m.Date,m.Medication,m.Dose,m.Frequency,translateMedAction(m.Action),m.Notes].filter(Boolean).join(' · ')).join('\n');
    dialog.replaceChildren(node('h2',t('med_correct')),node('p',t('med_count',{n:processed+1,total:processed+issues.length})),
      node('strong',t('med_original')),original,node('p',reviewReason([issue],t)),form);
    const save=node('button',t('med_save_correction'));save.type='submit';save.className='primary';
    const names=splitNames(anchor.Medication);
    const add=button('med_add_part',()=>addCard(''));
    form.append(cards,add,error,controls);controls.append(close(),save);
    const parts=[];
    const combined=issue.reason==='supply_combined' && names.length>1;
    for(const name of combined?names:[anchor.Medication])addCard(name);
    function addCard(raw) {
      const box=node('fieldset'),legend=node('legend'),grid=node('div');
      grid.className='med-fields';box.append(legend,grid);cards.append(box);
      function field(key,el){const label=node('label',t(key));label.append(el);grid.append(label);return label;}
      function select(key,options){
        const el=node('select');for(const [value,label] of options)el.add(new Option(label,value));
        return [el,field(key,el)];
      }
      function input(key,type='text'){
        const el=node('input');el.type=type;return [el,field(key,el)];
      }
      const [status]=select('med_resolution',[['',t('med_select')],['active',t('med_active')],['off',t('med_off')],['unclear',t('med_unclear')]]);
      status.required=true;
      const [stock,stockLabel]=select('med_formulary',[['',t('med_other')],...MED_FORMULARY.map(v=>[v,v+' tab'])]);
      const [name]=input('med_part_name');name.required=true;name.maxLength=500;
      const [strength,strengthLabel]=input('med_part_strength','number');strength.step='any';strength.min='0.000001';
      const [dose,doseLabel]=input('med_part_dose');dose.maxLength=60;
      const opts=[['',t('med_select')],...MED_FREQ_PRESETS.map(p=>[p.v,getLang()==='en'?p.en:p.es]),['PRN','PRN']];
      const [freq,freqLabel]=select('label_frequency',opts);
      const [prn,prnLabel]=input('PRN','checkbox');
      const [stopDate,stopLabel]=input('med_stop_date','date');stopDate.max=hondurasDate.format(new Date());
      const notes=node('textarea');notes.rows=2;field('label_notes',notes);
      const parsed=product(raw);
      const leading=String(raw||'').match(/^[a-zA-ZÀ-ž ()-]+?(?=\s+\d)/);
      name.value=parsed?.name || (leading && product(leading[0])?.name) || raw || '';
      strength.value=parsed?.strength || '';
      if (parsed?.strength) stock.value=MED_FORMULARY.find(v=>product(v)?.name===parsed.name && product(v)?.strength===parsed.strength)||'';
      if (!combined && raw) {
        dose.value=String(anchor.Dose||'').replace(/\s*mg$/i,'');
        const base=String(anchor.Frequency||'').replace(/\s*\+\s*PRN$/i,'').trim();
        const preset=MED_FREQ_PRESETS.find(p=>[p.v,p.en,p.es].some(v=>normalize(v)===normalize(base)));
        freq.value=preset?.v || (/^(prn|as needed)$/i.test(base)?'PRN':'');
        prn.checked=/\+\s*prn/i.test(anchor.Frequency||'');
      }
      stock.onchange=()=>{if(stock.value){const p=product(stock.value);name.value=p.name;strength.value=p.strength;}sync();};
      function sync(){
        const active=status.value==='active',off=status.value==='off';
        stockLabel.hidden=!active;strengthLabel.hidden=!active;doseLabel.hidden=off;freqLabel.hidden=off;prnLabel.hidden=off||freq.value==='PRN';stopLabel.hidden=!off;
        name.readOnly=active && !!stock.value;strength.readOnly=name.readOnly;
        strength.required=active;freq.required=active;
        strength.disabled=!active;stopDate.disabled=!off;dose.disabled=off;freq.disabled=off;prn.disabled=prnLabel.hidden;
      }
      const syncDose=bindMedicationFields(dose,freq,notes,()=>stock.value,
        ()=>status.value==='active'?'start':status.value==='off'?'stop':'unresolved');
      stock.addEventListener('change',syncDose);
      status.onchange=()=>{sync();syncDose();};
      freq.onchange=sync;sync();
      const card={box,legend,part:()=>({status:status.value,stock:stock.value,name:name.value.trim(),strength:status.value==='active'?strength.value:'',
        dose:dose.disabled?'':dose.value.trim(),frequency:freq.disabled?'':freq.value+(!prn.disabled && prn.checked?(freq.value?' + PRN':'PRN'):''),
        stopDate:stopDate.disabled?'':stopDate.value,notes:notes.value.trim()})};
      parts.push(card);
      // Original components cannot be silently dropped. Still unclear keeps them in review.
      if(!raw){box.append(button('med_remove_part',()=>{parts.splice(parts.indexOf(card),1);box.remove();number();}));}
      number();
    }
    function number(){
      parts.forEach((c,i)=>c.legend.textContent=t('med_part',{n:i+1}));
      add.textContent=t(parts.length===1?'med_split':'med_add_part');
    }
    form.onsubmit=async e=>{
      e.preventDefault();if(save.disabled)return;
      const values=parts.map(p=>p.part());
      if(values.some(p=>p.status==='active' && /^QD-OTHER(?: \+ PRN)?$/.test(p.frequency) && !p.notes)){
        error.textContent=t('med_other_timing_notes');return;
      }
      if(values.some(p=>p.status==='active' && (!product(p.name+' '+p.strength+' mg tablets')?.strength ||
        (p.stock && !p.dose)))){
        error.textContent=t('med_edit_invalid');return;
      }
      if(new Set(values.map(p=>normalize(product(p.name)?.name||p.name))).size!==values.length){
        error.textContent=t('med_need_parts');return;
      }
      const frozen=[...form.elements].filter(el=>!el.disabled);
      frozen.forEach(el=>el.disabled=true);dialog.oncancel=e=>e.preventDefault();
      try{
        await correctionRequest({patientId:id,requestId:token,anchorId:anchor.Med_ID,
          sourceIds:issue.sources.map(m=>m.Med_ID),expected,parts:values});
      }catch(err){
        error.textContent=t(err.message==='MED_HISTORY_CHANGED'?'med_stale':'med_fix_failed');
        frozen.forEach(el=>el.disabled=false);dialog.oncancel=null;return;
      }
      dialog.oncancel=null;
      // A successful transaction stays successful even if the subsequent read fails.
      localStorage.setItem('coCMCamasca.medCorrection',crypto.randomUUID());
      try{
        await read();refresh(rows);processed++;
        const next=issues.find(i=>!i.sources.some(m=>m.Med_ID.startsWith('MC-'+token+'-'))) || issues[0];
        message(t('med_saved'),next);
      }catch{message(t('med_saved')+' '+t('supply_failed'));}
    };
  }
}
