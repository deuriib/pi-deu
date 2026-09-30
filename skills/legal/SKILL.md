---
name: legal
description: "Legal gate + playbooks (research, contracts, compliance, privacy Ley 172-13, labor, IP, litigation). Reference knowledge migrated from agents/ (see TRACE.md). Advisory only — interprets, never enforces technically; never dispatches."
---

# Legal — gate + playbooks (reference)

> Migrated from `agents/` (CLO gate + counsel playbooks). Inert reference. No dispatch, no identities. Source trace: `docs/specs/work/agents-migration/TRACE.md`.

## Legal gate

Every legal deliverable passes a legal review (brief + norm + citations). Verdicts: **APPROVE | REQUEST_CHANGES | REFUTED**. Sequenced max-2; reviewer + verify audit never skipped. Gate N=2 loop: REQUEST_CHANGES → rework once differently → still not APPROVE → escalate. Imminent litigation or breach escalates same session, no deferral.

- Every analysis states jurisdiction + risks + limitations; evidence linked per unit.
- Interpretation only: technical enforcement / deep audit routes to security (never to implementers directly).

## Pattern → evidence reference (from the CLO Classify table)

| Pattern | Evidence expected |
| ------- | ----------------- |
| Legal research | findings (+ drafter → reviewer if artifact needed) |
| Contract | drafted contract + risk-clause notes → review |
| Compliance | compliance assessment → review |
| Privacy / data protection (Ley 172-13) | privacy review → review (interpret-only) |
| Labor | labor assessment → review |
| IP | IP assessment → review |
| Litigation / dispute | strategy + cost-benefit → review |
| Imminent litigation or breach | fast track + same-session escalation |

## Playbooks (condensed)

- **Privacy (Ley 172-13):** MAP (all personal-data flows + processing) → ASSESS (compliance per statute) → DRAFT (notices, policies, consent) → VERIFY (all flows covered, all risks remediated). Rules: privacy by design; lawful basis per processing; minimisation; cite specific articles; flag every flow lacking legal basis.
- **Labor (Código de Trabajo):** ASSESS (relationship + regulations) → DRAFT (contracts/policies per Código) → REVIEW (compliance) → ADVISE (risks + obligations). Rules: code favors employee — interpret accordingly; reference specific articles; consider TSS obligations.
- **IP:** AUDIT (assets + protection status) → PROTECT (register, secure, license) → ENFORCE (infringement/misuse) → MONITOR (portfolio + renewals).
- **Litigation:** ASSESS (dispute, parties, claims, law) → STRATEGIZE (defense/prosecution + alternatives) → ESTIMATE (timelines, costs, probabilities) → RECOMMEND (risk/reward incl. settlement comparison).
- **Contracts:** ANALYZE (parties, jurisdiction, terms) → STRUCTURE (clauses first) → DRAFT (complete) → REVIEW (brief coverage, mark risk clauses).
- **Compliance programs:** gaps before violations; control matrix (control | owner | evidence | cadence); risk register (risk | likelihood | impact | owner | treatment).
