# Handoff: restore agents/ from 24c090f^ (agents-001)

**Spec Reference:** `docs/specs/work/engineering/PROPOSAL.md`#REQ-001..003
**Agent:** engineering lead
**Date:** 2026-09-30
**Status:** complete
**Domains-Touched:** engineering

## Deliverables

| File | Where it is / the proof | Status |
|----------|---------------------|--------|
| Implementation | `agents/*.md` (74 files) on branch `revert/restore-agents-from-24c090f`, commit `4ebc9cb` — `git diff 72b0adb -- agents/` = 0 | done |
| Tests / Evidence | `docs/specs/work/engineering/TESTS.md` — T-001 diff-0, T-002 typecheck EXIT:0, T-003 frame-ship intact | done |
| Docs | `PROPOSAL.md` + `PLAN.md` + `TESTS.md` in `docs/specs/work/engineering/` | done |
| Gate report | `docs/specs/work/reviews/agents-001/REVIEW.md` — OPEN, 6/6 APPROVE + 6 reviewer files | done |
| PR | https://github.com/deuriib/pi-deu/pull/2 (`revert/restore-agents-from-24c090f` → `main`) | done (open, awaits merge) |

## the done checklist Checklist

- [x] Acceptance criteria satisfied (all domains) — agents usable again, frame-ship intact
- [x] Tests/evidence linked per REQ-ID — REQ-001→T-001, REQ-002→T-002, REQ-003→T-003, all in TESTS.md with commands
- [x] Load evidence present — skills loaded: `propose`, `build`, `open-a-pull-request`, `review`, `verify` (paths cited); execution_mode: single lane isolated branch per approved PROPOSAL (deviation from `subagents` default recorded here, not silent: restore-only unit, no parallel lanes needed, full 6-reviewer wave still run with skeptic-before-tests)
- [x] Domain checks passing — Engineering appendix below, all green
- [x] Security checks passing — N/A (no auth/data/API/PII/secret surface); recorded in PROPOSAL, no skip
- [x] Documentation updated — PROPOSAL/PLAN/TESTS/REVIEW; changelog N/A (internal-only restore, no user-facing behavior; merge release note will cite PR #2)

### Engineering appendix

- [x] Lint passes — N/A (markdown-only; no lint config in repo)
- [x] Type checks pass — `npm run typecheck` (`tsc --noEmit`) EXIT:0
- [x] Coverage floors as declared — N/A with justification (no test runner; markdown-only)
- [x] Every Test ID recorded in TESTS.md — T-001..T-003 pass
- [x] No TODO/FIXME in change — restore + docs only

### C4 evidence-link check

- REQ-001 → `git diff 72b0adb -- agents/ | wc -l` = 0 + 74/74 count — present, resolves, relevant — PASS
- REQ-002 → `npm run typecheck` EXIT:0 — present, resolves, relevant — PASS
- REQ-003 → skill grep hits + pi-* pins — present, resolves, relevant — PASS
- Zero PII/secrets/tokens in handoff/rounds/exports. No C4 FAILs.

## Blockers / Open Questions

- None blocking. Follow-up (non-blocking, out of scope): decide source of truth — C-level `agents/` vs frame-ship `skills/` (keep/archive/merge). Owner: engineering lead.
- Pre-existing `M SYSTEM.md` (CRLF-only, content-empty diff) left unstaged throughout — flagging so it isn't mistaken for part of this unit.

## Next Agent

`frame-ship:release` — merge PR #2 (squash or single merge, no force-push), note restore in release/merge notes, verify `agents/` present on `main` post-merge.

`SPEC:docs/specs/work/engineering/PROPOSAL.md#REQ-001..003 / HARD:single-lane+scoped-restore-only / GATE:OPEN / DOMAINS:[engineering]`
