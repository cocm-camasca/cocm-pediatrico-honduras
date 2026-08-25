# Registry User Access Provisioning

## Purpose

Use this procedure whenever someone asks to give a person access to the protected CoCM Camasca registry. The registry has two independent gates and one role-based directory source:

1. **Cloudflare Access** permits the person to reach `registry.cocm-camasca.org`.
2. **Google Sheet `AuthorizedUsers`** permits their signed-in Google account to read and write through the Apps Script relay.
3. **Google Sheet `Config` team rows** populate clinical team dropdowns and filters.

Adding someone to only Cloudflare is incomplete: the Apps Script relay rejects users who are not active in `AuthorizedUsers`.

## Required information

Before changing any external system, obtain all three items:

| Required item | Use |
| --- | --- |
| Google email address | Cloudflare policy and `AuthorizedUsers.email` |
| Display name | `AuthorizedUsers.name` and any clinical team dropdowns |
| Role: `therapist`, `psychiatrist`, `admin`, or `other` | Access behavior and whether a clinical team row is required |

If the request does not include one of these, ask a concise explicit question. Never infer a clinical role from the name, email domain, or prior team membership.

## Authorization rule

A direct request to give the named person registry access, together with all required information, authorizes the provisioning steps below. If the user is only asking a question or reviewing a possible change, keep the work read-only until they directly request access to be granted.

## Provisioning steps

1. Record a rollback checkpoint appropriate for an access change: current Cloudflare policy membership and the existing relevant Google Sheet rows. Do not record patient information.
2. In Cloudflare Zero Trust, update the `CoCM Camasca Registry` self-hosted application's `Authorized Clinicians` policy. Add the Google email as an **Include email** and save the policy.
3. In the registry spreadsheet's `AuthorizedUsers` tab, add an active row with these exact headers:

   | email | name | role | active | added_date | added_by |
   | --- | --- | --- | --- | --- | --- |
   | person's Google email | display name | approved role | `TRUE` | current date | current authorized operator email |

4. For a `therapist` or `psychiatrist`, add an active `Config` team row:

   | Category | Key | Value | Display_ES | Display_EN | Active | Notes |
   | --- | --- | --- | --- | --- | --- | --- |
   | `team` | display name | role | `Terapeuta` or `Psiquiatra` | `Therapist` or `Psychiatrist` | `TRUE` | blank unless a user-supplied operational note is needed |

   Do not add an `admin` or `other` row to `Config` by default. Add one only when the user expressly wants the person available in team-based lists.
5. Verify the final state without viewing or disclosing patient records:
   - Cloudflare reports the policy saved successfully and the email appears in the policy.
   - `AuthorizedUsers` shows the email with the requested role and `active=TRUE`.
   - For a therapist, the active therapist source includes the name; for a psychiatrist, the active psychiatrist source includes the name.
6. Report the result, including whether the person is now in clinical dropdowns. Do not claim the person has successfully signed in unless that has actually been tested with their account.

## Why the role-based row matters

The repository's front end reads these sheet sources dynamically; ordinary user additions do not require a code edit.

- `AuthorizedUsers` is the Apps Script authorization gate and supplies the active-therapist list used for patient assignment.
- `Config` rows with `Category=team` supply the team filters and the psychiatrist prescriber dropdown.
- A therapist role also affects registry behavior that records therapist contact information. A psychiatrist role supports psychiatrist-specific medication and review workflows.

## Current system references

- Cloudflare application: `CoCM Camasca Registry`
- Cloudflare destination: `registry.cocm-camasca.org`
- Cloudflare policy: `Authorized Clinicians`
- Google Sheet tabs: `AuthorizedUsers` and `Config`
- App code: `_registro-wip/registro-data.js`, `_registro-wip/registro-app.js`, and `_registro-wip/registro-paciente.js`
