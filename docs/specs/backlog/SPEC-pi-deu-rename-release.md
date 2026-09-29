# Spec: Rename total a pi-deu + release npm via GHA

**ID:** SPEC-pi-deu-rename-release
**Owner:** engineering
**Domains-Touched:** [engineering, automation/ops, security, product]
**Brief Reference:** GOAL-pi-deu-rename-release
**Status:** approved
**Priority:** P0
**Execution_Mode:** subagents

## 1. Context

`deu` debe publicarse como `pi-deu`. Sin rename total el bin, configDir y docs mienten; sin GHA cada publish manual arriesga deriva. Este spec congela el rename propio completo + pipeline tag→npm con provenance, sin tocar `pi-*` externos.

## 2. Requirements

- REQ-001: package.json pasa a `name: pi-deu`, `bin: { pi-deu }`, `piConfig: { name: pi-deu, configDir: .pi-deu }`, description/badges/repo apuntan a `pi-deu` / `deuriib/pi-deu`.
- REQ-002: `index.ts` usa `PI_DEU_CODING_AGENT_DIR` primario con fallback `DEU_CODING_AGENT_DIR` + `PI_CODING_AGENT_DIR`, default `~/.pi-deu/agent`, mensajes `pi-deu`.
- REQ-003: Código propio renombrado: `extensions/pi-deu-core.ts`, `extensions/pi-deu-mcp.ts`, `extensions/pi-deu-tui/`, `skills/pi-deu-check/`, `prompts/pi-deu-check.md`, `lib/pkg-meta.ts` fallback `pi-deu@0.0.0`, tipos `DeuTuiConfig` → `PiDeuTuiConfig`, notify strings `pi-deu-*`, bloque `pi` en package.json re-apuntado.
- REQ-004: Superficies visibles a `pi-deu`: `SYSTEM.md` identidad, `README.md` (título, badges npm/v, install `npm install -g pi-deu`, quickstart, configDir `.pi-deu`), `AGENTS.md` + sub-AGENTS, `CHANGELOG.md` nota de ruptura `.deu` → `.pi-deu` con migración.
- REQ-005: `.github/workflows/release.yml`: trigger `push.tags v*` + `workflow_dispatch`, `permissions: contents: write, id-token: write`, `node 22`, `npm ci`, `npm run typecheck`, `npm publish --provenance --access public`; Trusted Publishing OIDC por defecto, `NPM_TOKEN` solo fallback documentado.
- REQ-006: Seguridad: cero secretos/tokens en código, logs o commits; sin nuevo endpoint/adapter; MCP URLs intactas; sin PII.
- REQ-007: Verificación: `npm run typecheck` verde, `npm pack --dry-run` incluye archivos renombrados, auditoría `grep -ri deu` con cero restos propios y `pi-*` externos intactos.

## 3. Acceptance Criteria

- [ ] AC-001: `cat package.json` muestra `pi-deu` + `bin pi-deu` + `configDir .pi-deu`; `npm pack --dry-run` lista `extensions/pi-deu-*/**` y no lista `extensions/deu-*`.
- [ ] AC-002: `grep -rn -i "deu" --exclude-dir=node_modules --exclude-dir=.git --exclude=package-lock.json` solo matchea `pi-deu`, `PI_DEU_`, legacy documentado, `pi-*` externos y archivo histórico `brief-rebranding-deu-total.md`/decisiones.
- [ ] AC-003: `npm run typecheck` exit 0.
- [ ] AC-004: `.github/workflows/release.yml` existe con `id-token: write`, `provenance` y trigger `v*`; `git log --oneline -3` muestra lane commits atómicos.
- [ ] AC-005: `README.md` instala con `npm install -g pi-deu` y badges apuntan a `npmjs.com/package/pi-deu`; `CHANGELOG.md` documenta migración `.deu` → `.pi-deu`.

## 4. Contracts & Interfaces

- Launcher: `agentDir(): string` — orden `PI_DEU_CODING_AGENT_DIR` → `DEU_CODING_AGENT_DIR` → `PI_CODING_AGENT_DIR` → `~/.pi-deu/agent` (`mkdirSync recursive`).
- Package wiring: `package.json#pi.extensions[]` → `./extensions` (contiene `pi-deu-*`), `pi.skills[]` → `./skills` (contiene `pi-deu-check`), `pi.prompts[]` → `./prompts`.
- Release: tag `vX.Y.Z` ↔ `package.json#version X.Y.Z`; publish con `NPM_CONFIG_PROVENANCE=true`, `access public`.
- Compat: legacy `.deu`/`DEU_*` solo como fallback leído, nunca escrito como default nuevo.

## 5. Out of Scope

- Renombrar `pi-*` externos, `.agents/skills/pi-agent/**`, imports `@earendil-works/pi-*`.
- Renombrar el repo remoto en GitHub (manual del owner).
- Cambios de runtime, features nuevas, scopes npm, monorepo.

## 6. Dependencies

- Upstream: `docs/goals/GOAL-pi-deu-rename-release.md` (approved, blanket-approval ralph-loop).
- Externos: `pi-launcher.js` en PATH (sin cambio), npm Trusted Publisher configurado en `npmjs.com/package/pi-deu` + GitHub repo.
- Sign-offs: security (sin secretos), product (DESIGN singleton update).

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001, AC-005 | PROPOSAL.md | `package.json` + `npm pack --dry-run` |
| REQ-002 | AC-001, AC-003 | PROPOSAL.md | `index.ts` + typecheck |
| REQ-003 | AC-001, AC-002, AC-003 | PROPOSAL.md | `git mv` list + typecheck + grep audit |
| REQ-004 | AC-002, AC-005 | PROPOSAL.md | `README/SYSTEM/AGENTS/CHANGELOG` diff |
| REQ-005 | AC-004 | PROPOSAL.md | `.github/workflows/release.yml` + `actionlint` si disponible |
| REQ-006 | AC-004 | check-security | threat checklist PASS |
| REQ-007 | AC-002, AC-003 | build/review/verify | typecheck log + grep log + pack log |
