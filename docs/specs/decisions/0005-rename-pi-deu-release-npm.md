# 0005 — Rename total a pi-deu + release npm via GHA

**Date:** 2026-09-29
**Deciders:** engineering owner, automation/ops owner, security owner
**Status:** accepted

## Context

El package vivía como `deu` (name, bin, configDir `.deu`, código, docs) pero el nombre público de release es `pi-deu`. Sin pipeline reproducible, cada publish manual arriesgaba deriva de nombre y falta de provenance. El cambio altera contrato público (bin, configDir, nombre npm) y añade un componente (workflow release) — exige ADR según DESIGN.md.

## Decision

- Rename total propio `deu` → `pi-deu`: `package.json` (`name`, `bin pi-deu`, `piConfig { name: pi-deu, configDir: .pi-deu }`), `index.ts` (env primario `PI_DEU_CODING_AGENT_DIR` + fallback legacy, default `~/.pi-deu/agent`), `lib/pkg-meta.ts` fallback `pi-deu@0.0.0`, `extensions/pi-deu-core.ts`, `extensions/pi-deu-mcp.ts`, `extensions/pi-deu-tui/` (+ `PiDeuTuiConfig`, `PiDeuHeader`, `pi-deu-tui.json`), `skills/pi-deu-check/`, `prompts/pi-deu-check.md`, identidad `SYSTEM.md`, docs/badges/CHANGELOG con migración `.deu` → `.pi-deu`.
- Alta de `.github/workflows/release.yml`: trigger `push.tags v*` + `workflow_dispatch`, `contents: write, id-token: write`, node 22, `npm ci` → `typecheck` → `npm publish --provenance --access public` vía OIDC Trusted Publishing (`NPM_TOKEN` solo fallback documentado).
- Externos `pi-*` intactos: deps, peers, imports `@earendil-works/pi-*`, `.agents/skills/pi-agent/**`.

## Consequences

### Positive

- Un solo nombre público `pi-deu` en npm/bin/docs; `npm install -g pi-deu` funciona.
- Release reproducible con provenance y rollback documentado.
- Cero secretos en repo; OIDC mínimo privilegio.

### Negative

- Ruptura para installs `.deu` existentes (mitigado: fallback lectura legacy + nota migración).
- Primer tag exige configurar Trusted Publisher en npm + renombre manual del repo remoto a `deuriib/pi-deu` por el owner.

## Supersedes / Superseded By

- Extiende `0003-system-prompt-desde-configdir.md` (configDir pasa a `.pi-deu`) y `0004-design-singleton-bootstrap.md` (nuevo componente release).
- No supersede nada; `brief-rebranding-deu-total.md` queda como histórico.
