// @version 85d5c82
/* ============================================================
   CoCM Camasca — shared i18n helper
   Exposes: t(key, vars) and getLang().
   Both registro-app.js and registro-paciente.js include this first.
   ============================================================ */

const REG_I18N = {
  visit_note_expand: { en: '▼ Show full note', es: '▼ Ver nota completa' },
  visit_note_collapse: { en: '▲ Collapse', es: '▲ Colapsar' },
  visit_edited: { en: '(edited)', es: '(editado)' },
  visit_duplicate_warning: { en: 'This chart already has a matching entry on that date. Save another entry?', es: 'Esta ficha ya tiene un registro igual en esa fecha. ¿Guardar otro registro?' },
  med_dose_required: { en: 'Enter the prescribed dose.', es: 'Ingrese la dosis prescrita.' },
  med_managed_external: { en: 'Managed by outside provider', es: 'Manejado por proveedor externo' },
  med_frequency_required: { en: 'Choose a frequency or select PRN.', es: 'Elija una frecuencia o marque PRN.' },
  med_other_specify: { en: 'Other (specify)', es: 'Otro (especificar)' },
  med_already_active: { en: 'This medication already appears active for this patient. Use Continue for the same regimen, or Change to record a new dose. Save a new start anyway?', es: 'Este medicamento ya aparece activo para este paciente. Use Continuar para el mismo régimen o Cambiar para registrar otra dosis. ¿Guardar un nuevo inicio de todos modos?' },
  med_other_timing_notes: { en: 'Enter the daily timing in Notes.', es: 'Indique el horario diario en Notas.' },
  med_half_less: { en: 'Decrease by half a tablet', es: 'Reducir media tableta' },
  med_half_more: { en: 'Increase by half a tablet', es: 'Aumentar media tableta' },
  notes_translate: { en: 'Translate Spanish notes' },
  notes_translate_scope: { en: 'Applies to all charts in this browser.', es: 'Se aplica a todas las fichas en este navegador.' },
  notes_translate_wait: { en: 'Preparing translation…', es: 'Preparando la traducción…' },
  notes_translate_error: { en: 'Translation unavailable. Select Translate Spanish notes again to retry.' },
  notes_from_spanish: { en: 'Translated from Spanish', es: 'Traducido del español' },
  notes_show_original: { en: 'Show original', es: 'Ver original' },
  notes_show_translation: { en: 'Show translation', es: 'Ver traducción' },
  med_overview: { en:"All-patient medication overview", es:"Resumen de medicamentos de todos los pacientes" },
  med_link_hint: { en:"Click a patient ID to open the chart.", es:"Haga clic en el ID del paciente para abrir su ficha." },
  med_correct: { en:"Correct entry", es:"Corregir registro" },
  med_flag: { en:"Med review", es:"Revisar med." },
  med_download: { en:"Download CSV", es:"Descargar CSV" },
  med_view: { en:"View & copy text", es:"Ver y copiar texto" },
  med_copy: { en:"Copy text", es:"Copiar texto" },
  med_copied: { en:"Copied", es:"Copiado" },
  med_copy_fail: { en:"Select the text and copy it.", es:"Seleccione el texto y cópielo." },
  med_close: { en:"Close", es:"Cerrar" },
  med_directions: { en:"Current medications and directions", es:"Medicamentos e indicaciones actuales" },
  med_patient_name: { en:"Patient name", es:"Nombre del paciente" },
  med_window: { en:"Within supply activity window (12 months)", es:"Actividad dentro del período de suministro (12 meses)" },
  med_review_notes: { en:"Review notes", es:"Notas de revisión" },
  med_none_current: { en:"No current medications documented", es:"Sin medicamentos actuales documentados" },
  med_yes: { en:"Yes", es:"Sí" },
  med_no: { en:"No", es:"No" },
  med_unknown: { en:"Unknown", es:"Desconocido" },
  med_unclear: { en:"Still unclear", es:"Aún sin aclarar" },
  med_done: { en:"These entries have already been resolved.", es:"Estos registros ya se corrigieron." },
  med_part: { en:"Medication {n}", es:"Medicamento {n}" },
  med_original: { en:"Original entry", es:"Registro original" },
  med_resolution: { en:"Status", es:"Estado" },
  med_active: { en:"Currently taking", es:"Lo toma actualmente" },
  med_off: { en:"No longer taking", es:"Ya no lo toma" },
  med_split: { en:"Split into two medications", es:"Separar en dos medicamentos" },
  med_add_part: { en:"Add another medication", es:"Agregar otro medicamento" },
  med_remove_part: { en:"Remove this form", es:"Quitar este formulario" },
  med_part_name: { en:"Medication name", es:"Nombre del medicamento" },
  med_part_strength: { en:"Tablet strength (mg)", es:"Concentración por tableta (mg)" },
  med_part_dose: { en:"Dose per administration (mg)", es:"Dosis por toma (mg)" },
  med_stop_date: { en:"Stop date, if known", es:"Fecha de suspensión, si se conoce" },
  med_save_correction: { en:"Save correction", es:"Guardar corrección" },
  med_corrected: { en:"Corrected", es:"Corregido" },
  med_saved: { en:"Correction saved.", es:"Corrección guardada." },
  med_next: { en:"Review next entry", es:"Revisar el siguiente registro" },
  med_count: { en:"Entry {n} of {total} to review", es:"Registro {n} de {total} por revisar" },
  med_confirmed: { en:"Confirmed currently taking", es:"Uso actual confirmado" },
  med_confirmed_off: { en:"Confirmed no longer taking", es:"Suspensión confirmada" },
  med_select: { en:"Choose…", es:"Seleccione…" },
  med_fix_failed: { en:"Could not confirm the correction. Reopen the entry to check its current status before retrying.", es:"No se pudo confirmar la corrección. Vuelva a abrir el registro para verificar su estado antes de reintentar." },
  med_stale: { en:"Medication history changed. Reopen the correction to use the latest information.", es:"El historial cambió. Vuelva a abrir la corrección para usar la información más reciente." },
  med_need_parts: { en:"Account for each medication separately. Choose Still unclear if a detail is unknown.", es:"Registre cada medicamento por separado. Seleccione Aún sin aclarar si falta algún dato." },
  med_edit_invalid: { en:"Check the medication name, strength, dose and frequency.", es:"Revise el nombre, la concentración, la dosis y la frecuencia." },
  med_loading: { en:"Reading current medication history…", es:"Leyendo el historial de medicamentos actualizado…" },
  med_other: { en:"Other medication", es:"Otro medicamento" },
  med_formulary: { en:"Formulary product", es:"Producto del formulario" },
  supply_button: { en: 'Medication supply report', es: 'Informe de suministro de medicamentos' },
  ssri_review_title: { en: 'Possible duplicate SSRI therapy — review', es: 'Posible duplicidad de ISRS — revisar' },
  ssri_review_pair: { en: 'Medications to reconcile', es: 'Medicamentos por conciliar' },
  med_event_update: { en: 'Update', es: 'Actualizar' },
  med_event_historical: { en: 'Historical', es: 'Histórico' },
  med_event_stop: { en: 'Stop', es: 'Suspender' },
  med_event_update_title: { en: 'Update medication regimen', es: 'Actualizar esquema del medicamento' },
  med_event_stop_title: { en: 'Stop this medication?', es: '¿Suspender este medicamento?' },
  med_event_date: { en: 'Effective date', es: 'Fecha efectiva' },
  med_event_direction: { en: 'Choose an action', es: 'Elija una acción' },
  med_event_notes: { en: 'Reason / notes', es: 'Motivo / notas' },
  med_event_stop_ok: { en: 'Confirm stop', es: 'Confirmar suspensión' },
  med_event_append: { en: 'Save new history entry', es: 'Guardar nueva entrada en el historial' },
  med_event_edit_hint: { en: 'Changing the dose or frequency opens a new dated history entry.', es: 'Cambiar la dosis o la frecuencia abre una nueva entrada fechada en el historial.' },
  med_event_latest: { en: 'The medication history changed or this entry is historical. Reopen the chart and use the current entry.', es: 'El historial cambió o esta entrada es histórica. Vuelva a abrir la ficha y use la entrada actual.' },
  med_event_same: { en: 'Enter the new dose or frequency.', es: 'Ingrese la nueva dosis o frecuencia.' },
  med_event_cancel: { en: 'Cancel', es: 'Cancelar' },
  ssri_pair: { en: 'Fluoxetine and sertraline', es: 'Fluoxetina y sertralina' },
  ssri_chart: { en: 'Fluoxetine and sertraline both appear active. Confirm the current regimen.', es: 'La fluoxetina y la sertralina figuran como activas. Confirme el esquema actual.' },
  supply_loading: { en: 'Preparing report…', es: 'Preparando informe…' },
  supply_failed: { en: 'Could not generate the report from fresh registry data. Please retry.', es: 'No se pudo generar el informe con datos actualizados del registro. Vuelva a intentarlo.' },
  supply_title: { en: '30-day medication supply', es: 'Suministro de medicamentos para 30 días' },
  supply_test: { en: 'Test data', es: 'Datos de prueba' },
  supply_partial: { en: 'Partial totals — see entries needing review below', es: 'Totales parciales — consulte los registros pendientes de revisión' },
  supply_med: { en: 'Medication', es: 'Medicamento' },
  supply_strength: { en: 'Tablet strength (mg)', es: 'Concentración por tableta (mg)' },
  supply_tablets: { en: 'Tablets for 30 days', es: 'Tabletas para 30 días' },
  supply_people: { en: 'Total patients', es: 'Pacientes en total' },
  supply_prn: { en: 'Patients with as-needed use', es: 'Pacientes con uso según necesidad' },
  supply_review: { en: 'Needs review — supply cannot be calculated', es: 'Requiere revisión — no se puede calcular el suministro' },
  supply_id: { en: 'Patient ID', es: 'ID del paciente' },
  supply_reason: { en: 'Medication and reason', es: 'Medicamento y motivo' },
  supply_combined: { en: 'Combined or unclear medication entry', es: 'Registro combinado o medicamento poco claro' },
  supply_unknown: { en: 'Unspecified medication', es: 'Medicamento sin especificar' },
  supply_product: { en: 'Tablet strength or formulation unclear', es: 'Concentración o presentación de la tableta poco clara' },
  supply_dose: { en: 'Scheduled dose unclear', es: 'Dosis programada poco clara' },
  supply_schedule: { en: 'Frequency unclear', es: 'Frecuencia poco clara' },
  supply_history: { en: 'Conflicting or unclear medication history', es: 'Historial del medicamento contradictorio o poco claro' },
  supply_activity: { en: 'Chart activity date unavailable', es: 'Fecha de actividad clínica desconocida' },
  // ── tier labels ────────────────────────────────────────────
  tier_severa:    { es: 'Severa',     en: 'Severe' },
  tier_moderada:  { es: 'Moderada',   en: 'Moderate' },
  tier_leve:      { es: 'Leve',       en: 'Mild' },
  tier_remision:  { es: 'Remisión',   en: 'Remission' },
  tier_sin_datos: { es: 'Sin datos',  en: 'No data' },

  // ── stat cards ─────────────────────────────────────────────
  stat_patients:      { es: 'Pacientes',             en: 'Patients' },
  stat_active:        { es: 'Pacientes en Terapia + CoCM', en: 'Therapy + CoCM patients' },
  stat_severa:        { es: 'En severa',             en: 'In severe' },
  stat_moderada:      { es: 'En moderada',           en: 'In moderate' },
  stat_sev_mod:       { es: 'Severa / Moderada',     en: 'Severe / Moderate' },
  stat_leve:          { es: 'En leve',               en: 'In mild' },
  stat_remision:      { es: 'En remisión',           en: 'In remission' },
  stat_sin_datos:     { es: 'Sin datos',             en: 'No data' },
  stat_safety:        { es: 'Banderas de seguridad', en: 'Safety flags' },
  stat_not_improving: { es: 'No mejorando',          en: 'Not improving' },
  stat_stale:         { es: 'Vencidos (visita)',     en: 'Lapsed visits' },
  stat_due_followup:  { es: 'Por seguimiento',       en: 'Due for follow-up' },
  stat_due_cadence:   { es: 'Según la cadencia del estado', en: 'Based on status cadence' },

  // ── table headers ──────────────────────────────────────────
  th_paciente:      { es: 'Paciente',        en: 'Patient' },
  th_therapist:     { es: 'Terapeuta',       en: 'Therapist' },
  th_condition:     { es: 'Condición',       en: 'Condition' },
  th_conditions:    { es: 'Condiciones',     en: 'Conditions' },
  th_tool:          { es: 'Herramienta',     en: 'Tool' },
  th_latest_score:  { es: 'Última<br>medición',        en: 'Latest<br>score' },
  th_baseline:      { es: 'Base',            en: 'Baseline' },
  th_last_visit:    { es: 'Última<br>visita',           en: 'Last<br>visit' },
  th_status:        { es: 'Estado',          en: 'Status' },
  th_flags:         { es: 'Banderas',        en: 'Flags' },
  th_actions:       { es: 'Acciones',        en: 'Actions' },
  th_trend:         { es: 'Tendencia',       en: 'Trend' },
  th_delta:         { es: 'Δ vs.<br>base',             en: 'Δ vs.<br>baseline' },
  th_last_psych:    { es: 'Última revisión<br>psiq.', en: 'Last psych<br>review' },
  th_last_contact:  { es: 'Último contacto<br>terapeuta', en: 'Last therapist<br>contact' },
  th_review:        { es: 'Revisar',                en: 'Review' },
  th_enrolled:      { es: 'Ingresó',               en: 'Enrolled' },
  th_baseline_on_main: { es: 'Base',             en: 'Baseline' },

  // ── generic UI ─────────────────────────────────────────────
  empty_state:      { es: 'Sin pacientes que mostrar.',         en: 'No patients to show.' },
  empty_filters:    { es: 'Ningún paciente coincide con los filtros actuales. Seleccione Todos los estados o quite otro filtro.', en: 'No patients match the current filters. Select All statuses or clear another filter.' },
  no_visits:        { es: 'Sin visitas aún.',                    en: 'No visits yet.' },
  no_suggestions:   { es: 'Sin sugerencias aún.',                en: 'No suggestions yet.' },
  no_meds:          { es: 'Sin eventos de medicamentos.',        en: 'No medication events.' },
  loading:          { es: 'Cargando…',                           en: 'Loading…' },
  saving:           { es: 'Guardando…',                          en: 'Saving…' },
  visits:           { es: 'visitas',                              en: 'visits' },
  events:           { es: 'eventos',                              en: 'events' },
  event_singular:   { es: 'evento',                               en: 'event' },
  visit_singular:   { es: 'visita',                               en: 'visit' },
  baseline_short:   { es: 'base',                                 en: 'baseline' },
  baseline_long:    { es: 'basal',                                en: 'baseline' },
  years_suffix:     { es: 'a',                                    en: 'y' }, // "13a" / "13y"
  days_ago:         { es: 'hace {n} días',                        en: '{n} days ago' },
  days_short:       { es: '{n}d',                                 en: '{n}d' },
  days_future:      { es: 'en {n}d',                              en: 'in {n}d' },
  today:            { es: 'hoy',                                  en: 'today' },
  yesterday:        { es: 'ayer',                                 en: 'yesterday' },

  // ── flags / actions ────────────────────────────────────────
  flag_safety:      { es: 'SEGURIDAD',           en: 'SAFETY' },
  flag_brigade_short:  { es: 'BRIGADA',             en: 'BRIGADE' },
  flag_brigade_tip:    { es: 'A ver en la próxima brigada', en: 'To be seen by next brigade' },
  brigade_banner_title:{ es: 'Marcado para la próxima brigada', en: 'Flagged for next brigade' },
  safety_pinned:    { es: 'SEGURIDAD — FIJADOS', en: 'SAFETY — PINNED' },
  flag_not_improv:  { es: 'No mejora',           en: 'Not improving' },
  flag_stuck:       { es: 'Sin visita reciente', en: 'No recent visit' },
  flag_stale:       { es: 'Atrasado',            en: 'Stale' },
  flag_lapsed:      { es: 'VENCIDO',             en: 'LAPSED' },
  flag_lapsed_tooltip_active: { es: 'Sin visita > 8 semanas', en: 'No visit > 8 weeks' },
  flag_lapsed_tooltip_stable: { es: 'Sin visita > 16 semanas', en: 'No visit > 16 weeks' },
  flag_review:      { es: 'Marcado para revisión', en: 'Flagged for review' },
  flag_due_psych:   { es: 'Consulta psiq. hace > 8 semanas', en: 'Psych review > 8 weeks ago' },
  flag_due_psych_stable: { es: 'Consulta psiq. hace > 16 semanas', en: 'Psych review > 16 weeks ago' },
  flag_review_short: { es: 'REVISAR',            en: 'REVIEW' },
  flag_due_psych_short: { es: 'Ψ VENCIDO',       en: 'Ψ OVERDUE' },
  flag_suggest_stable:       { es: 'SUGERIR COCM ESTABLE',       en: 'SUGGEST STABLE COCM' },
  flag_suggest_stable_tooltip: { es: '3 visitas consecutivas con puntajes mínimos (≥8 sem entre sí). Considere promover a CoCM estable.', en: '3 consecutive visits with minimal scores (≥8 wk apart). Consider promoting to Stable CoCM.' },
  flag_confirm_stable:       { es: '¿SIGUE ESTABLE?',       en: 'STILL STABLE?' },
  flag_confirm_stable_tooltip: { es: 'Paciente en CoCM estable sin contacto > 16 semanas. Confirme que sigue estable o cambie a Terapia + CoCM.', en: 'Stable CoCM patient with no contact > 16 weeks. Confirm still stable or change to Therapy + CoCM.' },
  flag_needs_baseline:       { es: 'FALTA BASAL',            en: 'NEEDS BASELINE' },
  flag_needs_baseline_tooltip: { es: 'Sin puntajes psicométricos registrados. Obtener medición basal.', en: 'No psychometric scores recorded. Collect a baseline measurement.' },
  flag_needs_baseline_banner: { es: 'Este paciente no tiene puntajes psicométricos registrados. Considere obtener una medición basal (PHQ-A, GAD-7, SMFQ-C, etc.) para establecer el punto de partida.', en: 'This patient has no psychometric scores recorded. Consider collecting a baseline measurement (PHQ-A, GAD-7, SMFQ-C, etc.) to establish a starting point.' },
  flag_needs_update:         { es: 'ACTUALIZAR PUNTAJE',    en: 'UPDATE SCORE' },
  flag_needs_update_tooltip: { es: 'Último puntaje > 4 semanas. Considere re-administrar una medición.', en: 'Last score > 4 weeks old. Consider re-administering a measurement.' },
  flag_needs_update_banner:  { es: 'El último puntaje psicométrico tiene más de 4 semanas. Considere re-administrar la herramienta de monitoreo para seguir la respuesta al tratamiento.', en: 'The last psychometric score is more than 4 weeks old. Consider re-administering the monitoring tool to track treatment response.' },
  action_view:      { es: 'Ver',                  en: 'View' },
  action_log_visit: { es: 'Registrar visita',    en: 'Log visit' },
  action_ack:       { es: 'Reconocer',            en: 'Acknowledge' },
  action_save:      { es: 'Guardar',              en: 'Save' },
  action_cancel:    { es: 'Cancelar',             en: 'Cancel' },
  action_add_med:   { es: 'Agregar medicamento', en: 'Add medication' },
  action_add_visit: { es: '+ Registrar visita',  en: '+ Log visit' },
  action_add_med2:  { es: '+ Medicamento',        en: '+ Medication' },
  action_raise_safety: { es: 'Marcar bandera de seguridad', en: 'Raise safety flag' },
  action_change_status: { es: 'Cambiar estado', en: 'Change status' },
  action_undo:      { es: 'Deshacer',             en: 'Undo' },
  action_retry:     { es: 'Reintentar',           en: 'Retry' },
  action_view_below: { es: 'Ver abajo',           en: 'View below' },
  action_move_low:  { es: 'Mover a Prioridad Baja', en: 'Move to Low Priority' },
  action_new_patient: { es: '+ Paciente nuevo',   en: '+ New patient' },
  action_quick_add: { es: 'Guardar rápido',       en: 'Quick save' },
  action_save_and_visit: { es: 'Guardar y registrar visita', en: 'Save and log visit' },

  // ── safety banner / modal ──────────────────────────────────
  safety_banner_title: { es: 'Pacientes con bandera de seguridad activa:', en: 'Patients with active safety flag:' },
  safety_active: { es: 'Bandera de seguridad activa', en: 'Active safety flag' },
  safety_reason_prompt: { es: '¿Motivo de la bandera?', en: 'Reason for safety flag?' },
  safety_confirm_ack:   { es: '¿Reconocer bandera de seguridad?', en: 'Acknowledge safety flag for this patient?' },
  safety_section_first: { es: 'Evaluación de seguridad', en: 'Safety screening' },
  safety_concern_title: { es: 'Preocupación de seguridad', en: 'Safety concern' },
  safety_si_prompt: { es: 'Evaluar ideación suicida/autolesión en esta visita', en: 'Assess suicidal ideation / self-harm this visit' },

  // ── messages in recommendation card ───────────────────────
  not_improving_msg: {
    es: '{tool}: {first}→{last} en {weeks} semanas (<50% reducción). Considere revisión de caso o intensificación de tratamiento.',
    en: '{tool}: {first}→{last} over {weeks} weeks (<50% reduction). Consider case review or treatment intensification.'
  },
  remission_msg: {
    es: 'Dos puntajes consecutivos de {tool} bajo umbral de remisión. Considere mover a Prioridad Baja.',
    en: 'Two consecutive {tool} scores below remission threshold. Consider moving to Low Priority.'
  },
  stuck_msg: {
    es: 'Sin visita hace {days} días. Considere contactar o reprogramar.',
    en: 'No visit for {days} days. Consider outreach or rescheduling.'
  },
  safety_prompt_body: {
    es: 'Preocupación de seguridad marcada. Revise evaluación de ideación suicida/autolesión y documente plan antes de reconocer.',
    en: 'Safety concern flagged. Review suicidal ideation / self-harm assessment and document plan before acknowledging.'
  },

  // ── data modes ─────────────────────────────────────────────
  mode_demo:       { es: 'Modo demo (sin datos reales)', en: 'Demo mode (no real data)' },
  mode_appsscript: { es: 'Apps Script',                  en: 'Apps Script' },
  mode_csv:        { es: 'CSV publicado',                en: 'Published CSV' },
  mode_configuring: { es: 'Configurando…',                en: 'Configuring…' },

  // ── dataset toggle ─────────────────────────────────────────
  dataset_real:  { es: 'Pacientes reales',  en: 'Real patients' },
  dataset_test:  { es: 'Datos de prueba',   en: 'Test data' },
  dataset_label: { es: 'Conjunto',          en: 'Dataset' },
  dataset_test_banner: {
    es: 'Viendo datos de prueba sintéticos. Los cambios se guardan en Pacientes_Test, no afectan pacientes reales.',
    en: 'Viewing synthetic test data. Changes save to Pacientes_Test and do not affect real patients.'
  },

  // ── queue / sync / errors ──────────────────────────────────
  queued_local:        { es: 'Guardado en cola local.',           en: 'Queued locally.' },
  queued_pending:      { es: 'En cola — se sincronizará al conectar Apps Script.', en: 'Queued — will sync when Apps Script is connected.' },
  saved_local_pending: { es: 'Guardado localmente — se sincronizará al conectar Apps Script.', en: 'Saved locally — will sync when Apps Script is connected.' },
  saved:               { es: 'Guardado.',                          en: 'Saved.' },
  saved_patient:       { es: 'Paciente guardado: {name}',          en: 'Patient saved: {name}' },
  saved_visit:         { es: 'Visita guardada.',                   en: 'Visit saved.' },
  saved_med:           { es: 'Medicamento guardado.',              en: 'Medication saved.' },
  conn_lost:           { es: 'Conexión perdida — sus datos están guardados localmente.', en: 'Connection lost — your data is saved locally.' },
  generic_error:       { es: 'Ocurrió un error: {msg}',            en: 'An error occurred: {msg}' },
  err_required_name:   { es: 'Ingrese un nombre.',                 en: 'Please enter a name.' },
  err_name_required:   { es: 'El nombre es obligatorio.',          en: 'Name is required.' },
  err_tool_score_req:  { es: 'Herramienta y puntaje son obligatorios.', en: 'Tool and score are required.' },
  err_med_required:    { es: 'Medicamento es obligatorio.',        en: 'Medication is required.' },
  err_score_range:     { es: 'Puntaje fuera de rango para {tool}.', en: 'Score out of range for {tool}.' },

  // ── duplicate warning ──────────────────────────────────────
  dup_warn_title: { es: 'Posible duplicado', en: 'Possible duplicate' },
  dup_warn_body:  { es: 'Ya existe un paciente con nombre similar:', en: 'A patient with a similar name already exists:' },
  dup_continue:   { es: 'Es un paciente diferente, continuar',  en: 'Different patient, continue' },
  dup_cancel:     { es: 'Cancelar y revisar',                    en: 'Cancel and review' },

  // ── form labels ────────────────────────────────────────────
  label_full_name:   { es: 'Nombre completo',       en: 'Full name' },
  label_initials:    { es: 'Iniciales',             en: 'Initials' },
  label_dob:         { es: 'Fecha de nacimiento',   en: 'Date of birth' },
  label_age:         { es: 'Edad',                  en: 'Age' },
  label_sex:         { es: 'Sexo',                  en: 'Sex' },
  label_therapist:   { es: 'Terapeuta',             en: 'Therapist' },
  label_enrollment:  { es: 'Fecha de ingreso',      en: 'Enrollment date' },
  label_conditions:  { es: 'Condiciones',           en: 'Conditions' },
  label_primary_cond: { es: 'Condición principal',  en: 'Primary condition' },
  label_tools:       { es: 'Herramientas de monitoreo', en: 'Monitoring tools' },
  label_score:       { es: 'Puntaje',               en: 'Score' },
  label_date:        { es: 'Fecha',                 en: 'Date' },
  label_tool:        { es: 'Herramienta',           en: 'Tool' },
  label_visit_note:  { es: 'Nota de visita',        en: 'Visit note' },
  label_note:        { es: 'Nota',                  en: 'Note' },
  label_si_positive: { es: '¿IS positiva?',         en: 'SI positive?' },
  label_not_improv:  { es: '¿No mejora?',           en: 'Not improving?' },
  label_medication:  { es: 'Medicamento',           en: 'Medication' },
  label_dose:        { es: 'Dosis',                 en: 'Dose' },
  label_frequency:   { es: 'Frecuencia',            en: 'Frequency' },
  label_action:      { es: 'Acción',                en: 'Action' },
  label_prescriber:  { es: 'Prescriptor',           en: 'Prescriber' },
  label_reason:      { es: 'Motivo',                en: 'Reason' },
  med_reason_anxiety:    { es: 'Ansiedad',      en: 'Anxiety' },
  med_reason_depression: { es: 'Depresión',     en: 'Depression' },
  med_reason_adhd:       { es: 'TDAH',          en: 'ADHD' },
  med_reason_ptsd:       { es: 'Trauma / PTSD', en: 'PTSD' },
  label_notes:       { es: 'Notas',                 en: 'Notes' },
  label_yes:         { es: 'Sí',                    en: 'Yes' },
  label_no:          { es: 'No',                    en: 'No' },
  label_other:       { es: 'Otro',                  en: 'Other' },
  label_full_name_ph: { es: 'Dr. Jane Doe',         en: 'Dr. Jane Doe' },
  label_subscales:   { es: 'Subescalas (JSON, opcional)', en: 'Subscales (JSON, optional)' },
  label_optional:    { es: 'opcional',              en: 'optional' },
  label_required:    { es: 'obligatorio',           en: 'required' },
  label_add_details: { es: 'Agregar más detalles',  en: 'Add more details' },

  // ── sex values ─────────────────────────────────────────────
  sex_f: { es: 'Femenino',  en: 'Female' },
  sex_m: { es: 'Masculino', en: 'Male' },
  sex_o: { es: 'Otro',      en: 'Other' },

  // ── med actions ────────────────────────────────────────────
  med_start:    { es: 'Iniciar',        en: 'Start' },
  med_titrate:  { es: 'Titular',        en: 'Titrate' },
  med_increase: { es: 'Aumentar',       en: 'Increase' },
  med_decrease: { es: 'Disminuir',      en: 'Decrease' },
  med_continue: { es: 'Continuar',      en: 'Continue' },
  med_hold:     { es: 'Suspender temp.', en: 'Hold' },
  med_stop:     { es: 'Descontinuar',   en: 'Stop' },

  // Historic med action values stored in sheet (Spanish). Translate on display.
  med_action_inicio:       { es: 'Inicio',             en: 'Start' },
  med_action_iniciar:      { es: 'Iniciar',            en: 'Start' },
  med_action_ajuste:       { es: 'Ajuste',             en: 'Adjust' },
  med_action_titular:      { es: 'Titular',            en: 'Titrate' },
  med_action_titulacion:   { es: 'Titulación',         en: 'Titration' },
  med_action_continuar:    { es: 'Continuar',          en: 'Continue' },
  med_action_continuacion: { es: 'Continuación',       en: 'Continue' },
  med_action_suspension:   { es: 'Suspensión',         en: 'Hold' },
  med_action_suspender:    { es: 'Suspender',          en: 'Hold' },
  med_action_hold:         { es: 'Suspender temp.',    en: 'Hold' },
  med_action_stop:         { es: 'Descontinuar',       en: 'Stop' },
  med_action_descontinuar: { es: 'Descontinuar',       en: 'Stop' },
  med_action_cambio:       { es: 'Cambio',             en: 'Change' },

  // ── patient detail page ────────────────────────────────────
  pat_missing_id:    { es: 'Falta el parámetro ?id=', en: 'Missing ?id= parameter' },
  pat_not_found:     { es: 'Paciente no encontrado.', en: 'Patient not found.' },
  pat_tools_help:    {
    es: 'Abre la herramienta en el portal CoCM. Al terminar, regrese aquí y use «+ Registrar visita» para ingresar el puntaje.',
    en: 'Opens the tool on the CoCM portal. When finished, return here and use «+ Log visit» to enter the score.'
  },
  pat_recent: { es: 'Visto hace {days} días', en: 'Seen {days} days ago' },
  pat_never: { es: 'Primera visita pendiente', en: 'First visit pending' },
  pat_last_used_tool: { es: 'Última herramienta usada: {tool}', en: 'Last tool used: {tool}' },
  pat_change_tool: { es: 'cambiar',            en: 'change' },
  pat_complete_tool: { es: 'Completar herramienta', en: 'Complete a tool' },
  pat_trends_by_tool: { es: 'Tendencias por herramienta', en: 'Trends by tool' },
  pat_trends_hover_hint: { es: 'Pase el mouse sobre un punto para ver fecha y puntaje', en: 'Hover over a point to see date and score' },
  pat_visit_history: { es: 'Historial de visitas', en: 'Visit history' },
  visit_score_history: { es: 'Historial de visitas / puntajes', en: 'Visit / Score history' },
  score_col_label:     { es: 'Puntaje', en: 'Score' },
  pat_med_history: { es: 'Historial de medicamentos', en: 'Medication history' },
  pat_recommendations: { es: 'Recomendaciones', en: 'Recommendations' },
  pat_dob: { es: 'FdN',       en: 'DOB' },
  pat_enrolled: { es: 'Ingreso', en: 'Enrolled' },
  pat_back: { es: 'Registro',  en: 'Registry' },

  // ── filters / toolbar ──────────────────────────────────────
  filter_all_therapists: { es: 'Todos los terapeutas', en: 'All therapists' },
  filter_all_conditions: { es: 'Todas las condiciones', en: 'All conditions' },
  filter_all: { es: 'Todos los estados', en: 'All statuses' },
  filter_all_desc: { es: 'Todos los estados de atención; los filtros de terapeuta y condición siguen aplicándose.', en: 'All care statuses; therapist and condition filters still apply.' },
  filter_search_ph: { es: 'Buscar nombre, iniciales o ID del paciente…', en: 'Search patient name, initials, or ID…' },
  filter_sort: { es: 'Ordenar', en: 'Sort' },
  sort_last_visit_desc: { es: 'Más atrasados', en: 'Most overdue' },
  sort_severity: { es: 'Severidad', en: 'Severity' },
  sort_name: { es: 'Nombre', en: 'Name' },
  sort_recent: { es: 'Visita más reciente', en: 'Most recent visit' },

  // ── status ─────────────────────────────────────────────────
  status_activo:     { es: 'Terapia + CoCM',        en: 'Therapy + CoCM' },
  status_estable:    { es: 'CoCM estable',          en: 'Stable CoCM' },
  status_baja:       { es: 'Prioridad Baja',        en: 'Low Priority' },
  status_inactivo:   { es: 'Solo terapia',          en: 'Therapy only' },
  status_transfer:   { es: 'Transferido',           en: 'Transferred' },
  status_otro:       { es: 'Otro',                  en: 'Other' },
  status_activo_desc: { es: 'Recibe terapia y monitoreo CoCM activo.', en: 'Receiving therapy and active CoCM monitoring.' },
  status_estable_desc: { es: 'Recibe terapia con monitoreo CoCM reducido, cada 16 semanas.', en: 'Receiving therapy with reduced CoCM monitoring on a 16-week cadence.' },
  status_inactivo_desc: { es: 'Recibe terapia sin monitoreo CoCM actual. Puede o no haber participado antes en CoCM.', en: 'Receiving therapy without current CoCM monitoring. The patient may or may not have previously participated in CoCM.' },
  status_transfer_desc: { es: 'Ya no recibe seguimiento en este registro, por ejemplo, si salió de Camasca o trasladó su atención.', en: 'No longer followed in this registry, for example after leaving Camasca or moving care elsewhere.' },
  status_otro_desc: { es: 'Estado personalizado fuera de las cuatro categorías estándar.', en: 'A custom status outside the four standard categories.' },
  status_baja_desc: { es: 'Estado existente de prioridad baja.', en: 'Existing Low Priority status.' },
  status_safety_desc: { es: 'Pacientes con una bandera de seguridad activa.', en: 'Patients with an active safety flag.' },
  status_brigade: { es: '🚩 Brigada', en: '🚩 Brigade' },
  status_brigade_desc: { es: 'Pacientes marcados para la próxima visita de brigada.', en: 'Patients flagged for the next brigade visit.' },
  status_due_followup_desc: { es: 'Pacientes pendientes de seguimiento según la cadencia de su estado de atención.', en: 'Patients due for follow-up based on their current care cadence.' },
  status_specify: { es: 'Especificar', en: 'Specify' },
  stable_change_to_active: { es: 'Cambiar a Terapia + CoCM', en: 'Change to Therapy + CoCM' },
  stable_confirm_or_change: { es: 'Paciente en CoCM estable: sin contacto psiquiátrico en más de 16 semanas. Confirme que sigue estable (reinicia el plazo de 16 semanas) o cambie a Terapia + CoCM.', en: 'Stable CoCM patient: no psychiatric contact in over 16 weeks. Confirm still stable (resets the 16-week clock) or change to Therapy + CoCM.' },
  status_safety:     { es: '⚠ Con bandera de seguridad', en: '⚠ Safety flag' },
  status_not_improving: { es: 'No mejora',          en: 'Not improving' },
  status_due_followup: { es: 'Por seguimiento',     en: 'Due for follow-up' },

  // ── how-to card ───────────────────────────────────────────
  howto_title: { es: '¿Cómo uso esta página?', en: 'How do I use this page?' },
  howto_registry_body: {
    es: `
      <details class="howto-sub" open>
        <summary>👤 Inicio de sesión <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Use su cuenta de Google autorizada. Revise <strong>Sesión iniciada como</strong> encima del registro. Las visitas y los medicamentos registran como autor a quien inició sesión.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>🗂 Leer el registro <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Busque por nombre, iniciales o ID y seleccione al paciente para abrir su ficha. Use los filtros de terapeuta, condición y estado de atención. <strong>Por condición</strong> agrupa a los pacientes por condición primaria.</li>
          <li>Las banderas de seguridad activas se fijan arriba. Los encabezados y el menú de orden cambian el orden de la lista. <strong>Real</strong> muestra datos clínicos. <strong>Prueba</strong> es para practicar.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>➕ Agregar un paciente <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Seleccione <strong>+ Nuevo paciente</strong> e ingrese el nombre y el terapeuta. Abra <strong>Agregar detalles</strong> para registrar condiciones, cuestionarios de seguimiento, puntajes basales, medicamentos iniciales y datos del cuidador. El registro asigna el ID.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>💊 Informes de medicamentos <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>El <strong>Informe de suministro de medicamentos</strong> estima el suministro para 30 días a partir de los esquemas vigentes y las fichas con actividad en los últimos 12 meses. Muestra por separado las entradas por corregir y la posible duplicación de ISRS.</li>
          <li>El <strong>Resumen de medicamentos de todos los pacientes</strong> muestra el ID, nombre, indicaciones actuales y notas de revisión. Ambos informes ofrecen CSV y texto para copiar. Seleccione un ID enlazado para abrir la ficha.</li>
          <li>La bandera <strong>Revisar med.</strong> explica el problema al pasar el cursor y abre <strong>Corregir entrada</strong>. Los medicamentos suspendidos temporal o definitivamente se excluyen de los esquemas vigentes.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>💬 Sugerencias y problemas <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Seleccione <strong>Sugerencias / Reportar problema</strong>. Elija una categoría y prioridad, describa lo ocurrido y adjunte una captura si ayuda. Use prioridad alta para problemas que impiden el trabajo clínico.</li>
        </ul>
      </details>`,
    en: `
      <details class="howto-sub" open>
        <summary>👤 Signing in <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Use your authorized Google account. Check <strong>Signed in as</strong> above the registry. Visits and medication entries record the signed-in account as the author.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>🗂 Reading the registry <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Search by name, initials, or ID, then select a patient to open the chart. Use the therapist, condition, and care-status filters to narrow the list. <strong>By condition</strong> groups patients by primary condition.</li>
          <li>Active safety flags are pinned at the top. Column headings and the sort menu change how the list is ordered. <strong>Real</strong> shows clinic records. <strong>Test</strong> is for practice.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>➕ Adding a patient <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Select <strong>+ New patient</strong> and enter the name and therapist. Open <strong>Add details</strong> to enter conditions, monitored questionnaires, baseline scores, initial medications, and caregiver contact details. The registry assigns the patient ID.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>💊 Medication reports <span class="howto-chevron">▾</span></summary>
        <ul>
          <li><strong>Medication supply report</strong> estimates a 30-day supply from current regimens and charts with activity in the past 12 months. It separates entries needing correction from possible duplicate SSRI therapy.</li>
          <li><strong>All-patient medication overview</strong> shows patient IDs, names, current directions, and review notes. Both reports offer CSV and copyable text. Select a linked ID to open the chart.</li>
          <li>A <strong>Med review</strong> flag explains the issue on hover and opens <strong>Correct entry</strong>. Held and stopped medications are excluded from the current regimens.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>💬 Suggestions and problems <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Select <strong>Suggestions / Report a problem</strong>. Choose a category and priority, describe what happened, and attach a screenshot if it helps. Use High priority for issues that block clinical work.</li>
        </ul>
      </details>`,
  },
  howto_patient_body: {
    es: `
      <details class="howto-sub" open>
        <summary>👤 Ficha del paciente y seguridad <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Use <strong>Editar paciente</strong> para cambiar los datos personales, condiciones, herramientas de seguimiento, datos del cuidador y notas de la ficha. Use <strong>Cambiar estado</strong> para el estado de atención. La etiqueta Verificar indica que la condición primaria fue inferida y necesita confirmación.</li>
          <li>Use la casilla de seguridad de la visita o <strong>Marcar bandera de seguridad</strong> para marcar una preocupación. La bandera activa fija al paciente arriba en el registro. Use <strong>Reconocer</strong> en el aviso cuando corresponda.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>📝 Visitas, puntajes y notas <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Abra <strong>Registrar visita</strong> y elija una visita con puntajes o sin puntaje. Ingrese la fecha y los puntajes correspondientes. Una visita sin puntaje requiere una nota. Use <strong>Solo puntaje</strong> para guardar un puntaje sin registrar una visita.</li>
          <li>Use el lápiz para corregir una entrada. La ficha muestra el autor registrado y marca las ediciones. <strong>Ver nota completa</strong> aparece si el texto está recortado.</li>
          <li>En modo inglés, <strong>Translate Spanish notes</strong> traduce las notas en navegadores de escritorio compatibles. La preferencia se aplica a todas las fichas en ese navegador. En modo español se muestran las notas originales.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>📊 Completar y compartir cuestionarios <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Abra una escala en <strong>Completar herramienta</strong> para usarla con el paciente. Use el botón de compartir para copiar un enlace para el cuidador o docente cuando esté disponible. Para compartir varios, seleccione los cuestionarios y pulse <strong>Copiar seleccionados</strong>.</li>
          <li>El PSC-17 es el tamizaje inicial de una sola aplicación. Use los controles de puntaje de la ficha para registrar los resultados.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>💊 Historial de medicamentos <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Seleccione <strong>+ Medicamento</strong>. Elija la concentración de la tableta o <strong>Otro (especificar)</strong>. Ingrese la dosis prescrita y la frecuencia para las entradas activas, salvo si el medicamento lo maneja un proveedor externo. Las flechas cambian la dosis en media tableta. Para <strong>Diario</strong>, indique el horario en Notas. Marque PRN cuando corresponda.</li>
          <li>En la entrada activa, use <strong>Actualizar</strong> para continuar, aumentar, disminuir o suspender temporalmente. Use <strong>Suspender</strong> para dar por terminado el tratamiento. Cada acción agrega una entrada fechada. Los informes usan el esquema vigente y excluyen medicamentos suspendidos temporal o definitivamente.</li>
          <li>Use el lápiz para corregir una acción registrada u otros datos de la entrada. Use <strong>Corregir entrada</strong> para aclarar entradas ambiguas o combinadas y conservar el historial. Se muestran por separado el prescriptor y quien registró la entrada.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>📋 Seguimiento de CoCM y sugerencias <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Use <strong>Editar</strong> u <strong>Hoy</strong> en el seguimiento de CoCM para registrar una revisión psiquiátrica o un contacto del terapeuta. Marque la ficha para discutirla en la próxima revisión de casos si corresponde.</li>
          <li>Use <strong>Sugerencias / Reportar problema</strong> para informar problemas o pedir mejoras.</li>
        </ul>
      </details>`,
    en: `
      <details class="howto-sub" open>
        <summary>👤 Patient chart and safety <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Use <strong>Edit patient</strong> for demographics, conditions, monitored tools, caregiver details, and chart notes. Use <strong>Change status</strong> for the care status. A Verify badge means the primary condition was inferred and needs confirmation.</li>
          <li>Use the visit form’s safety checkbox or <strong>Raise safety flag</strong> to flag a concern. An active flag pins the patient on the registry. Use <strong>Acknowledge</strong> on the banner when appropriate.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>📝 Visits, scores, and notes <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Open <strong>Log visit</strong> and choose a visit with scores or a visit without a score. Enter the date and the applicable scores. A visit without a score requires a note. Use <strong>Log score only</strong> to add a score without logging a visit.</li>
          <li>Use the pencil to correct an entry. The chart shows the recorded author and marks actual edits. <strong>Show full note</strong> appears when the note is clipped.</li>
          <li>In English mode on supported desktop browsers, <strong>Translate Spanish notes</strong> translates patient summary, therapist contact, visit, medication and correction notes. <strong>Show original</strong> reveals the saved text. The preference applies across charts in this browser.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>📊 Completing and sharing questionnaires <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Open a tool from <strong>Complete tool</strong> for use with the patient. Select the share button to copy a caregiver or teacher link when available. To share several tools, select the questionnaires and choose <strong>Copy selected</strong>.</li>
          <li>PSC-17 is the one-time initial screening. Use the chart’s score controls to record results.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>💊 Medication history <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Choose <strong>+ Medication</strong> to log an entry. Pick the stocked tablet strength or <strong>Other (specify)</strong>. Enter the prescribed dose and frequency for active entries unless managed by an outside provider. The arrows move by half a tablet. For <strong>Daily</strong>, add the timing in Notes. Select PRN when applicable.</li>
          <li>On the active entry, use <strong>Update</strong> to Continue, Increase, Decrease, or Hold. Use <strong>Stop</strong> to discontinue. Each adds a dated entry. Both reports use the latest regimen and exclude held or stopped medications.</li>
          <li>Use the pencil to correct a recorded action or other entry details. Use <strong>Correct entry</strong> to resolve ambiguous or combined entries while preserving history. The prescriber and the person who logged the entry are displayed separately.</li>
        </ul>
      </details>
      <details class="howto-sub">
        <summary>📋 CoCM tracking and feedback <span class="howto-chevron">▾</span></summary>
        <ul>
          <li>Use <strong>Edit</strong> or <strong>Today</strong> in CoCM tracking to record a psychiatric review or therapist contact. Flag a patient for discussion at the next case review when needed.</li>
          <li>Use <strong>Suggestions / Report a problem</strong> to report issues or request improvements.</li>
        </ul>
      </details>`,
  },
  howto_suggestions_body: {
    es: '<ul><li><strong>Su nombre</strong>: escríbalo arriba (texto libre).</li><li><strong>Categoría</strong>: elija error, función nueva, dato incorrecto, flujo, o contenido/traducción.</li><li><strong>Prioridad</strong>: Normal para la mayoría. Alta solo si bloquea el trabajo clínico.</li><li><strong>Descripción</strong>: detalle qué pasó, qué esperaba, y cómo reproducirlo.</li><li><strong>Captura</strong> (opcional): adjunte una imagen — se sube a Google Drive al enviar.</li><li>Las sugerencias recientes aparecen abajo con su estado (abierta / cerrada).</li></ul>',
    en: '<ul><li><strong>Your name</strong>: type it at the top (free text).</li><li><strong>Category</strong>: pick bug, new feature, data issue, workflow, or content/translation.</li><li><strong>Priority</strong>: Normal for most things. High only if it blocks clinical work.</li><li><strong>Description</strong>: describe what happened, what you expected, and how to reproduce it.</li><li><strong>Screenshot</strong> (optional): attach an image — it uploads to Google Drive on submit.</li><li>Recent suggestions appear below with their status (open / closed).</li></ul>'
  },

  // ── topbar / general ───────────────────────────────────────
  title_registry: { es: 'CoCM Camasca — Registro', en: 'CoCM Camasca — Registry' },
  subtitle_registry: { es: 'Panel clínico · Monitoreo longitudinal', en: 'Clinical dashboard · Longitudinal monitoring' },
  data_source: { es: 'Fuente de datos:', en: 'Data source:' },
  configure: { es: 'Configurar', en: 'Configure' },
  reload: { es: 'Recargar', en: 'Reload' },
  suggestions: { es: 'Sugerencias', en: 'Suggestions' },
  notice: { es: 'Aviso:', en: 'Notice:' },
  notice_text: {
    es: 'Este registro es una herramienta clínica interna. Toda información es confidencial y debe manejarse según políticas locales de protección de datos.',
    en: 'This registry is an internal clinical tool. All information is confidential and must be handled per local data protection policies.'
  },

  // ── modals ─────────────────────────────────────────────────
  modal_config_title: { es: 'Configurar fuente de datos', en: 'Configure data source' },
  modal_config_body: { es: 'El panel necesita leer del Google Sheet. Elija uno de los dos métodos:', en: 'The dashboard needs to read from the Google Sheet. Choose one of two methods:' },
  modal_config_opt1: { es: 'Opción 1 — Apps Script (recomendado)', en: 'Option 1 — Apps Script (recommended)' },
  modal_config_opt1_desc: { es: 'Permite lecturas y escrituras. Pegue la URL del Web App desplegado:', en: 'Enables reads and writes. Paste the deployed Web App URL:' },
  modal_config_opt2: { es: 'Opción 2 — CSV publicado (solo lectura)', en: 'Option 2 — Published CSV (read-only)' },
  modal_config_opt2_desc: { es: 'En el Sheet, use Archivo › Compartir › Publicar en la web › CSV. Pegue la URL base (sin &gid):', en: 'In the Sheet, use File › Share › Publish to web › CSV. Paste the base URL (without &gid):' },
  modal_config_default: { es: 'Sin configurar, el panel usa datos de ejemplo (demo).', en: 'Without configuration, the dashboard uses demo data.' },

  // ── Display preferences (feature flags) ──
  display_prefs_title: { es: 'Preferencias de visualización', en: 'Display preferences' },
  display_prefs_hint:  { es: 'Active o desactive campos para simplificar el panel. Los datos siguen guardándose en el Sheet aunque estén ocultos aquí.', en: 'Toggle fields to simplify the dashboard. Data still saves to the Sheet even if hidden here.' },
  simplified_mode_label: { es: 'Modo simplificado', en: 'Simplified mode' },
  simplified_mode_desc:  { es: 'Oculta columnas avanzadas (tendencia, Δ, condiciones, fecha de ingreso, base). Útil para equipos que recién comienzan.', en: 'Hides advanced columns (trend, Δ, conditions, enrollment date, baseline). Useful for teams just starting out.' },
  feat_psych_consult:   { es: 'Fecha de última consulta psiquiátrica', en: 'Last psychiatric consult date' },
  feat_bhcm_contact:    { es: 'Fecha de último contacto del terapeuta', en: 'Last therapist contact date' },
  feat_review_flag:     { es: 'Marcar pacientes para revisión', en: 'Flag patients for review' },
  feat_enrollment:      { es: 'Fecha de ingreso al CoCM', en: 'CoCM enrollment date' },
  feat_baseline:        { es: 'Puntaje basal en tabla principal', en: 'Baseline score on main table' },
  feat_trend:           { es: 'Línea de tendencia (sparkline)', en: 'Trend line (sparkline)' },
  feat_delta:           { es: 'Columna Δ vs. basal', en: 'Δ vs. baseline column' },
  feat_conditions:      { es: 'Columna de condiciones', en: 'Conditions column' },
  feat_due_review:      { es: 'Alerta automática de consulta vencida', en: 'Auto “psych review overdue” alert' },

  // ── Patient detail edit prompts ──
  psych_consult_section: { es: 'Seguimiento CoCM', en: 'CoCM tracking' },
  psych_consult_label:   { es: 'Última consulta psiq.', en: 'Last psych review' },
  bhcm_contact_label:    { es: 'Último contacto de terapeuta', en: 'Last therapist contact' },
  last_contact_label:    { es: 'Último contacto del terapeuta', en: 'Last therapist contact' },
  last_contact_by:       { es: 'por', en: 'by' },
  bhcm_contact_note_label: { es: 'Nota de contacto', en: 'Contact note' },
  review_flag_label:     { es: 'Marcar para revisión en la próxima reunión', en: 'Flag for next case review' },
  edit:                  { es: 'Editar', en: 'Edit' },
  clear:                 { es: 'Limpiar', en: 'Clear' },
  today_btn:             { es: 'Hoy', en: 'Today' },
  psych_consult_prompt:  { es: 'Fecha de última consulta psiquiátrica (YYYY-MM-DD). Dejé vacío para limpiar:', en: 'Last psych consult date (YYYY-MM-DD). Leave blank to clear:' },
  bhcm_contact_prompt:   { es: 'Fecha del último contacto del terapeuta (YYYY-MM-DD):', en: 'Last therapist contact date (YYYY-MM-DD):' },
  bhcm_contact_note_prompt: { es: 'Nota breve del contacto (opcional):', en: 'Short contact note (optional):' },
  enrolled_on:           { es: 'Ingresó: {date}', en: 'Enrolled: {date}' },
  weeks_suffix:          { es: 'sem', en: 'wk' },
  modal_addme_title: { es: 'Agregarme al equipo', en: 'Add me to the team' },
  modal_addme_role: { es: 'Rol', en: 'Role' },
  role_therapist: { es: 'Terapeuta', en: 'Therapist' },
  role_psychiatrist: { es: 'Psiquiatra', en: 'Psychiatrist' },
  role_other: { es: 'Otro', en: 'Other' },
  modal_addme_add: { es: 'Agregar', en: 'Add' },
  modal_newpat_title: { es: 'Nuevo paciente', en: 'New patient' },
  modal_newpat_min_hint: { es: 'Solo el nombre es obligatorio. Puede completar el resto después.', en: 'Only the name is required. You can fill in the rest later.' },
  modal_visit_title: { es: 'Registrar visita', en: 'Log visit' },
  modal_med_title: { es: 'Registrar medicamento', en: 'Log medication' },
  modal_status_title: { es: 'Cambiar estado', en: 'Change status' },
  modal_status_prompt: { es: 'Seleccione el nuevo estado:', en: 'Select new status:' },
  modal_safety_title: { es: 'Marcar bandera de seguridad', en: 'Raise safety flag' },
  modal_safety_reason_ph: { es: 'Describa brevemente la preocupación…', en: 'Briefly describe the concern…' },
};

