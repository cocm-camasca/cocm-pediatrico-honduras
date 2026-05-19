<!-- last-reviewed: 2026-05-19 -->
<!-- source: notion -->

# CoCM Pediatric Psychometrics

This material belongs in `cocm-pediatrico-honduras`, not the general `psychometrics-hub`, because the tools are tied directly to the CoCM registry workflow, age/condition routing, patient creation flow, external caregiver/teacher share links, and screening-score capture.

## Purpose

The CoCM pediatric psychometrics set provides bilingual screening and monitoring tools used alongside the CoCM Camasca registry. The tools help route pediatric mental-health screening by age, symptom domain, and clinical workflow, while keeping scoring pages lightweight and copyable for registry documentation.

## Tool Inventory

- `PSC-17` - broad pediatric psychosocial screening; caregiver share workflow exists for newly created patients.
- `PHQ-A` - adolescent depression screening.
- `GAD-7` - adolescent anxiety screening.
- `SCARED-N` - child/youth anxiety screening.
- `SCARED-Parent` - parent/caregiver anxiety screening, with external share variant.
- `SMFQ-C` / `MFQ-C` - child mood/depression questionnaire for younger children.
- `SMFQ-P` / `MFQ-P` - parent mood/depression questionnaire, with external share variant.
- `SNAP-IV` - ADHD symptom scale, with external share variant.
- `Vanderbilt-Parent` - ADHD parent scale, with external share variant.
- `Vanderbilt-Teacher` - ADHD teacher scale, with external share variant.
- `CRAFFT` - adolescent substance-use risk screening.
- `DAST-10` - substance-use monitoring/risk tool.

## Registry Integration Points

The registry routes tools from `_registro-wip/registro-data.js`. The `TOOL_URLS` map points registry labels to root scoring pages, including PHQ-A, GAD-7, SCARED, SMFQ/MFQ, SNAP-IV, Vanderbilt, PSC-17, CRAFFT, and DAST-10 pages.

The same data file contains tool rules for clinical routing, including broad PSC-17 screening, depression routing by age, anxiety routing, ADHD routing, and adolescent SUD/risk routing.

External/shareable pages use `*-ext.html` variants where caregiver or teacher completion outside the main registry flow is expected.

`_registro-wip/registro-app.js` includes the patient-creation workflow that can copy a PSC-17 caregiver message after a new patient is created.

## Conventions

- Keep psychometric routing docs with the CoCM repo because tool availability affects registry workflow.
- Keep scoring tools bilingual where supported.
- Keep copy-to-clipboard output structured enough for clinical documentation.
- Do not place PHI in URLs, Markdown docs, test examples, or share-message templates.
- Treat age thresholds and tool routing rules as clinical workflow decisions, not cosmetic site content.
- Verify scoring thresholds against source instruments before changing tool logic.

## Open Checks

- Verify the current root scoring files still match every label in `TOOL_URLS`.
- Verify external `*-ext.html` variants still load and copy results as expected.
- Verify PSC-17 caregiver-share copy remains appropriate for the current patient creation workflow.
- Verify Spanish/English labels and result copy across all tools.
- Confirm whether `SMFQ` and `MFQ` naming should be standardized in UI/docs or preserved as implemented.
- Confirm whether all screening thresholds and follow-up guidance have had a recent clinical review.

## Current Recommendation

Keep CoCM pediatric psychometrics in `cocm-pediatrico-honduras`. The public/general `psychometrics-hub` can link out or reference it conceptually later, but source-of-truth docs and implementation notes should stay with the protected CoCM registry because that is where the workflow dependencies live.
