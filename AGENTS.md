# Project: CoCM Pediatric Honduras Registry

## Identity
- GitHub is the source of truth for this project: cocm-camasca/cocm-pediatrico-honduras.
- Notion is no longer the operating source of truth for this repo. Historical Notion content has been migrated into docs/ and the repo memory files.
- Durable documentation lives in docs/, AGENTS.md, TASKS.md, WORKLOG.md, and DECISIONS.md.
- Work in this repo in place. Do not move folders, clone over this repo, or rewrite history unless Dr. Fowler explicitly asks.
- Default branch: main.
- Live/public target: protected by Cloudflare Access.

## Project Overview
- Protected bilingual CoCM Camasca pediatric registry used for Honduras collaborative care work.
- Treat this as production clinical software: it supports patient, visit, medication, flag, and screening-score workflows.
- Serving chain: Cloudflare Access -> Cloudflare proxy/DNS -> GitHub Pages -> browser JavaScript -> Apps Script Web App -> Google Sheets.

## Project Structure
- _registro-wip/ - authoritative current registry working directory
- docs/ - architecture, rollback, clinical workflow, and migration documentation
- Root psychometric/scoring pages and external share variants where present
- Google Apps Script and Google Sheets are external production dependencies, not files fully controlled by this repo

## Documentation Map
- docs/cloudflare-pages-migration-decision.md
- docs/cocm-camasca-registry.md
- docs/cocm-camasca-registry-legacy-snapshot.md
- docs/cocm-pediatric-psychometrics.md
- docs/drive-folder-per-patient-decision.md
- docs/fix-aurora-patient-name-typo.md
- docs/update-audit-help-text.md

## Required Startup Routine
1. Run git status --short in the repo root.
2. If there are uncommitted changes, stop and report exactly what is present before editing. Treat those changes as user or prior-Codex work and do not overwrite them.
3. If the working tree is clean and network access is available, run git pull --ff-only before starting work. Do not merge, rebase, or force update unless explicitly approved.
4. Read AGENTS.md, TASKS.md, WORKLOG.md, DECISIONS.md, and any task-relevant files in docs/.
5. Report the current branch, repo status, active task, blockers, and proposed next action.
6. Wait for approval before editing unless the user has already given explicit implementation approval.

## Required Shutdown Routine
1. Update WORKLOG.md with what changed, what remains, and any blockers.
2. Update TASKS.md if task status changed.
3. Update DECISIONS.md if an architectural, workflow, safety, or publishing decision was made.
4. Run the relevant tests/checks, or explain why they were not run.
5. Run git status --short and summarize the exact files changed.
6. Recommend a commit message, but ask before running git commit or git push.

## Worklog Entry Format
Append entries to WORKLOG.md using this shape:

    ### YYYY-MM-DD - [machine/profile] - [session summary]
    - Completed: ...
    - In progress: ...
    - Blockers/notes: ...

## Cross-Machine Rules
- Never assume prior chat context is available. Reconstruct state from Git, TASKS.md, WORKLOG.md, DECISIONS.md, and docs/.
- Use git pull --ff-only only when the working tree is clean.
- Avoid destructive Git operations such as reset --hard, force pushes, history rewrites, or deleting untracked work unless explicitly approved.
- Keep generated context inside this repo's memory files and docs/ so another Windows account or computer can resume.
- Do not store secrets, tokens, credentials, private keys, or unnecessary sensitive data in repo docs.
- Preserve user or prior-Codex changes that are already in the working tree.

## Owner Communication
- The repo owner is new to Git, GitHub, GitHub Desktop, Codex, local-vs-remote repository concepts, commits, branches, remotes, pushes, pulls, and deployment workflows.
- When explaining repo work, include a little extra context by default: define the concept, explain why it matters, then give the specific instruction or recommendation.
- Use plain outcome language before technical terms. For example, say "this saves the change in local history" before or alongside "commit."
- Distinguish clearly between local files, local commits, pushed GitHub commits, pull requests, and live deployed website changes.
- Give step-by-step instructions with exact paths, button names, branch names, and GitHub URLs when the user is operating tools manually.
- Recommend the simplest safe option first, and name when an action is optional versus required.
- When a task reveals an opportunity to streamline Dr. Fowler's workflow, present it proactively with the expected benefit, any risk or cost, and the smallest safe next step. Keep workflow suggestions clearly separate from required task work.
- Avoid implying the live website changed unless changes were actually pushed and deployed.

## Project-Specific Rules
- Keep CoCM separate from TroyFowlerMD portfolio cleanup.
- Before code changes, capture rollback state for GitHub, Cloudflare, Apps Script, and Google Sheets schema.
- Do not treat git rollback alone as a true production rollback.
- Front-end schemas, Apps Script headers, and Sheet row-1 headers must stay in lockstep.
- Do not casually change Apps Script deployment mode; the documented model is intentional.
- Use _registro-wip/ as authoritative; older registro-wip/ wording is stale.
- Bilingual strings belong in registro-i18n.js.
- Window-called handlers must be explicitly exported to window.*.
- Do not store tokens, API keys, OAuth secrets, PHI, or patient-identifying data in repo docs.

## Verification Guidance
- Prefer read-only verification first because this is production clinical software.
- For code changes, verify browser behavior plus Apps Script/Sheet contract assumptions when access allows.
- If external production checks cannot be performed, state that clearly in WORKLOG.md and the shutdown summary.
