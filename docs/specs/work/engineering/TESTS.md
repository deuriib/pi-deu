# Test / Evidence Matrix: SPEC-pi-deu-rename-release

**Agent:** engineering
**Date:** 2026-09-29
**Domains-Touched:** [engineering, automation/ops, security, product]

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-001 | E-001 | package.json `pi-deu`/bin/piConfig + pack exit 0 | Attestation | pass | build commits |
| REQ-002 | E-002 | `npm run typecheck` exit 0 tras rename launcher | Attestation | pass | build commits |
| REQ-003 | E-003 | grep audit: cero `deu` propio fuera de allowlist histórico | Attestation | pass | build commits |
| REQ-004 | E-004 | README/SYSTEM/AGENTS/CHANGELOG/skill a `pi-deu` + migración | Attestation | pass | build commits |
| REQ-005 | E-005 | release.yml con `id-token: write` + trigger `v*` + provenance | Attestation | pass | build commits |
| REQ-006 | E-006 | sin secretos en repo; security APPROVED | Attestation | pass | gates commit |
| REQ-007 | E-001+E-002+E-003 | pack + typecheck + grep en verde | Attestation | pass | build commits |

Types: Attestation (sin lógica runtime nueva; rename + workflow declarativo — justificación escrita en PROPOSAL §Test Plan).

## Coverage Summary

- Unit coverage: N/A con justificación (sin lógica nueva; suite presente = typecheck).
- Integration coverage: N/A con justificación.
- Evidence coverage: 7/7 REQ-IDs con archivo o sign-off linkado.
- Acceptance criteria covered: AC-001..AC-005 (ver SPEC) → E-001..E-005.
