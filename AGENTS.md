# PROJECT KNOWLEDGE BASE

**Generated:** 2026-09-30
**Commit:** simple-extension (bin/piConfig/index.ts removed)
**Branch:** main

## OVERVIEW

`pi-deu` — extensión Pi simple (npm). TS strict, cadena Frame→Ship de 9 pasos, persona mentor, guards + memory/todo.

## DOMAINS ACTIVE

| Domain | Status | Evidence |
|--------|--------|----------|
| Security & Privacy | active | `extensions/pi-deu-core.ts`, `extensions/pi-deu-mcp.ts` |
| Testing | absent | — |
| Engineering | active | `package.json`, `tsconfig.json`, `extensions/`, `lib/` |
| Product | active | `docs/specs/decisions/` |
| Cross-Domain | active | `docs/specs/decisions/`, `extensions/pi-deu-mcp.ts` |

## STRUCTURE

- `lib/` — `pkg-meta.ts` (name/version desde package.json + fallback) + barrel.
- `extensions/` — `pi-deu-core.ts` (destructive-guard), `pi-deu-mcp.ts` (MCPs externos), `pi-deu-tui/` (TUI custom).
- `skills/` — cadena Frame→Ship + `init-deep`, `fix-a-bug`, `open-a-pull-request`, `pi-deu-check`.
- `prompts/` — plantillas de prompt para Pi.
- `SYSTEM.md` / `APPEND_SYSTEM.md` — prompt seed vía `pi.system_prompt` (no configDir custom).
- `docs/specs/` — brief + `decisions/` (ADRs) + `design/DESIGN.md`.
- `.agents/skills/pi-agent/` — docs vendor Pi, no tocar.

## WHERE TO LOOK

| Task | Location | Notes |
|---|---|---|
| Prompt runtime | `SYSTEM.md`, `APPEND_SYSTEM.md` | Vía `package.json` → `pi.system_prompt` / `pi.append_system_prompt` |
| Wiring (extensions/skills/prompts) | `package.json` → `pi` | Extensión simple, sin `piConfig` ni `bin` |
| Destructive-guard | `extensions/pi-deu-core.ts` | Fail-closed `tool_call` gate |
| Servicios externos | `extensions/pi-deu-mcp.ts` | context7 + parallel-search URLs |
| Widgets TUI | `extensions/pi-deu-tui/` | header/footer/state/telemetry/peek/session-lifecycle |
| Contrato por paso | `skills/<step>/SKILL.md` | IN/OUT/NEXT/STOP por skill |

## BOUNDARIES

- Trust: `extensions/pi-deu-mcp.ts` → `https://mcp.context7.com/mcp`, `https://search.parallel.ai/mcp` — nuevo endpoint/adapter → security review pre-merge.
- PII: no se almacena; tokenizar nombres/emails/IDs en captura (`[USER-1]`); sin secretos en código/logs/commits — vault/env solo.
- Gates: no código antes de propuesta aprobada; `check-security` en login/PII/servicio externo; `check-design` + decision note en cambio de contrato.

## CODE MAP

- `lib/pkg-meta.ts` → `getPackageMeta(callerUrl)`, `packageRoot(fromUrl)` (best-effort + fallback).
- `extensions/pi-deu-core.ts` → default export `(pi)` — guard fail-closed.
- `extensions/pi-deu-mcp.ts` → `registerMcps(pi)` en `session_start` (2 servers, try/notify-warn).
- `extensions/pi-deu-tui/index.ts` → `getPendingUiChange()`, `isTuiContext()`, session-lifecycle + telemetry.

## CONVENTIONS

- TS strict + `noImplicitAny`, sintaxis borrable (strip-types) — sin compile step.
- Un owner por paso; especialista nunca aprueba su propia propuesta; máx 2 lanes paralelas vía worktrees aislados.
- ADRs obligatorios para giros de contrato/diseño: `docs/specs/decisions/` (context/options/decision/consequences/status).

## ANTI-PATTERNS (THIS PROJECT)

- Nunca renombrar `pi-*` externos: `dependencies`, `peerDependencies`, imports `@earendil-works/pi-*`, `.agents/skills/pi-agent/**`.
- No direct-to-main, no self-merge, no tercer retry (2 intentos → escalar, nunca sideways).
- No `any`, no non-null assertion / `ts-ignore` sin prueba/ticket; no secretos/PII en output.

## COMMANDS

```bash
npm install          # install (luego /trust + /reload en sesión Pi)
npm run typecheck    # tsc --noEmit — gate bloqueante
pi                   # lanza Pi (carga pi-deu como extensión)
```

## NOTES

- Extensión simple: sin `bin`, sin `piConfig`, sin `index.ts`, sin `.pi-deu` configDir.
- No hay test runner ni pipeline: `npm run typecheck` es el único gate verde hoy.
