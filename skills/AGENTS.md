# skills — AGENTS

`DOMAINS: Product, Engineering`

## OVERVIEW

Frame→Ship chain skills: one skill per step with IN/OUT/NEXT/STOP + stop rules, plus lateral advisory skills (`brand`, `revenue`, `legal`, `finance`, `people`) that never step — they attach via `DOMAINS` + the `review` lane.

## WHERE TO LOOK

| Task | Location | Notes |
|---|---|---|
| Chain order + load rules | `start-here/SKILL.md` | Already in context; never reload; step skill loads once per step |
| New goal / detail | `agree-the-goal/`, `write-the-requirements/` | Goal → testable reqs + DESIGN + contracts |
| Change gate | `propose/` | PROPOSAL.md, touches nothing, waits for yes |
| Risk gates | `check-security/`, `check-design/` | Threat checklist / decision note on contract change |
| Execute + assure | `build/`, `review/`, `verify/`, `release/` | Approved files only → blind review → HANDOFF → notes/tag |
| Ops extras | `fix-a-bug/`, `open-a-pull-request/`, `init-deep/`, `pi-deu-check/` | Failing-test-first; <400-line PRs; bootstrap; health check |
| Domain advisories | `brand/`, `revenue/`, `legal/`, `finance/`, `people/` | Advisory only, never dispatch/gate; load after step skill, cite by path/section |

## STRUCTURE

19 dirs (`agree-the-goal` … `write-the-requirements`): 9 chain steps + `check-security`/`check-design` gates + ops extras (`fix-a-bug`, `open-a-pull-request`, `init-deep`, `pi-deu-check`) + 5 domain advisories (`brand`, `revenue`, `legal`, `finance`, `people`), each `SKILL.md` (+ `references/` where noted).

## GUARDRAILS (THIS DIR)

- Product: every PRD needs ≥1 falsifiable criterion — else CLOSED at gate, never CONDITIONAL.
- Engineering: no code before proposal approved; every requirement traced to test + file + verdict.
- Review: single reviewer fail = CLOSED; no handoff while CLOSED without written domain-lead + orchestrator exception.
- Release: HANDOFF.md before notes/changelog/tag; rollback plan required.
- Docs-only exempt from test-with-change; 4-line notes between steps, never pasted files.

## ANTI-PATTERNS

- Never skip steps, never approve own work, never hand specialist→specialist.
- Never paste whole files between steps — paths only; max 1–2 outside skills, nine steps win conflicts.
