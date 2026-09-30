# Review lenses (reference) — migrated from agents/review-*

> Inert criteria. Source trace: TRACE.md. Generic prose dropped as duplicate; lenses kept.

## Clarity (readability)

- Naming/terminology: domain language, defined before use, consistent after.
- Structure & flow: order tells the story; one idea per unit; no walls of text.
- Cognitive load: flag jargon-without-definition, nested conditionals, ambiguity ("may", "etc."), passive chains.
- Consistency + maintainability: same term per concept; no duplicated content that should reference one source; no stale links.

## Code readability = SOLID readability

- SRP: multi-reason names (`UserManager` doing auth+persistence+email) → split.
- OCP: type-switch chains that should be Strategy/Factory.
- ISP/DIP/DRY/KISS/YAGNI/SoC as readability findings; pattern-without-justification = accidental complexity.
- DSA readability: `userById` Map reads; `.find()`-in-loop hides O(n²) — flag it.

## Domain lenses (non-code)

- DOC/LEGAL/REPORT-MODEL/RULE-CHARTER/POLICY-GRC per artifact type (jurisdiction stated for legal; assumptions visible for models; expiry visible for charters).
- COPY: structure/scannability only — **never judge persuasion, voice or brand fit** (brand gate's call).

## Correctness / resilience / risk lenses

- Correctness: claims vs code vs ADR; undeclared assumptions (coupling, ordering, data size); "what if" at pattern seams.
- Resilience: failure-mode coverage, recovery paths, degradation behavior.
- Risk: new attack surface (endpoints/adapters/boundaries), input handling at port boundaries, secrets in wiring, new deps (CVEs), over-exposed interfaces (ISP/SoC violations leak data), pattern-induced risk (auth-less Proxy, PII-leaking Observer).

## Gate verdict semantics (from product-reviewer)

- APPROVE: state what was checked. REQUEST_CHANGES: each gap with location + what "done" looks like; one round-trip per gap. REFUTED: contradicts evidence — cite it; never approve on promises.
- Never gate own work. Unattributed framing = hypothesis; hypotheses don't pass gates.
