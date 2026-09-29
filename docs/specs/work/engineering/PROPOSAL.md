# Proposed Changes: deu

**Spec Reference:** BOOTSTRAP-MISSING-FILES (no `docs/specs/backlog/SPEC-*.md` exists — bootstrap, see Rationale)
**Agent:** deu
**Date:** 2026-09-29
**Execution_Mode:** single-thread (no subagent tool in this runtime — start-here §3 fallback, same steps in-thread)
**Domains-Touched:** Legal, Engineering

## Summary

Create the two files blocking the chain: `LICENSE` (MIT, matches `package.json`) and `docs/specs/design/DESIGN.md` (canonical singleton referenced by README + guardrails). Repo otherwise untouched. This proposal only — no impl files modified.

## Changes

| Target | Change Type | Description |
| ------ | ----------- | ----------- |
| `LICENSE` | file-create | MIT text, Copyright (c) 2026 Deuri Vasquez (git author), matches `package.json` `license: MIT` + README badge/link |
| `docs/specs/design/DESIGN.md` | document-create | Singleton: 4-line-note grammar, contract map, structure, decision rule (changes need note in `docs/specs/decisions/`) |
| `docs/specs/work/engineering/PROPOSAL.md` | document-create | This file (proposal itself) |

## Rationale

`README.md` links `./LICENSE` and `docs/specs/design/DESIGN.md`; both absent (verified `find`, 2 attempts). LICENSE gap blocks any legal pass; DESIGN gap breaks the guardrail link + the 4-line-note grammar source. Minimal reversible docs-only fix, no behavior change.

## Alternatives Considered

| Alternative | Reason Rejected |
| ----------- | --------------- |
| SPDX-only (`package.json` license field, no file) | README link stays broken, legal evidence missing |
| Full license scan + header rollout | Out of scope — no deps audit requested, busywork theater |
| Fold DESIGN content into README | Violates singleton rule (guardrails: DESIGN.md canonical, README cites it) |

## Test Plan

> Docs-only — exempt from test-with-change per Testing discipline §12. Evidence attestation instead of code tests. Frozen at approval; `build` executes, never re-authors.

### REQ-ID to Test Mapping

| REQ-ID | Test ID | Scope / Path | Test Type | Expected Behavior / Boundary Checked |
| ------ | ------- | ------------ | --------- | ------------------------------------ |
| REQ-001 | E-001 | `docs/specs/work/engineering/evidence/` | Attestation | `LICENSE` exists, byte-identical MIT body, holder/year correct, `npm run typecheck` green (unaffected) |
| REQ-002 | E-002 | `docs/specs/work/engineering/evidence/` | Attestation | `DESIGN.md` exists at canonical path, defines `the-4-line-note` grammar, contract table matches README/guardrails refs, no PII/secrets |

### Declared Coverage Floors

| Metric | Floor Declared | Scope / Justification |
| ------ | -------------- | --------------------- |
| Line | N/A | Docs-only, no executable code touched — written justification per §2 |
| Branch | N/A | Same as above |
| Function | N/A | Same as above |
| Unit suite runtime | N/A | Only gate is `npm run typecheck`, must stay green |

### Test Environment & Setup

- **Prerequisites:** node ≥22.19, clean `git status` baseline for the 2 new files
- **Environment Variables:** none — never real credentials or PII
- **Cleanup & Isolation:** new files only; `git status --short` shows exactly `LICENSE` + `DESIGN.md` (+ this proposal); no other writes

## Approval Required From

- [ ] Owning domain lead: engineering owner `vasquez` (DESIGN singleton, per brief) + legal route for LICENSE (no legal advice by non-lawyers — surface + route)
- [ ] engineering owner (architecture/singleton impact — yes, DESIGN.md shared by many)
- [ ] security owner (auth/data/external-API/PII impact — no, neither file adds surface; record N/A)
- [ ] Test Plan present and covering every REQ-ID — yes (E-001, E-002)

> **Rule:** No repository file modifications during proposal phase. No external sends/filings/launches.

## Reviews

- `check-security`: N/A — no login, PII store, or outside service added (MCP URLs pre-exist, untouched).
- `check-design`: REQUIRED — DESIGN.md creates/changes the canonical singleton shared by many parts.

## Risk Assessment (condensed, per risk-assessment.md)

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Copyright holder/year wrong on LICENSE | Low | High (legal exposure) | Confirm `Deuri Vasquez / 2026` from git config + log before build; legal review before merge |
| R-002 | DESIGN.md drifts from guardrails/README (duplicate contract source) | Med | Med | Singleton only — cite guardrails by reference, never paste; verify every link resolves |
| R-003 | Over-scoping (license headers, full spec rewrite) | Med | Low | Freeze to 2 files; anything else = amendment, not build-stage decision |

**What else could break:** nothing runtime — docs-only. Teams: legal owns LICENSE sign-off; engineering owns singleton accuracy. Regulators/revenue/customers: none touched.
**Rollback:** `git rm LICENSE docs/specs/design/DESIGN.md` (2-file revert, owner deu, ETA minutes). Proposal itself stays as record.
**Security:** no new boundary, no secrets/PII in either file (tokenise if examples needed).
**Domain notes:** Legal — MIT text standard, route to legal, never interpret. Engineering — erasable-syntax+strict unaffected. Others deleted (untouched).

## C2 challenge hook

- Trigger: multi-domain (Legal + Engineering) + regulated mention (license) → one budgeted pass (≤3 Q) may fire on approver request; exit before decision = pause + `grill: exited`, proposal stays unapproved.
- Masking: no PII/secrets in round (Ley 172-13).
