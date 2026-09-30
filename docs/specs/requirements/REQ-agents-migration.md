# Requirements Index: selective migration agents/ → skills

**Owner:** engineering owner
**Brief Reference:** GOAL-agents-migration
**Domains-Touched:** [engineering]

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | audit matrix 74/74 files with verdict (migrate/duplicate/obsolete) + deu spot-check | P0 | GOAL-agents-migration | SPEC-agents-migration | engineering | review (matrix + sign-off) |
| REQ-002 | unique items migrated with file→skill trace (hybrid per mapping rule) | P0 | GOAL-agents-migration | SPEC-agents-migration | engineering | review (trace + grep reachability) |
| REQ-003 | `agents/` deleted entirely + reference cleanup + typecheck green via branch + PR | P0 | GOAL-agents-migration | SPEC-agents-migration | engineering | test (typecheck) + review (PR) |
| REQ-004 | ADR: frame-ship sole dispatch, agents-content reference-only | P0 | GOAL-agents-migration | SPEC-agents-migration | engineering | review (ADR on main) |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-005 | zero new duplication vs skills/guardrails | Reliability | reviewer attestation, grep-clean |
| REQ-006 | no router rewiring; personal names dropped/tokenised | Security | config grep shows no `subagents.agents`; name grep clean (INV-004) |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | erasable TS strict untouched; max 2 lanes; deletions via reviewed PR only, never direct-to-main | engineering owner |
