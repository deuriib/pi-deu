# ROI contract (reference) — migrated from the agents/ automation gate

> Every automation carries evidence of ROI. Source trace: TRACE.md.

- Mandatory per automation: before/after metric, expected saving/time, validation method + evidence (commits, artifacts, execution trail).
- Production bar: typed, tested, error-handled (fail-fast, no silent failures), documented; env managed (virtualenv, locked deps).
- Review verifies brief + ROI contract + production quality; verdict APPROVE | REQUEST_CHANGES | REFUTED. No close with Crit/High open.
- Patterns (inert): MVP/scaffold, glue-code, low-code workflow, ops mechanics (via infra role + verify), ROI-only analysis. Scope discipline: deliverable matches brief, no gold-plating, cross-domain impacts flagged.
