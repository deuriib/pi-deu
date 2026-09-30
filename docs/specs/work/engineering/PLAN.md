# Implementation Plan: restore agents/ from 24c090f^

**Agent:** engineering lead
**Date:** 2026-09-30
**Approved By:** user (2026-09-30 — "quiero que los agents vuelvan para usarlos") + engineering owner (self, scoped restore)
**Domains-Touched:** engineering

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Scoped restore `agents/` byte-identical from `72b0adb` (`24c090f^`) — no other paths | `agents/*.md` (70+ files) | `git diff 72b0adb -- agents/` + `git status --porcelain` | 15 min |
| 2 | Execute frozen Test Plan T-001..T-003, record results | `docs/specs/work/engineering/TESTS.md` | `TESTS.md` + typecheck log | 15 min |
| 3 | Commit restore (single commit, REQ trace in body), push branch, open PR | branch `revert/restore-agents-from-24c090f` | PR URL | 10 min |

Each step maps to one commit unless the plan explicitly groups them. Here Steps 1+2 group into one restore commit (same files, same REQs); Step 3 is push+PR (no new files).

## Order of Operations

Restore first (Step 1) because tests verify the restored tree. Tests second because they gate the commit. Commit last so the SHA in TESTS.md is final. No dependency on frame-ship skills, SYSTEM.md, or extensions — those stay untouched.

## Rollback Points

- Before commit: `git reset --hard HEAD && git clean -fd agents/` returns branch to proposal-only state (`989207e`). Owner: engineering lead.
- After commit, before merge: delete branch. Owner: engineering lead, ETA minutes.
- After merge: `git revert <restore-sha>` removes `agents/` again. Owner: engineering lead, ETA <1h.

## Quality Gates

- [ ] Engineering: Lint / Tests / Security / Type checks passing — `npm run typecheck` green, T-001..T-003 pass, evidence in TESTS.md
