// Loaded only when the dashboard's supply button is clicked.
import {day, loggedDay, hondurasDate, hasDuplicateSsri} from './registro-med-history.mjs?v=review1';
import {analyzeMedications, groupPatients, reviewReason, chartUrl} from './registro-med-review.mjs?v=review1';

function priorYear(date) {
  const year = Number(date.slice(0, 4)) - 1;
  const anniversary = year + date.slice(4);
  return day(anniversary) || year + '-02-28';
}

function chartActivity(patients, visits, meds, audit, tables, today) {
  const latest = new Map();
  const owners = new Map();
  function record(id, ...dates) {
    if (!id) return;
    for (const value of dates) {
      const date = day(value);
      if (date && date <= today && date > (latest.get(id) || '')) latest.set(id, date);
    }
  }
  for (const p of patients) record(p.Patient_ID, p.Enrollment_Date, loggedDay(p.Created_At), loggedDay(p.Updated_At),
    p.Last_BHCM_Contact_Date, p.Last_Psych_Consult_Date, p.Baseline_Date, loggedDay(p.Safety_Flag_Ack_At));
  for (const v of visits) {
    owners.set(tables.visits + ':' + v.Visit_ID, v.Patient_ID);
    record(v.Patient_ID, v.Visit_Date, loggedDay(v.Created_At), loggedDay(v.Updated_At));
  }
  for (const m of meds) {
    owners.set(tables.meds + ':' + m.Med_ID, m.Patient_ID);
    record(m.Patient_ID, m.Date, m.Start_Date, loggedDay(m.Created_At), loggedDay(m.Updated_At));
  }
  const writes = audit.filter(a => [tables.patients, tables.visits, tables.meds].includes(a.Tab)
    && /^(append|update|delete|insert|edit|create)$/i.test(a.Action));
  // A deleted child row may only have its owner in a historical audit record.
  for (const a of writes) {
    const key = a.Tab + ':' + a.Row_ID;
    if (owners.has(key) || a.Tab === tables.patients) continue;
    if (a.Field === 'Patient_ID' && (a.New_Value || a.Old_Value)) {
      owners.set(key, a.New_Value || a.Old_Value);
    } else {
      for (const value of [a.New_Value, a.Old_Value]) {
        if (typeof value !== 'string' || !value.startsWith('{')) continue;
        try {
          const id = JSON.parse(value).Patient_ID;
          if (id) owners.set(key, id);
        } catch { /* Unstructured audit value. */ }
      }
    }
  }
  for (const a of writes) record(a.Tab === tables.patients ? a.Row_ID : owners.get(a.Tab + ':' + a.Row_ID), loggedDay(a.Timestamp));
  return latest;
}


export function supplyRows({patients, visits, meds, audit, tables, today, translate:tr, test=false,
    patientCell=id=>id, correctionCell=()=>tr('med_correct'), overview=false}) {
  const cutoff = priorYear(today);
  const activity = chartActivity(patients, visits, meds, audit, tables, today);
  const groups = groupPatients(meds), totals = new Map(), review = [], overlaps = [], overviewRows = [];
  for (const id of [...new Set(patients.map(p=>p.Patient_ID).filter(Boolean))].sort()) {
    const entries = groups.get(id);
    if (!entries) continue;
    const last = activity.get(id), inWindow = !!last && last >= cutoff;
    if (!overview && last && !inWindow) continue;
    const {issues,current} = analyzeMedications(entries,today);
    const reasons = reviewReason(issues,tr);
    const overlap = hasDuplicateSsri(entries,today);
    if (overview) {
      const lines = current.map(({name,state,latest}) => {
        if (state.error === 'supply_history' || state.error === 'med_unclear') return name+' — '+tr(state.error);
        const directions = state.frequency || latest.Frequency || '';
        const prn = state.prn && !/prn|as needed|seg[uú]n/i.test(directions) ? ' + PRN' : '';
        return [name+(state.strength ? ' ('+state.strength+' mg)' : ''), state.dose ? state.dose+' mg' : latest.Dose,
          directions+prn].filter(Boolean).join(' · ');
      });
      for (const i of issues) if (!current.some(c=>c.name===i.label)) lines.push(i.label || tr('supply_unknown'));
      overviewRows.push([patientCell(id),lines.join('\n') || tr('med_none_current'),
        !last ? tr('med_unknown') : tr(inWindow?'med_yes':'med_no'),[reasons,overlap && tr('ssri_review_title')].filter(Boolean).join(' / ')]);
      continue;
    }
    if (!last) {
      const undated = entries.filter(m=>!String(m.Action).startsWith('CORRECTED:') && (!m.Date || day(m.Date)<=today));
      if (undated.length && !issues.length) issues.push({label:undated[0].Medication,reason:'supply_activity',sources:[undated[0]]});
    }
    if (issues.length) review.push([patientCell(id),reviewReason(issues,tr),correctionCell(id,issues)]);
    if (overlap) overlaps.push([patientCell(id),tr('ssri_pair')]);
    if (!inWindow) continue;
    for (const {name,state} of current) {
      if (!state.strength) continue;
      const key = name+'|'+state.strength;
      const row = totals.get(key) || {name,strength:state.strength,tablets:null,patients:0,prn:0};
      if (!state.error) row.tablets = (row.tablets || 0)+state.tablets;
      row.patients++;
      if (state.prn) row.prn++;
      totals.set(key,row);
    }
  }
  const rows = [[tr(overview?'med_overview':'supply_title'),today]];
  if (test) rows.push([tr('supply_test')]);
  const hint = [tr('med_link_hint')];
  if (overview) return [...rows,hint,['supply_id','med_directions','med_window','med_review_notes'].map(tr),...overviewRows];
  if (review.length) rows.push([tr('supply_partial')]);
  rows.push(['supply_med','supply_strength','supply_tablets','supply_people','supply_prn'].map(tr));
  for (const r of [...totals.values()].sort((a,b)=>a.name.localeCompare(b.name)||a.strength-b.strength)) {
    rows.push([r.name,r.strength,r.tablets===null?'':Number(r.tablets.toFixed(6)),r.patients,r.prn]);
  }
  if (review.length) rows.push([], [tr('supply_review')],hint,[tr('supply_id'),tr('supply_reason'),tr('med_correct')],...review);
  if (overlaps.length) rows.push([], [tr('ssri_review_title')],hint,[tr('supply_id'),tr('ssri_review_pair')],...overlaps);
  return rows;
}

