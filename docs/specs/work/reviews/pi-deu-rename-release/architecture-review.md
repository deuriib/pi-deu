# Architecture Review: SPEC-pi-deu-rename-release

**Reviewer:** engineering owner
**Date:** 2026-09-29
**Verdict:** Approved

## Contract Compliance

| Invariant | Status | Notes |
|-----------|--------|-------|
| INV-001 | pass | Propuesta aprobada (blanket-approval ralph-loop); build solo tras este gate |
| INV-002 | pass | `pi-*` externos intactos; rename solo propio (`pi-deu-*`) |
| INV-003 | pass | Erasable TS strict preservado; sin `any`; `git mv` sin lógica nueva |
| INV-004 | pass | Sin secretos/PII en código; OIDC; ver security-review |
| INV-005 | pass | DESIGN.md actualizado in-place + ADR-0005 (este cambio SÍ crea componente release) |
| INV-006 | pass | Una lane secuencial; sin worktrees paralelos |

## DECISION Required?

- [x] Yes — `docs/specs/decisions/0005-rename-pi-deu-release-npm.md` created (nuevo componente release + cambio bin/configDir).

## Conditions for Approval

Ninguna. Build limitado a la lista cerrada de PROPOSAL.md; cualquier archivo extra = amend, no sneak-in.

## Sign-off

- [x] engineering owner (2026-09-29)
