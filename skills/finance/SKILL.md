---
name: finance
description: "Finance gate + playbooks (close, tax DGII, TSS payroll, treasury, FP&A, audit). Reference knowledge migrated from agents/ (see TRACE.md). Advisory only — never dispatches, never calculates as principal; all deliverables pass a finance review."
---

# Finance — gate + playbooks (reference)

> Migrated from `agents/` (CFO gate + specialist playbooks). Inert reference: patterns, gates, evidence rules. No dispatch, no identities. Source trace: `docs/specs/work/agents-migration/TRACE.md`.

## Finance gate — FIN-CONDITIONAL (blocking until satisfied)

Every financial deliverable passes a finance review against brief + norm (DGII/TSS/NIIF) + sources. Verdicts: **APPROVE | REQUEST_CHANGES | REFUTED**.

- **FIN-01 PII mask+TTL** — mask/tokenise PII at every port/adapter/event/log/prompt; every PII store declares purpose + TTL + deletion; exports allowlisted evidence only.
- **FIN-02 fraud verbatim** — suspected fraud/material misstatement escalates immediately to the user; no calculation, no sideways routing.
- **FIN-03 per-row evidence** — every delivered unit links evidence (execution trail, artifacts) with file:line; models document assumptions + audit trail.
- Sequenced max-2; reviewer + verify audit never skipped. Gate N=2 loop: REQUEST_CHANGES → rework once differently → still not APPROVE → escalate. DGII/TSS deadlines enter every tax/payroll task as hard calendar constraints, not "ASAP".

## Pattern → evidence reference (from the CFO Classify table)

| Pattern | Evidence expected |
| ------- | ----------------- |
| Monthly close | close checklist + reconciliations + statements |
| Tax filing | DGII forms (ITBIS/ISR/withholdings) + calendar proof |
| Payroll | payroll register + TSS (ARS/AFP/SFS) calculations + payslips |
| Budget / forecast | budget + scenarios (base/optimistic/pessimistic) + variance report |
| Cost / KPI analysis | analysis + margin evidence + recommendations |
| Cash / treasury | forecast + AR/AP aging + liquidity risk |
| Credit / investment / risk | assessment + terms + risk register entry |
| Internal audit | audit plan + control tests + findings with severity |

## Playbooks (condensed)

- **Close (NIIF):** RECORD (journal + source doc) → RECONCILE (bank/sub-ledger) → CLOSE (adjustments, accruals, depreciation) → REPORT (balance sheet, income, cash flow).
- **Treasury:** FORECAST (in/outflows) → OPTIMIZE (position cash, keep minimum reserves) → MANAGE (pay/collect/transfer) → REPORT (position + risks; liquidity risks reported immediately).
- **Payroll (TSS):** COLLECT (attendance/bonuses) → CALCULATE (gross/deductions/net) → DEDUCT (TSS + withholdings at current rates) → PAY (on time) → REPORT (TSS filings + payslips). Compensation is confidential; every calculation traceable.
- **Tax (DGII):** CALCULATE (obligation per activity/period) → COMPLY (accurate returns, on time) → PLAN (legal optimisation only, never evasion) → DOCUMENT (every position supportable if audited).
- **FP&A:** GATHER (history/plans/assumptions) → MODEL (revenue/costs/cash) → FORECAST (3 scenarios) → VARIANCE (actuals vs plan + explanations + corrective actions).
- **Analysis:** COLLECT → ANALYZE (KPIs, patterns) → INSIGHT (drivers, trends) → RECOMMEND (specific, implementable, data-backed).
- **Internal audit:** PLAN (scope/controls/risks) → TEST (control tests + evidence) → ANALYZE (severity + root cause) → REPORT (findings + remediation + timelines). Never audit own work.
- **Compliance:** gaps before violations; every risk has control + owner + evidence cadence; acceptance signed (who/why/expiry), never verbal.
