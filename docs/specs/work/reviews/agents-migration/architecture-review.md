# Architecture Review: SPEC-agents-migration

**Reviewer:** engineering owner
**Date:** 2026-09-30
**Verdict:** Approved (security-review conditions C-1..C-3 carry forward to build/review)

## Contract Compliance

| Invariant | Status | Notes |
|-----------|--------|-------|
| INV-001 | pass | Proposal approved before any code; lane branch `spec/agents-migration`, no impl touched |
| INV-002 | pass | No `pi-*` external touched by the plan; grep gate at review |
| INV-003 | pass | No TS touched (markdown + docs only) |
| INV-004 | pass | Names dropped at migration (REQ-006/T-006); history retention accepted in security-review S-001 |
| INV-005 | pass | DESIGN.md updated in place (INV-007); no `DESIGN-*.md`; no sidecar contract doc |
| INV-006 | pass | Single-lane audit; max-2 respected |
| INV-007 | pass (new) | Sole dispatch + reference-only + no rewiring, sealed by DECISION 0006 (this gate) |

## DECISION Required?

- [x] Yes — `docs/specs/decisions/0006-frame-ship-sole-dispatch-agents-reference-only.md` created (new invariant + cross-domain contract turn)
- [ ] No — change is within existing contracts

## Conditions for Approval

- Security-review C-1..C-3 (name-grep, no wiring, commit/PR hygiene) enforced at build + verified at review before the delete commit.
- Migration order frozen (audit → migrate → verify → delete); any reorder returns to propose.

## Sign-off

- [x] engineering owner (this review; also countersigns security-review as architecture-impacting)
