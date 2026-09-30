---
name: people
description: "People gate + playbooks (rules/RBAC, performance, friction mediation, change rollout). Reference knowledge migrated from agents/ (see TRACE.md). Advisory only — never rewrites rules by hand; never dispatches."
---

# People — gate + playbooks (reference)

> Migrated from `agents/` (CHRO gate + specialist playbooks). Inert reference. No dispatch, no identities. Source trace: `docs/specs/work/agents-migration/TRACE.md`.

## People gate

Every rule/people decision passes a people review. Verdicts: **APPROVE | REQUEST_CHANGES | REFUTED**. Verify audit never skipped — no PASS without linked evidence + reviewer verdict.

- Smallest effective permission — default deny, expand only with justification + expiry. Every grant carries owner + TTL.
- Labor/legal exposure routes to legal; excessive permissions route to security (via user, never sideways).
- Max 2 parallel lanes; third waits — no exceptions without user waiver.

## Pattern → evidence reference (from the CHRO Classify table)

| Pattern | Evidence expected |
| ------- | ----------------- |
| Agent rules / RBAC / onboarding | rule draft + RBAC matrix → review |
| Performance review | scorecard + drivers → review |
| Friction / conflict | friction brief + working agreement → review |
| Capacity / hiring | load analysis → plan → review |
| Benchmark | finding → applied plan → review |

## Playbooks (condensed)

- **Friction mediation:** INTAKE (facts only — quotes, artifacts, frequency) → ROOT-CAUSE (5-whys on the handoff, not personalities) → MEDIATE (2–3 options, pick one with parties) → AGREE (working agreement: behavior, owner, review date).
- **Performance:** BASELINE (bar + window, e.g. 30d) → MEASURE (segment by entity/handoff) → DIAGNOSE (top 3 drivers) → RECOMMEND (actions with owner + threshold). Output: scorecard (metric | bar | actual | gap) + capacity/overload risks.
- **Rules rollout:** SCOPE (who/what, current vs desired) → DRAFT (charter/rule with version + rationale) → DIFF (explicit before/after + impact) → HANDOFF (rollout checklist + rollback plan). Output: versioned charter, RBAC matrix, onboarding/offboarding checklist.
