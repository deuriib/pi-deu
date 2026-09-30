# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/).

## [0.2.0] — 2026-09-30

### Changed

- **Extensión simple, sin rebranding**: eliminados `bin`, `piConfig` y `index.ts` launcher. `pi-deu` deja de ser host con bin `pi-deu`/`configDir .pi-deu`; ahora es extensión Pi estándar cargada vía `package.json` → `pi` (`system_prompt`/`extensions`/`skills`/`prompts`). Sin `DEU_*`/`PI_DEU_*` env, sin `.pi-deu` configDir. Docs (`README.md`, `AGENTS.md`, `extensions/AGENTS.md`, `DESIGN.md`) actualizados. `tsconfig.json` ya no incluye `index.ts`.

## [v0.1.0] — 2026-09-29

### Changed

- Rename total `deu` → `pi-deu` (SPEC-pi-deu-rename-release, ADR-0005): package, bin `pi-deu`, configDir `.pi-deu`, env primario `PI_DEU_CODING_AGENT_DIR` (fallback legacy `DEU_*`/`PI_*`), extensiones `pi-deu-*`, skill `pi-deu-check`, docs/badges. Logo pixelado intacto (arte DEU).
- Migración: mover `~/.deu/agent` → `~/.pi-deu/agent` y `<proyecto>/.deu` → `<proyecto>/.pi-deu`; re-trust del proyecto + reload.

### Added

- `.github/workflows/release.yml`: tag `v*` → `npm publish --provenance --access public` vía OIDC Trusted Publishing.
- `LICENSE` (MIT, Legal, BOOTSTRAP-MISSING-FILES) — was linked by README but absent.
- `docs/specs/design/DESIGN.md` singleton v1 (Engineering, BOOTSTRAP-MISSING-FILES) — canonical contract + 4-line-note grammar.
