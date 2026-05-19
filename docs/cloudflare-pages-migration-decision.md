<!-- last-reviewed: 2026-05-19 -->
<!-- source: notion -->

# Decide On Cloudflare Pages Migration For CoCM Registry

## Status In Notion
Status was marked `Done`, but the context says the decision itself was pending. Treat this as a decision record to re-evaluate, not proof that migration happened.

## Context
Assessed as weekend-sized, low-to-moderate pain. Would move static hosting from public GitHub Pages to Cloudflare Pages, reducing source-code visibility and simplifying serving chain:

Cloudflare Access -> Cloudflare Pages -> browser

Apps Script + Sheets backend stays.

## Current Handling
Do not assume Cloudflare Pages migration has happened. Verify current hosting mode through repo evidence and Cloudflare account state before planning any work.
