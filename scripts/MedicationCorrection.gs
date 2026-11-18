// Extension to the registry relay. Called after doPost authenticates the caller.
function withMedicationLock_(operation) {
  const lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try { return operation(); }
  finally { SpreadsheetApp.flush(); lock.releaseLock(); }
}

function correctMedication_(tab, body, actor) {
  if (!/^Medicamentos(?:_Test)?$/.test(tab)) throw Error('Invalid medication table');
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName(tab), audit = ss.getSheetByName('Auditoria');
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const auditHeaders = audit.getRange(1, 1, 1, audit.getLastColumn()).getValues()[0];
  const required = ['Med_ID','Patient_ID','Date','Medication','Dose','Frequency','Action','Created_By','Created_At'];
  if (!required.every(h => headers.includes(h)) ||
      !['Audit_ID','Timestamp','User','Action','Tab','Row_ID','Field','Old_Value','New_Value'].every(h => auditHeaders.includes(h))) {
    throw Error('Registry schema changed');
  }
  // An empty batch checks authorization to use the transactional write service
  // without modifying any cell. Used by the protected release readiness check.
  if (body.checkOnly === true) {
    Sheets.Spreadsheets.batchUpdate({requests:[]}, SHEET_ID);
    return {ready:true};
  }
  const patient = body.patientId, token = body.requestId, parts = body.parts;
  if (typeof patient !== 'string' || !patient || !/^[a-f0-9-]{36}$/i.test(token) ||
      !Array.isArray(parts) || !parts.length || parts.length > 20 ||
      !Array.isArray(body.sourceIds) || !body.sourceIds.length) throw Error('Invalid correction');
  const grid = sh.getDataRange().getValues();
  const rows = grid.slice(1).map((r, i) => {
    const row = {};
    headers.forEach((h,j) => { row[h] = r[j] instanceof Date ? Utilities.formatDate(r[j],'UTC','yyyy-MM-dd') : String(r[j] == null ? '' : r[j]); });
    return {row:row, index:i+1};
  }).filter(x => x.row.Patient_ID === patient);
  const prefix = 'MC-' + token + '-';
  if (rows.some(x => x.row.Med_ID === prefix+'1')) return {saved:true};
  const fields = ['Med_ID','Date','Medication','Dose','Frequency','Action','Created_At','Notes','Prescriber','Reason'];
  const snapshot = rows.map(x => fields.map(h=>x.row[h] || '')).sort((a,b)=>a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0);
  if (JSON.stringify(snapshot) !== JSON.stringify(body.expected)) throw Error('MED_HISTORY_CHANGED');
  const sources = rows.filter(x => body.sourceIds.includes(x.row.Med_ID));
  if (sources.length !== body.sourceIds.length || sources.some(x=>x.row.Action.indexOf('CORRECTED:')===0)) throw Error('MED_HISTORY_CHANGED');
  const now = nowIso(), today = Utilities.formatDate(new Date(),'America/Tegucigalpa','yyyy-MM-dd');
  const anchor = sources.find(x => x.row.Med_ID === body.anchorId);
  if (!anchor) throw Error('Invalid source');
  const auditRows = [], requests = [];
  function cells(names,obj) {
    return {values:names.map(h=>({userEnteredValue:{stringValue:String(obj[h] == null ? '' : obj[h])}}))};
  }
  function log(verb,id,oldValue,newValue) {
    auditRows.push(cells(auditHeaders,{Audit_ID:'C-'+Utilities.getUuid(),Timestamp:now,User:actor,Action:verb,
      Tab:tab,Row_ID:id,Field:'',Old_Value:JSON.stringify(oldValue),New_Value:JSON.stringify(newValue)}));
  }
  sources.forEach(x=>{
    const updated = 'CORRECTED:'+x.row.Action;
    requests.push({updateCells:{start:{sheetId:sh.getSheetId(),rowIndex:x.index,columnIndex:headers.indexOf('Action')},
      rows:[cells(['Action'],{Action:updated})],fields:'userEnteredValue'}});
    log('update',x.row.Med_ID,x.row,Object.assign({},x.row,{Action:updated}));
  });
  const replacements = parts.map((p,i)=>{
    const active=p.status==='active', off=p.status==='off';
    const name=String(p.name||'').trim(), strength=String(p.strength||''), dose=String(p.dose||'').trim();
    const freq=String(p.frequency||''), stopDate=String(p.stopDate||'');
    if ((!active && !off && p.status!=='unclear') || !name || name.length>500 ||
        (active && (!/^[a-zA-ZÀ-ž][a-zA-ZÀ-ž ()-]*$/.test(name) || !(Number(strength)>0) || !/^\d+(\.\d+)?$/.test(strength) ||
        !/^(QD-AM|QD-PM|QHS|BID|TID)( \+ PRN)?$|^PRN$/.test(freq) ||
        (freq!=='PRN' && (!/^\d+(\.\d+)?$/.test(dose)||!(Number(dose)>0))))) ||
        (stopDate && (!/^\d{4}-\d{2}-\d{2}$/.test(stopDate)||stopDate>today||!off))) throw Error('Invalid medication details');
    const row=Object.assign({},anchor.row,{Med_ID:prefix+(i+1), Patient_ID:patient, Medication:active ? name+' '+strength+' mg tablets' : name,
      Dose:dose ? dose + (/mg$/i.test(dose)?'':' mg') : '', Frequency:freq, Action:active?'CONFIRMED_ACTIVE':off?'CONFIRMED_OFF':'UNRESOLVED',
      Date:off ? stopDate : anchor.row.Date, Notes:String(p.notes||''), Created_By:actor,Created_At:now,Updated_By:actor,Updated_At:now});
    log('append',row.Med_ID,{},row);
    return cells(headers,row);
  });
  requests.push({appendCells:{sheetId:sh.getSheetId(),rows:replacements,fields:'userEnteredValue'}},
    {appendCells:{sheetId:audit.getSheetId(),rows:auditRows,fields:'userEnteredValue'}});
  Sheets.Spreadsheets.batchUpdate({requests:requests},SHEET_ID);
  return {saved:true};
}
