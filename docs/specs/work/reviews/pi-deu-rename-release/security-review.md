# Security Review: SPEC-pi-deu-rename-release

**Reviewer:** security owner via check-security
**Date:** 2026-09-29
**Verdict:** Approved

## Threat Model

See threat checklist below (full analysis inline).

**Methodology:** threat checklist
**Scope:** rename propio + `.github/workflows/release.yml` (OIDC publish a npm). Sin auth nueva, sin PII nueva, MCP URLs intactas.

## Attack Surface

| Surface | Entry Point | Trust Boundary |
|---------|-------------|----------------|
| GHA release workflow | `push.tags v*` / `workflow_dispatch` | external (GitHub → npm registry) |
| launcher env/configDir | `PI_DEU_CODING_AGENT_DIR` / `~/.pi-deu/agent` | internal (local host) |
| MCP registration | `context7` + `parallel-search` URLs existentes | external (sin cambio) |

## threat checklist Analysis

| Threat | Applicable? | Mitigation |
|--------|-------------|------------|
| Spoofing | Yes (tag spoofeado dispara publish) | Tags protegidos + solo maintainers pueden pushear tags; publish requiere OIDC del repo legítimo; `workflow_dispatch` manual solo maintainers |
| Tampering | Yes (supply-chain publish) | `npm ci` lockfile, `provenance: true`, OIDC sin token long-lived; sin `eval`/shell-injection (workflow sin interpolación insegura) |
| Repudiation | No | GHA logs + npm provenance attestation + git tag firman quién publicó qué |
| Information Disclosure | Yes (secretos en logs) | Cero secretos en código; `NPM_TOKEN` solo fallback documentado, nunca logueado; `mask` por defecto GHA; sin PII en workflow |
| Denial of Service | No | Workflow solo en tags; sin loop; `npm ci` cacheable; sin superficie DoS nueva |
| Elevation of Privilege | Yes (permisos GHA) | Mínimo: `contents: write, id-token: write`; sin `actions: write`, sin `admin`; `access public` solo para publish del package propio |

## Findings

| ID | Severity | Finding | Remediation |
|----|----------|---------|-------------|
| S-001 | Low | Fallback `NPM_TOKEN` mencionado podría tentar a guardar token long-lived | Hecho: OIDC por defecto; comment en workflow indica configurar Trusted Publisher primero; token solo último recurso con rotación |
| S-002 | Info | Repo remoto aún `deuriib/deu` mientras package.json apunta a `pi-deu` | Owner renombra repo manual tras merge; no bloquea publish pero se documenta |

## Conditions for Approval

Ninguna bloqueante. Recomendado: configurar npm Trusted Publisher (`github.com/deuriib/pi-deu` → `pi-deu`) antes del primer tag.

## Sign-off

- [x] security owner (2026-09-29)
- [x] engineering owner (arquitectura impactada, sin objeción de seguridad)
