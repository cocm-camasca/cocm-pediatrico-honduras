import test from 'node:test';
import assert from 'node:assert/strict';
import {supplyRows, csvText} from '../_registro-wip/registro-supply.mjs';

const tables = {patients:'Pacientes', visits:'Visitas', meds:'Medicamentos'};
const med = (overrides = {}) => ({Patient_ID:'P1', Med_ID:'M1', Date:'2026-01-10',
  Medication:'Fluoxetina 20 mg', Dose:'10 mg', Frequency:'BID', Action:'Inicio', ...overrides});
function rows(meds, options = {}) {
  return supplyRows({patients:[{Patient_ID:'P1'}], visits:[], audit:[], tables,
    today:'2026-11-18', translate:k => k, meds, ...options});
}

test('fractional tablets, mixed schedules, distinct patients and Spanish/English aliases', () => {
  const data = rows([med({Frequency:'Diario, cada mañana + PRN'}),
    med({Patient_ID:'P2', Medication:'Fluoxetine 20 mg', Frequency:'As needed', Dose:'6.25-12.5 mg'}),
    med({Patient_ID:'P3', Frequency:'BID'})], {patients:['P1','P2','P3'].map(Patient_ID=>({Patient_ID}))});
  assert.deepEqual(data.at(-1), ['Fluoxetine',20,105,3,2]);
});

test('separately recorded scheduled and PRN instructions', () => {
  assert.deepEqual(rows([med(),med({Frequency:'PRN'})]).at(-1), ['Fluoxetine',20,60,1,1]);
});

test('increase, continuation, hold and restart use current history', () => {
  const meds = [med(), med({Date:'2026-02-01', Action:'aumentar', Dose:'20 mg'}),
    med({Date:'2026-03-01', Action:'continuar', Dose:'',Frequency:''})];
  assert.deepEqual(rows(meds).at(-1), ['Fluoxetine',20,60,1,0]);
  meds.push(med({Date:'2026-04-01', Action:'suspender'}));
  assert.equal(rows(meds).length,2);
  meds.push(med({Date:'2026-05-01', Action:'START', Frequency:'QD-PM'}));
  assert.deepEqual(rows(meds).at(-1), ['Fluoxetine',20,15,1,0]);
});

test('one review row per patient, other calculable drugs retained', () => {
  const result = rows([med(), med({Medication:'Other A and Other B'}),
    med({Medication:'Hydroxyzine', Dose:'25 mg'}), med({Medication:'Hydroxyzine', Dose:'25 mg'})]);
  assert.ok(result.some(r=>r[0]==='supply_partial'));
  assert.ok(result.some(r=>r[0]==='Fluoxetine' && r[2]===30));
  assert.equal(result.filter(r=>r[0]==='P1').length,1);
  assert.match(result.at(-1)[1],/supply_combined/);
  assert.match(result.at(-1)[1],/supply_(history|product)/);
});

test('conflicting, undated or unsupported history is visibly partial', () => {
  for (const entries of [[med(),med({Action:'STOP'})],[med({Date:''}),med()],
    [med({Action:'?'} )],[med({Frequency:'once weekly'})],[med({Dose:'10-20 mg'})]]) {
    assert.ok(rows(entries).some(r=>r[0]==='supply_partial'));
  }
});

test('twelve calendar months inclusive, all chart sources, no chart reads or unrelated audit edits', () => {
  const ids = ['boundary','stale','edited','visit','medication','testAudit','opened','future','contact','orphan'];
  const meds = ids.map(Patient_ID=>med({Patient_ID,Med_ID:Patient_ID,Date:'2020-01-01'}));
  const patients = ids.filter(id=>id!=='orphan').map(Patient_ID=>({Patient_ID,
    Updated_At: Patient_ID==='boundary'?'2025-11-18':'2025-11-17',
    Last_BHCM_Contact_Date: Patient_ID==='contact'?'2026-10-01':''}));
  const audit = [['edited','Pacientes','update'], ['medication','Medicamentos','update'],
    ['testAudit','Pacientes_Test','update'],['opened','Pacientes','read']].map(([Row_ID,Tab,Action])=>({Row_ID,Tab,Action,Timestamp:'2026-11-10'}));
  const visits = [{Patient_ID:'visit',Visit_Date:'2026-09-01'}, {Patient_ID:'future',Visit_Date:'2027-01-01'}];
  assert.deepEqual(rows(meds,{patients,audit,visits}).at(-1),['Fluoxetine',20,150,5,0]);
});

test('CSV round-trips quoted fields and protects formula-like text', () => {
  assert.equal(csvText([['A,"B"','=SUM(1,2)',1.5]]), '\uFEFF"A,""B""","\'=SUM(1,2)","1.5"\r\n');
});

test('known patients stay counted when a tablet quantity is unavailable', () => {
  const result = rows([med({Frequency:'unknown + PRN'})]);
  assert.deepEqual(result.find(r=>r[0]==='Fluoxetine'), ['Fluoxetine',20,'',1,1]);
  assert.ok(result.some(r=>r[0]==='P1'));
});

test('different ordering strengths remain separate and stopped drugs contribute nothing', () => {
  const patients = [{Patient_ID:'P1'},{Patient_ID:'P2'}];
  const result = rows([med(),med({Patient_ID:'P2',Medication:'Fluoxetine 10 mg'})],{patients});
  assert.deepEqual(result.slice(-2), [['Fluoxetine',10,60,1,0],['Fluoxetine',20,30,1,0]]);
  assert.equal(rows([med(),med({Date:'2026-02-01',Action:'STOP'})]).length,2);
});

test('audit timestamps use Honduras calendar dates and attributable deleted visits count', () => {
  const old = med({Date:'2020-01-01'});
  const audit = [{Tab:'Visitas', Row_ID:'gone', Action:'delete', Timestamp:'2025-11-18T05:59:00Z', Old_Value:'{"Patient_ID":"P1"}'}];
  assert.equal(rows([old],{audit}).length,2);
  audit[0].Timestamp='2025-11-18T06:00:00Z';
  assert.deepEqual(rows([old],{audit}).at(-1),['Fluoxetine',20,30,1,0]);
});
