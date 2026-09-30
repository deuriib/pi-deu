# check-what-could-break (risk) — agents-migration

**Reviewer:** check-what-could-break | **Date:** 2026-09-30 | **Verdict:** APPROVE (1 explicit residual)

## Findings (0 blocking)

- New-skills load surface: 5 SKILL.md added under registered `./skills` — additive, no config change needed, no existing skill modified (references-only enrichment elsewhere). Malformed-reference risk covered by T-001 reachability + typecheck.
- External surface: none — no endpoint/adapter/dependency/secret change.

## Residual risk (explicit, owned)

- 13 duplicate-verdicts rest on tie-rule + family pattern without individual full reads (credit, investment, risk-analyst, legal-researcher, content, email, ppc, seo, social, writer, people/revenue/brand reviewers, devops). Deu signed the rule + 6 of the hardest dup-calls in the sample (backend, qa, security, data-engineer, cost-analyst, copywriter). Recovery: full content in git history, one `git revert` away. Owner: engineering lead. FLAG-3 recalibration stands.

**Residual-risk:** possible missed unique in 13 tie-rule files + owner engineering lead (recoverable from history, no silent loss claimed).
