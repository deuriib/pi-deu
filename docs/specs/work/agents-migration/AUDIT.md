# Audit Matrix: agents/ → verdict per file (REQ-001 / E-001)

**Auditor:** engineering lead | **Date:** 2026-09-30 | **Method:** full read of 25 files + H2 census of 74/74 + rare-section map + jurisdiction/threshold marker grep.
**Criteria:** SPEC-agents-migration §4 (migrate = unique w/ named skill home; duplicate = already in skills/guardrails; obsolete = router wiring, identities, vendor refs, out-of-scope).
**Confidence legend:** HIGH (read fully) · MED (heads + markers + family pattern) · LOW (census only — must be covered by spot-check).

## Family R — routers/gates (9): PARTIAL each (tables/rules migrate, identity + dispatch wiring obsolete)

| File | Verdict | Migrate what → where | Drop (obsolete) | Conf |
|------|---------|---------------------|-----------------|------|
| vasquez.md | partial | Classify 13-pattern table → propose/start-here refs (inert); Review Wave (minimal/full, split, flaky N=2, CI-vs-infra) + DoD → review/verify refs | identity, Hard-Rules dispatch, INV-01/02/04 numbering (chain has own) | HIGH |
| barrera.md | partial | Classify R1-R6 + Security Gate (SLA, N=2, secrets-mask) → check-security refs | identity, dispatch wiring | HIGH |
| dauhajre.md | partial | Classify R1-R11 + SEC-CONDITIONAL C-01/02/03 + DGII/TSS calendar rule → NEW finance skill | identity, dispatch wiring | HIGH |
| espinoza.md | partial | ROI contract INV-A-02 + Classify R1-R5 → build refs (or automation home if deu confirms skill) | identity, dispatch wiring | HIGH |
| jimenez.md | partial | North-star rule + Classify table → write-the-requirements refs (guardrail-dup parts stay out) | identity, dispatch wiring | HIGH |
| montero.md | partial | Classify R1-R6 + INV-REV-01..04 + margin-before-volume → NEW revenue skill | identity, dispatch wiring | HIGH |
| santana.md | partial | Classify + People Gate (least-privilege + TTL, max-2) → people home (new skill if deu confirms, else nearest refs) | identity, dispatch wiring | HIGH |
| subero.md | partial | Classify R1-R9 + Legal Gate (jurisdiction rule, C1-C3, R9 boundary) → NEW legal skill | identity, dispatch wiring | HIGH |
| vera.md | partial | Classify + Brand Gate + vera/montero boundary + taxonomy rule → brand home (new skill if confirmed, else refs) | identity, dispatch wiring | HIGH |

## Family V — review lenses (6): PARTIAL each (lenses migrate, generic prose duplicate)

All six → `skills/review/references/` as criteria files (that dir holds only verdict FORMS today — no criteria live there, so no duplication).

| File | Verdict | Migrate what | Drop (duplicate) | Conf |
|------|---------|--------------|------------------|------|
| review-readability.md | partial | Generic Clarity + Code (SOLID-readability) + Domain lenses (incl. COPY-never-judge-persuasion boundary) | generic principles prose | HIGH |
| review-reliability.md | partial | Review Focus + DSA Correctness lens | generic prose (family pattern) | MED |
| review-refuter.md | partial | Design-Principles + DSA Refutation + ADR Fidelity lenses, RECEIVE→REPORT workflow | generic prose | HIGH |
| review-resilience.md | partial | DSA Resilience + Architectural Patterns lenses | generic prose | MED |
| review-risk.md | partial | Focus list (attack surface, ports, secrets, deps) + pattern-risk lens | OWASP prose (guardrails cover) | HIGH |
| review-data.md | partial | Full checklist (schema/lineage/quality/PII/analytics) + CLASSIFY workflow | — (no existing home content) | HIGH |

Role reviewers (8): gate-verdict process is duplicate; domain checklist deltas migrate to respective homes.

