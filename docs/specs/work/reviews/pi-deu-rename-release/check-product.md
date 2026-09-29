# Product Review: SPEC-pi-deu-rename-release

**Reviewer:** check-product (product owner)
**Date:** 2026-09-29
**Verdict:** APPROVE

## Checklist

- [x] Problem statement names a user, a moment, and the cost of the status quo (GOAL: maintainer en momento de release, costo = publish con nombre wrong + deriva manual)
- [x] Every claim in the framing attributed, and every source opened and read (framings A/B/C con trade-offs en GOAL)
- [x] Discovery artefacts present, each carrying `qué aprendimos` and `a quién hay que avisar` (N/A + justificación: rename mecánico, sin discovery de usuarios; aviso = CHANGELOG migración)
- [x] Human sources tokenised; no name, email, or account id in any file
- [x] Purpose, TTL, deletion procedure, and the data subject's route to their rights declared (N/A — sin PII nueva)
- [x] Priority order carries a reason per rank, in the same sentence as the rank (P0: nombre wrong bloquea release)
- [x] Every de-prioritisation carries a written reason (Out of Scope con razones en SPEC)
- [x] Roadmap entries state confidence and evidence; no date presented as decided (sin fechas prometidas)
- [x] PRD carries the north-star metric, the non-goals, and at least one falsifiable acceptance criterion (AC-001..AC-005 falsables: grep/typecheck/pack/workflow o fallan)
- [x] North-star metric measures a user outcome, not shipped volume (`npm install -g pi-deu` funciona + publish con provenance)
- [x] The person who lost a ranking is named as told, with the reason, in the same session (N/A — sin rankings de personas)
- [x] No customer-facing copy written here — matiz: README/CHANGELOG tocan copy, pero es rename mecánico del mismo claim (mismo producto, nuevo nombre), sin claims nuevos, sin precio
- [x] No price, packaging, or tier composition set here
- [x] Commercial consequence recorded where a decision is customer-visible, with who was told and when (ruptura `.deu`→`.pi-deu` en CHANGELOG; owner renombra repo remoto tras merge)
- [x] No real personal data, no secrets, in the deliverable or its evidence

## Findings

| ID | Severity | Finding | Mitigation |
|----|----------|---------|------------|
| — | — | None. | — |

## Escalation

N/A (sin High/Critical, sin precio, sin claims nuevos).

## Verdict Rationale

Falsable y verificado: cualquier resto `deu` o workflow sin OIDC refuta la lane (E-003/E-005). APPROVE.

## A note on evidence hygiene

Citas a archivos y líneas (E-001..E-006, TESTS.md). Sin PII ni secretos.
