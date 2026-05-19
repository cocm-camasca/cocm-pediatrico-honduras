<!-- last-reviewed: 2026-05-19 -->
<!-- source: notion -->

# CoCM Camasca Registry Legacy Snapshot

## Snapshot
Bilingual pediatric patient registry for the Camasca, Honduras CoCM program. Enables persistent tracking of patients across visits, medication management, visit logging with scoring, clinical flag chips, and a suggestions/problem-report page. Serves a psychiatrist-led medical mission team operating without a local EHR.

## Current Status In Older Snapshot
All core features working as of the older audit: registry list, patient detail page, visit logging with chooser popover, medication add/edit/delete, suggestions page, bilingual i18n, Cloudflare Access protection, pre-commit cache-bust hook.

## Architecture Notes From Older Snapshot
The older Notion page used `registro-wip/` as the working directory. Later verification corrected this to `_registro-wip/`. Treat `_registro-wip/` as authoritative.

The older snapshot documented:
- Cloudflare Access -> GitHub Pages -> browser JS -> Apps Script -> Google Sheets
- `registro-paciente.js` as a high-risk large file
- cache-bust `?v=<git-sha>` on script/style tags
- schema lockstep between front-end code and Google Sheet headers
- Apps Script URL version-label comments as a source of phantom bugs

## Open Questions From Older Snapshot
- Cloudflare Pages migration
- Google Sheet ownership transfer
- Drive folder per patient
- `flowsheet.html` navigation status
- Aurora/Auora typo
- audit/help text updates
- undocumented `make_placeholders.py`
- outside-meds edit/delete

## Lessons From Older Snapshot
- Prior `registro-paciente.js` truncation required a full restore from a known-good SHA.
- Stale cache-bust values caused browsers to load old JavaScript missing newly exported functions.
- Large file edits require tooling that can safely handle the file size.