// ── runtime helpers ───────────────────────────────────────────
function getLang() {
  return document.documentElement.getAttribute('data-lang') || 'es';
}

function t(key, vars) {
  const entry = REG_I18N[key];
  if (!entry) return key; // return key for quick-debug
  let s = entry[getLang()] || entry.es;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return s;
}

// Translate a status value coming from the sheet (ES canonical)
function translateStatus(v) {
  if (!v) return '';
  const map = {
    'Activo': 'status_activo',
    'Active': 'status_activo',
    'Estable': 'status_estable',
    'Stable': 'status_estable',
    'Prioridad Baja': 'status_baja',
    'Inactivo': 'status_inactivo',
    'Transferido': 'status_transfer',
    'Otro': 'status_otro',
    'Other': 'status_otro',
  };
  const key = map[v];
  return key ? t(key) : v;
}

const REG_STANDARD_STATUSES = Object.freeze(['Inactivo', 'Activo', 'Estable', 'Transferido']);

function statusDescription(v) {
  const key = {
    Activo: 'status_activo_desc',
    Active: 'status_activo_desc',
    Estable: 'status_estable_desc',
    Stable: 'status_estable_desc',
    Inactivo: 'status_inactivo_desc',
    Transferido: 'status_transfer_desc',
    Otro: 'status_otro_desc',
    'Prioridad Baja': 'status_baja_desc',
  }[v];
  return t(key || 'status_otro_desc');
}

