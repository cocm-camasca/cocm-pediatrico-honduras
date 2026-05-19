<!-- last-reviewed: 2026-05-19 -->
<!-- source: notion -->

# CoCM Camasca Registry

## Snapshot
Bilingual (ES/EN) pediatric CoCM patient registry for the Camasca, Honduras collaborative care mission. Tracks patients, visit history, medications (add/edit/delete), clinical flags, and PSC-17 scores. Protected by Cloudflare Access; data persists in Google Sheets via Apps Script relay.

Org/repo: `cocm-camasca/cocm-pediatrico-honduras` (separate GitHub org, not under TroyFowlerMD).

Note: older Notion text and some historical URLs use `registro-wip/`; later verification corrected the repo working directory to `_registro-wip/`.

## Current Status
Working as of most recent audit: registry list, patient detail, visit logging, medication add/edit/delete, suggestions page, bilingual i18n, Cloudflare Access, pre-commit cache-bust hook.

Most recent commits noted in Notion:
- `00cb889` - fix openLogChooser window export + cache-bust
- `20e55f1` / `365900f` - Log Visit chooser popover, defensive guards
- `265c42a` - med edit/delete, `window.*` exports, Suggestions button on patient quick-actions

## Vision & Non-Goals
Serve the Honduras CoCM mission with a lightweight, bilingual, offline-tolerant registry that any team member can use on a phone. Non-goals: full EHR replacement, complex auth beyond Cloudflare Access, server-side rendering, or PHI migration off Google Sheets before ownership transfer is resolved.

## Architecture Map
**Serving chain:** Cloudflare Access -> Cloudflare proxy/DNS -> GitHub Pages -> browser JS -> Apps Script Web App -> Google Sheets

**Working directory:** `_registro-wip/`

**Front-end files:**
- `registro.html` - registry/dashboard list page
- `registro-paciente.html` - individual patient page
- `registro-paciente.js` - patient page logic; corruption risk
- `registro-app.js` - registry list, new-patient dialog, renderPatientRow, flag chips
- `registro-data.js` - shared data layer
- `registro-i18n.js` - bilingual ES/EN string constants
- `registro-sugerencias.html` - Suggestions / Report-a-problem page

**Apps Script backend:** Single `Code.gs` relay/web app. URL is hard-coded in front-end with a version label comment. Handlers include generic write, visit submission, and medication deletion.

**Google Sheets:** Canonical durable store. Front-end schema, Apps Script headers, and Sheet row-1 headers must stay in lockstep.

**Cache-bust:** `?v=<git-sha>` on scripts/styles, updated by pre-commit hook.

## Known Fragile Areas
- `registro-paciente.js` corruption risk: a prior commit deleted thousands of lines and required full file restore.
- Large-file edits: do not use tools that cannot safely handle `registro-paciente.js`.
- Stale `?v=` cache-bust values cause phantom missing-function bugs.
- Schema lockstep: adding columns in code without matching Sheet headers can silently misalign data.

## Open Questions / Decisions Pending
- Cloudflare Pages migration.
- Google Sheet ownership transfer.
- Drive folder per patient.
- Whether `flowsheet.html` should be linked or removed.
- Aurora/Auora typo fix via Edit Patient UI.
- Audit/help text update in `registro-i18n.js`.
- Undocumented `make_placeholders.py`.

## Pre-Change Safety Checklist
Before any production-affecting change, record all four layers:
1. GitHub code checkpoint: branch, full SHA, clean repo, cache-bust values.
2. Cloudflare checkpoint: Access policy/DNS/cache state and hosting mode.
3. Apps Script checkpoint: deployed version and active `/exec` URL.
4. Google Sheets checkpoint: schema for production and test tabs.

## Post-Deploy Smoke Test
1. Open registry list page through Cloudflare Access.
2. Open a patient page and verify buttons resolve correctly.
3. Log a visit and confirm the expected result appears.
4. Add, edit, and if appropriate delete a medication.
5. Open Suggestions and confirm submit flow reaches Apps Script.
6. Confirm no obvious auth, cache, or missing-function issues in production.

## Rollback Rule
A true production rollback point includes GitHub commit, Cloudflare state, Apps Script deployment/version, and Google Sheet schema state. Git rollback alone is not enough.

## No-Code Maintenance Queue
- Confirm live serving chain.
- Re-check Apps Script deployment facts.
- Re-check schema drift items.
- Re-check Cloudflare operational items.
- Keep CoCM separate from portfolio consolidation.
- If future work becomes code work, capture all four rollback layers first.

## Sensitive Content Note
Do not store token values, API keys, OAuth secrets, or patient PHI in repo docs.
