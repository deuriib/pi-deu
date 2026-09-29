# Release Notes: bootstrap-missing-files (unshipped — prepared)

**Date:** 2026-09-29
**Release Manager:** deu (single-thread; second-reader separation deferred — §Known Issues)
**Specs Included:** BOOTSTRAP-MISSING-FILES
**Domains-Touched:** Legal, Engineering
**Ship Type:** N/A — internal docs-only bootstrap (no deploy/filing/launch/close/rollout/policy-enable; no user impact, no runtime change)

## Highlights

- The two files the chain was blocked on now exist: `LICENSE` (MIT) and `docs/specs/design/DESIGN.md` (canonical singleton v1 with the 4-line-note grammar). README links resolve; guardrail references land.

## Changes

### Features

- None — docs-only lane.

### Fixes

- Missing `LICENSE` created (Legal, BOOTSTRAP-MISSING-FILES): standard MIT, holder/year sourced from git.
- Missing `docs/specs/design/DESIGN.md` created (Engineering, BOOTSTRAP-MISSING-FILES): singleton contract (components, data flow, invariants INV-001..006, NFRs) + authoritative 4-line-note grammar.

### Domain Ships

- Legal: LICENSE artifact ready — owner legal sign-off still required before merge/publish (carried gate).
- Engineering: DESIGN.md singleton live — future contract changes need a decision note in `docs/specs/decisions/`.

### Breaking Changes

- None.

## Known Issues

- Ship NOT closed: no tag, no push. Blockers with owners: (1) legal sign-off outstanding — owner legal; (2) no version bump in approved scope, so no tag name planned — owner engineering/vasquez; (3) push to `origin` needs explicit consent (irreversible) — owner user. Exact next commands live in ARCHIVE-RECORD Notes.
- Second-reader separation (§2b steps 8–10) not exercised — no subagent tool in this runtime; single-thread throughout, recorded per step.
- `scripts/bump-version.mjs` does not exist in this repo — version-sync step N/A; `package.json` stays `0.1.0`, zero drift introduced by this lane (typecheck green).
- Root `AGENTS.md` (untracked, prior `/init-deep` lane) still claims a "LICENSE gap" — stale since this lane; left untouched (that lane owns it), flag for its owner.

## Rollback / Undo

- Lane revert: `git revert` the 6 lane commits in reverse (`c6ed6d7` … `0c84ff7`), or `git rm LICENSE docs/specs/design/DESIGN.md` + lane docs. Owner deu, ETA minutes. Nothing runtime to retract/void/disable — docs-only, nothing deployed.
