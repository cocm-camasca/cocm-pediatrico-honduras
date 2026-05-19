# Decisions

This file records durable architectural, workflow, safety, and publishing decisions for CoCM Pediatric Honduras Registry. Each entry should include Context, Decision, Rationale, and Consequences.

---

### 2026-05-15 - Treat CoCM As Protected Production Track
Context: CoCM is a live registry used for clinical mission work, not a portfolio cleanup site.
Decision: Keep CoCM separate from TroyFowlerMD portfolio consolidation and treat it as production software.
Rationale: It depends on Cloudflare, Apps Script, and Google Sheets, and changes can affect live clinical workflow/data capture.
Consequences: Future work needs stronger pre-change checks and rollback planning than normal static-site polish.

### 2026-05-15 - Rollback Requires Four Layers
Context: GitHub code is only one part of production behavior.
Decision: A true rollback checkpoint includes GitHub commit, Cloudflare state, Apps Script deployment/version, and Google Sheet schema state.
Rationale: Auth, caching, backend relay, and sheet schema can fail independently of static code.
Consequences: Do not start production-affecting changes without recording all four layers.

### 2026-05-07 - Use _registro-wip As Authoritative Working Directory
Context: Older notes used `registro-wip/`, but verification found the actual working directory uses a leading underscore.
Decision: Treat `_registro-wip/` as authoritative.
Rationale: Editing or documenting the wrong folder can lead to ineffective or unsafe changes.
Consequences: Correct older `registro-wip/` wording in summaries and future docs unless quoting historical source.

### 2026-05-07 - Preserve Apps Script Deployment Model
Context: Apps Script auth depends on the current deployment model and `Session.getActiveUser().getEmail()`.
Decision: Do not switch deployment casually, especially not to Execute as Me.
Rationale: Changing execution mode can silently break auth.
Consequences: Apps Script deployment facts must be checked before backend changes.

### 2026-05-07 - Cloudflare Pages Migration Is A Pending Decision
Context: Static hosting currently runs through GitHub Pages behind Cloudflare.
Decision: Cloudflare Pages migration is worth evaluating but has not been executed.
Rationale: It may reduce source visibility and simplify the serving chain while keeping Apps Script and Sheets.
Consequences: Keep migration as a planned decision, not an assumed current architecture.

### 2026-05-19 - Keep Pediatric Psychometrics With CoCM Registry
Context: The pediatric screening tools are not just standalone questionnaires; they are routed through CoCM registry tool maps, age/condition rules, patient creation workflows, and caregiver/teacher share pages.
Decision: Keep CoCM pediatric psychometrics documentation in `cocm-pediatrico-honduras` rather than moving it to the general `psychometrics-hub`.
Rationale: The registry integration determines when tools appear, how results are copied, and how screening fits clinical workflow.
Consequences: The general psychometrics hub can remain a public/shareable tool hub, while CoCM-specific screening rules and implementation notes stay with the protected production track.
