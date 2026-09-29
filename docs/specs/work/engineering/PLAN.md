# Implementation Plan: BOOTSTRAP-MISSING-FILES

**Agent:** deu
**Date:** 2026-09-29
**Approved By:** user (`dale` 2026-09-29) + engineering owner vasquez (architecture-review Approved)
**Domains-Touched:** Legal, Engineering

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Add MIT LICENSE (holder from git config) | `LICENSE` | `docs/specs/work/engineering/TESTS.md` → E-001 | minutes |
| 2 | Add DESIGN.md singleton (template + 4-line-note grammar + contract map) | `docs/specs/design/DESIGN.md` | `docs/specs/work/engineering/TESTS.md` → E-002 | minutes |

Each step maps to one commit (REQ-001 → step 1, REQ-002 → step 2).

## Order of Operations

LICENSE first (independent, zero coupling), DESIGN.md second (references the now-present LICENSE path in its contract table). Neither depends on the other for validity; order is readability only.

## Rollback Points

- After step 1: `git rm LICENSE` restores baseline; DESIGN.md unaffected.
- After step 2: `git rm LICENSE docs/specs/design/DESIGN.md` full revert. Owner deu, ETA minutes.

## Quality Gates

- [x] Engineering: typecheck (`npm run typecheck`) green — only suite present, must stay green
- [x] Legal: standard MIT text, holder/year from git — routed to legal for sign-off before merge, no interpretation here
- [ ] Finance / Marketing / People / Revenue / Automation — deleted (untouched domains)
