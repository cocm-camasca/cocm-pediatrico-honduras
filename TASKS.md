# Tasks - cocm-pediatrico-honduras

## Status Key
- [ ] Not started
- [~] In progress
- [x] Complete
- [!] Blocked - include reason in parentheses

## Active Tasks
- [~] Keep CoCM on a no-code maintenance / verification track unless a specific production need is identified.
- [~] Confirm live serving chain: Cloudflare Access -> Cloudflare proxy/DNS -> GitHub Pages -> browser JS -> Apps Script -> Google Sheets.
- [~] Verify `registry.cocm-camasca.org/_registro-wip/registro.html` stops serving stale `registro-app.js?v=85d5c82` and picks up the published mobile-label fix at `419edac`.

## Upcoming
- [ ] Re-check Apps Script deployment facts: active `/exec` URL, deployment mode, current version.
- [ ] Verify whether `REG_DEFAULT_APPS_SCRIPT_URL` in `_registro-wip/registro-data.js` matches the active Apps Script deployment.
- [ ] Verify whether known `Medicamentos` column drift is still unresolved.
- [ ] Verify whether `Visitas_Test` is still missing `Entry_Type`.
- [ ] Verify whether `Pacientes_Test` still has the `Caregiver_Phone` / `Review_Flag_Note` column-order swap.
- [ ] Verify `Subscale_Score` vs `Subscale_Scores` naming across front end, Apps Script, and Sheet header.
- [ ] Decide on Cloudflare Pages migration.
- [ ] Decide whether Drive folder per patient is still desired.
- [ ] Update audit/help text in `registro-i18n.js` for patient page med Edit button and Suggestions section.
- [ ] Resolve `_registro-wip/_headers` anomaly.
- [ ] Review undocumented `make_placeholders.py`.
- [ ] Verify the pediatric psychometric `TOOL_URLS` map against root scoring files and external `*-ext.html` variants.
- [ ] Verify PSC-17 patient-creation share-message behavior and copy output.
- [ ] Clinically recheck pediatric screening thresholds, age routing, bilingual labels, and follow-up guidance.

## Completed (last 30 days)
- [x] Provisioned Nelson as an active therapist across Cloudflare Access, `AuthorizedUsers`, and the active `Config` team list; all three states were verified.
- [x] Documented the full registry-user access-provisioning workflow, including required identity/role information, Cloudflare Access, `AuthorizedUsers`, and role-based `Config` team rows.
- [x] Fixed the protected registry mobile-card label rendering so translated header strings with `<br>` no longer appear as literal `<BR>` text on phone-sized views.
- [x] Read-only audit confirmed local repo was clean on `main` and matched `origin/main` at `365900f2327311f92c9d9328691fa772b486ce73`.
- [x] Repo-level evidence matched Cloudflare Access and Apps Script assumptions documented in Notion.
- [x] Documented rollback model across GitHub, Cloudflare, Apps Script, and Google Sheets.
- [x] Confirmed `_registro-wip/` as the working directory correction.
- [x] Fixed the `_registro-wip/registro-paciente.js` `Visit + Score` recursion bug caused by the exported `addVisitToolRow` wrapper calling itself.
- [x] Synced `_registro-wip/registro-paciente.html` asset query strings from stale `20e55f1` values to `85d5c82`.
- [x] Filtered blank live `Sugerencias` rows before rendering and normalized open-status handling for values such as `Nuevo`.
- [x] Published and protected-host retested the patient-page stability fixes for visit dialogs, score-only modal reset, and score-trend/history controls.

## Backlog
- [ ] Fix Aurora/Auora patient name typo via Edit Patient UI when safely accessing that record.
- [ ] Audit `Auditoria` for any client writes that attempted fields dropped by schema drift.
- [ ] Keep token/domain expiry tracking current outside of code changes.
