# 0006-frame-ship-sole-dispatch-agents-reference-only

**Date:** 2026-09-30
**Deciders:** engineering owner, security owner (PII-adjacent content), deu (sponsor)
**Status:** accepted

## Context

PR #2 restored `agents/` (74 C-level persona files) with zero runtime wiring. Analysis showed two overlapping org models: the vasquez-router C-level org (classify/dispatch tables, review wave, 9 gate owners) vs the frame-ship skill chain (9 steps, orchestrator + domain leads). Overlaps: mirrored review criteria under identical names, duplicated roles, competing dispatch authorities, contradictory session identities. The clash is latent today (agents unwired) and activates on any rewiring. GOAL-agents-migration (approved 2026-09-30) chose selective migration: rescue unique knowledge into skills, delete the rest.

## Decision

1. Frame-ship is the sole dispatch authority (INV-007). No proposal, build, review, or merge dispatches through any agents-router, now or after migration.
2. `agents/` content is reference-only. Router/classify tables (vasquez, montero, jimenez, barrera, dauhajre, espinoza, santana, subero, vera gates) migrate as inert reference tables — never as live dispatch wiring. `pi.subagents.agents` stays absent from package config permanently unless a new ADR reverses this.
3. Unique knowledge migrates hybrid-style per SPEC-agents-migration §4 (enrich existing `references/` first; new domain skill only at ≥3 cohesive homeless items + deu confirmation). Duplicates and router wiring are deleted, not migrated.
4. Personal-name identities are dropped at migration (nameless role tables per INV-004); git history retains them immutably (accepted residual, security-review S-001).

## Consequences

### Positive

- Single answer to "who dispatches, who reviews, who am I" — the ambiguity ends with the delete commit.
- Review criteria and principles stay single-sourced; drift surface shrinks by ~4300 lines.
- Exposure to personal names strictly decreases (live tree purged; history accepted).

### Negative

- Loss of the C-level flavor (named personas, CEO-router ergonomics) — traded deliberately for chain authority.
- Future re-activation of agent dispatch requires a new ADR + fresh security review (intentional friction).

## Supersedes / Superseded By

- Follows 0004-design-singleton-bootstrap (DESIGN.md is the singleton this decision extends with INV-007).
- Does not supersede 0002/0003/0005.
