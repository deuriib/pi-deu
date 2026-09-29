# Proposed Changes: engineering

**Spec Reference:** SPEC-pi-deu-rename-release
**Agent:** engineering
**Date:** 2026-09-29
**Execution_Mode:** subagents
**Domains-Touched:** [engineering, automation/ops, security, product]

## Summary

Rename total propio `deu` → `pi-deu` (package, bin, configDir, código, docs) y alta de pipeline tag→npm con provenance. Sin tocar `pi-*` externos. Verificación por typecheck + auditorías grep/pack/workflow.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `package.json` | file-modify | `name: pi-deu`, `description` pi-deu, `bin: { pi-deu: ./index.ts }`, `piConfig: { name: pi-deu, configDir: .pi-deu }`, `repository/homepage/bugs` → `deuriib/pi-deu`, keywords + `pi-deu`; re-apuntar `pi.extensions/skills/prompts` a rutas renombradas |
| `index.ts` | file-modify | header comment `pi-deu`, env primario `PI_DEU_CODING_AGENT_DIR` + fallback `DEU_CODING_AGENT_DIR`/`PI_CODING_AGENT_DIR`, default `~/.pi-deu/agent`, mensaje error `pi-deu:` |
| `lib/pkg-meta.ts` | file-modify | `FALLBACK = { name: pi-deu, version: 0.0.0 }` |
| `extensions/deu-core.ts` → `extensions/pi-deu-core.ts` | file-modify | `git mv` + import `../lib/index.js` intacto (sin cambio lógico) |
| `extensions/deu-mcp.ts` → `extensions/pi-deu-mcp.ts` | file-modify | `git mv`, notify `pi-deu-mcp:` |
| `extensions/deu-tui/` → `extensions/pi-deu-tui/` | file-modify | `git mv` dir; `config.ts`: `DeuTuiConfig` → `PiDeuTuiConfig`, `deu-tui.json` → `pi-deu-tui.json`, error `pi-deu-tui config parse error`; `header.ts`: `DEU_VERSION/DEU_LOGO` → `PI_DEU_*`, `DeuHeader` → `PiDeuHeader`, strings `deu`/`Deu`/`Ask Deu` → `pi-deu`/`Pi-Deu`/`Ask Pi-Deu`; resto imports actualizados |
| `skills/deu-check/` → `skills/pi-deu-check/` | file-modify | `git mv` dir + `SKILL.md` identidad `pi-deu-check`, credo pi-deu, configDir `.pi-deu`/`~/.pi-deu/agent` |
| `prompts/deu-check.md` → `prompts/pi-deu-check.md` | file-modify | `git mv` + description y cuerpo a `pi-deu-check`, foco `$ARGUMENTS` intacto |
| `SYSTEM.md` | file-modify | `You are **pi-deu**` (una línea identidad; resto intacto) |
| `README.md` | file-modify | título/badges/links `pi-deu`, `npm install -g pi-deu`, `pi-deu` launch, `/pi-deu-check`, `pi-deu config`, configDir `.pi-deu`, `npm:pi-deu`, tabla `pi-deu vs vanilla`, `piConfig (name: pi-deu, configDir: .pi-deu)` |
| `AGENTS.md`, `extensions/AGENTS.md`, `extensions/pi-deu-tui/AGENTS.md`, `skills/AGENTS.md` | file-modify | rutas/nombres `pi-deu-*`, `configDir: .pi-deu`, `bin: pi-deu`, budgets intactos |
| `CHANGELOG.md` | file-modify | entrada `pi-deu` rename + migración `.deu` → `.pi-deu` (mover `~/.deu/agent` → `~/.pi-deu/agent`, re-trust proyecto) |
| `.github/workflows/release.yml` | file-create | trigger `push.tags v*` + `workflow_dispatch`; `contents: write, id-token: write`; `setup-node 22` registry `npmjs`; `npm ci` → `npm run typecheck` → `npm publish --provenance --access public`; OIDC Trusted Publishing, `NPM_TOKEN` fallback solo documentado en header comment |
| `docs/specs/decisions/0005-rename-pi-deu-release-npm.md` | document-create | ADR del rename + pipeline (requerido por cambio de contrato público) |

## Rationale

Cubre REQ-001→007 sin lógica nueva: puros renames + un workflow declarativo. `git mv` preserva historia; typecheck prueba que ningún import quedó colgando; grep/pack prueban cero restos; OIDC evita secretos.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Rename mínimo (solo package.json) | Deja `bin deu` + `.deu` mintiendo; deuda inmediata en npm |
| Codemod `DeuTuiConfig` intacto (solo strings visibles) | Mezcla `Deu*` en API interna; rompe invariante "código propio dice pi-deu" |
| `NPM_TOKEN` long-lived en secrets | Riesgo innecesario; OIDC provenance es default npm/GHA moderno |

