import {normalize, day, loggedDay, action, product, hondurasDate, newestMedicationFirst} from './registro-med-history.mjs?v=20261120forms';

function frequency(raw) {
  const text = normalize(raw);
  const marker = /(?:\bprn\b|\bas needed\b|\bsegun (?:sea )?neces(?:idad|ario)\b)/;
  const prn = marker.test(text);
  const base = text.replace(marker, '').replace(/\s*\+\s*$/, '').trim();
  if (!base) return {times: prn ? 0 : null, prn};
  const patterns = [
    /^qd-other$/,
    /^(qd(?:-am|-pm)?|qhs(?:, (?:before bed|al acostarse))?|daily(?:, every (?:morning|evening))?|once daily|once a day|nightly|diari[oa](?:, cada (?:manana|noche))?|cada (?:dia|manana|noche)|1 vez al dia|una vez al dia)$/,
    /^(bid(?: \(2 veces al dia\))?|twice daily|2 veces al dia|dos veces al dia)$/,
    /^(tid(?: \(3 veces al dia\))?|three times daily|3 veces al dia|tres veces al dia)$/
  ];
  const index = patterns.findIndex(pattern => pattern.test(base));
  return {times: index < 0 ? null : Math.max(1, index), prn};
}

function regimen(events, today) {
  let dated = events.map(m => ({
    m, date: ['CONFIRMED_ACTIVE','CONFIRMED_OFF','UNRESOLVED'].includes(m.Action) ? loggedDay(m.Created_At) : day(m.Date || m.Start_Date), logged: Date.parse(m.Created_At) || 0
  })).filter(e => !e.date || e.date <= today);
  dated.sort((a,b) => a.date.localeCompare(b.date) || a.logged - b.logged);
  const checkpoint = dated.findLastIndex(e => ['CONFIRMED_ACTIVE','CONFIRMED_OFF','UNRESOLVED'].includes(e.m.Action));
  if (checkpoint >= 0) dated = dated.slice(checkpoint);
  if (dated.at(-1)?.m.Action === 'UNRESOLVED') return {error:'med_unclear'};
  if (dated.length > 1 && dated.some(e => !e.date)) {
    // A subsequent dated stop or fully specified change can supersede an
    // undated import when the import was already logged before that date.
    const undated = dated.filter(e => !e.date);
    const reset = dated.filter(e => e.date && (action(e.m.Action) === 'off' ||
      (action(e.m.Action) === 'change' && e.m.Dose && e.m.Frequency)) &&
      undated.every(u => loggedDay(u.m.Created_At) && loggedDay(u.m.Created_At) < e.date))
      .sort((a,b) => b.date.localeCompare(a.date))[0];
    if (!reset) return {error:'supply_history'};
    dated = dated.filter(e => e.date >= reset.date);
  }
  dated.sort((a,b) => a.date.localeCompare(b.date) || a.logged - b.logged);
  let instruction = '';
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
      if (['change','continue'].includes(change) && m.Dose && m.Frequency) {
        // An explicitly restated regimen replaces earlier scheduled and PRN instructions.
        extraPrn = false;
      } else if (extraPrn && change === 'change' && current?.strength !== next.strength) {
        // The history doesn't say which product now supplies the separate PRN instruction.
        conflict = true;
        prior = {...event, change, next};
        continue;
      }
      current = next;
      stopped = false;
      if (!sameDay && (change === 'change' || change === 'start')) conflict = false;
    }
    if (current === next && (m.Frequency || change !== 'continue')) instruction = m.Frequency || '';
    prior = {...event, change, next};
  }
  if (conflict) return {error:'supply_history'};
  if (!current) return null;
  if (extraPrn) current.prn = true;
  current.frequency = instruction;
  if (!current.strength) return {...current, error:'supply_product'};
  if (current.times === null) return {...current, error:'supply_schedule'};
  if (current.times && !(current.dose > 0)) return {...current, error:'supply_dose'};
  return {...current, tablets:30 * ((current.dose || 0) / current.strength * current.times + Number(current.prn))};
}


export function groupPatients(meds) {
  const groups = new Map();
  for (const row of meds) {
    if (!groups.has(row.Patient_ID)) groups.set(row.Patient_ID, []);
    groups.get(row.Patient_ID).push(row);
  }
  return groups;
}

export function analyzeMedications(meds, today = hondurasDate.format(new Date())) {
  const drugs = new Map(), issues = [], current = [];
  for (const row of meds) {
    if (String(row.Action).startsWith('CORRECTED:') || day(row.Date || row.Start_Date) > today) continue;
    const name = product(row.Medication)?.name;
    if (!name) {
      if (action(row.Action) !== 'off') issues.push({label:row.Medication, reason:row.Action === 'UNRESOLVED' ? 'med_unclear' : 'supply_combined', sources:[row]});
      continue;
    }
    if (!drugs.has(name)) drugs.set(name, []);
    drugs.get(name).push(row);
  }
  for (const [name, entries] of drugs) {
    const state = regimen(entries, today);
    if (!state) continue;
    const ordered = [...entries].sort(newestMedicationFirst);
    const sources = state.error === 'supply_history' ? ordered : ordered.slice(0,1);
    if (state.error) issues.push({label:name, reason:state.error, sources});
    current.push({name, state, latest:ordered[0]});
  }
  return {issues,current};
}

export function reviewReason(issues, tr) {
  return [...new Set(issues.map(i => (i.label || tr('supply_unknown'))+' — '+tr(i.reason)))].sort().join(' / ');
}

export function chartUrl(id, test, issues) {
  const url = new URL('https://registry.cocm-camasca.org/_registro-wip/registro-paciente.html');
  url.searchParams.set('id', id);
  url.searchParams.set('dataset', test ? 'test' : 'real');
  if (issues) url.searchParams.set('correct', issues.flatMap(i => i.sources.map(r => r.Med_ID)).join(','));
  return url.href;
}

export function historySnapshot(rows) {
  const fields = ['Med_ID','Date','Medication','Dose','Frequency','Action','Created_At','Notes','Prescriber','Reason'];
  return rows.map(row => fields.map(k => String(row[k] ?? ''))).sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:0);
}