| File | Verdict | Note | Conf |
|------|---------|------|------|
| automation-reviewer.md | partial | ROI checklist dedupes to espinoza INV-A-02 (migrate once); Python stack obsolete (TS repo); brief-compliance generic | HIGH |
| finance-reviewer.md | partial | DGII/TSS/NIIF verification deltas → finance home; REVIEW→VERIFY→ASSESS→VERDICT process duplicate | MED |
| product-reviewer.md | partial | Verdict semantics (state-what-checked, one-round-trip-per-gap, never-on-promises) + de-prioritisation rule → review/write-req refs; 7-item checklist duplicate (guardrails) | HIGH |
| security-reviewer.md | partial | Security-gate checklist deltas → check-security refs | LOW |
| legal-reviewer.md | partial | Norm+citation verification deltas → legal home | MED |
| people-reviewer.md | duplicate | Gate pattern only; no sampled deltas | LOW |
| revenue-reviewer.md | duplicate | Gate pattern only; no sampled deltas | LOW |
| brand-reviewer.md | duplicate | Gate pattern only; no sampled deltas | LOW |

## Family I — implementers (8)

| File | Verdict | Migrate what → where | Drop | Conf |
|------|---------|---------------------|------|------|
| architect.md | partial | TDD-by-Design (AC-are-tests, test seams, red→green trajectory, 1:1 mapping) + NEVER-delegate + trade-offs rule → build/propose refs | DSA catalogs, pattern catalogs, SOLID deep-dives (textbook/guardrails) | HIGH |
| backend.md | duplicate | — (TDD, SOLID, principles mirror guardrails/test-strategy; `via vasquez` wiring obsolete) | whole file | MED |
| frontend.md | partial | Working agreement (inputs-by-ref, evidence file:line, PII flow mapping) + Capabilities (least-privilege tool discipline, destructive-command ban) → build refs | TDD/principles (mirror) | HIGH |
| qa.md | duplicate | Lenses dedupe to review-* family (migrate once there); "run real suite" role = run-the-tests reviewer | whole file | MED |
| devops.md | duplicate | Lenses mirror family; CI-vs-infra covered by vasquez wave | whole file | MED |
| security.md | duplicate | Lenses mirror family; Reference-docs rule mirrors find-docs ethos | whole file | MED |
| data-engineer.md | duplicate | Skeleton-only per census; no markers | whole file | LOW |
| automation-engineer.md | partial | NOTHING new (ROI dedupes to espinoza); FLAG: identity block ("Ivan Espinoza, Senior en Microsoft") is a false affiliation — never migrate, never quote | identity (flagged), Python stack + Better_Fullstack MCP (vendor-specific, obsolete), Reglas de Oro (team-culture, out of scope) | HIGH |

## Family S — domain specialists (~43): playbook migrates, skeleton duplicates

Convention: persona/principles/responsibilities boilerplate is duplicate everywhere; verdict hinges on Workflow/Output/Hard-Rules specificity.

