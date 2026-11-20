# Worklog

This file records completed Codex work sessions for CoCM Pediatric Honduras Registry. Append new entries during the shutdown routine so future sessions can resume without prior chat context.

---

## Entry Format

    ### YYYY-MM-DD - [machine/profile] - [session summary]
    - Completed: ...
    - In progress: ...
    - Blockers/notes: ...

### 2026-08-25 - Codex desktop - Complete Jennifer Farmer registry access
- Completed: Confirmed Jennifer Farmer, MD already had active psychiatrist records in `AuthorizedUsers` and the active `Config` team list, but was missing from the Cloudflare `Authorized Clinicians` policy.
- Completed: Added `jenniferbfarmer@gmail.com` to that policy using the verified `cocm.camasca@gmail.com` Cloudflare account; reloaded the policy and confirmed the saved membership.
- Blockers/notes: No patient records or registry application code changed. This completes the current three-part registry access configuration; Jennifer's own successful sign-in was not tested.

### 2026-08-25 - Codex desktop - Provision Nelson as registry therapist
- Completed: Verified the signed-in Cloudflare account was `cocm.camasca@gmail.com`, then added `nelsonenriquereyesramos419@gmail.com` to the `Authorized Clinicians` policy for the `CoCM Camasca Registry` application and confirmed the saved policy includes the address.
- Completed: Added an active `AuthorizedUsers` row for Nelson with role `therapist`, date `2026-08-25`, and the authorized operator record; added an active bilingual `Config` team row so Nelson appears in therapist-based registry lists.
- Completed: Verified the two Sheet rows through connector readback and the rendered Google Sheet without accessing patient records.
- Blockers/notes: No application code or patient records changed. Nelson's own successful sign-in was not tested because it requires his Google account.

### 2026-07-16 - Codex desktop - Durable registry access-provisioning procedure
- Completed: Added a canonical procedure for provisioning registry users across Cloudflare Access, the Google Sheet `AuthorizedUsers` tab, and the role-based `Config` team list.
- Completed: Added required-information and clarification rules so a future session asks for the Google email, display name, and role instead of guessing.
- Completed: Provisioned Angus Bennett, MD as an active psychiatrist in `AuthorizedUsers` and in the active `Config` clinical team list; both rows were verified after writing.
- Blockers/notes: No application code changed. Cloudflare Access had already been granted earlier in this task; the Sheet entries complete the Apps Script authorization and psychiatrist-dropdown setup.

### 2026-05-22 - Codex desktop - Beginner-friendly repo communication preference
- Completed: Added `AGENTS.md` Owner Communication guidance so future Codex sessions explain Git, GitHub, GitHub Desktop, Codex workspace behavior, local-vs-remote state, commits, pushes, pulls, branches, and deployments with extra beginner-friendly context.
- Completed: Documented that explanations should define concepts, distinguish local files from pushed/deployed changes, and use exact paths/button names when Dr. Fowler is operating tools manually.
- In progress: Existing CoCM registry production tasks remain unchanged.
- Blockers/notes: Instruction-only change; no app runtime code changed and no production behavior changed.

### 2026-05-22 - Codex desktop - Workflow streamlining preference
- Completed: Updated repo instructions so future Codex sessions proactively surface opportunities to streamline Dr. Fowler's workflow, including expected benefit, risk/cost, and smallest safe next step.
- In progress: Existing CoCM registry production tasks remain unchanged.
- Blockers/notes: Instruction-only change; no app runtime code changed and no production behavior changed.

### 2026-06-10 - Codex desktop - Visit dialog and suggestions stability pass
- Completed: Re-ran startup checks on clean `main`, pulled `--ff-only`, and captured current rollback evidence from GitHub SHA, Cloudflare Access-protected host behavior, Apps Script URL/version note in `_registro-wip/registro-data.js`, and the front-end schema definitions for `Pacientes`, `Visitas`, and `Sugerencias`.
- Completed: Fixed the patient-page `Visit + Score` recursion path by separating the local add-row implementation from the exported `window.addVisitToolRow` wrapper in `_registro-wip/registro-paciente.js`.
- Completed: Synced `_registro-wip/registro-paciente.html` asset query strings to `85d5c82` so the patient page no longer points at the stale `20e55f1` JS/CSS bundle.
- Completed: Hardened `_registro-wip/registro-sugerencias.html` to drop blank suggestion rows before sorting/rendering and to treat `Nuevo`/`open`/blank status values as open-state items.
- In progress: Post-push production retest is still needed on the protected host to confirm the live patient page loads the updated asset bundle and the live suggestions list no longer shows placeholder rows.
- Blockers/notes: Local static preview could load the pages, but Apps Script-backed registry flows did not fully initialize off-host, so full browser verification of the registry interaction remains pending a published deployment on the protected domain.

