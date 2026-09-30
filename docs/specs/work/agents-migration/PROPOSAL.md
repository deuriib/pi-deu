# Proposed Changes: selective migration agents/ → skills (agents-migration)

**Spec Reference:** SPEC-agents-migration
**Agent:** engineering lead
**Date:** 2026-09-30
**Execution_Mode:** subagents (single-lane audit, sequential; max 2 lanes if split by family)
**Domains-Touched:** [engineering]

## Summary

Audit all 74 files in `agents/`, migrate only unique knowledge into skills (hybrid: enrich existing `references/` where a home exists, new domain skill only where homeless per the ≥3-cohesive-items rule), then delete `agents/` entirely and seal chain authority with an ADR. Census-grounded: 9 router/gate files, 14 reviewers, 8 implementers, ~43 templated domain specialists (4303 lines total). Build order is rollback-safe: audit → migrate (additive) → verify → delete (destructive last).

Lane note: this proposal lives in `docs/specs/work/agents-migration/` (new lane) so the merged agents-001 lane (`docs/specs/work/engineering/`) keeps its audit trail intact.

## Changes

| Target | Change Type | Description |
| ------ | ----------- | ----------- |
| `docs/specs/work/agents-migration/AUDIT.md` | document-create | 74-row verdict matrix (migrate/duplicate/obsolete, criteria cited per row) + deu spot-check sign-off |
| `docs/specs/work/agents-migration/TRACE.md` | document-create | file→skill trace for every migrated block |
| `skills/review/references/*` | file-create | Provisional: wave minimal-vs-full rule, QA flaky N=2 loop, review lenses (DSA/design-principles/ADR-fidelity) where not already present |
| `skills/build/references/*` | file-create | Provisional: TDD discipline deltas, role/tool boundary lines with no home |
| `skills/propose/references/*` or `skills/start-here/references/*` | file-create | Provisional: vasquez classify table as inert reference (router wiring excluded) |
| `skills/verify/references/*` | file-create | Provisional: Definition-of-Done deltas |
| `skills/check-security/references/*` | file-create | Provisional: barrera Security Gate hard rules deltas |
| `skills/write-the-requirements/references/*` | file-create | Provisional: product-writer PRD anatomy deltas |
| `skills/<new-domain>/` | file-create (conditional) | New skill(s) ONLY where homeless AND ≥3 cohesive unique items AND deu confirms at spot-check; candidates: finance (dauhajre gate + treasury/fpna workflows), revenue (montero classify), product (jimenez gate), legal (subero gate), people (santana gate), brand (vera gate), automation (espinoza gate). Zero new skills is a valid outcome. |
| `agents/` (74 files) | file-delete | Full directory removal, last commit, after trace + typecheck green |
| `docs/specs/decisions/NNNN-<slug>.md` | document-create | ADR: frame-ship sole dispatch, agents-content reference-only (lands at check-design, before build) |
| Repo-wide refs to `agents/` | file-modify | Cleanup of any lingering references (docs/config) found by grep |

Change types: `file-create | file-modify | file-delete | document-create | ...`. Provisional mappings are confirmed or corrected by the build audit — the audit never widens scope (no rewrites, no rewiring, no new runtime code).

## Rationale

- Census shows the value is concentrated and identifiable: 9 gate/classify tables (vasquez 13-pattern table, barrera/dauhajre/espinoza/jimenez/montero/santana/subero/vera gates), review lenses, and domain workflows with thresholds/regimes — surrounded by templated filler (~43 specialists share one skeleton) and guardrail duplicates.
- Hybrid target (enrich-first, new-skill-by-threshold) obeys minimalismo: no pre-created skills, no second copies, deu confirms the new-skill list before anything is created.
- Delete-last ordering makes the destructive step trivially revertible (`git revert` the delete commit) with the migrated value already safe in skills.

## Alternatives Considered

| Alternative | Reason Rejected |
| ----------- | --------------- |
| Migrate everything (74 files as-is into skills or a legacy skill) | Reintroduces the duplication this initiative exists to kill; violates YAGNI cuts in GOAL |
| Delete first, rescue from git history later | Value rescue from history rarely happens (limbo risk, same objection as framing C); audit-first costs little, protects KR-1.2 |
| One new mega-skill `domain-agents` holding all rescued content | Creates a second org model by another name; defeats the authority boundary (INV-007) |
| Rewire routers live (`pi.subagents.agents` back) | Rejected permanently by GOAL scope + INV-007; dual dispatch returns |

## Risk Assessment

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Over-migration: duplicates re-enter skills as second copies | Med | Med | Verdict criteria in SPEC §4; E-005 no-dup attestation; default verdict on ties is duplicate, not migrate |
| R-002 | Under-migration: unique item lost in delete | Med | High | File→skill trace (E-003) + deu spot-check (E-002) before delete; delete is last commit, revertible |
| R-003 | Premature delete (before migration verified) | Low | High | Order frozen: audit → migrate → verify (trace + typecheck) → delete; any reorder = abort + escalate |
| R-004 | Rewrites creeping into faithful moves | Med | Low | Faithful-move rule (improvements are separate proposals); reviewer diffs migration against source |
| R-005 | New-skill sprawl (7 candidate domains → 7 skills) | Med | Med | ≥3-cohesive-items threshold + deu confirmation; zero new skills valid; enrich-first default |
| R-006 | Breaking a SKILL.md step contract via references | Low | High | References-only edits by default; any SKILL.md touch needs explicit propose approval; reachability grep (T-001) |

### What else could break

