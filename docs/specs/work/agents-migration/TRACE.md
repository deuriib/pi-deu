# Migration Trace: agents/ → skills (REQ-002 / E-003)

**Date:** 2026-09-30 | **Lane:** `spec/agents-migration` | **Rule:** faithful move, nameless, dispatch-free. Agent-name attributions rewritten to role nouns (CFO/CRO/CLO/CHRO/CMO); T-006 grep clean.

## New skills (E-006: CREATE confirmed by deu)

| Source file(s) | Migrated block | Address |
|----------------|----------------|---------|
| dauhajre.md | SEC-CONDITIONAL gate (FIN-01/02/03), R1-R11 pattern→evidence, DGII/TSS calendar rule | `skills/finance/SKILL.md` |
| payroll-specialist.md, tax-specialist.md, accountant.md, treasurer.md | TSS/DGII/NIIF/liquidity workflows | `skills/finance/SKILL.md` playbooks |
| fpna-analyst.md, financial-analyst.md, internal-auditor.md, compliance-officer.md | Forecast/variance, KPI, audit, compliance playbooks | `skills/finance/SKILL.md` playbooks |
| montero.md | Revenue gate REV-01..04, R1-R6 pattern→evidence, margin-before-volume | `skills/revenue/SKILL.md` |
| pricing-strategist.md, funnel-optimizer.md, deal-closer.md, revops-analyst.md | COST→…→GUARDRAIL, MAP→…→TEST, QUALIFY→…→CLOSE, DEFINE→…→CADENCE | `skills/revenue/SKILL.md` playbooks |
| subero.md | Legal gate, R1-R9 pattern→evidence, jurisdiction rule, C1-C3 | `skills/legal/SKILL.md` |
| privacy-counsel.md, labor-counsel.md, ip-counsel.md, litigation-counsel.md, contract-drafter.md | MAP→…→VERIFY (Ley 172-13), Código playbook, IP/litigation/contract playbooks | `skills/legal/SKILL.md` playbooks |
| santana.md | People gate (least-privilege + TTL, max-2), Classify patterns | `skills/people/SKILL.md` |
| friction-mediator.md, performance-analyst.md, people-operations.md | INTAKE→…→AGREE, BASELINE→…→RECOMMEND, SCOPE→…→HANDOFF | `skills/people/SKILL.md` playbooks |
| vera.md | Brand gate, Classify patterns, taxonomy rule | `skills/brand/SKILL.md` |
| marketing-analyst.md | Dual-ownership + Type A/B/C matrix | `skills/brand/SKILL.md` taxonomy contract |
| brand-strategist.md | Positioning RESEARCH→…→REVIEW | `skills/brand/SKILL.md` playbooks |

## Enrichments (existing skills)

| Source file(s) | Migrated block | Address |
|----------------|----------------|---------|
| review-readability.md, review-reliability.md, review-resilience.md, review-risk.md | Clarity/Code/Domain lenses, correctness/resilience/risk lenses, verdict semantics (product-reviewer) | `skills/review/references/review-lenses.md` |
| review-refuter.md | Refutation patterns, ADR fidelity, RECEIVE→REPORT | `skills/review/references/refuter-lenses.md` |
| review-data.md | Schema/lineage/quality/PII/analytics checklist + CLASSIFY workflow | `skills/review/references/data-checklist.md` |
| finance-reviewer.md, security-reviewer.md, legal-reviewer.md | Norm-verification deltas | finance/legal skills + `check-security/references/security-gate.md` |
| automation-reviewer.md | ROI checklist (deduped to single instance) | `skills/build/references/roi-contract.md` (with espinoza INV-A-02 + gate patterns) |
| architect.md | TDD-by-Design | `skills/build/references/tdd-by-design.md` |
| frontend.md | Working agreement + Capabilities | `skills/build/references/working-agreement.md` |
| vasquez.md | Classify table (dispatch column dropped), minimal/full wave, flaky N-2, CI-vs-infra, DoD | `skills/propose/references/classify-reference.md`, `skills/verify/references/definition-of-done.md` (+ wave rules live in review skill practices) |
| barrera.md, grc-analyst.md, iam-specialist.md, incident-responder.md | Security gate, control/register rule, IAM/IR pointers | `skills/check-security/references/security-gate.md` |
| privacy-engineer.md | PII checkpoint rule + retention tables + MAP→MINIMIZE→RETAIN→HANDOFF | `skills/check-security/references/security-gate.md` (appended post-review-catch) |
| product-writer.md, discovery-researcher.md, growth-analyst.md | PRD rollout notes + hard rules, disconfirmation rule, Type-A taxonomy | `skills/write-the-requirements/references/product-deltas.md` |
| people-reviewer.md, revenue-reviewer.md, brand-reviewer.md | — (gate pattern only; process lives in chain review) | nowhere (duplicate, see below) |

## Deliberately NOT migrated (duplicate / obsolete per AUDIT.md)

- Review criteria prose, TDD red-green prose, SOLID/DDD/pattern catalogs, generic role/persona boilerplate → duplicate of skills + guardrails (tie rule).
- All dispatch wiring (First-Task columns, `via X` routes, maxSubagentDepth, `/core/delegation-contract.md` refs, `/deu` command refs) → obsolete per INV-007.
- All personal identities (9 names + the false Microsoft affiliation in automation-engineer) → obsolete per INV-004; never quoted.
- Python stack + Better_Fullstack MCP (automation-engineer/reviewer) → vendor-specific, obsolete for this TS repo.
- personal-finance / personal-investor → consumer scope, obsolete.
- dauhajre C-01 PII rule → lives once in finance skill; not duplicated into check-security (tie rule).

## C-3 interpretation (recorded decision, not skip)

Security-review C-3 bans personal names in lane commit messages, PR bodies, and review/evidence files. This TRACE and AUDIT.md name source *files* (e.g. `dauhajre.md`) because E-003 requires a file→skill trace — a trace without filenames is unverifiable. Filenames here are provenance pointers, never identities/affiliations/endorsements. The shipped surface (`skills/`) is name-free per T-006. Reviewer judges intent at gate.