### 2026-06-22 - Codex desktop - Score-only modal save-button reset
- Completed: Reproduced a live patient-page issue where the `Log score only` modal reopened with the save button stuck on `Saving…` after a prior successful score submission.
- Completed: Reset `scoreSaveBtn` on score-modal open/close in `_registro-wip/registro-paciente.js` so the modal does not inherit disabled text state from the previous submission.
- Completed: Bumped `_registro-wip/registro-paciente.html` patient-page asset query strings to `20260622c` so the protected host loads the updated modal-reset logic.
- In progress: Live retest is needed after push to confirm repeated `Log score only` opens work without a page refresh.
- Blockers/notes: This is a state-reset bug in the reused modal container, not a write-path failure in Apps Script or Sheets.

### 2026-06-22 - Codex desktop - Patient score trends and history-card score action
- Completed: Fixed `_registro-wip/registro-paciente.js` so `Trends by tool` can render from actual scored visit history even when a patient record's `Tools` field is blank or incomplete.
- Completed: Tightened trend-card scoring logic to ignore non-numeric or blank score rows when computing baseline, latest score, and sparklines.
- Completed: Added a second `Log score only` action to the visit/score history card and bumped `_registro-wip/registro-paciente.html` asset query strings to `20260622d`.
- In progress: Protected-host retest is needed after push to confirm the live page shows PHQ-A/GAD-7 trend cards for affected patients and the new history-card button opens the score-only modal correctly.
- Blockers/notes: Live verification depends on the Cloudflare Access-protected production host because local static loads do not exercise the Apps Script-backed patient data path.

### 2026-06-22 - Codex desktop - Protected-host verification of patient-page trend fix
- Completed: Pushed `main` to GitHub at `4ed859b` and confirmed the protected patient page loaded `style.css`, `registro-i18n.js`, `registro-data.js`, and `registro-paciente.js` with the new `?v=20260622d` asset versions.
- Completed: Verified on `https://registry.cocm-camasca.org/_registro-wip/registro-paciente.html?id=CCM-0051` that `Trends by tool` now renders PHQ-A and GAD-7 cards with sparklines derived from the existing score-only history rows.
- Completed: Verified the visit/score history card now shows both `📊 Log score only` and `+ Log visit` actions on the live protected host.
- In progress: No additional maintenance-request work remains from this turn unless a new patient-specific visualization edge case appears during user testing.
- Blockers/notes: This verification used the protected host directly after a cache-busted reload because Cloudflare Access and GitHub Pages caching can otherwise preserve older patient-page HTML.

### 2026-06-22 - Codex desktop - Trend-point hover details
- Completed: Updated `_registro-wip/registro-paciente.js` so each trend-point dot carries a native hover/focus tooltip showing that point's date and score.
- Completed: Added a larger invisible hover target around each dot so the tooltip is easier to trigger with a mouse without changing the visible chart design.
- Completed: Bumped `_registro-wip/registro-paciente.html` patient-page asset query strings to `20260622e` for the tooltip change.
- In progress: Protected-host retest is needed after push to confirm live chart points expose the expected date-and-score tooltip text.
- Blockers/notes: This is a front-end-only chart affordance change; it does not alter Apps Script writes or Google Sheet data.

### 2026-06-22 - Codex desktop - Protected-host verification of trend-point tooltips
- Completed: Pushed `main` to GitHub at `528772e` and confirmed the protected patient page loaded `style.css`, `registro-i18n.js`, `registro-data.js`, and `registro-paciente.js` with the new `?v=20260622e` asset versions.
- Completed: Verified on `https://registry.cocm-camasca.org/_registro-wip/registro-paciente.html?id=CCM-0051` that PHQ-A and GAD-7 trend points now expose date-and-score tooltip text such as `2026-06-22 · Score 9` and `2026-06-22 · Score 20`.
- Completed: Reconfirmed the patient page finished loading without console warnings or errors during this tooltip retest.
- In progress: No additional work remains from this tooltip request unless user testing shows the native hover behavior needs a custom styled tooltip instead.
- Blockers/notes: The tooltip text is implemented with native SVG `title` elements, which is the lowest-risk option for this protected production page and depends on the browser's default hover rendering.

