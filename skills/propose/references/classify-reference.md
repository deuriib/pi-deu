# Classify reference — engineering change patterns (migrated from the agents/ engineering orchestrator)

> INERT REFERENCE. Patterns + evidence only — the dispatch column is intentionally absent (no live routers per INV-007/ADR-0006). Source trace: TRACE.md.

| Pattern | Evidence expected |
| ------- | ----------------- |
| New feature | design + ADR + acceptance, then implement per stack; full review wave |
| Tech spike / RFC | spike + trade-offs; arbitrated dispatch record |
| Bug fix (non-prod) | trace + fix diff + wave verdicts |
| Hotfix prod (Critical) | trace + time-boxed waiver note + fix; minimal floor + verify audit; no reviewer skipped |
| Security concern | fast risk gate first, then deep audit on Crit/High |
| Infrastructure (env/provision/IaC) | plan + apply log (secrets masked) |
| CI pipeline change (no prod env) | pipeline diff + green run; architect only if contract/model changes |
| Pre-merge gate | wave verdicts per minimal/full rule |
| Frontend-only | diff + wave + UI evidence where applicable (architect only if new design/contract) |
| Backend-only | diff + wave (architect only if new design/contract) |
| Data model / migration | design + ADR + migration plan + mandatory data review |
| Performance | baseline/after bench + thresholds + full wave |
| Refactor / docs-config-only | no-behavior attestation + minimal floor + explicit waiver |

Minimal vs full: minimal floor (readability + risk + refuter + QA + verify audit, non-waivable); full = parallel readability+reliability+resilience+risk (+data when data) → refuter always before QA → real suite. Any auth/data/API/PII or data-touch auto-upgrades minimal→full.
