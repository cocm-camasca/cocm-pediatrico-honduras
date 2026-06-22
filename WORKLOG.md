# Worklog

This file records completed Codex work sessions for CoCM Pediatric Honduras Registry. Append new entries during the shutdown routine so future sessions can resume without prior chat context.

---

## Entry Format

    ### YYYY-MM-DD - [machine/profile] - [session summary]
    - Completed: ...
    - In progress: ...
    - Blockers/notes: ...

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

