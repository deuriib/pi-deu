# TDD by design (reference) — migrated from agents/architect

> Design makes test-driven implementation inevitable, not optional. Source trace: TRACE.md.

- Acceptance criteria ARE test cases. A criterion not expressible as an executable test is not a criterion yet — refine it.
- Design test seams, not just modules: ports/interfaces, DI points, deterministic boundaries (time, I/O, randomness) so a failing test is cheap and isolation is real.
- State the trajectory in the design: per boundary, what test fails first, what minimal implementation flips it green, what refactor keeps it green.
- Testability is a design constraint: behaviors hard to test = design failure — revise boundaries before shipping.
- Gate check is 1:1: every acceptance criterion ↔ one test case; every pattern carries its red→green trajectory. Gaps return for revision, never waived.
