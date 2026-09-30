# run-the-tests — agents-migration

**Reviewer:** run-the-tests | **Date:** 2026-09-30 | **Verdict:** APPROVE
**Scope:** frozen Test Plan, re-run 2026-09-30 on `spec/agents-migration` post-delete

## Results

| Test | Command | Result |
|------|---------|--------|
| T-001 | 15/15 TRACE files exist non-empty | pass |
| T-002 | `ls agents` → no such file | pass |
| T-003 | code/config grep `agents/` → only `pi-subagents` package paths; rest historical docs | pass |
| T-004 | `npm run typecheck` → EXIT:0 (pre- and post-delete) | pass |
| T-005 | `pi.subagents.agents` → ABSENT (pi keys: extensions/skills/prompts) | pass |
| T-006 | strict name grep over 15 migrated files → clean | pass |
| E-001 | 74 `file.md` rows in AUDIT | pass |
| E-004 | ADR-0006 present | pass |

## Findings (0)

- No skipped/flaky tests; N/A floors justified (markdown-only + typecheck sole gate).
- Suite green before done; E-002/E-006 sign-offs recorded in AUDIT + TESTS.
