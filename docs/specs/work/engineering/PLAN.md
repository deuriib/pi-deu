# Implementation Plan: SPEC-pi-deu-rename-release

**Agent:** engineering
**Date:** 2026-09-29
**Approved By:** engineering + security (blanket-approval ralph-loop + gates APPROVED)
**Domains-Touched:** [engineering, automation/ops, security, product]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | `git mv` propios a `pi-deu-*` | `extensions/`, `skills/`, `prompts/` | `git status` | 0.2h |
| 2 | package.json → `pi-deu` (name/bin/piConfig/urls) | `package.json` | E-001 | 0.2h |
| 3 | Launcher env + mensajes | `index.ts` | E-002 | 0.2h |
| 4 | Fallback + notifys + tipos TUI + header strings | `lib/pkg-meta.ts`, `extensions/pi-deu-*/**` | E-002+E-003 | 0.5h |
| 5 | Skill + prompt `pi-deu-check` | `skills/pi-deu-check/SKILL.md`, `prompts/pi-deu-check.md` | E-004 | 0.2h |
| 6 | Identidad + docs visibles + migración | `SYSTEM.md`, `README.md`, `AGENTS.md`, `extensions/AGENTS.md`, `extensions/pi-deu-tui/AGENTS.md`, `skills/AGENTS.md`, `CHANGELOG.md` | E-004 | 0.5h |
| 7 | Workflow release OIDC | `.github/workflows/release.yml` | E-005 | 0.3h |
| 8 | Quality gates + evidencias | typecheck, grep, pack, workflow lint | `docs/specs/work/engineering/evidence/` | 0.3h |

Each step maps to one commit unless grouped (agrupo 1-4 → commit REQ-001/002/003 por afinidad; 5-6 → REQ-004; 7 → REQ-005).

## Order of Operations

`git mv` primero (preserva historia), luego ediciones de contenido, luego docs, luego workflow, luego gates. Sin workflow no hay publish; sin rename no hay pack limpio.

## Rollback Points

- Tras cada commit: `git revert HEAD` (owner engineering, minutos).
- Tras workflow: renombrar a `.disabled` + borrar tag remoto.
- Tras publish erróneo: `npm unpublish` <72h sino `deprecate`.

## Quality Gates

- [ ] Engineering: Type checks passing (`npm run typecheck`)
- [ ] Automation/ops: automation owner + engineering owner runbook/flags/capacity check (workflow con kill-switch)
