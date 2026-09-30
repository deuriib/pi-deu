# Security Review: SPEC-agents-migration

**Reviewer:** security owner via check-security
**Date:** 2026-09-30
**Verdict:** Conditional (3 conditions, all already frozen in the Test Plan + one commit-hygiene rule below)

## Threat Model

**Methodology:** threat checklist

### Attack Surface

| Surface | Entry Point | Trust Boundary |
|---------|-------------|----------------|
| `agents/*.md` persona files (9+ personal names) | repo read / migration move | internal (repo) → internal (skills) |
| migrated skill `references/` content | skill loading at session start | internal |
| commit messages / PR bodies / logs during the lane | git history (immutable once merged) | internal → public (GitHub remote) |
| package config (`pi.subagents.agents`) | runtime subagent wiring | internal; must stay absent |

No login, no auth flow, no outside service, no secrets/credentials in scope (grep-verified markdown-only lane).

### threat checklist Analysis

| Threat | Applicable? | Mitigation |
|--------|-------------|------------|
| Spoofing | No | No identity/auth surface; personas are dropped, never assumed — nobody operates *as* vasquez/barrera after migration |
| Tampering | Yes | Faithful-move rule (PROPOSAL R-004) + reviewer diffs migration against source + file→skill trace (E-003/T-001) |
| Repudiation | Yes | Audit trail: per-step commits + AUDIT.md + TRACE.md + PR record; every moved block attributable to source file |
| Information Disclosure | Yes | Personal names (vasquez, barrera, montero, vera, santana, dauhajre, espinoza, jimenez, subero) dropped at migration (REQ-006/T-006); names banned from commits/PR bodies/logs (condition C-3). Residual: names persist in git history pre-delete — immutable, accepted (see Residual Risk) |
| Denial of Service | No | No runtime, queue, or endpoint change |
| Elevation of Privilege | Yes | Router tables migrate as inert reference only; `pi.subagents.agents` wiring stays absent (REQ-006/T-005) — agents can never self-promote to dispatchers |

### Residual Risk

Git history retains personal names in `agents/` files and past commits forever (history rewrite rejected — disproportionate + breaks audit trail). Owner: security owner. Accepted: exposure is to repo collaborators only, strictly decreasing from here (no new names, names purged from live tree at delete).

## Findings

| ID | Severity | Finding | Remediation |
|----|----------|---------|-------------|
| S-001 | Medium | 9+ personal names live in `agents/` and will transit the lane (audit matrix, trace, commits) | Migrate nameless (role tables only); T-006 name-grep gate; C-3 commit/PR hygiene; delete removes from live tree |
| S-002 | Low | PII-handling reference prose (privacy-counsel, Ley 172-13 specifics) moves into skills — reference, not a data store, but must never gain live PII examples | Faithful move only; reviewer rejects any example containing real identifiers; no PII in TESTS evidence |
| S-003 | Low | Router-table content could be re-activated as live dispatch by a future change | INV-007 + T-005 config gate + ADR (REQ-004); any future wiring is a new proposal with fresh security review |

## Conditions for Approval

- [ ] C-1: T-006 name-grep clean on all migrated content before the delete commit (names: vasquez, barrera, montero, vera, santana, dauhajre, espinoza, jimenez, subero).
- [ ] C-2: T-005 config gate — no `subagents.agents` wiring at any commit in the lane.
- [ ] C-3: zero personal names in lane commit messages, PR bodies, and review/evidence files (spot-checked at review; S-001).

## Sign-off

- [x] security owner (this review)
- [ ] engineering owner (architecture-impacting — countersign at check-design gate)