- Engineering: skill loading — a malformed reference file could confuse a step contract; mitigated by additive-only edits + reachability/typecheck gates. `agents-001` lane docs untouched (separate lane dir). `main` stability — all work on `spec/agents-migration` + reviewed PR, never direct-to-main.
- Teams: contributors referencing `agents/` personas lose them at delete; mitigated by migration trace (every rescued block has a new address) + PR description with the map.
- External surface: none — no endpoint, adapter, dependency, or secret change. Content note: migrated PII-handling guidance (privacy-counsel, Ley 172-13 specifics) is reference prose, not a data store; personal names are dropped at migration (REQ-006), shrinking exposure.

### Rollback Plan

- Before delete: `git revert` any migration commit individually (additive commits revert cleanly). Owner: engineering lead, ETA minutes.
- After delete: `git revert <delete-sha>` restores `agents/` byte-identical. Owner: engineering lead, ETA <1h.
- ADR/PROPOSAL/AUDIT docs revert trivially (docs-only).

### Security Considerations

Personal names in 9+ persona files are personal data in the loose sense: migration drops them (nameless role tables), never propagates them — net exposure decreases. No login/auth, no outside service, no secrets (grep-verified at T-005/T-006). Security owner reviews via required `check-security` (PII-adjacent content + names).

### Domain Considerations

- Engineering only. Finance/legal/marketing/people/revenue/automation-ops/product content migrates as reference knowledge, not policy — no domain-process change, no owner sign-off beyond engineering + security.

## Test Plan

> Required section, standard owned by `references/test-strategy.md`. Plan frozen at approval; results go to `TESTS.md` at build.

### REQ-ID to Test Mapping

| REQ-ID | Test ID | Scope / Path | Test Type | Expected Behavior / Boundary Checked |
| ------ | ------- | ------------ | --------- | ------------------------------------ |
| REQ-001 | E-001 | `docs/specs/work/agents-migration/AUDIT.md` | Attestation | 74 rows, exactly one verdict per file, criteria cited per row; negative: any file with zero or two verdicts = FAIL |
| REQ-001 | E-002 | spot-check sign-off | Sign-off | deu signs sample covering ≥1 file per family (routers, reviewers, implementers, specialists); negative: unsigned sample blocks migration |
| REQ-002 | E-003 | `docs/specs/work/agents-migration/TRACE.md` | Review | every migrated block has file→skill address; negative: orphan block (no address) = FAIL |
| REQ-002 | T-001 | skills tree | Regression | reachability grep: every TRACE address resolves to content present in the skill; negative: dead link = FAIL |
| REQ-003 | T-002 | repo root on lane branch | Regression | `ls agents` fails; negative: any surviving file = FAIL |
| REQ-003 | T-003 | repo-wide grep | Regression | grep for `agents/` returns only historical mentions (CHANGELOG/PR/decisions); negative: live reference = FAIL |
| REQ-003 | T-004 | repo root | Regression | `npm run typecheck` EXIT:0; negative: red = FAIL, no delete commit |
| REQ-004 | E-004 | `docs/specs/decisions/NNNN-<slug>.md` | Review | ADR merged, cites INV-007 + verdicts; negative: invariant without ADR blocks build (STOP per check-design) |
| REQ-005 | E-005 | migrated content vs skills/guardrails | Attestation | reviewer attests no second copy of review criteria, TDD/DDD/SOLID prose, or generic roles; negative: any duplicated block = remove, not keep |
| REQ-006 | T-005 | package config | Regression | grep shows no `subagents.agents` wiring; negative: wiring present = FAIL |
| REQ-006 | T-006 | migrated content | Regression | name grep (vasquez, barrera, montero, vera, santana, dauhajre, espinoza, jimenez, subero) clean; negative: any hit = FAIL |
| Edge | E-006 | new-skill decision | Review | threshold applied per domain, deu confirmation recorded — including the zero-new-skills outcome as valid |

### Declared Coverage Floors

| Metric | Floor Declared | Scope / Justification |
| ------ | -------------- | --------------------- |
| Line | N/A | Markdown + docs-only change; no test runner in repo. Justification: `typecheck` (T-004) is the sole executable gate; all else is attestation/review trace |
| Branch | N/A | Same as above |
| Function | N/A | Same as above |
| Unit suite runtime | N/A | No unit suite present |

### Test Environment & Setup

- **Prerequisites:** lane branch `spec/agents-migration` (created, pushed); HEAD has SPEC + REQ index + INV-007
- **Environment Variables:** none (never real credentials or PII)
- **Cleanup & Isolation:** delete commit is last and contains only `agents/` removal (+ ref cleanup); `git status` must show no unrelated paths at each commit; abort on scope drift

## Approval Required From

- [ ] Owning domain lead: engineering owner (mandatory; architecture + shared skill contracts impacted)
- [ ] security owner (personal names + PII-handling reference content)
- [ ] Test Plan present and covering every REQ-ID — yes: REQ-001→E-001,E-002; REQ-002→E-003,T-001; REQ-003→T-002,T-003,T-004; REQ-004→E-004; REQ-005→E-005; REQ-006→T-005,T-006; edge→E-006

reviews: check-security (required — names + PII-adjacent content) + check-design (required — INV-007 new invariant + shared `skills/` contracts). C2 pre-approval grill available on approver request; no separate round triggered beyond the two required reviews.

## C2 challenge hook

- Trigger checklist evaluated: PII-adjacent surface (personal names) → covered by required check-security; shared-contract change (skills/ + INV-007) → covered by required check-design; single-domain scope; blast radius stated without external-surface claims.
- Verdict: no standalone C2 round; the two required reviews carry the scrutiny. Approver-requested grill ≤1 extra pass on request.

---
*Propose phase: repo impl untouched except this file. No audit executed, no skill touched, nothing deleted. Awaiting yes before check-security/check-design.*