function isOtherStatus(v) {
  const value = String(v || '').trim();
  return !!value && !REG_STANDARD_STATUSES.includes(value) && !['Active', 'Stable'].includes(value);
}

// Show the same status explanations wherever a status is selected. The original
// select remains the source of truth for existing filters and save handlers.
function setupDetailedStatusPicker(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;
  let picker = select.nextElementSibling;
  if (!picker || !picker.classList.contains('detailed-status-picker')) {
    picker = document.createElement('details');
    picker.className = 'detailed-status-picker';
    picker.dataset.statusPickerFor = selectId;
    const summary = document.createElement('summary');
    const menu = document.createElement('div');
    menu.className = 'detailed-status-menu';
    picker.append(summary, menu);
    select.insertAdjacentElement('afterend', picker);
    picker.addEventListener('toggle', () => {
      if (picker.open) menu.scrollTop = 0;
    });
    picker.addEventListener('keydown', event => {
      if (event.key === 'Escape' && picker.open) {
        picker.open = false;
        summary.focus();
      }
    });
    select.addEventListener('change', () => setupDetailedStatusPicker(selectId));
  }
  select.hidden = true;
  const detailsFor = value => {
    const special = {
      active: ['status_activo', 'status_activo_desc'],
      all: ['filter_all', 'filter_all_desc'],
      safety: ['status_safety', 'status_safety_desc'],
      brigade: ['status_brigade', 'status_brigade_desc'],
      due_followup: ['status_due_followup', 'status_due_followup_desc'],
    }[value];
    return special
      ? { label: t(special[0]), description: t(special[1]) }
      : { label: translateStatus(value), description: statusDescription(value) };
  };
  const summary = picker.querySelector('summary');
  const selected = detailsFor(select.value);
  const selectedLabel = document.createElement('span');
  selectedLabel.className = 'detailed-status-label';
  selectedLabel.textContent = selected.label;
  const selectedDescription = document.createElement('span');
  selectedDescription.className = 'detailed-status-description';
  selectedDescription.textContent = selected.description;
  summary.replaceChildren(selectedLabel, selectedDescription);
  summary.setAttribute('aria-label', `${getLang() === 'en' ? 'Status' : 'Estado'}: ${selected.label}. ${selected.description}`);
  const menu = picker.querySelector('.detailed-status-menu');
  const choices = Array.from(select.options).map(option => {
    const { label, description } = detailsFor(option.value);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'detailed-status-choice';
    button.setAttribute('aria-pressed', String(option.value === select.value));
    const name = document.createElement('span');
    name.className = 'detailed-status-label';
    name.textContent = label;
    const hint = document.createElement('span');
    hint.className = 'detailed-status-description';
    hint.textContent = description;
    button.append(name, hint);
    button.addEventListener('click', () => {
      select.value = option.value;
      picker.open = false;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      summary.focus();
    });
    return button;
  });
  menu.replaceChildren(...choices);
}