### 2026-06-22 - Codex desktop - Tooltip affordance cleanup
- Completed: Removed the trend-point focusable/clickable wrapper state so clicking a chart dot no longer produces an unnecessary focus outline.
- Completed: Removed the help-cursor behavior from trend points while keeping the native hover tooltip text in place.
- Completed: Added a bilingual `Trends by tool` hover hint that renders only when the card contains actual plotted point data, then bumped patient-page assets to `20260622f`.
- In progress: Protected-host retest is needed after push to confirm the live page no longer shows focus-outline/help-cursor behavior on dots and only shows the hover hint when point data exists.
- Blockers/notes: This is a UI affordance cleanup only; it does not change patient data, score math, or chart ordering.

### 2026-06-22 - Codex desktop - Protected-host verification of tooltip cleanup
- Completed: Pushed `main` to GitHub at `c989a72` and confirmed the protected patient page loaded `style.css`, `registro-i18n.js`, `registro-data.js`, and `registro-paciente.js` with the new `?v=20260622f` asset versions.
- Completed: Verified on `https://registry.cocm-camasca.org/_registro-wip/registro-paciente.html?id=CCM-0051` that trend-point wrappers no longer render `tabindex` or `cursor:help`, so the prior click-outline/help-cursor behavior is gone.
- Completed: Verified the live `Trends by tool` header now includes the hover hint on a patient with actual plotted trend data, and the point tooltip text remains intact.
- In progress: The no-data branch was implemented in code but not separately exercised against a second live patient record during this pass.
- Blockers/notes: This retest used the protected host directly after a cache-busted reload and inspected the rendered DOM to confirm the removed focus/help affordances.

### 2026-06-22 - Codex desktop - Medication reason checkbox cleanup
- Completed: Updated the patient-page medication modal so the reason checkboxes always include Anxiety, Depression, ADHD, and PTSD in a fixed clinical order.
- Completed: Preserved the existing patient-specific fallback logic by appending additional nonstandard condition labels, such as custom “other” diagnoses, after the standard reason options.
- Completed: Kept the separate free-text medication reason input and bumped patient-page asset query strings to `20260622g`.
- In progress: Protected-host retest is needed after push to confirm the live `Log medication` modal shows the corrected checkbox list for affected patients.
- Blockers/notes: This change only affects the add-medication modal; edit-medication remains a free-text reason field as before.

### 2026-06-22 - Codex desktop - Protected-host verification of medication reason options
- Completed: Pushed `main` to GitHub at `62dd106` and confirmed the protected patient page loaded `style.css`, `registro-i18n.js`, `registro-data.js`, and `registro-paciente.js` with the new `?v=20260622g` asset versions.
- Completed: Verified in the live `Log medication` modal on `https://registry.cocm-camasca.org/_registro-wip/registro-paciente.html?id=CCM-0051` that the reason checkboxes now render `Anxiety`, `Depression`, `ADHD`, and `PTSD` first.
- Completed: Verified that patient-specific nonstandard conditions are still appended afterward for this record (`on`, `Test Dx`) and that the `Additional reason (optional)` free-text box remains in place.
- In progress: No additional work remains from this medication-reason request unless the custom-condition fallback should be narrowed further.
- Blockers/notes: This retest used the protected live modal directly and confirmed there were no console warnings or errors during the modal open.

### 2026-06-22 - Codex desktop - Suppress test diagnosis med-reason fallback
- Completed: Narrowed the add-medication reason-checkbox fallback so placeholder test labels such as `Test Dx` are excluded while other patient-specific custom diagnoses still remain eligible.
- Completed: Kept the standard `Anxiety`, `Depression`, `ADHD`, and `PTSD` reason options unchanged and bumped patient-page assets to `20260622h`.
- In progress: Protected-host retest is needed after push to confirm the live `Log medication` modal now shows `on` without the `Test Dx` checkbox on this patient.
- Blockers/notes: This change is intentionally narrow and does not alter the patient condition display elsewhere on the page.

