// Loaded only when the dashboard's supply button is clicked.
const normalize = value => String(value ?? '').trim().toLowerCase().normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ');

const aliases = new Map();
for (const family of [
  ['Fluoxetine', 'fluoxetina', 'prozac'], ['Hydroxyzine', 'hidroxizina', 'hydrozicine', 'atarax'],
  ['Gabapentin', 'gabapentina'], ['Guanfacine', 'guanfacina'], ['Diazepam'],
  ['Levetiracetam', 'keppra', 'levetiracetam (keppra)'], ['Quetiapine', 'quetiapina', 'seroquel', 'quetiapine (seroquel)'],
  ['Melatonin', 'melatonina'], ['Sertraline', 'sertralina', 'zoloft', 'sertraline (zoloft)'],
  ['Risperidone', 'risperidona', 'risperdal'], ['Clonazepam']
]) {
  for (const name of family) aliases.set(normalize(name), family[0]);
}

function day(value) {
  const match = /^(\d{4}-\d{2}-\d{2})(?:$|T|\s)/.exec(String(value ?? '').trim());
  if (!match) return '';
  const timestamp = Date.parse(match[1] + 'T00:00:00Z');
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().startsWith(match[1]) ? match[1] : '';
}

const hondurasDate = new Intl.DateTimeFormat('sv-SE', {timeZone:'America/Tegucigalpa'});
function loggedDay(value) {
  if (!day(value)) return '';
  if (!/T.*(?:Z|[+-]\d\d:\d\d)$/i.test(value)) return day(value);
  const time = Date.parse(value);
  return Number.isFinite(time) ? hondurasDate.format(time) : '';
}

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

// Only the medication/product field can document strength. Dose is a distinct field.
function product(raw) {
  const text = normalize(raw).replace(/(\d),(\d)/g, '$1.$2');
  if (!text || /[,;+\/&]|\b(and|with|con|y)\b/.test(text)) return null;
  const match = /^([a-z][a-z ()-]*?)(?:\s+(\d+(?:\.\d+)?)\s*mg)?(?:\s+(?:tablets?|tabs?|tabletas?|comprimidos?))?$/.exec(text);
  if (!match) return null;
  const name = match[1].trim();
  const tabletProduct = aliases.has(name) || /\b(tablets?|tabs?|tabletas?|comprimidos?)$/.test(text);
  return {name: aliases.get(name) || name, strength: tabletProduct ? Number(match[2]) || null : null};
}

function frequency(raw) {
  const text = normalize(raw);
  const marker = /(?:\bprn\b|\bas needed\b|\bsegun (?:sea )?neces(?:idad|ario)\b)/;
  const prn = marker.test(text);
  const base = text.replace(marker, '').replace(/\s*\+\s*$/, '').trim();
  if (!base) return {times: prn ? 0 : null, prn};
  const patterns = [
    /^(qd(?:-am|-pm)?|qhs(?:, (?:before bed|al acostarse))?|daily(?:, every (?:morning|evening))?|once daily|once a day|nightly|diari[oa](?:, cada (?:manana|noche))?|cada (?:dia|manana|noche)|1 vez al dia|una vez al dia)$/,
    /^(bid(?: \(2 veces al dia\))?|twice daily|2 veces al dia|dos veces al dia)$/,
    /^(tid(?: \(3 veces al dia\))?|three times daily|3 veces al dia|tres veces al dia)$/
  ];
  const index = patterns.findIndex(pattern => pattern.test(base));
  return {times: index < 0 ? null : index + 1, prn};
}

function action(raw) {
  const value = normalize(raw);
  if (/^(start|inicio|iniciar|reinicio|reiniciar|restart)$/.test(value)) return 'start';
  if (/^(stop|hold|suspend(er|ido)?|suspension|descontinuar|discontinuar|pausa)$/.test(value)) return 'off';
  if (/^(continuar|continue|continuacion)$/.test(value)) return 'continue';
  if (/^(increase|decrease|adjust|change|titrate|ajuste|titular|titulacion|aumentar|disminuir|cambio)$/.test(value)) return 'change';
  return 'unknown';
}