// Translate a medication Action value coming from the sheet (mixed ES).
// Normalizes case/accents for lookup so 'Inicio'/'inicio'/'INICIO' all map correctly.
function translateMedAction(v) {
  if (!v) return '';
  const norm = String(v).trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const map = {
    'inicio':       'med_action_inicio',
    'iniciar':      'med_action_iniciar',
    'start':        'med_action_inicio',
    'ajuste':       'med_action_ajuste',
    'adjust':       'med_action_ajuste',
    'titular':      'med_action_titular',
    'titulacion':   'med_action_titulacion',
    'titrate':      'med_action_titular',
    'increase':     'med_increase',
    'aumentar':     'med_increase',
    'decrease':     'med_decrease',
    'disminuir':    'med_decrease',
    'continuar':    'med_action_continuar',
    'continuacion': 'med_action_continuacion',
    'continue':    'med_action_continuar',
    'suspension':   'med_action_suspension',
    'suspender':    'med_action_suspender',
    'hold':         'med_action_hold',
    'descontinuar': 'med_action_descontinuar',
    'stop':         'med_action_stop',
    'cambio':       'med_action_cambio',
    'change':       'med_action_cambio',
  };
  const key = map[norm];
  return key ? t(key) : v;
}

// Translate a tier label coming from the registry logic (ES canonical)
function translateTier(v) {
  if (!v) return '';
  const map = {
    'Severa': 'tier_severa',
    'Moderada': 'tier_moderada',
    'Leve': 'tier_leve',
    'Remisión': 'tier_remision',
    'Sin datos': 'tier_sin_datos',
  };
  const key = map[v];
  return key ? t(key) : v;
}

