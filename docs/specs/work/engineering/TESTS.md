# Test / Evidence Matrix: restore agents/ from 24c090f^

**Agent:** engineering lead
**Date:** 2026-09-30
**Domains-Touched:** engineering

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-001 | T-001 | `agents/` byte-identical to parent `72b0adb`: `git diff --cached 72b0adb -- agents/ \| wc -l` = 0, 74/74 files; `git status` shows no other staged paths | Regression | pass | revert/restore-agents-from-24c090f (restore commit, see log) |
| REQ-002 | T-002 | `npm run typecheck` (`tsc --noEmit`) exits 0 on restored tree | Regression | pass | same as above |
| REQ-003 | T-003 | frame-ship intact (`skills/start-here|propose|build` present, `frame-ship` greps), `pi-*` externals unrenamed (`@earendil-works/pi-*` in package.json) | Architecture | pass | same as above |

Types: `Unit | Integration | E2E | Review | Sign-off | Attestation | Launch-check | Filing-proof`.

## Coverage Summary

- Unit coverage: N/A — markdown-only change, no test runner in repo (justification in PROPOSAL.md)
- Integration coverage: N/A — same
- Evidence coverage: 3/3 REQ-IDs with linked commands above
- Acceptance criteria covered: 3/3

## Raw Evidence

- `git ls-tree -r --name-only 72b0adb -- agents/ | wc -l` → 74; `ls agents | wc -l` → 74
- `git diff --cached 72b0adb -- agents/ | wc -l` → 0
- `npm run typecheck` → `tsc --noEmit`, EXIT:0
- `SYSTEM.md` shows `M` in status but `git diff SYSTEM.md` empty (CRLF warning only) — deliberately left unstaged, out of scope
