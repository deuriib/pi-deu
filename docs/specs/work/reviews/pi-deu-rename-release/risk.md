# Risk Review: SPEC-pi-deu-rename-release

**Reviewer:** check-what-could-break
**Date:** 2026-09-29
**Verdict:** pass

## Checklist

- [x] What else could break analysis bounded and verified
- [x] Backward compatibility preserved (no breaking API/schema shifts without ADR)
- [x] Dependencies pinned; zero critical/high CVEs or supply-chain hazards
- [x] Rollback determinism proven (revertible in production in ≤15 minutes)
- [x] Architectural contract invariants intact (`DESIGN.md`)
- [x] Zero unmitigated regression risk across touched systems

## Risk Assessment Matrix

| ID | Risk Dimension | Impact | Likelihood | Mitigation | Residual |
|----|----------------|--------|------------|------------|----------|
| RK-001 | Nombre `pi-deu` tomado en npm | High | Low | verificar `npm view pi-deu` antes del primer tag; escalar a owner | Low |
| RK-002 | Trusted Publisher sin configurar → 403 en primer tag | Med | Med | pasos OIDC en header del workflow + fallback documentado | Low |
| RK-003 | Repo remoto aún `deuriib/deu` vs links `pi-deu` | Low | Med | owner renombra remoto tras merge (nota en GOAL/ADR) | Low |
| RK-004 | Usuarios `.deu` pierden config | Low | High | fallback lectura legacy + CHANGELOG migración | Low |

## Verdict Rationale

Ruptura (bin/configDir) declarada y versionada vía ADR-0005; rollback = `git revert` + desactivar workflow + `npm unpublish/deprecate` (minutos). PASS.
