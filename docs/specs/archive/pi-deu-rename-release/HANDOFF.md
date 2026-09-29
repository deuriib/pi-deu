# Handoff: engineering

**Spec Reference:** SPEC-pi-deu-rename-release
**Agent:** engineering
**Date:** 2026-09-29
**Status:** complete
**Domains-Touched:** [engineering, automation/ops, security, product]

## Deliverables

| File | Where it is / the proof | Status |
|----------|---------------------|--------|
| Package rename | `package.json` (`pi-deu`, bin `pi-deu`, `piConfig .pi-deu`) — E-001 | done |
| Launcher + fallback | `index.ts` (`PI_DEU_*` + legacy, `~/.pi-deu/agent`) — E-002 | done |
| Own code rename | `extensions/pi-deu-*`, `skills/pi-deu-check/`, `prompts/pi-deu-check.md`, `lib/pkg-meta.ts` — E-002+E-003 | done |
| Visible surfaces | `SYSTEM.md`, `README.md`, `AGENTS.md*`, `CHANGELOG.md` (migración) — E-004 | done |
| Release pipeline | `.github/workflows/release.yml` (tag `v*`, OIDC) — E-005 | done |
| Tests / Evidence | `docs/specs/work/engineering/TESTS.md` + `evidence/E-001..E-006.md` (7/7 REQ) | done |
| Gates | `security-review.md` + `architecture-review.md` + ADR-0005 + `REVIEW.md` (OPEN 9/9) | done |
| Contracts | `docs/specs/design/DESIGN.md` (singleton `pi-deu` + release row) | done |

## the done checklist Checklist

- [x] Acceptance criteria satisfied (AC-001..AC-005 → E-001..E-005)
- [x] Tests/evidence linked per REQ-ID (7/7 en TESTS.md; links resuelven a `evidence/*.md`)
- [x] Load evidence present (`skill(verify)` + `done-checklist.md` + `handoff-template.md`; `subagents`; 4-line note intacta)
- [x] Domain checks passing (Common + engineering/security/automation/product appendix)
- [x] Security checks passing (security APPROVED, E-006, cero secretos)
- [x] Documentation updated (DESIGN, CHANGELOG, ADR-0005, README/SYSTEM/AGENTS)

C4: cada REQ linkea evidencia presente que resuelve y es relevante; cero attestation-alone (cada E cita comando/salida/archivo); cero FAILs.

## Blockers / Open Questions

- Owner debe: 1) `npm view pi-deu` (nombre libre), 2) configurar Trusted Publisher npm → GitHub (`deuriib/pi-deu`, workflow `release.yml`), 3) renombrar repo remoto `deuriib/deu` → `deuriib/pi-deu` tras merge. Sin esto el primer tag falla en 403 (esperado y documentado).

## Next Agent

`frame-ship:release` — notas, changelog final, tag `v0.1.0`, push + tag. 4-line note: `SPEC:docs/specs/backlog/SPEC-pi-deu-rename-release.md#REQ-001,REQ-002,REQ-003,REQ-004,REQ-005,REQ-006,REQ-007 / HARD:subagents / GATE:OPEN / DOMAINS:[engineering,automation/ops,security,product]`.
