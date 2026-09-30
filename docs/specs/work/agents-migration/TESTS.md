# Test / Evidence Matrix: agents-migration (living — updated per build step)

**Agent:** engineering lead | **Date:** 2026-09-30 | **Domains-Touched:** [engineering]

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-001 | E-001 | AUDIT.md: 74 rows, one verdict each, criteria cited | Attestation | pass | lane `spec/agents-migration` (audit commit) |
| REQ-001 | E-002 | deu spot-check sign-off on 10-file sample | Sign-off | pass — signed 2026-09-30, verdicts + tie-rule confirmed | AUDIT.md sign-off block |
| REQ-002 | E-003 | TRACE.md file→skill | Review | pass — 15 addresses written, 15/15 resolve | lane `spec/agents-migration` (migration commit) |
| REQ-002 | T-001 | reachability grep over TRACE addresses | Regression | pass — 15/15 files exist non-empty | same as above |
| REQ-003 | T-002 | `ls agents` fails | Regression | pass — post-delete: no such file | lane `spec/agents-migration` (delete commit) |
| REQ-003 | T-003 | repo grep `agents/` historic-only | Regression | pass — code/config clean (only pi-subagents package paths); remaining mentions are historical docs/lane records | same as above |
| REQ-003 | T-004 | `npm run typecheck` EXIT:0 | Regression | pass — green pre-delete and post-delete | same as above |
| REQ-004 | E-004 | ADR-0006 merged | Review | pass | `0a7c532` (check-design gate) |
| REQ-005 | E-005 | no-dup attestation | Attestation | pending (at review) | — |
| REQ-006 | T-005 | config grep: no `subagents.agents` | Regression | pass — pi keys are extensions/skills/prompts only | same as above |
| REQ-006 | T-006 | name grep clean (9 names) | Regression | pass — strict word-boundary grep over all 15 migrated files clean | same as above |
| Edge | E-006 | new-skill threshold + deu confirmation | Review | pass — CREATE finance/revenue/legal/people/brand; ENRICH rest | AUDIT.md decision block |

## Coverage Summary

- Evidence coverage: 2/12 recorded (E-001, E-004); 1 blocked on deu (E-002); 9 gated behind it
- Acceptance criteria covered: 0/6 (none claimed before spot-check)
