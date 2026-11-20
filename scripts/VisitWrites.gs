// Call from doPost after authorizing the user, for append requests to Visitas and Visitas_Test.
function appendVisitOnce_(tab, row, actor) {
  if (!/^Visitas(?:_Test)?$/.test(tab) || !row || !row.Visit_ID || !row.Patient_ID) {
    throw new Error('Visit ID and patient ID are required');
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(tab);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const idColumn = headers.indexOf('Visit_ID') + 1;
    const patientColumn = headers.indexOf('Patient_ID') + 1;
    if (!idColumn || !patientColumn) throw new Error('Visit schema changed');
    const last = sheet.getLastRow();
    if (last > 1) {
      const found = sheet.getRange(2, idColumn, last - 1, 1)
        .createTextFinder(String(row.Visit_ID)).matchEntireCell(true).matchCase(true).findNext();
      if (found) {
        const patient = sheet.getRange(found.getRow(), patientColumn).getValue();
        if (String(patient) !== String(row.Patient_ID)) throw new Error('Visit ID conflict');
        return {id: row.Visit_ID, replayed: true};
      }
    }
    return appendRow(tab, row, actor);
  } finally {
    SpreadsheetApp.flush();
    lock.releaseLock();
  }
}
