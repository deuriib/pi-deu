# E-006 — security (REQ-006)

- `grep -rni "NPM_TOKEN" .github/` → solo línea comentada `# NPM_TOKEN: ${{ secrets.NPM_TOKEN }}` (fallback documentado, no activo).
- Sin secretos/tokens en código, logs o commits; sin PII nueva; MCP URLs intactas.
- Veredicto: security-review APPROVED (`docs/specs/work/reviews/pi-deu-rename-release/security-review.md`, 2026-09-29).
