# Requirements Index: pi-deu rename + release

**Owner:** engineering
**Brief Reference:** GOAL-pi-deu-rename-release
**Domains-Touched:** [engineering, automation/ops, security, product]

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | package.json/bin/piConfig a pi-deu + repo URLs | P0 | GOAL-pi-deu-rename-release | SPEC-pi-deu-rename-release | engineering | test (pack dry-run) |
| REQ-002 | launcher env + default ~/.pi-deu/agent + mensajes pi-deu | P0 | GOAL-pi-deu-rename-release | SPEC-pi-deu-rename-release | engineering | test (typecheck) |
| REQ-003 | código propio renombrado (extensions, skills, prompts, tipos) | P0 | GOAL-pi-deu-rename-release | SPEC-pi-deu-rename-release | engineering | test (typecheck + grep) |
| REQ-004 | superficies visibles + migración documentada | P0 | GOAL-pi-deu-rename-release | SPEC-pi-deu-rename-release | product | review |
| REQ-005 | GHA release.yml tag v* → npm provenance | P0 | GOAL-pi-deu-rename-release | SPEC-pi-deu-rename-release | automation/ops | attestation (workflow + publish) |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-006 | cero secretos en código/logs, OIDC, sin PII nueva | Security | `id-token: write`, grep de secretos limpio, threat PASS |
| REQ-007 | typecheck verde + cero restos deu propios + pi-* intactos | Reliability | `tsc --noEmit` exit 0, grep audit limpio |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| automation/ops | release reproducible tag→npm con rollback (revert tag + unpublish window doc) | automation owner + engineering owner |
| security | trusted publishing OIDC, sin `NPM_TOKEN` en repo; MCP URLs allowlist intacta | security owner |
| product | DESIGN.md singleton actualizado + CHANGELOG migración | product owner |
| engineering | erasable TS strict, máx 2 lanes, sin `any`, sin tercer retry | engineering owner |