## Test Plan

> Plan frozen at approval — `build` executes, never re-authors.

### REQ-ID to Test Mapping

| REQ-ID | Test ID | Scope / Path | Test Type | Expected Behavior / Boundary Checked |
|--------|---------|--------------|-----------|--------------------------------------|
| REQ-001 | E-001 | `docs/specs/work/engineering/evidence/E-001-pack.log` | Attestation | `npm pack --dry-run` lista `pi-deu-*`, no `deu-*`; `package.json` con `pi-deu`/`.pi-deu` |
| REQ-002 | E-002 | `docs/specs/work/engineering/evidence/E-002-typecheck.log` | Attestation | `npm run typecheck` exit 0 tras rename launcher |
| REQ-003 | E-003 | `docs/specs/work/engineering/evidence/E-003-grep.log` | Attestation | grep audit: cero `deu` propio fuera de allowlist (legacy doc, `pi-*`, histórico) |
| REQ-004 | E-004 | `docs/specs/work/engineering/evidence/E-004-docs.diff` | Attestation | README/SYSTEM/AGENTS/CHANGELOG con `pi-deu`, migración presente |
| REQ-005 | E-005 | `docs/specs/work/engineering/evidence/E-005-workflow.log` | Attestation | `release.yml` con `id-token: write` + trigger `v*` + provenance; `actionlint` si disponible sino `yamllint`/`node --check` del yaml |
| REQ-006 | E-006 | `docs/specs/work/engineering/evidence/E-006-security.log` | Attestation | `grep -ri "NPM_TOKEN\|npm_token\|secreto" .github/` solo en comentario fallback; threat checklist PASS |
| REQ-007 | E-002+E-003+E-001 | mismo paths | Attestation | typecheck verde + grep limpio + pack limpio (cierra AC-002/003) |

### Declared Coverage Floors

| Metric | Floor Declared | Scope / Justification |
|--------|----------------|-----------------------|
| Line | N/A + justificación escrita | Sin lógica runtime nueva; rename + workflow declarativo; typecheck es la suite verde presente |
| Branch | N/A + justificación escrita | Idem; sin ramas nuevas |
| Function | N/A + justificación escrita | Idem |
| Unit suite runtime | N/A (suite = `npm run typecheck` <30s) | Único gate presente en repo |

### Test Environment & Setup

- **Prerequisites:** `node >=22.19`, `npm`, repo limpio, sin credenciales reales.
- **Environment Variables:** ninguna secreta; `PI_DEU_CODING_AGENT_DIR` solo lectura en smoke opcional.
- **Cleanup & Isolation:** `git mv` reversible vía `git revert`; `npm pack --dry-run` no publica; workflow solo publica en tag `v*`.

## Risk Assessment

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Import colgado tras `git mv` (tui/config/header) | Med | Med | typecheck blocking; lista cerrada de archivos + `grep import.*deu-tui` post-rename |
| R-002 | `pi-deu` ya tomado en npm | Low | High | verificar `npm view pi-deu` antes de tag; si tomado, escalar a owner (no publicar a ciegas) |
| R-003 | Trusted Publishing sin configurar → publish 403 en tag | Med | Med | header comment con pasos OIDC + fallback `NPM_TOKEN` documentado; primer tag es prueba |
| R-004 | Usuarios `.deu` existentes pierden config | High | Low | CHANGELOG migración explícita + fallback lectura legacy en launcher |
| R-005 | Repo remoto aún `deuriib/deu` rompe links package.json | Med | Low | links apuntan a `pi-deu` futuro + nota owner renombre manual; no bloquea publish |

### What else could break

- engineering: TUI header snapshot si alguien golden-masterizó el logo `DEU`; skills que importan `deu-check` por path viejo.
- automation/ops: tag `v*` accidental dispara publish; mitigado con `workflow_dispatch` + tag protegido + `if: startsWith(github.ref, 'refs/tags/v')`.
- marketing/brand: badges npm cacheados tardan en refrescar; aceptado.
- revenue/finance/legal/people: sin impacto (sin pricing, sin PII, sin contrato cliente).

### Rollback Plan

- Código: `git revert` lane commits en reversa (owner engineering, ETA minutos).
- Workflow: desactivar `.github/workflows/release.yml` (rename a `.disabled`) + borrar tag remoto `git push --delete origin vX.Y.Z` (owner automation, ETA minutos).
- npm: si publish erróneo dentro de ventana, `npm unpublish pi-deu@X.Y.Z` (<72h) sino `npm deprecate`; owner engineering + automation.
- Config usuario: volver a `~/.deu/agent` copiando de `~/.pi-deu/agent`; owner user, ETA minutos.

### Security Considerations

Sin auth nueva, sin PI
