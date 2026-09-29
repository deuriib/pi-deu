# goal file: Rename total a pi-deu + release npm via GitHub Actions

**ID:** GOAL-pi-deu-rename-release
**Initiator:** orchestrator
**Date:** 2026-09-29
**Status:** approved
**Execution_Mode:** subagents
**Domains-Touched:** [engineering, automation/ops, security, product]
**Classification:** scoped-change
**Framings-Considered:** [A: rename total + GHA tag-publish con provenance (recomendado) — limpio, sin deuda, rompe compat .deu; B: rename mínimo solo package.json + publish manual — rápido pero deja mezcla deu/pi-deu; C: rename total ahora + publish manual primero, GHA después — desacopla riesgo pero doble trabajo. YAGNI: sin scope npm org, sin monorepo, sin cambios de runtime Pi.]
**Approval:** [chat-yes — user 2026-09-29 + ralph-loop blanket-approval para el resto de la cadena]
**Period:** Q3 2026
**Owner:** orchestrator

## Problem Statement

El proyecto vive como `deu` (package, bin, configDir `.deu`, docs, mensajes) pero el nombre público y de release será `pi-deu`. Publicar a npm como `deu` es incorrecto y hoy no hay pipeline reproducible (sin `.github/workflows`, publish manual). Cada release manual arriesga inconsistencias de nombre y fallo de provenance.

## Desired Outcome

`pi-deu` es el único nombre visible y publicado: `npm install -g pi-deu` funciona, `pi-deu` lanza el runtime, docs/badges apuntan a `pi-deu`, y cada tag `v*` publica a npm vía GitHub Actions con provenance. Cero restos `deu` en superficies propias; externos `pi-*` intactos.

## Objectives

### Objective 1: Rename total consistente a pi-deu

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 Nombre propio sin restos | ~40 ocurrencias `deu` en superficies propias | 0 en propias, `pi-*` externos intactos | `grep -ri deu` auditado + `npm run typecheck` verde |
| KR-1.2 Bin + configDir operativos | `bin: deu`, `configDir: .deu` | `bin: pi-deu`, `configDir: .pi-deu`, env `PI_DEU_*` con legacy | `pi-deu --help`/launch smoke + typecheck |

### Objective 2: Pipeline npm reproducible vía GHA

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 Publish en tag | sin workflow | `.github/workflows/release.yml` publica en `v*` con provenance | dry-run + release real `pi-deu@0.1.0` visible en npm |
| KR-2.2 Secret mínimo y seguro | sin secreto | Trusted Publishing OIDC, sin `NPM_TOKEN` hardcodeado; fallback token solo documentado | workflow usa `id-token: write`, secreto solo si fallback |

### Objective 3: Docs y metadata publicables

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-3.1 Metadata npm correcta | `name: deu`, badges `deu` | `name: pi-deu`, description/badges/repo-url a `pi-deu` | `npm pack --dry-run` + README render |
| KR-3.2 Nota de migración | sin nota | `CHANGELOG.md` + README explican ruptura `.deu` → `.pi-deu` y ruta de migración | archivos presentes y enlazados |

## Scope

### In Scope

- Rename package.json (`name`, `description`, `bin`, `piConfig.name/configDir`, `files`) [engineering]
- Rename launcher `index.ts` (mensajes, env `PI_DEU_CODING_AGENT_DIR` + legacy, `~/.pi-deu/agent`), `lib/pkg-meta.ts` fallback, `extensions/deu-*` → `pi-deu-*` + imports, `extensions/deu-tui/*` mensajes/header, `SYSTEM.md`/`APPEND_SYSTEM.md` identidad, `README.md`/badges/docs/`CHANGELOG.md` [engineering]
- Nuevo `.github/workflows/release.yml` (tag `v*` → typecheck → provenance publish) + `NPM_TRUSTED_PUBLISHING` doc [automation/ops]
- Revisión secreta mínima + OIDC (sin token en código/logs) [security]
- Decision note si cambia contrato público (DESIGN.md singleton) [product]

### Out of Scope

- Renombrar `pi-*` externos: deps, peers, imports `@earendil-works/pi-*`, `.agents/skills/pi-agent/**`
- Renombrar repo GitHub remoto (paso manual del owner fuera del código) — solo documentado
- Cambios de runtime Pi, nuevas features, monorepo, npm org/scopes

## Stakeholders

| Role    | Agent                                    | Involvement        |
| ------- | ---------------------------------------- | ------------------ |
| Sponsor | orchestrator                             | Decision authority |
| Owner   | engineering                              | Delivery ownership |
| Touched | automation/ops, security, product | Review / sign-off  |

## Constraints

- Budget: cero coste adicional (solo GHA minutes públicos)
- Timeline: una pasada ralph-loop, sin tercer retry (2 intentos → escalar a montilla)
- Regulatory: MIT LICENSE ya presente; no PII/secretos en código ni logs
- Brand/GTM: nombre público único `pi-deu` en npm/README/badges
- People/change: ruptura documentada `.deu` → `.pi-deu` con ruta de migración

## Open Questions

- [x] Profundidad del rename — resuelto: total (user 2026-09-29)
- [x] Aprobación cadena completa — resuelto: blanket-approval ralph-loop (user 2026-09-29)
- [ ] Repo GitHub `deuriib/deu` → `deuriib/pi-deu`: ¿lo renombra el owner manual tras merge? [owner]
