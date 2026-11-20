import {prepareReport,downloadReport,reportText} from './registro-supply.mjs?v=20261120forms';

export function openReport(overview) {
  const dialog=document.createElement('dialog');
  dialog.className='med-dialog';
  dialog.setAttribute('aria-label',t(overview?'med_overview':'supply_button'));
  dialog.innerHTML=`<h2></h2><div class="med-actions-bar">
    <button class="primary" type="button" data-format="csv"></button><button class="ghost" type="button" data-format="text"></button>
    <button class="ghost" type="button" data-copy hidden></button><button class="ghost" type="button" data-close></button>
    </div><div role="status"></div><div data-output></div>`;
  dialog.querySelector('h2').textContent=dialog.getAttribute('aria-label');
  const formats=[...dialog.querySelectorAll('[data-format]')],copy=dialog.querySelector('[data-copy]'),
    close=dialog.querySelector('[data-close]'),status=dialog.querySelector('[role=status]'),out=dialog.querySelector('[data-output]');
  close.textContent=t('med_close'); close.onclick=()=>dialog.close();
  copy.textContent=t('med_copy'); copy.onclick=async()=>{
    try { await navigator.clipboard.writeText(out.textContent);status.textContent=t('med_copied'); }
    catch { const range=document.createRange(); range.selectNodeContents(out); const selection=getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent=t('med_copy_fail'); }
  };
  for(const button of formats){
    button.textContent=t(button.dataset.format==='csv'?'med_download':'med_view');
    button.onclick=async()=>{
      formats.forEach(b=>b.disabled=true);out.replaceChildren();copy.hidden=true;status.textContent=t('supply_loading');
      try {
        const report=await prepareReport(overview);
        if (!dialog.open) return;
        status.textContent='';
        if(button.dataset.format==='csv') {downloadReport(report);dialog.close();}
        else {out.append(reportText(report.rows,overview));copy.hidden=false;}
      } catch { status.textContent=t('supply_failed'); }
      finally {formats.forEach(b=>b.disabled=false);}
    };
  }
  dialog.onclose=()=>dialog.remove();document.body.append(dialog);dialog.showModal();
}
