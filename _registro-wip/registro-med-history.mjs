const normalize = value => String(value ?? '').trim().toLowerCase().normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ');

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

function action(raw) {
  const value = normalize(raw);
  if (value === 'confirmed_active') return 'start';
  if (value === 'confirmed_off') return 'off';
  if (/^(start|inicio|iniciar|reinicio|reiniciar|restart)$/.test(value)) return 'start';
  if (/^(stop|hold|suspend(er|ido)?|suspension|descontinuar|discontinuar|pausa)$/.test(value)) return 'off';
  if (/^(continuar|continue|continuacion)$/.test(value)) return 'continue';
  if (/^(increase|decrease|adjust|change|titrate|ajuste|titular|titulacion|aumentar|disminuir|cambio)$/.test(value)) return 'change';
  return 'unknown';
}

export { normalize, day, hondurasDate, loggedDay, action };

export function eventDate(m) {
  if (['CONFIRMED_ACTIVE','CONFIRMED_OFF','UNRESOLVED'].includes(m.Action)) return loggedDay(m.Created_At);
  return day(m.Date || m.Start_Date) || loggedDay(m.Created_At);
}

export function newestMedicationFirst(a, b) {
  return eventDate(b).localeCompare(eventDate(a)) ||
    (Date.parse(b.Created_At) || 0) - (Date.parse(a.Created_At) || 0);
}

export function currentMedIds(meds, today = hondurasDate.format(new Date())) {
  const seen = new Set(), current = new Set();
  for (const m of [...meds].sort(newestMedicationFirst)) {
    if (String(m.Action).startsWith('CORRECTED:')) continue;
    if (eventDate(m) > today) continue;
    const drug = product(m.Medication)?.name;
    if (!drug || seen.has(drug)) continue;
    seen.add(drug);
    if (['start','change','continue'].includes(action(m.Action))) current.add(m.Med_ID);
  }
  return current;
}

// Read the medication field only. Legacy rows can list multiple products together.
export function hasDuplicateSsri(meds, today = hondurasDate.format(new Date())) {
  const latest = new Map();
  for (const med of meds) {
    const change = action(med.Action);
    if (change === 'unknown') continue;
    const date = eventDate(med);
    if (date > today) continue;
    const logged = Date.parse(med.Created_At) || 0;
    const parts = normalize(med.Medication).split(/[,;+&/]|\b(?:and|y|with|con)\b/);
    for (const part of parts) {
      const match = /^\s*(fluoxetine|fluoxetina|prozac|sertraline|sertralina|zoloft)\b/.exec(part);
      if (!match) continue;
      const drug = /^(?:fluox|prozac)/.test(match[1]) ? 'fluoxetine' : 'sertraline';
      const prior = latest.get(drug);
      if (!prior || date > prior.date || (date === prior.date && logged > prior.logged)) {
        latest.set(drug, {date, logged, active:change !== 'off'});
      } else if (date === prior.date && logged === prior.logged && change !== 'off') {
        // An unordered stop/start warrants reconciliation.
        prior.active = true;
      }
    }
  }
  return Boolean(latest.get('fluoxetine')?.active && latest.get('sertraline')?.active);
}

const aliases = new Map();
for (const family of [
  ['Fluoxetine', 'fluoxetina', 'prozac'], ['Hydroxyzine', 'hidroxizina', 'hydrozicine', 'atarax'],
  ['Gabapentin', 'gabapentina'], ['Guanfacine', 'guanfacina'], ['Diazepam'],
  ['Levetiracetam', 'keppra', 'levetiracetam (keppra)'], ['Quetiapine', 'quetiapina', 'seroquel', 'quetiapine (seroquel)'],
  ['Melatonin', 'melatonina'], ['Magnesium glycinate', 'glicinato de magnesio'], ['Sertraline', 'sertralina', 'zoloft', 'sertraline (zoloft)'],
  ['Risperidone', 'risperidona', 'risperdal'], ['Clonazepam']
]) {
  for (const name of family) aliases.set(normalize(name), family[0]);
}

// Only the medication/product field can document strength. Dose is a distinct field.
export function product(raw) {
  const text = normalize(raw).replace(/(\d),(\d)/g, '$1.$2');
  if (!text || /[,;+\/&]|\b(and|with|con|y)\b/.test(text)) return null;
  const match = /^([a-z][a-z ()-]*?)(?:\s+(\d+(?:\.\d+)?)\s*mg)?(?:\s+(?:tablets?|tabs?|tabletas?|comprimidos?))?$/.exec(text);
  if (!match) return null;
  const name = match[1].trim();
  const tabletProduct = aliases.has(name) || /\b(tablets?|tabs?|tabletas?|comprimidos?)$/.test(text);
  return {name: aliases.get(name) || name, strength: tabletProduct ? Number(match[2]) || null : null};
}
