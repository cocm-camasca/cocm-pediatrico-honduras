# Registry patient status labels

## Meaning

The Sheet's `Pacientes.Status` values remain the storage contract. The registry presents these labels in both languages:

| Stored value | English | Español | Current care represented |
| --- | --- | --- | --- |
| `Activo` | Therapy + CoCM | Terapia + CoCM | Therapy with active CoCM monitoring. |
| `Estable` | Stable | Estable | Therapy with reduced CoCM monitoring on the 16-week cadence. |
| `Inactivo` | Therapy only | Solo terapia | Therapy without current CoCM monitoring. The patient may or may not have previously participated in CoCM. |
| `Transferido` | Transferred | Transferido | No longer followed in this registry, including leaving Camasca or moving care elsewhere. |
| `Otro` or other nonstandard text | Other filter; actual value on the chart | Filtro Otro; valor real en la ficha | A custom status outside the four standard categories. |

Status describes the current care pathway. A recent visit does not change `Inactivo` to `Activo`, and an overdue visit does not change `Activo` to `Inactivo`. Search combines the selected status with the therapist and condition filters. `All statuses` removes only the status restriction.

## Pre-change rollback checkpoint — 2026-09-28

- GitHub: `main` and `origin/main` at `89a1d5b2b7d3f0362e44e6fd95e3d5188fb1eb03` before front-end edits. The only pre-existing local files were three untracked Codex screenshot attachments, preserved in place and ignored locally through `.git/info/exclude`.
- Cloudflare: `registry.cocm-camasca.org` resolved to Cloudflare proxy addresses, and an unauthenticated HEAD request to the registry returned HTTP 302 through Access. The documented serving mode is Cloudflare Access/proxy in front of GitHub Pages. Policy details and cache settings were not available from this checkout.
- Apps Script: `_registro-wip/registro-data.js` records the relay `/exec` endpoint as `v2.2 — Version 9`, confirmed in the source comment on 2026-05-05. The deployment console was not accessible for a fresh version check. No Apps Script changes are part of this update.
- Google Sheets: read-only inspection of the `CoCM Camasca — Registro` Sheet row-1 headers found `Pacientes` and `Pacientes_Test` each with 36 named columns. Both have `Status` in column K. The two tabs differ only in the order of their final `Caregiver_Phone` and `Review_Flag_Note` columns. `Visitas` has 17 named columns including final `Entry_Type`; `Visitas_Test` has 16 without it. Both `Medicamentos` tabs have the same 13 named columns. No Sheet headers are changed by this update.

Header sequences captured from row 1 (production first, with test differences noted):

```text
Pacientes: Patient_ID, Patient_Name, Initials, DOB, Age, Sex, Therapist, Conditions, Tools, Enrollment_Date, Status, Priority, Safety_Flag, Safety_Flag_Ack_By, Safety_Flag_Ack_At, Notes, Created_By, Created_At, Updated_By, Updated_At, Schema_Version, Last_Psych_Consult_Date, Last_BHCM_Contact_Date, Last_BHCM_Contact_Note, Review_Flag, Baseline_Tool, Baseline_Score, Baseline_Date, Brigade_Flag, Brigade_Reason, Todo_Items, Primary_Condition, Primary_Condition_Verified, Last_BHCM_Contact_By, Caregiver_Phone, Review_Flag_Note
Pacientes_Test: same first 34 fields; positions 35-36 are Review_Flag_Note, Caregiver_Phone
Visitas: Visit_ID, Patient_ID, Visit_Date, Therapist, Tool, Score, Baseline_Score, Subscale_Scores, SI_Positive, Not_Improving_Flag, Visit_Note, Created_By, Created_At, Updated_By, Updated_At, Schema_Version, Entry_Type
Visitas_Test: same first 16 fields; no Entry_Type
Medicamentos and Medicamentos_Test: Med_ID, Patient_ID, Date, Medication, Dose, Frequency, Action, Prescriber, Reason, Notes, Created_By, Created_At, Schema_Version
```

The active Apps Script deployment version and full Cloudflare policy/cache settings could not be read from this checkout. This front-end release did not change those systems. Console access would be needed for a rollback involving Cloudflare or Apps Script.

## Release evidence — 2026-09-28

- GitHub `main` received commit `a0c637cd1ffbce2bacfba2c1056cca95f640a8de`.
- GitHub Pages reported a successful build and deployment of that exact commit from `main` at 2026-09-29 01:28 UTC.
- The protected registry domain continued redirecting unauthenticated requests to Cloudflare Access. A signed-in browser check of the served labels and assets is pending.