### 2026-06-22 - Codex desktop - HTML-side medication reason sanitizer
- Completed: Added a tiny patient-page HTML sanitizer that removes `Test Dx` from the add-medication reason checkbox list after the modal form renders.
- Completed: Bumped patient-page asset URLs to `20260622i` so the protected host is forced onto a fresh HTML/JS bundle for this medication-modal fix.
- In progress: Protected-host retest is needed after push to confirm the live modal now shows the standard four reasons plus `on`, without `Test Dx`.
- Blockers/notes: This HTML-side safeguard is intentionally narrow and only touches the add-medication checkbox list; it does not change the patient header’s condition display.

### 2026-06-22 - Codex desktop - Protected-host verification of test-dx suppression
- Completed: Pushed `main` to GitHub at `d6e3284` and rechecked the protected `Log medication` modal on `https://registry.cocm-camasca.org/_registro-wip/registro-paciente.html?id=CCM-0051`.
- Completed: Verified the visible medication-reason checkbox list now shows `Anxiety`, `Depression`, `ADHD`, `PTSD`, and `on`, with `Test Dx` removed.
- Completed: Verified the `Additional reason (optional)` free-text field remains available and there were no console warnings or errors during the modal retest.
- In progress: The protected host was still advertising the earlier `20260622h` asset URLs during this retest, but the published sanitizer logic was already affecting the rendered modal output correctly.
- Blockers/notes: This fix removes `Test Dx` only from the add-medication reason checkbox list; it does not remove `Test Dx` from the patient header’s conditions display.

### 2026-06-22 - Codex desktop - Registry mobile label sanitization
- Completed: Reproduced on the protected live registry mobile view that card labels such as `Latest<BR>score`, `Last<BR>visit`, `Last therapist<BR>contact`, and `Last psych<BR>review` were rendering literal `<BR>` text.
- Completed: Updated `_registro-wip/registro-app.js` to sanitize rendered `td[data-label]` values after the registry table is built so mobile cards receive plain-text labels while desktop table headers keep intentional HTML line breaks.
- Completed: Bumped `_registro-wip/registro.html` to load `registro-app.js?v=20260622j` so the protected host requests the fresh mobile-label fix after publish.
- Completed: Pushed `main` to GitHub at `419edac` and confirmed raw GitHub source now advertises `registro-app.js?v=20260622j`.
- Completed: GitHub Pages API reported the site built commit `419edac9242f958434249168730f8717d671be75` from `main` at `2026-06-23T00:55:42Z`, and a manual Pages rebuild was also queued and completed.
- In progress: Protected-host retest is still needed once the stale served HTML/cache layer stops returning the old `registro-app.js?v=85d5c82` bundle.
- Blockers/notes: Focused mobile review of the current registry tab did not reveal a second low-risk regression that clearly belonged in the same production publish. At shutdown time, both `https://registry.cocm-camasca.org/_registro-wip/registro.html` and its redirected GitHub Pages URL were still serving the stale bundle despite the successful GitHub Pages build, so live browser verification of the visual fix remains blocked on cache propagation or manual cache purge.

### 2026-09-28 - Codex desktop - Patient status labels and search
- Completed: Updated bilingual status labels and meanings across registry filters, quick chips, patient status dialogs/forms, help, and prompts. Therapy only now describes current care without implying prior CoCM participation; the registry defaults to All statuses and the search hint/empty state explain filter scope.
- Completed: Made Other include nonstandard status values and preserved custom values in Change status and Edit patient. Updated the due-follow-up card caption for mixed status cadences. Recorded the pre-change four-layer rollback observations and status glossary in docs/registry-status-labels.md.
- Completed: Fast-forwarded local main to GitHub commit 89a1d5b, ran JavaScript syntax and focused synthetic filter/custom-status checks, and inspected English/Spanish and phone-width local browser previews without writing patient data.
- Completed: Committed and pushed the front-end update as `a0c637c`; GitHub Pages reported a successful build and deployment of that exact commit. The protected domain still redirects unauthenticated requests to Cloudflare Access.
- In progress: Signed-in protected-host smoke verification is pending; no patient data writes were made during release checks.
- Blockers/notes: The active Apps Script version and full Cloudflare policy/cache settings could not be freshly verified from this checkout; the protected browser requires Google sign-in. The three user-supplied screenshot attachments remain untouched and are excluded only in this checkout's .git/info/exclude. The separate patient-page no-visit prompt remains on the backlog.

