# goal file: Selective migration agents/ → skills, then delete agents/

**ID:** GOAL-agents-migration
**Initiator:** orchestrator
**Date:** 2026-09-30
**Status:** approved
**Execution_Mode:** subagents (frozen at agree-the-goal; trivial <50 lines goes by CEO small-task shortcut checkpoint-only, outside methodology)
**Domains-Touched:** [engineering]
**Classification:** big-new-direction (full GOAL file) — restructure of how parts fit (extract + delete 74 files); no downgrade
**Framings-Considered:** A (recommended): single-sweep migration — audit all 74 grouped by family (routers, implementers, reviewers-mirror, domain specialists), migrate only unique knowledge hybrid-style (enrich existing skills' `references/` where a home exists, new domain skill only where homeless), user spot-checks a sample of verdicts, then delete `agents/` entirely + verify typecheck. One SPEC cycle, value + cleanup together. B: router-first phased — migrate vasquez dispatch table + review-wave rules first (highest value), domain specialists in a second wave; two SPEC cycles, more control points, slower, two deletes. C: archive-first — move `agents/` out of the package now (kills the latent clash today), migrate from the archive at leisure; fastest risk removal but the archive risks becoming permanent limbo where value is never rescued. YAGNI cuts applied to all framings: no new skills for already-homed domains; no migration of duplicated review criteria (live in `skills/review/`); no migration of generic principles (live in guardrails); no rewiring of the vasquez router (dispatch authority stays with frame-ship, permanently).
**Approval:** file-approval — deu, 2026-09-30
**Period:** Q4 2026
**Owner:** orchestrator

## Problem Statement

`agents/` (74 C-level persona files, restored for use) and the frame-ship `skills/` chain are two overlapping org models sharing one repo: duplicated review criteria under identical names, duplicated roles, two competing dispatch authorities (vasquez-router vs orchestrator), and persona identities that contradict the pi-deu mentor. Today `agents/` is unwired and inert, so the clash is latent — but every session that reads both inherits the ambiguity. Deu experiences it as "which voice do I listen to"; the team pays it as drift the moment both are active.

## Desired Outcome

One operating system (frame-ship), zero ambiguity: every piece of genuinely unique domain knowledge from `agents/` lives in the skills where it belongs, everything duplicated or obsolete is gone with `agents/`, and the repo answers "who dispatches, who reviews, who am I" exactly one way.

## Objectives

### Objective 1: Unique domain knowledge rescued with traceability

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 | 0/74 files audited | 74/74 files with written verdict (migrate / duplicate / obsolete) | audit matrix with file→verdict, spot-checked by deu |
| KR-1.2 | 0 unique items migrated | every unique item (dispatch tables, wave rules, domain checklists, workflows) migrated to its skill home with file→skill trace | migration trace table; spot-check sample finds zero lost uniques |
| KR-1.3 | 0 | zero duplicated principles migrated (review criteria, TDD/DDD/SOLID, generic role prose stay single-sourced) | reviewer confirms no new duplication vs `skills/` + guardrails |

### Objective 2: Duplication eliminated, repo clean

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 | `agents/` 74 files on `main` | `agents/` absent, no dangling references in docs/config/package | `ls agents` fails; grep `agents/` across repo returns only historical mentions |
| KR-2.2 | typecheck green with agents present | typecheck green after delete | `npm run typecheck` EXIT:0 |
| KR-2.3 | 0 | all deletions reviewed via branch + PR, never direct-to-main | PR record with gate verdict |

### Objective 3: Chain authority preserved and recorded

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-3.1 | boundary stated in chat only | ADR in `docs/specs/decisions/` recording frame-ship as sole dispatch + agents as reference-only past | ADR file merged to `main` |
| KR-3.2 | 0 | no router rewiring (`vasquez` dispatch tables migrate as reference tables, never as live routers) | grep proves no `subagent` dispatch wiring added to package config |

## Scope

### In Scope

- Audit of all 74 files in `agents/` with per-file verdict [engineering]
- Migration of unique items into skills (`references/` enrichment + new domain skills only where homeless) [engineering]
- Full deletion of `agents/` + reference cleanup + typecheck green [engineering]
- ADR recording the authority boundary [engineering]

### Out of Scope

- Rewiring any agents-router into the runtime (vasquez stays a reference table, never a dispatcher)
- Rewriting migrated content (move faithfully; improvements are separate proposals)
- `DESIGN.md` backfill (known gap, separate initiative)
- Version tag for this migration (merge-note suffices unless release owner decides otherwise)

## Stakeholders

| Role    | Agent                                    | Involvement        |
| ------- | ---------------------------------------- | ------------------ |
| Sponsor | orchestrator                             | Decision authority |
| Owner   | engineering owner                        | Delivery ownership |
| Touched | deu (user)                               | Spot-check verdicts + approve delete list |

## Constraints

- Budget: no new runtime dependencies; markdown + docs only
- Timeline: single SPEC cycle (framing A); engineering owner confirms feasibility at requirements
- Dispatch authority stays with frame-ship — non-negotiable, ADR-sealed
- Deletions via branch + PR with review; never direct-to-main; `npm run typecheck` green throughout
- No PII in migrated content: personal-name personas migrate as nameless role tables (tokenise per product guardrail)

## Open Questions

- [ ] New-skill threshold: how much homeless content justifies a new skill vs a `references/` file? (owner: engineering owner, at requirements)
- [ ] Spot-check sample size + which families deu reviews (owner: deu, at audit)
- [ ] Fate of personal-name router personas (vasquez/barrera/...): migrate tables only, drop names entirely? (owner: deu, at audit)
