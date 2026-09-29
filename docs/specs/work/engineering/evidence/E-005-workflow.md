# E-005 — workflow release (REQ-005)

Archivo: `.github/workflows/release.yml`

Checks (2026-09-29):

- `grep -c "id-token: write"` → 1
- `grep -c "provenance"` → 2 (`--provenance` + `NPM_CONFIG_PROVENANCE`)
- `grep -c "tags:"` → 1 (trigger `v*` + `workflow_dispatch`)
- Node 22, `registry-url: https://registry.npmjs.org`, pasos `npm ci` → `typecheck` → `publish --provenance --access public`.
- OIDC Trusted Publishing por defecto; `NPM_TOKEN` solo comentado como fallback documentado.