### 2026-09-29 - Codex desktop - Detailed status choices across registry
- Completed: Dr. Fowler confirmed the first status-label release is visible, then requested the explanatory text in the search status filter and every other status selector. Added one shared detailed picker to the registry search filter, New patient, and Edit patient; Change status already displayed the same descriptions. Quick-filter chips now show the selected explanation and expose descriptions on hover and to assistive technology.
- Completed: Captured the four-layer rollback baseline in docs/registry-status-labels.md. Verified JavaScript syntax and `git diff --check`; used a local browser with synthetic data to check English/Spanish choices, stored-value filtering, new/edit selectors, custom status preservation, and phone/desktop dark-theme layout. No production patient data was written.
- Completed: Committed and pushed the UI update as `e927a61`; GitHub Pages reported a successful build of that exact commit at 2026-09-29 12:02:50 UTC. An unauthenticated check of the protected registry continued to redirect to Cloudflare Access.
- In progress: Dr. Fowler's signed-in live-page review remains.
- Blockers/notes: The protected host requires Google sign-in for agent-side visual verification. Apps Script deployment and Cloudflare console settings were not changed or freshly inspected; Sheet schema is unchanged.

### 2026-09-29 - Codex desktop - Close registry status ticket
- Completed: Dr. Fowler confirmed the live status-label and description update looks good. Matched Nick Ladd's latest registry suggestion `S-0003` to the Active/Therapy only search report, then changed `Sugerencias!H16:K16` to `Resuelto` with a concise resolution note, `Troy Fowler / Codex`, and a UTC resolution time. Readback confirmed all four cells.
- In progress: No further work on `S-0003` remains.
- Blockers/notes: No code or patient data was changed during ticket closure. The connected Sheet was briefly rate-limited before the target row was read; the later read and update succeeded.

### 2026-11-18 - Codex desktop - Medication report clarification and authorized data cleanup
- Completed: Reviewed the feature request and requester email response. The planned report is available to all authorized registry users, generates an on-demand 30-day CSV in the browser, and excludes patients with no chart activity in 12 months. CoCM supplies the medications, so no outside-medication filter is requested for this version.
- Completed: Dr. Fowler clarified that scheduled quantities are calculated normally and an additional PRN option adds 30 tablets per month. Report columns include total distinct patients and distinct PRN patients per medication and strength.
- Completed: Split two owner-specified combined medication entries into separate records in the existing live Sheet, preserved source instructions in record notes, and recorded the changes in Auditoria. Readback and the protected live patient pages confirmed the separate entries. Dr. Fowler subsequently confirmed once-daily fluoxetine for both entries; the saved frequencies and correction notes were updated and read back. Patient identifiers and clinical details are intentionally kept out of repo documentation.
- In progress: Dr. Fowler will check the updated charts before feature implementation. The report must include a concise review-needed section listing each affected patient ID and why medication supply cannot be calculated, including unresolved combined entries and future similar cases.
- Blockers/notes: Feature implementation is awaiting that review. Existing local edits in five registry files and docs/registry-status-labels.md were preserved. The current activity sources and medication-event reconstruction rules still need to be finalized in the implementation plan.

### 2026-11-18 - Codex desktop - Medication supply report implementation
- Completed: Recorded the pre-edit rollback checkpoint. Local main and GitHub main both pointed to 3fee2b5d006aea413c6d32f2158ab13def194c67. Eight existing modified files were present. The protected registry returned HTTP 302 through Cloudflare. The configured Apps Script endpoint and its v2.2 / Version 9 source annotation matched the previous checkpoint. Live row-one headers matched the September schema snapshot for patients, visits and medications in both datasets. Auditoria has Audit_ID, Timestamp, User, Action, Tab, Row_ID, Field, Old_Value and New_Value.
- Completed: Added the bilingual on-demand CSV export to the dashboard. It reads current patient, visit, medication and audit data, reconstructs regimens, counts scheduled and PRN supply, and lists unresolved records by patient ID. Report code loads on demand. The CSV uses the active dataset and marks test data explicitly.
- Completed: Ten synthetic regression checks passed. In Chrome, tested both language buttons and real CSV downloads against a local synthetic relay, confirmed the dashboard filters do not narrow the report, checked the button at phone width, and verified that a failed audit read offers a retry without generating a file. Excel opened both CSVs with the expected quantities and patient counts.
- In progress: Ready for local preview. Publication and a protected-host download check remain pending.
- Completed: Separated the medication report from Suggestions with a divider and a pill icon. Checked both languages at desktop and phone widths and confirmed the icon persists after a CSV download.
- Blockers/notes: The active Apps Script deployment version and Cloudflare dashboard settings were not independently verified. This release uses the existing read interface.

