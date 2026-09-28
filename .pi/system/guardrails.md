# Guardrails deu — globales, non-negotiable (single source of truth)

> Checked BEFORE dispatch and verified AFTER execution. No provider, agent, or shortcut overrides them. When in doubt, deny, mask, or escalate — never silently proceed.

## Security & Privacy
- Access & identity: deny by default, fail closed, least privilege; MFA + SSO, no shared/local accounts without exception; short-lived creds, rotation, offboarding within SLA, quarterly reviews; privileged = JIT, time-bound, audited; break-glass sealed + monitored.
- AppSec: OWASP Top-10 screen per new endpoint/adapter/boundary/payload (all are trust boundaries); parameterized queries only — no string SQL, `eval`, shell injection, path traversal, unsafe deserialization, XXE; validate input, encode output; TLS everywhere, HSTS, CSP nonces, SRI, `httpOnly`/`Secure`/`SameSite` cookies; no tokens in `localStorage`, CSRF protection, SSRF allowlists; secure random, argon2/bcrypt, no custom crypto.
- Data protection: encryption in transit + at rest (KMS/HSM + rotation); classification + handling per asset; no PII in logs, prompts, exports, or test data; encrypted tested backups, rehearsed restore, verified deletion; no secrets/tokens/creds/sessions in code, config, logs, examples, events, prompts, tickets, or commits — vault/env only.
- Detection & response: SAST/DAST/SCA/secret/container/IaC scans in CI, triaged + tracked; centralized logging/SIEM/anomaly detection, alerts with owners + runbooks; IR plan tested + tabletops, 72h breach-notify ready; threat model for new systems/major changes, attack-surface inventory; pentest annually or on major change.
- Vuln mgmt SLA: Critical ≤24h / High ≤7d / Medium ≤30d / Low ≤90d (or per policy); patch OS/runtime/deps/containers, no EOL components.
- Supply chain: vendor review + DPAs before onboarding, annual re-review; pinned/signed/verified deps, no unmaintained libs, SBOM; third-party access time-bound, least-privilege, audited.
- Exploitable finding/breach/suspected compromise → Critical: notify security lead + owners same session; contain → investigate → remediate; no silent PASS.

## Testing discipline — blocking
- Test with change — every behavior/fix ships with new/updated test; docs-only exempt.
- Layout by scope: `tests/unit/<domain>/`, `tests/integration/`, `tests/e2e/`, `tests/contract/`, `tests/architecture/`, `tests/security/`, `tests/performance/`, `tests/fixtures/` + `tests/helpers/`.
- Coverage floors: line ≥80% / branch ≥75% / function ≥85%; critical paths (auth, data, finance, PII) ≥95% / ≥90% / ≥95%.
- Blocking verify, no silent pass — no step complete on red or unrun suite; relevant suite green before done. Skipped/flaky named with owner + reason.

## Engineering standards
- Contracts: `docs/specs/design/DESIGN.md` canonical singleton; contract change requires decision note in `docs/specs/decisions/`.
- Quality wave (blocking): parallel clarity, correctness, failure-handling, what-could-break (+ data when schema touched) → adversarial skeptic → run-the-tests green.
- Type safety: no `any` — TS strict/`noImplicitAny` (`unknown` + narrowing, generics, discriminated unions). No unsafe casts, no non-null assertion or `ts-ignore` without proof/ticket. Exhaustive switches, `readonly`/immutable by default.
- Structure: pure functions preferred, side effects at edges, DI over globals. No circular deps, dead/commented code, or ticketless TODOs. SRP, early returns, complexity ≤10, nesting ≤3, functions ≤40 lines (soft).
- Errors & concurrency: no empty/catch-all, no exceptions for control flow; wrap with context, `Result`/`Either` where apt. Fail fast/closed, no silent failures, cleanup via `using`/`defer`. Timeouts, jittered retries, breakers, idempotency, graceful shutdown.
- SOLID/patterns/architecture: one reason to change; composition over inheritance; ADRs mandatory (context/options/decision/consequences/status). Hexagonal/Clean core, DDD boundaries, modular monolith first, repeat-safe events, contract-first versioned APIs. Strangler Fig, no big-bang rewrites.
- Frontend/reliability/a11y/data/supply chain: small components; explicit loading/error/empty/partial + rollback; validated forms; route error boundaries; no secrets/eval/tokens in bundle; token-driven styling; i18n externalized; budgets LCP <2.5s / INP <200ms / CLS <0.1. Structured logs (no `console.log` prod, no PII), SLOs/alerts, tested backups, DR rehearsed. WCAG 2.1 AA, RTL, UTC store/local display. Pinned minimal deps, CVE scan, SBOM, reproducible builds.
- Docs/commits/evidence: README, OpenAPI/AsyncAPI, runbooks, Changelog, SemVer, migrations, ADRs, C4; comments explain why. Conventional Commits atomic; short-lived branches, rebase, no direct-to-main, peer review, no self-merge, green CI gates.

## Operations & Automation
- Pipeline as code, versioned/reviewed/tested; no manual prod changes outside it. Branch protection, required reviews + status checks, signed commits. Least-privilege runners, short-lived creds, vault secrets (masked, rotated, scanned).
- Gates: lint, type-check, unit, integration, SAST/SCA/secret, license, a11y, bundle budget mandatory. Critical/High block merge/release.
- Deployment: progressive (canary/blue-green) with auto-rollback on SLO breach. Flags + kill switch per risky change. Backward-compatible migrations, tested rollback.
- Observability: every deploy emits change event; auto-rollback on breach. Alerts to on-call with runbooks — no alert without action.
- Toil: manual step repeated ≥3× must be automated or ticketed. No cron without owner + monitoring + failure alerts.

## Legal, Brand, Revenue, Product, Finance, People (resumen operativo)
- Legal: contracts reviewed by legal before signature; ROPA/DPAs/DPIAs maintained; Ley 172-13 privacy; 72h breach-notify; no legal advice by non-lawyers — route to legal.
- Brand: no false/unsubstantiated claims — evidence on file; opt-in per Ley 172-13, opt-out honored; no PII in creatives/UTMs; licenses on file per asset; no AI content without human review.
- Revenue: CRM single source of truth; no stage advance without exit criteria; discounts need approval per matrix; no verbal commitments; pricing changes by committee (CRO + Finance + Product).
- Product: one problem statement per initiative (user, moment, cost of status quo); ≥1 falsifiable acceptance criterion per PRD or CLOSED; one north-star metric (user outcome, not shipped volume).
- Finance: segregation of duties enforced; no spend without budget line + owner; POs above threshold; dual approval above threshold; monthly reconciliations.
- People: structured interviews + scorecards, no gut-feel hires; employee PII purpose/TTL/deletion enforced; same-day access revocation on exit; harassment/discrimination/breach → escalate to CHRO/CPO + Legal immediately.

## Cross-domain & Escalation
New boundary/dependency/secret → security review before merge. New PII store/export/cross-border → privacy review + DPIA if high risk. Suspected breach → 72h notify + litigation hold; no external response without legal. Critical/High → same-session notification, owner assigned, evidence attached, residual risk explicit. **No silent PASS.**