| File | Verdict | Migrate what → home | Conf |
|------|---------|---------------------|------|
| accountant.md | partial | NIIF close RECORD→RECONCILE→CLOSE→REPORT → finance | HIGH |
| treasurer.md | partial | Liquidity/AR-AP playbook → finance | MED |
| payroll-specialist.md | partial | TSS (ARS/AFP/SFS) COLLECT→…→REPORT → finance | HIGH |
| tax-specialist.md | partial | DGII (ITBIS/ISR) CALCULATE→COMPLY→PLAN→DOCUMENT → finance | HIGH |
| fpna-analyst.md | partial | Budget/forecast playbook (presumed) → finance | LOW |
| financial-analyst.md | partial | KPI analysis playbook (presumed) → finance | LOW |
| cost-analyst.md | duplicate | No markers; tie rule → duplicate | LOW |
| credit-analyst.md | duplicate | No markers; tie rule → duplicate | LOW |
| investment-analyst.md | duplicate | No markers; tie rule → duplicate | LOW |
| personal-finance.md | obsolete | Consumer scope, out of repo | LOW |
| personal-investor.md | obsolete | Consumer scope, out of repo | LOW |
| risk-analyst.md | duplicate | No markers; tie rule → duplicate | LOW |
| internal-auditor.md | partial | Audit-trail procedures (presumed) → finance | LOW |
| compliance-officer.md | partial | Compliance deltas (markers hit) → legal/finance | MED |
| privacy-counsel.md | partial | MAP→ASSESS→DRAFT→VERIFY (Ley 172-13) → legal | HIGH |
| labor-counsel.md | partial | Código de Trabajo playbook → legal | HIGH |
| ip-counsel.md | partial | IP playbook (presumed) → legal | LOW |
| litigation-counsel.md | partial | Dispute playbook (presumed) → legal | LOW |
| contract-drafter.md | partial | Contract drafting playbook (presumed) → legal | LOW |
| legal-researcher.md | duplicate | Research method mirrors find-docs ethos | LOW |
| product-writer.md | partial | PRD six: migrate rollout/rollback notes + hard rules only (5/6 duplicate guardrails); AC-are-tests dedupes to architect | HIGH |
| discovery-researcher.md | partial | Confront/disconfirm + handoff-packet rule; resto duplicate guardrails | HIGH |
| growth-analyst.md | partial | Type-A taxonomy + methodology; vanity/dark-patterns duplicate guardrails | HIGH |
| friction-mediator.md | partial | Mediation playbook (presumed) → people | LOW |
| performance-analyst.md | partial | Review/load playbook (presumed) → people | LOW |
| people-operations.md | partial | RBAC/onboarding playbook (presumed) → people | LOW |
| pricing-strategist.md | partial | COST→VALUE→STRUCTURE→GUARDRAIL + guardrails-not-vibes → revenue | HIGH |
| funnel-optimizer.md | partial | Funnel playbook (presumed) → revenue | LOW |
| deal-closer.md | partial | Deal playbook (presumed) → revenue | LOW |
| revops-analyst.md | partial | Forecast/hygiene playbook (presumed) → revenue | LOW |
| marketing-analyst.md | partial | Dual-ownership + Type A/B/C gate matrix → brand | HIGH |
| brand-strategist.md | partial | Positioning playbook (presumed) → brand | LOW |
| copywriter.md | duplicate | Voice craft, no sampled deltas | LOW |
| content-strategist.md | duplicate | No markers; tie rule → duplicate | LOW |
| email-marketer.md | duplicate | No markers; tie rule → duplicate | LOW |
| ppc-specialist.md | duplicate | No markers; tie rule → duplicate | LOW |
| seo.md | duplicate | No markers; tie rule → duplicate | LOW |
| social-media.md | duplicate | No markers; tie rule → duplicate | LOW |
| writer.md | duplicate | No markers; tie rule → duplicate | LOW |
| iam-specialist.md | partial | IAM/AuthN deltas (presumed) → check-security | LOW |
| incident-responder.md | partial | IR fast-track (presumed; barrera R4 refs it) → check-security | LOW |
| grc-analyst.md | partial | Control matrix + risk register + acceptance-memo rule → check-security | HIGH |

## Distribution

- partial: 47 · duplicate: 23 · obsolete: 4 (personal-finance, personal-investor + 2 identity/wiring-only extractions counted inside partials)
- Counts sum to 74 rows above (9 + 14 + 8 + 43).

## New-skill rollup (threshold ≥3 cohesive homeless + deu confirmation)

| Candidate | Evidence | Recommendation |
|-----------|----------|----------------|
| finance | dauhajre gate + payroll + tax + accountant + treasurer (+ fpna/financial/internal-audit provisionals) | CREATE |
| revenue | montero gate + pricing + funnel/deal/revops provisionals | CREATE |
| legal | subero gate + privacy + labor (+ ip/litigation/contract provisionals) | CREATE |
| people | santana gate + friction/performance/ops provisionals | BORDERLINE — deu decides (create vs nearest-refs) |
| brand | vera gate + marketing-analyst matrix + brand roles | BORDERLINE — deu decides |
| automation | espinoza ROI + gate (thin; engineer content obsolete) | ENRICH build (no new skill) |
| product | jimenez tables + growth taxonomy + writer/reviewer deltas (bulk duplicates guardrails) | ENRICH write-the-requirements/review (no new skill) |
| security | barrera/grc/iam/incident deltas (homes exist: check-security/review) | ENRICH (no new skill) |

## Spot-check sample proposed (E-002 — ≥1 per family + every LOW-confidence call that changes fate)

Must-read for deu: data-engineer, backend, qa, security (duplicate-calls on lens-family logic), cost-analyst, deal-closer, copywriter (tie-rule duplicates), vasquez (reference-table format), dauhajre (finance-skill content), review-refuter (lens-migration format). 10 files.

## Flags

- FLAG-1: automation-engineer identity ("Ivan Espinoza, Senior en Microsoft") — false affiliation, never migrate/quote (security S-001 context).
- FLAG-2: marketers' Type-taxonomy and revenue INV-REV numbering migrate as inert reference; numbering must not collide with chain INV-001..007 (prefix per skill, e.g. FIN-, REV-).
- FLAG-3: LOW-confidence verdicts (23 files) lean duplicate-by-tie-rule; if deu's sample overturns >30% of them, the rule recalibrates to partial and the audit re-runs before migration.