### 2026-11-18 - Codex desktop - Medication supply report release
- Completed: Dr. Fowler reviewed the local preview and authorized publication. Scoped the release to the report, its tests and release notes. Earlier status-label edits remain local.
- Completed: GitHub Pages deployed cfd6f35 successfully (run 44395489868). Verified the button on the signed-in production dashboard and downloaded the dated CSV using the protected test dataset. The file contained the test-data label, totals header and review section. Restored the dashboard to its original Real dataset.
- In progress: Dr. Fowler plans to review the live website.
- Blockers/notes: The release uses the existing Cloudflare, Apps Script and Sheet configuration.

### 2026-11-18 - Codex desktop - Medication reconciliation and history
- Completed: Recorded matching local and remote baseline e6ca2d6, Cloudflare Access redirect, existing Apps Script v2.2/version 9 source annotation and live registry headers. Audited the production medication fields, reconciled one authorized historical entry and verified the separate records and audit rows.
- Completed: Added fixed-origin chart hyperlinks, a bilingual possible duplicate SSRI section and matching chart warning. Added sertraline to the entry dropdown and dated change/stop controls. Changes to dose or frequency through the pencil open a new history event.
- Completed: Pages deployed c5a8644 (run 44403638120). On the signed-in production site, confirmed the split history and SSRI warning, opened and cancelled Change and Stop, and verified the required unselected direction and fixed medication. Downloaded the production CSV and opened it read-only in Excel. Verified chart hyperlink formulas in both review sections.
- In progress: Owner review of the live workflow. Verification left clinical medication histories untouched apart from the expressly requested historical split.
- Blockers/notes: Clinic inventory, the Cloudflare administrative configuration and the deployed Apps Script version were not independently confirmed. Front-end release uses the existing schema and relay.

### 2026-11-18 - Codex desktop - Medication corrections and report formats
- Completed: Captured GitHub baseline 2630b3c, Cloudflare Access redirect, active Apps Script deployment v9, and medication and audit headers. Added review flags, targeted correction links, an all-patient overview, timestamped CSVs and copyable text. All ten existing medication supply regression checks passed.
- Completed: Added an authenticated correction operation to the existing relay. A Sheets batch archives source actions, appends replacement records and records audit rows atomically. Related relay medication writes share a script lock. Existing access mode and Sheet headers are preserved.
- In progress: GitHub Pages deployed 5e9476d. The live dashboard displayed the new overview action, then its relay connection failed. The version 11 relay requires the deploying Google account to authorize the project. Restoring the original editor source and deployment version 9 also returned HTTP 403. Version 11 is selected again for owner authorization and signed-in retesting. A read-only check of the medication sheet found valid correction targets for every flagged source. No end-to-end correction save has been verified.
- Blockers/notes: Earlier status-label work remains local. No clinician-supplied medication data was changed during implementation.

### 2026-11-18 - Codex desktop - Registry outage and medication release handoff
- Completed: Confirmed the original production deployment is still selected at v11. Direct patient-free ping returned Google's HTTP 403 HTML before the registry received a relay response. Earlier rollback to v9 also returned 403. The CoCM account ran the editor authorization check successfully. Missing authorization for the publishing account remains a hypothesis. No replacement deployment has been created.
- In progress: Restore the existing connection first. Verify that the patient-free ping reaches the script and that the signed-in dashboard actually loads fresh data through the existing Cloudflare sign-in. Resume medication feature verification after recovery.
- In progress: Preserve the accepted bilingual supply report and separate all-patient medication overview beside the pill icon, visually divided from Suggestions. Offer CSV or copyable browser text for each. Use one patient per overview row. Supply filename includes CoCM Medication Supply Report, date and time with periods. Each review section needs a chart link and translated click instruction. Supply review needs a separate targeted Correct entry link.
- In progress: Preserve the full-registry 12-calendar-month activity rule, inclusive cutoff, fresh reads, partial totals, PRN and scheduled quantities, distinct-patient counts, and one supply-review row per patient while counting other calculable medications. Keep possible concurrent fluoxetine and sertraline in its own chart and report warning, including the agreed legacy exception. Verify filenames, CSV links and copied text in both languages.
- In progress: Dashboard pill flags show the report reason on hover and open the affected chart with its correction dialog. A combined source can be split and each component confirmed active, stopped or unresolved. On save, preserve dated history, supersede the old source and update both the flag and report. Never infer a missing clinical direction. Preserve separate dated Change and Stop events, fixed medication, required increase/decrease selection and optional stop notes. Verify a correction end to end using an owner-designated test record before declaring success; send Dr. Fowler a concise, shareable summary for Nick after verification.
- Blockers/notes: Existing clinical records must not be changed for testing. Earlier verified historical splits and individual chart details are intentionally omitted from project memory. The security follow-up is deferred. Earlier status-selector edits remain local.
- Blockers/notes: Subsequently reproduced the Google Authorization required dialog by running the read-only check in the MD publishing account. The CoCM account previously completed the same check. Awaiting owner review of the Google permission screen and a fresh live ping. Whether consent alone restores the public deployment is unverified.
- Completed: After the MD publishing account continued through Google consent, the original v11 relay returned HTTP 200 and a normal unsigned ping response in place of the Google 403. No redeployment or URL switch was required. Signed-in dashboard verification remains pending because another app held desktop focus.
- Completed: Verified the refreshed signed-in Real dashboard and both live English text reports after publishing-account consent. Confirmed targeted medication flag links with reasons, partial totals and separate supply and SSRI review sections. Returned to the dashboard. Current bilingual CSV output and a correction save on a designated Test record still need verification.

