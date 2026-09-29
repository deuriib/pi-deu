# Release Notes: v0.1.0 — pi-deu

**Date:** 2026-09-29
**Release Manager:** orchestrator (single-thread; second-reader separation deferred — §Known Issues)
**Specs Included:** SPEC-pi-deu-rename-release
**Domains-Touched:** [engineering, automation/ops, security, product]
**Ship Type:** deploy

## Highlights

- Primer release público como `pi-deu`: `npm install -g pi-deu`, bin `pi-deu`, configDir `.pi-deu`. Logo pixelado intacto (arte DEU).
- Pipeline reproducible: cada tag `v*` publica a npm con provenance vía OIDC Trusted Publishing.
- Cadena Frame→Ship completa en verde: GOAL → SPEC (7 REQ) → PROPOSAL → security/architecture APPROVED → build → review OPEN 9/9 → verify → release.

## Changes

### Features

- Rename total `deu` → `pi-deu` (SPEC-pi-deu-rename-release, engineering): package, bin, `piConfig`, launcher env `PI_DEU_CODING_AGENT_DIR` (fallback legacy), `lib` fallback, `extensions/pi-deu-*` (+ `PiDeuTuiConfig`, `PiDeuHeader`), `skills/pi-deu-check/`, `prompts/pi-deu-check.md`, identidad `SYSTEM.md`, docs/badges (ADR-0005).
- `.github/workflows/release.yml` (automation/ops): trigger `push.tags v*` + `workflow_dispatch`, node 22, `npm ci` → `typecheck` → `npm publish --provenance --access public`.
- `LICENSE` (MIT) + `docs/specs/design/DESIGN.md` singleton v1 (arrastrados de bootstrap, nunca versionados hasta hoy).

### Fixes

- Cero restos `deu` en superficies propias (auditoría E-003; solo histórico allowlistado); `pi-*` externos intactos.

### Domain Ships

- Automation: workflow release + runbook/rollback en PROPOSAL y §Rollback/Undo.
- Security: threat checklist PASS, OIDC mínimo-privilegio, cero secretos en repo.
- Product: DESIGN.md singleton `pi-deu` + CHANGELOG migración.

### Breaking Changes

- Bin `deu` → `pi-deu`; configDir `.deu` → `.pi-deu`; env primario `PI_DEU_CODING_AGENT_DIR`. Migración: mover `~/.deu/agent` → `~/.pi-deu/agent` y `<proyecto>/.deu` → `<proyecto>/.pi-deu`; re-trust del proyecto + reload. Lectura legacy con fallback (no escritura).

## Known Issues

- El primer tag puede fallar en publish con 403 hasta que el owner configure npm Trusted Publisher (`pi-deu` → GitHub `deuriib/pi-deu`, workflow `release.yml`) y verifique `npm view pi-deu` libre. Re-lanzar el job fallido tras configurar. Owner: user.
- Repo remoto aún `deuriib/deu`: renombrar a `deuriib/pi-deu` tras merge para que los links package.json resuelvan. Owner: user.
- Second-reader separation (§2b pasos 8–10) no ejercida — sin herramienta de subagentes en este runtime; single-thread registrado.
- `scripts/bump-version.mjs` no existe en este repo — sync N/A; versión única en `package.json` (`0.1.0`) + header CHANGELOG `## [v0.1.0]`, cero drift introducido (typecheck verde).

## Rollback / Undo

- Código: `git revert` del release commit hacia atrás (owner engineering, ETA minutos); contenido wrong ya tageado → revert-forward + patch bump, tag viejo inmutable.
- Workflow: renombrar `.github/workflows/release.yml` a `.disabled` (owner automation, minutos).
- Tag no pusheado por error: `git tag -d v0.1.0` (solo local); tag publicado a retirar: `git push --delete origin v0.1.0` solo con aprobación explícita del owner.
- npm: `npm unpublish pi-deu@0.1.0` dentro de 72h, sino `npm deprecate`. Owner engineering + automation.
- Usuario: volver a `~/.deu/agent` copiando desde `~/.pi-deu/agent`.