class PatientChartLink {
  constructor(label, url) { this.label=label; this.url=url; }
}

export function csvText(rows) {
  return '\uFEFF'+rows.map(row=>row.map(value=>{
    let text=String(value);
    if (value instanceof PatientChartLink) {
      text='=HYPERLINK("'+value.url+'","'+value.label.replace(/"/g,'""')+'")';
    } else if (typeof value==='string' && /^\s*[=+\-@\t\r\n]/.test(text)) text="'"+text;
    return '"'+text.replace(/"/g,'""')+'"';
  }).join(',')).join('\r\n')+'\r\n';
}

export async function prepareReport(overview) {
  const mode=getDataMode(), tables={patients:resolveTab('Pacientes'),visits:resolveTab('Visitas'),meds:resolveTab('Medicamentos')};
  if (mode!=='appsscript' && mode!=='demo') throw Error('Registry connection required');
  const [patients,visits,meds,audit]=await Promise.all(['Pacientes','Visitas','Medicamentos','Auditoria'].map(n=>fetchTab(n,{fresh:true})));
  if (tables.patients!==resolveTab('Pacientes') || mode!==getDataMode()) throw Error('Dataset changed');
  const now=new Date(), today=hondurasDate.format(now), test=mode==='demo'||tables.meds.endsWith('_Test');
  const time=new Intl.DateTimeFormat('en-GB',{timeZone:'America/Tegucigalpa',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(now).replace(/:/g,'.');
  const rows=supplyRows({patients,visits,meds,audit,tables,today,test,overview,translate:t,
    patientCell:id=>new PatientChartLink(String(id),chartUrl(id,test)),
    correctionCell:(id,issues)=>new PatientChartLink(t('med_correct'),chartUrl(id,test,issues))});
  const filename='CoCM '+(overview?'All-patient Medication Overview':'Medication Supply Report')+(test?' TEST ':' ')+today+' '+time+'.csv';
  return {rows,filename};
}

export function downloadReport({rows,filename}) {
  const url=URL.createObjectURL(new Blob([csvText(rows)],{type:'text/csv;charset=utf-8'}));
  const link=document.createElement('a'); link.href=url; link.download=filename; document.body.append(link);
  try { link.click(); } finally { link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000); }
}

// Render links as anchors; all chart-derived strings remain text nodes.
export function reportText(rows,overview) {
  const pre=document.createElement('pre');
  for (const row of rows) {
    if (overview && row[0] instanceof PatientChartLink) {
      append(row[0]); pre.append('\n'+String(row[1]).split('\n').map(s=>'  '+s).join('\n')+'\n  '+t('med_window')+' · '+row[2]+(row[3]?'\n  '+row[3]:'')+'\n\n');
    } else {
      row.forEach((cell,i)=>{ if(i)pre.append('\t'); append(cell); }); pre.append('\n');
    }
  }
  function append(value) {
    if (!(value instanceof PatientChartLink)) { pre.append(String(value));return; }
    const a=document.createElement('a'); a.textContent=value.label; a.href=value.url; pre.append(a);
  }
  return pre;
}