// Translate a data mode label
function translateMode(v) {
  const map = { demo: 'mode_demo', appsscript: 'mode_appsscript', csv: 'mode_csv' };
  return map[v] ? t(map[v]) : v;
}

// Translate sex short codes
function translateSex(v) {
  if (!v) return '—';
  const map = { F: 'sex_f', M: 'sex_m', O: 'sex_o' };
  return map[v] ? t(map[v]) : v;
}

// ── Toast / Undo helpers (shared across pages) ────────────────
// Usage: showToast('Saved', { undo: () => {...}, variant: 'success' })
function showToast(message, opts = {}) {
  let host = document.getElementById('regToastHost');
  if (!host) {
    host = document.createElement('div');
    host.id = 'regToastHost';
    host.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:10px;align-items:center;pointer-events:none;';
    document.body.appendChild(host);
  }
  const toast = document.createElement('div');
  const variant = opts.variant || 'info';
  const bg = variant === 'error'   ? 'var(--color-error)'
           : variant === 'warn'    ? 'var(--color-warning)'
           : variant === 'success' ? 'var(--color-success)'
           :                         'var(--color-text)';
  toast.style.cssText = `background:${bg};color:white;padding:10px 16px;border-radius:var(--radius-md);font-size:var(--text-sm);display:flex;gap:12px;align-items:center;box-shadow:0 4px 20px rgba(0,0,0,0.2);pointer-events:auto;max-width:90vw;`;
  toast.innerHTML = `<span>${message}</span>`;
  if (opts.undo) {
    const btn = document.createElement('button');
    btn.textContent = t('action_undo');
    btn.style.cssText = 'background:rgba(255,255,255,0.25);color:white;border:none;padding:4px 12px;border-radius:var(--radius-sm);font-weight:600;font-size:var(--text-xs);cursor:pointer;';
    btn.onclick = () => { opts.undo(); dismiss(); };
    toast.appendChild(btn);
  }
  if (opts.retry) {
    const btn = document.createElement('button');
    btn.textContent = t('action_retry');
    btn.style.cssText = 'background:rgba(255,255,255,0.25);color:white;border:none;padding:4px 12px;border-radius:var(--radius-sm);font-weight:600;font-size:var(--text-xs);cursor:pointer;';
    btn.onclick = () => { opts.retry(); dismiss(); };
    toast.appendChild(btn);
  }
  const x = document.createElement('button');
  x.textContent = '×';
  x.style.cssText = 'background:transparent;color:white;border:none;font-size:18px;line-height:1;cursor:pointer;padding:0 4px;';
  x.onclick = () => dismiss();
  toast.appendChild(x);
  host.appendChild(toast);
  let done = false;
  function dismiss() {
    if (done) return; done = true;
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.2s';
    setTimeout(() => toast.remove(), 250);
  }
  const duration = opts.duration != null ? opts.duration : (opts.undo || opts.retry ? 10000 : 4000);
  setTimeout(dismiss, duration);
  return dismiss;
}

