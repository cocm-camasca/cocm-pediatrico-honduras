# CoCM Pediátrico Honduras

Herramientas de evaluación pediátrica y registro clínico para el Modelo de Atención Colaborativa (CoCM) en Camasca, Honduras.

This is a production-sensitive bilingual registry and toolset. Treat it as live clinical workflow software, not as a normal portfolio static site.

## Tools / Herramientas

| Herramienta | Descripción | Edad |
|-------------|-------------|------|
| PSC-17 | Pediatric Symptom Checklist | Todas |
| MFQ-C | Mood and Feelings Questionnaire - Niño | <=11 |
| MFQ-P | Mood and Feelings Questionnaire - Padres | <=11 |
| PHQ-A | Patient Health Questionnaire - Adolescente | >=12 |
| GAD-7 | Generalized Anxiety Disorder | >=12 |
| SCARED (Niño + Padres) | Screen for Child Anxiety | Todas |
| SNAP-IV 26 | ADHD - Padres/Maestros | 8-18 |
| CRAFFT 2.1 | Uso de sustancias - Adolescente | 12-21 |
| DAST-10 | Drug Abuse Screening Test | Adolescentes/Adultos |
| Vanderbilt - Padres | ADHD evaluación completa | 6-12 |
| Vanderbilt - Maestros | ADHD evaluación completa | 6-12 |

## Features

- Bilingual (ES / EN / ES+EN)
- Dark mode default
- Offline-capable scoring tools
- Mobile-friendly
- Live-updating scoring with copy-to-clipboard
- Protected registry workflow behind Cloudflare Access

## Project Files

- `CONTEXT.md`: Short session-start briefing for Codex and returning developers.
- `TASKS.md`: Live working task list seeded from the migrated Notion state.
- `WORKLOG.md`: Append-only session-end worklog format.
- `DECISIONS.md`: Key operational and architecture decisions extracted from Notion.
- `docs/cocm-camasca-registry.md`: Current migrated CoCM registry project context and safety checklist.
- `docs/cocm-camasca-registry-legacy-snapshot.md`: Older CoCM registry snapshot retained for historical comparison.
- `docs/cloudflare-pages-migration-decision.md`: Pending Cloudflare Pages migration decision note.
- `docs/fix-aurora-patient-name-typo.md`: Patient-name typo follow-up note; do not store PHI in git.
- `docs/drive-folder-per-patient-decision.md`: Drive-folder-per-patient feature decision note.
- `docs/update-audit-help-text.md`: Audit/help text update note for `_registro-wip/registro-i18n.js`.
- `docs/cocm-pediatric-psychometrics.md`: CoCM-specific pediatric screening tool inventory, registry integration points, and open checks.

## Production Safety

Before production-affecting changes, record GitHub commit, Cloudflare state, Apps Script deployment/version, and Google Sheet schema state. Git rollback alone is not a full rollback for this project.
