# Handoff: selective migration agents/ → skills (agents-migration)

**Spec Reference:** `docs/specs/backlog/SPEC-agents-migration.md`#REQ-001..006
**Agent:** engineering lead
**Date:** 2026-09-30
**Status:** complete
**Domains-Touched:** [engineering]

## Deliverables

| File | Where it is / the proof | Status |
|----------|---------------------|--------|
| Audit | `docs/specs/work/agents-migration/AUDIT.md` — 74 rows, verdicts 52/20/2, E-002 signed | done |
| New skills | `skills/{finance,revenue,legal,people,brand}/SKILL.md` — gates + playbooks, nameless | done |
| Enrichments | 10 reference files across review/build/propose/verify/check-security/write-the-requirements | done |
| Trace | `docs/specs/work/agents-migration/TRACE.md` — 15 addresses, all resolve | done |
| Delete | `agents/` absent on lane; typecheck green pre/post | done |
| ADR | `docs/specs/decisions/0006-*.md` — sole dispatch, accepted | done |
| Gate | `docs/specs/work/reviews/agents-migration/REVIEW.md` — OPEN, 6/6 + 2 gate reviews | done |
| PR | https://github.com/deuriib/pi-deu/pull/3 (`spec/agents-migration` → `main`) | done (open, awaits merge) |

## the done checklist Checklist

- [x] Acceptance criteria satisfied — AC-001 (74-row matrix + sign-off), AC-002 (trace + reachability), AC-003 (absent + clean + green), AC-004 (ADR), AC-005 (no-dup attestation), AC-006 (config + name greps)
- [x] Tests/evidence linked per REQ-ID — 12/12 recorded in TESTS.md (6 tests green, 6 evidence pass)
- [x] Load evidence present — skills loaded this lane: agree-the-goal, write-the-requirements, propose, check-security, check-design, build, open-a-pull-request, review, verify (paths cited); execution_mode subagents w/ sequential degradation recorded; 4-line note intact
- [x] Domain checks passing — Engineering appendix: typecheck green (sole gate, N/A floors justified); every Test/Evidence ID recorded; no TODO/FIXME
- [x] Security checks passing — C-1..C-3 verified clear (T-005/T-006 + provenance rule); residual (history names) accepted in review
- [x] Documentation updated — GOAL/SPEC/REQ/DESIGN (INV-007)/ADR/lane docs; changelog N/A (internal-only; merge note cites PR #3)

### C4 evidence-link check

- All 12 IDs resolve to files/logs grepped this session; E-002/E-006 sign-offs recorded with dates; no dead/irrelevant links; no attestation-alone gaps. No C4 FAILs.

## Blockers / Open Questions

- None blocking. Residual: 13 tie-rule dup-calls recoverable from history (risk file).
- Pre-existing `M SYSTEM.md` (CRLF-only) untouched throughout both lanes — still pending its own owner.

## Next Agent

`frame-ship:release` — merge PR #3 (regular merge, preserve 8-lane commits), confirm `agents/` absent + 5 skills present on `main`, note restore+delete journey in merge/PR notes. No version tag (internal-only; owner decides).

`SPEC:docs/specs/backlog/SPEC-agents-migration.md#REQ-001,REQ-002,REQ-003,REQ-004,REQ-005,REQ-006 / HARD:subagents+single-lane-audit / GATE:OPEN / DOMAINS:[engineering]`
