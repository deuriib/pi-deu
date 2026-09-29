# 0004 — DESIGN singleton bootstrap (supplements 0002/0003)

**Date:** 2026-09-29
**Deciders:** engineering owner (vasquez)
**Status:** accepted

## Context

`README.md` and guardrails cite `docs/specs/design/DESIGN.md` as canonical singleton; the file never existed (verified 2 lookups). `LICENSE` (MIT per `package.json`) also absent though linked. Both block legal pass + 4-line-note validation. Proposal `docs/specs/work/engineering/PROPOSAL.md` approved (`dale`).

## Decision

Create `docs/specs/design/DESIGN.md` as the singleton architecture contract (per `check-design/references/architecture-template.md`: overview, components, data flow, invariants, NFRs; includes `the-4-line-note` grammar). Create `LICENSE` as standard MIT with holder from git config. Going forward: singleton update-in-place only, every contract change needs a note in `docs/specs/decisions/`.

## Consequences

### Positive

- Unblocks chain (4-line-note source exists), legal evidence present, links resolve.
- Single contract source ends README/guardrail drift.

### Negative

- New maintenance burden: singleton must stay in sync with guardrails or it rots — owner engineering, review on every contract touch.

## Supersedes / Superseded By

- Complements `0002` (superseded) + `0003` (accepted, configDir reader). Superseded by: none.