/* ============================================================
   Text-size adjustment (A− / A+) — shared across registry pages.
   Persists in localStorage under 'coCMCamasca.textScale'.
   Applied as `zoom: var(--reg-scale)` on .app-layout.no-sidebar.
   ============================================================ */
const REG_SCALE_KEY = 'coCMCamasca.textScale';
const REG_SCALE_STEPS = [0.85, 0.92, 1.0, 1.08, 1.17, 1.27, 1.38];

function getCurrentScale() {
  const raw = parseFloat(localStorage.getItem(REG_SCALE_KEY));
  return isFinite(raw) && raw > 0 ? raw : 1;
}
function applyCurrentScale() {
  const s = getCurrentScale();
  document.documentElement.style.setProperty('--reg-scale', s);
}
function adjustTextSize(delta) {
  const current = getCurrentScale();
  // find nearest step index
  let idx = 0;
  let best = Infinity;
  REG_SCALE_STEPS.forEach((v, i) => {
    const d = Math.abs(v - current);
    if (d < best) { best = d; idx = i; }
  });
  const nextIdx = Math.max(0, Math.min(REG_SCALE_STEPS.length - 1, idx + (delta > 0 ? 1 : -1)));
  const next = REG_SCALE_STEPS[nextIdx];
  localStorage.setItem(REG_SCALE_KEY, String(next));
  applyCurrentScale();
}
// Apply on load (before any rendering) so no flash of default size.
try { applyCurrentScale(); } catch (e) {}
document.addEventListener('DOMContentLoaded', applyCurrentScale);
