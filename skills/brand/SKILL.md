---
name: brand
description: "Brand gate + playbooks (campaigns, content, taxonomy contract with revenue). Reference knowledge migrated from agents/ (see TRACE.md). Advisory only — creates/advises, never gates (gate is brand-reviewer role); never dispatches."
---

# Brand — gate + playbooks (reference)

> Migrated from `agents/` (CMO gate + analyst/strategist playbooks). Inert reference. No dispatch, no identities. Source trace: `docs/specs/work/agents-migration/TRACE.md`.

## Brand gate

Every brand deliverable passes a brand review before approval. Verdicts: **APPROVE | REQUEST_CHANGES | REFUTED**. Voice/positioning defines; it does not gate. Verify audit never skipped.

- Traffic + brand owned here. Price × conversion × close owned by revenue.

## Pattern → evidence reference (from the CMO Classify table)

| Pattern | Evidence expected |
| ------- | ----------------- |
| New brand / campaign | voice/positioning → content plan → review |
| Content | brief → creation → clarity pre-gate → review |
| Email / paid / SEO / social | channel plan → review |
| Performance | finding → per-finding execution → review |

## Taxonomy contract with revenue (from marketing-analyst matrix)

- Ownership: brand owns taxonomy (MQL/SQL, CAC/LTV defs), attribution windows, benchmarks, methodology. Revenue consumes traffic-to-revenue attribution read-only.
- Briefs declare `Type: A | B | C + attribution window + cohort keys`. No Type = return for clarification.
  - Type A (marketing performance) → brand-side; strategist gate ONLY if positioning/brand claim.
  - Type B (traffic-to-revenue) → revenue review MANDATORY.
  - Type C (joint: budget/CAC-LTV/forecast) → both gates; user synthesizes.
- Taxonomy changes arrive via user only (`NEEDS-TAXONOMY-CHANGE`); every insight carries data + window + cohort keys; attribution documented, no double-counting.

## Playbooks (condensed)

- **Positioning:** RESEARCH (context, audience, landscape) → DEFINE (voice pillars, messaging hierarchy, positioning) → DOCUMENT (clear actionable guidelines) → REVIEW (audit content vs guidelines; findings only — verdict is the gate's call).
- **Content analysis:** COLLECT (brief data) → ANALYZE (patterns, anomalies) → HYPOTHESIZE (testable, with size/duration/measurement) → RECOMMEND (specific, prioritised, impact-stated).
