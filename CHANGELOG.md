# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Changed

- Rename total `deu` → `pi-deu` (ADR-0005): package, bin `pi-deu`, configDir `.pi-deu`, env primario `PI_DEU_CODING_AGENT_DIR` (fallback legacy `DEU_*`/`PI_*`), extensiones `pi-deu-*`, skill `pi-deu-check`, docs/badges. Logo pixelado intacto (arte DEU).
- Migración: mover `~/.deu/agent` → `~/.pi-deu/agent` y `<proyecto>/.deu` → `<proyecto>/.pi-deu`; re-trust del proyecto + reload.

### Added

- `.github/workflows/release.yml`: tag `v*` → `npm publish --provenance --access public` vía OIDC Trusted Publishing.


### Added

- `LICENSE` (MIT, Legal, BOOTSTRAP-MISSING-FILES) — was linked by README but absent.
- `docs/specs/design/DESIGN.md` singleton v1 (Engineering, BOOTSTRAP-MISSING-FILES) — canonical contract + 4-line-note grammar.
