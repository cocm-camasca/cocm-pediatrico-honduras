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

