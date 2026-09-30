# Implementation Plan: agents-migration (SPEC-agents-migration)

**Agent:** engineering lead
**Date:** 2026-09-30
**Approved By:** deu (proposal "dale" 2026-09-30) + security CONDITIONAL (C-1..C-3) + design APPROVED (ADR-0006)
**Domains-Touched:** [engineering]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Full audit: read 74/74 `agents/*.md`, one verdict per file (migrate/duplicate/obsolete, criteria cited) | `docs/specs/work/agents-migration/AUDIT.md` | E-001 | 1–2h |
| 2 | deu spot-check gate: sample ≥1 file per family signed | sign-off in AUDIT.md | E-002 | waits on deu |
| 3 | Migrate uniques per TRACE (references enrichment; new skills only if threshold + deu confirmation) | `skills/*/references/*` (+ conditional `skills/<new>/`) | E-003, T-001 | 1–2h |
| 4 | Verify: trace reachability, name/config greps, typecheck | `docs/specs/work/agents-migration/TESTS.md` | T-001..T-006, E-005 | 30 min |
| 5 | Delete `agents/` + ref cleanup (LAST commit) | `agents/` removal | T-002,T-003,T-004 | 15 min |
| 6 | Push lane, open PR, run review wave | PR + `reviews/agents-migration/` | review verdicts | 1h |

Each step maps to one commit (audit / migrate-per-batch / tests / delete). Spot-check (step 2) blocks steps 3–5 — no migration or deletion without deu signature.

## Order of Operations

Audit first (read-only, zero tree risk) → spot-check gate (human control before any move) → migrate additive (revertible per-commit) → verify (all gates green) → delete destructive (single last commit, trivially revertible). ADR already landed at check-design. No reorder without returning to propose.

## Rollback Points

- After step 1–2: nothing to roll back (docs-only audit).
- After step 3: `git revert` per migration commit. Owner: engineering lead, minutes.
- After step 5: `git revert <delete-sha>` restores `agents/` byte-identical. Owner: engineering lead, <1h.

## Quality Gates

- [x] Engineering: typecheck green before delete commit; reachability + name + config greps green; no-dup attestation; security C-1..C-3 enforced; no SKILL.md touched without propose approval (references-only default)
- [ ] Worktrees: skipped with reason — docs/markdown-only lane on isolated branch `spec/agents-migration` (branch IS the isolation); no runtime, no parallel lanes, nothing to segregate

## Work log

- 2026-09-30: PLAN written; starting step 1 (audit reads).
