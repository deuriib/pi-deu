# check-correctness (reliability) — agents-001

**Reviewer:** check-correctness | **Date:** 2026-09-30 | **Verdict:** APPROVE
**Scope:** restore commit `4ebc9cb` on `revert/restore-agents-from-24c090f`, PR #2

## Findings (0)

- Restored tree byte-identical to parent `72b0adb`: `git diff 72b0adb -- agents/ | wc -l` = 0, 74/74 files.
- No other implementation path touched: staged set = `agents/` + `docs/specs/work/engineering/{PROPOSAL,PLAN,TESTS}.md` only. `SYSTEM.md` (CRLF-only dirty) left unstaged.
- `pi-*` externals untouched (`@earendil-works/pi-*` intact in package.json); no import pulls from `agents/` (markdown-only).

## Evidence

- `git diff 72b0adb -- agents/` → 0 lines; `ls agents | wc -l` → 74.
- `git diff main...HEAD --stat` → 77 files, additive-only (+4467).
