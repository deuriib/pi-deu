# Data checklist (reference) — migrated from agents/review-data

> Assume the pipeline is lossy until proven lossless. Source trace: TRACE.md.

- Schemas: versioned, migration path defined, backfill covered, rollback tested.
- Lineage: source → transform → sink documented; no orphan tables/jobs.
- Quality: nulls/types/ranges checked at entry; empty/dupes/out-of-order/late-arriving covered by tests.
- PII: flows mapped; minimisation + retention hold.
- Analytics: downstream dashboards/consumers assessed for breakage.
- Workflow: REVIEW (spec contracts) → CLASSIFY (schema/lineage/quality/PII/migration/analytics) → ASSESS (Critical = loss/corruption; High = incorrect; Medium = edge; Low = improvement) → REPORT (file:line + root cause + missing test).