function regimen(events, today) {
  const dated = events.map(m => ({
    m, date: day(m.Date || m.Start_Date), logged: Date.parse(m.Created_At) || 0
  })).filter(e => !e.date || e.date <= today);
  if (dated.length > 1 && dated.some(e => !e.date)) return {error:'supply_history'};
  dated.sort((a,b) => a.date.localeCompare(b.date) || a.logged - b.logged);
  let current = null;
  let prior = null;
  let conflict = false;
  let stopped = false;
  let extraPrn = false;
  for (const event of dated) {
    const {m} = event;
    const change = action(m.Action);
    const f = frequency(m.Frequency);
    const doseMatch = /^(\d+(?:[.,]\d+)?)\s*mg$/i.exec(String(m.Dose || '').trim());
    const next = {strength:product(m.Medication).strength, dose:doseMatch ? Number(doseMatch[1].replace(',','.')) : null, ...f};
    const sameDay = prior && prior.date === event.date;
    const unordered = sameDay && (!prior.logged || !event.logged || prior.logged === event.logged);
    const additionalPrn = change === 'start' && current && current.strength && current.strength === next.strength
      && ((next.times === 0 && next.prn && current.times > 0) || (current.times === 0 && current.prn && next.times > 0));
    if (additionalPrn && !conflict) {
      extraPrn = true;
      if (next.times > 0) current = next;
    } else if (unordered && (prior.change !== change || JSON.stringify(prior.next) !== JSON.stringify(next))) {
      conflict = true;
    } else if (change === 'off') {
      current = null;
      conflict = false;
      stopped = true;
      extraPrn = false;
    } else if (change === 'unknown' || (stopped && change !== 'start')) {
      conflict = true;
    } else if (change === 'start' && current && JSON.stringify(current) !== JSON.stringify(next)) {
      conflict = true;
    } else {
      // A bare continuation repeats the known regimen. A change must document its new dose.
      if (current && change === 'continue') {
        if (!m.Dose) next.dose = current.dose;
        if (!m.Frequency) Object.assign(next, {times:current.times, prn:current.prn});
        next.strength ??= current.strength;
      }
      if (extraPrn && change === 'change' && current.strength !== next.strength) {
        // The history doesn't say which product now supplies the separate PRN instruction.
        conflict = true;
        prior = {...event, change, next};
        continue;
      }
      current = next;
      stopped = false;
      if (!sameDay && (change === 'change' || change === 'start')) conflict = false;
    }
    prior = {...event, change, next};
  }
  if (conflict) return {error:'supply_history'};
  if (!current) return null;
  if (extraPrn) current.prn = true;
  if (!current.strength) return {error:'supply_product'};
  if (current.times === null) return {...current, error:'supply_schedule'};
  if (current.times && !(current.dose > 0)) return {...current, error:'supply_dose'};
  return {strength:current.strength, prn:current.prn, tablets:30 * ((current.dose || 0) / current.strength * current.times + Number(current.prn))};
}

export function supplyRows({patients, visits, meds, audit, tables, today, translate:tr, test = false}) {
  const cutoff = priorYear(today);
  const activity = chartActivity(patients, visits, meds, audit, tables, today);
  const roster = new Set(patients.map(p => p.Patient_ID).filter(Boolean));
  const histories = new Map(), totals = new Map(), review = new Map();
  function flag(id, label, reason) {
    if (!review.has(id)) review.set(id, new Set());
    review.get(id).add(label + ' — ' + tr(reason));
  }
  for (const m of meds) {
    const id = m.Patient_ID;
    if (!roster.has(id)) continue;
    if (day(m.Date || m.Start_Date) > today) continue;
    const last = activity.get(id);
    if (last && last < cutoff) continue;
    const med = product(m.Medication);
    if (!last || !med) {
      flag(id, String(m.Medication || tr('supply_unknown')), last ? 'supply_combined' : 'supply_activity');
      continue;
    }
    if (!histories.has(id)) histories.set(id, new Map());
    const byDrug = histories.get(id);
    if (!byDrug.has(med.name)) byDrug.set(med.name, []);
    byDrug.get(med.name).push(m);
  }
  for (const [id, byDrug] of histories) {
    for (const [name, entries] of byDrug) {
      const result = regimen(entries, today);
      if (!result) continue;
      if (result.error) flag(id, name, result.error);
      if (!result.strength) continue;
      const key = name + '|' + result.strength;
      const row = totals.get(key) || {name, strength:result.strength, tablets:null, patients:0, prn:0};
      if (!result.error) row.tablets = (row.tablets || 0) + result.tablets;
      row.patients++;
      if (result.prn) row.prn++;
      totals.set(key, row);
    }
  }
  const rows = [[tr('supply_title'), today]];
  if (test) rows.push([tr('supply_test')]);
  if (review.size) rows.push([tr('supply_partial')]);
  rows.push(['supply_med','supply_strength','supply_tablets','supply_people','supply_prn'].map(tr));
  for (const r of [...totals.values()].sort((a,b) => a.name.localeCompare(b.name) || a.strength-b.strength)) {
    rows.push([r.name, r.strength, r.tablets === null ? '' : Number(r.tablets.toFixed(6)), r.patients, r.prn]);
  }
  if (review.size) {
    rows.push([], [tr('supply_review')], [tr('supply_id'), tr('supply_reason')]);
    for (const id of [...review.keys()].sort()) rows.push([id, [...review.get(id)].sort().join(' / ')]);
  }
  return rows;
}

export function csvText(rows) {
  return '\uFEFF' + rows.map(row => row.map(value => {
    let text = String(value);
    if (typeof value === 'string' && /^\s*[=+\-@\t\r\n]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  }).join(',')).join('\r\n') + '\r\n';
}

export async function downloadSupplyReport() {
  const tables = {patients:resolveTab('Pacientes'), visits:resolveTab('Visitas'), meds:resolveTab('Medicamentos')};
  const mode = getDataMode();
  if (mode !== 'appsscript' && mode !== 'demo') throw new Error('Live registry connection required');
  const names = ['Pacientes','Visitas','Medicamentos','Auditoria'];
  const [patients, visits, meds, audit] = await Promise.all(names.map(name => fetchTab(name, {fresh:true})));
  if (tables.patients !== resolveTab('Pacientes') || mode !== getDataMode()) throw new Error('Dataset changed');
  const today = hondurasDate.format(new Date());
  const test = mode === 'demo' || tables.meds.endsWith('_Test');
  const rows = supplyRows({patients, visits, meds, audit, tables, today, test, translate:key => t(key)});
  const url = URL.createObjectURL(new Blob([csvText(rows)], {type:'text/csv;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'CoCM-' + (test ? 'TEST-' : '') + '30d-' + today + '.csv';
  document.body.append(link);
  try { link.click(); } finally { link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
}