### 2026-11-18 - Codex desktop - Live medication correction and cleanup verified
- Completed: Verified a designated Real-dataset test chart began empty, saved a combined entry, then split it into one active and one off component using Correct entry. The original was marked corrected and the history retained both outcomes. Verified 15 units for 30 days on the fractional-tablet fixture. Removed exactly the three test medication rows, including the archived source, and verified zero remaining rows. Fresh English and Spanish CSVs omitted the test patient, and the test ordering row disappeared. Removed the pre-cleanup download.
- Completed: Verified supply and overview CSVs in both languages, chart and correction hyperlinks, separate SSRI and supply sections, and Spanish copyable supply text. Restored the verification browser to English.
- In progress: Owner has a message for Nick covering current functionality, stocked strengths, dosage forms and permitted fractions, explicit prescribed dose, and externally prescribed versus externally supplied medications.
- Blockers/notes: Proposed entry-dialog and supply-policy changes await clinic confirmation. No clinical patient regimens changed.

### 2026-11-20 - Codex desktop - Registry translation, medication forms, and visit writes
- Completed: Captured GitHub baseline deb2705, Cloudflare Access sign-in redirect, Apps Script v11 and both visit and medication tab headers. Released the save-once visit handler and medication correction support on the original Apps Script deployment as v12. The relay health check passed.
- Completed: Prepared browser-local translation of visit notes, formulary dose controls and daily-other timing, retry-stable visit IDs, and edit badges backed by the audit trail. Included the previously pending status labels at the owner's direction. All ten medication report regressions and a simulated visit retry check passed.
- In progress: Publish GitHub Pages and verify the signed-in browser. Confirm existing visit duplicate candidates against current data and take a restricted rollback snapshot before cleanup.
- Blockers/notes: Separate-ID matches and conflicting reused IDs need clinician review. Keep migrated medication records for the clinical team.
- Completed: GitHub Pages released 6a293f7. Verified the protected chart on desktop Chrome, inline translation and Show original, the switch-off behavior, the 50 mg product stepping to 25 mg, typed alternate doses, and the Daily, other timing note prompt. Verified the dashboard status labels and report button.
- Completed: Atomically backed up and deleted 45 same-ID visit copies with matching clinical data. Verified the backup values and original row numbers and that the other 427 live visit rows are identical. The backup tab uses the registry workbook's existing access.
- Blockers/notes: Visit retry behavior passed simulated tests. No new clinical visit was written for verification. Supply-source filtering awaits an explicit dispensing-source field. Different-ID and conflicting visit rows were left for clinical review.

### 2026-11-20 - Codex desktop - Visit note expansion and duplicate follow-up
- Completed: Identified four additional live charts with matching free-text visit records under different IDs. Excluded note presets and shared documentation attached to distinct screening tools.
- Completed: Changed the chart to measure the rendered note before showing its expansion control. Syntax and ten report regression tests passed.
- Completed: Pages published b2bfe38. On the protected site, verified that nine previously eligible notes had no redundant expansion control at the tested width and a genuinely clipped note expanded and collapsed.
- Blockers/notes: The audit was read-only. No clinical records were changed.
