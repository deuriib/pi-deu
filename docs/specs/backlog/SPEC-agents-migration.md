# Spec: selective migration agents/ → skills, then delete agents/

**ID:** SPEC-agents-migration (filename: `SPEC-agents-migration.md` in `docs/specs/backlog/`)
**Owner:** engineering owner
**Domains-Touched:** [engineering]
**Brief Reference:** GOAL-agents-migration
**Status:** draft
**Priority:** P1
**Execution_Mode:** subagents (inherited from brief, frozen at agree-the-goal)

## 1. Context

`agents/` holds 74 C-level persona files restored to `main` (PR #2) but with zero runtime wiring (`pi.subagents.agents` was removed in `24c090f`; `SYSTEM.md` never references them). They overlap the frame-ship chain: mirrored review criteria, duplicated roles, a competing dispatch authority (vasquez-router vs orchestrator). This spec turns GOAL-agents-migration into testable requirements: audit every file against written verdict criteria, migrate only unique knowledge into skills (hybrid), delete `agents/` entirely, and seal chain authority with an ADR.

## 2. Requirements

- REQ-001: Audit matrix covering 74/74 files in `agents/`, each with verdict migrate / duplicate / obsolete per §4 criteria, plus deu spot-check of a sample before any migration or deletion.
- REQ-002: Every unique item migrated to its skill home with a file→skill trace table (enrich existing `references/` where a home exists; new domain skill only where homeless per the §4 threshold rule).
- REQ-003: `agents/` directory deleted entirely, all repo references to it cleaned, `npm run typecheck` green, delivered via branch + reviewed PR (never direct-to-main).
- REQ-004: ADR merged in `docs/specs/decisions/` recording frame-ship as sole dispatch authority and agents-content as reference-only past.
- REQ-005: Zero new duplication — migrated content is single-sourced against `skills/` + `SYSTEM.md` guardrails (no second copy of review criteria, TDD/DDD/SOLID prose, or generic role descriptions).
- REQ-006: No router rewiring (`pi.subagents.agents` stays absent; vasquez/CEO dispatch tables migrate as inert reference tables only) and personal-name identities dropped or tokenised (no names in migrated content).

## 3. Acceptance Criteria

- [ ] AC-001: audit matrix present with 74 rows, verdict per file, criteria cited per row; spot-check sample signed by deu (evidence: `docs/specs/work/engineering/evidence/` + sign-off).
- [ ] AC-002: migration trace table file→skill complete; every migrated block reachable from its skill's `SKILL.md` or `references/` index (evidence: trace table + grep).
- [ ] AC-003: `ls agents` fails on `main`, repo-wide grep for `agents/` shows only historical mentions, `npm run typecheck` EXIT:0 (evidence: merged PR + CI/typecheck log).
- [ ] AC-004: ADR file `docs/specs/decisions/NNNN-<slug>.md` merged (evidence: file on `main`).
- [ ] AC-005: reviewer attests no duplicated block vs `skills/review/`, guardrails, or sibling skills (evidence: review verdict).
- [ ] AC-006: package config contains no `subagents.agents` wiring; migrated content contains zero personal names (evidence: grep audits).

## 4. Contracts & Interfaces

### Verdict criteria (audit)

- **migrate (unique):** per-change-type classify/dispatch tables (vasquez/montero patterns) as inert reference; review-wave minimal-vs-full + refuter-before-QA rules not already in `skills/review/`; QA flaky N=2 loop; domain checklists/workflows with concrete thresholds, regimes, or jurisdiction specifics (cash/liquidity, pricing margin floors, DGII/e-invoicing, Ley 172-13 handling); role/tool boundary lines ("does NOT … (see X)") with no existing home.
- **duplicate:** review criteria mirroring `skills/review/` checklists; TDD/DDD/SOLID/hexagonal prose already in guardrails; generic role/persona descriptions.
- **obsolete:** live-router wiring (vasquez/barrera/CEO dispatch chains, `maxSubagentDepth`, `pi.subagents` refs); `/deu` command refs; personal-name identities; `lib/system-prompts.ts` loader refs.

### Target mapping (hybrid)

- Home exists → enrich that skill's `references/` (e.g. wave rules → `skills/review/references/`; TDD discipline → `skills/build/references/`; classify tables → `skills/propose/references/` or `start-here` as reference tables).
- Homeless → new domain skill only if ≥3 cohesive unique items share a domain with no home; otherwise a `references/` file under the nearest skill. (Answers GOAL open question on threshold; amendable at propose.)
- Migrated blocks move faithfully (no rewrites; improvements are separate proposals) and are nameless (personal names dropped per INV-004).

### Design contract

- `docs/specs/design/DESIGN.md` gains INV-007 (sole dispatch, reference-only agents-content, ADR-pending) at this stage; the ADR itself lands at `check-design` per chain order.

## 5. Out of Scope

Per GOAL: router rewiring, content rewrites, `DESIGN.md` backfill beyond INV-007, version tag for the migration.

## 6. Dependencies

- Upstream: GOAL-agents-migration (approved 2026-09-30).
- Downstream: PROPOSAL (per-file plan + Test Plan) → check-design (ADR) → build (migrate + delete) → review → verify → merge.
- deu availability for spot-check sample + delete-list approval.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSAL.md (audit plan) | audit matrix + spot-check sign-off |
| REQ-002 | AC-002 | migration commits (file→skill) | trace table + grep reachability |
| REQ-003 | AC-003 | delete commit via PR | merged PR + typecheck log |
| REQ-004 | AC-004 | ADR file | file on `main` |
| REQ-005 | AC-005 | review wave | review verdict |
| REQ-006 | AC-006 | grep audits | grep logs (config + names) |
