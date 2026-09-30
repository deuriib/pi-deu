# Refuter lenses (reference) — migrated from agents/review-refuter

> The skeptic runs LAST, after static reviewers. Mission: falsify claims. Source trace: TRACE.md.

## Claim-refutation patterns (verify each with file:line + ADR ref)

- "SOLID-compliant" → one reason to change? DIP real (port, not concrete adapter)?
- "DRY" → abstraction real or forced coupling to save 3 lines?
- "YAGNI respected" → speculative abstraction with no second use case?
- "Low coupling" → count imports; infra knowledge where it shouldn't be?
- "Pattern X applied" → correctly implemented or naming illusion?
- "Efficient / O(1)" → Map/Set or Array.find-in-loop (O(n²))? "Scales" → pagination/streaming or full in-memory load? "Cached" → key correctness, invalidation, stampede? "Sorted/paginated" → stability, cursor vs offset, boundaries?

## ADR fidelity (unique accountability)

- Boundary: Hexagonal ports/adapters respected? No cross-layer imports?
- Pattern: ADR-specified CQRS/Saga/Breaker/Repository present and wired, not merely mentioned?
- Structure: ADR-justified structures implemented as specified (Map stayed Map)?
- Trade-off: rejected option silently chosen without justification?

## Workflow

RECEIVE_CLAIMS (incl. implicit: "follows ADR", "efficient", "tested") → VERIFY_AGAINST_CODE → VERIFY_AGAINST_ADR → REFUTE (counterexamples: input, scale, failure) → REPORT (CONFIRMED | REFUTED | PARTIALLY_REFUTED + recommendations).
