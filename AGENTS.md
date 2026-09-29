# PROJECT KNOWLEDGE BASE

**Generated:** 2026-09-29T17:11:18Z
**Commit:** 32eaf92
**Branch:** main

## OVERVIEW

`pi-deu` — opinionated Pi coding-agent distribution (npm). TS strict, Frame→Ship 9-step chain, mentor persona, destructive-guard + MCP + custom TUI.

## DOMAINS ACTIVE

| Domain | Status | Evidence |
|--------|--------|----------|
| Security & Privacy | active | `extensions/pi-deu-core.ts`, `extensions/pi-deu-mcp.ts` |
| Testing | absent | — |
| Engineering | active | `package.json`, `tsconfig.json`, `extensions/`, `lib/` |
| Operations & Automation | absent | — |
| Legal & Regulatory | absent | — (see NOTES: LICENSE gap) |
| Brand & Marketing | absent | — |
| Revenue & Commercial | absent | — |
| Product | active | `docs/specs/brief-rebranding-deu-total.md`, `docs/specs/decisions/` |
| Financial | absent | — |
| People & Conduct | absent | — |
| Cross-Domain | active | `docs/specs/decisions/`, `extensions/pi-deu-mcp.ts` |

## STRUCTURE

- `index.ts` — launcher: resolves `pi-launcher.js` via PATH, sets `PI_DEU_CODING_AGENT_DIR` → `~/.pi-deu/agent` (legacy `DEU_*`, `PI_*`), spawns unchanged stdio.
- `lib/` — `pkg-meta.ts` (name/version from package.json + fallback) + barrel.
- `extensions/` — `pi-deu-core.ts` (destructive-guard), `pi-deu-mcp.ts` (external MCPs), `pi-deu-tui/` (custom TUI).
- `skills/` — Frame→Ship chain + `init-deep`, `fix-a-bug`, `open-a-pull-request`, `pi-deu-check`.
- `docs/specs/` — brief + `decisions/` (ADRs 0002 superseded, 0003 accepted).
- `.agents/skills/pi-agent/` — vendor docs, never rename (see brief §2).

## WHERE TO LOOK

| Task | Location | Notes |
|---|---|---|
| Runtime prompt source | `SYSTEM.md`, `APPEND_SYSTEM.md` | Seed only; runtime loads from `.pi-deu/` configDir, reload required |
| Wiring (extensions/skills/prompts) | `package.json` → `pi` + `piConfig` | `name: pi-deu`, `configDir: .pi-deu`, `bin: pi-deu` |
| Destructive-guard behavior | `extensions/pi-deu-core.ts` | Fail-closed `tool_call` gate |
| External services | `extensions/pi-deu-mcp.ts` | context7 + parallel-search URLs |
| TUI widgets | `extensions/pi-deu-tui/` | header/footer/state/telemetry/peek/session-lifecycle |
| Chain contract per step | `skills/<step>/SKILL.md` | IN/OUT/NEXT/STOP per skill |
| Rebrand scope (frozen) | `docs/specs/brief-rebranding-deu-total.md` | Visible + own code; `pi-*` externals untouched |

## BOUNDARIES

- Trust: `extensions/pi-deu-mcp.ts` → `https://mcp.context7.com/mcp`, `https://search.parallel.ai/mcp` — new endpoint/adapter → security review pre-merge.
- Trust: launcher spawns `pi-launcher.js` / `pi` from PATH — PATH hijack surface, no shell quoting.
- PII: none stored; tokenise names/emails/IDs at capture (`[USER-1]`); no secrets in code/logs/commits — vault/env only.
- Gates: no code before approved proposal; `check-security` on login/PII/outside service; `check-design` + decision note on contract change.

## CODE MAP

- Entry: `index.ts` → `findPiLauncher()`, `agentDir()`, `main()` (spawn + exit/signal relay).
- `lib/pkg-meta.ts` → `getPackageMeta(callerUrl)`, `packageRoot(fromUrl)` (best-effort + fallback).
- `extensions/pi-deu-core.ts` → default export `(pi)`, package-root resolve (guard only per 0003).
- `extensions/pi-deu-mcp.ts` → `registerMcps(pi)` on `session_start` (2 servers, try/notify-warn).
- `extensions/pi-deu-tui/index.ts` → `getPendingUiChange()`, `isTuiContext()`, session-lifecycle + telemetry wiring.

## CONVENTIONS

- TS strict + `noImplicitAny`, erasable syntax only (Node strip-types/Jiti, no compile step).
- One owner per step; specialist never approves own proposal; max 2 parallel lanes via isolated worktrees.
- ADRs mandatory for contract/design turns: `docs/specs/decisions/` (context/options/decision/consequences/status).

## ANTI-PATTERNS (THIS PROJECT)

- Never rename `pi-*` externals: `dependencies`, `peerDependencies`, imports `@earendil-works/pi-*`, `.agents/skills/pi-agent/**`.
- No direct-to-main, no self-merge, no third retry (2 tries → escalate, never sideways).
- No `any`, no non-null assertion / `ts-ignore` without proof/ticket; no secrets/PII in output.

## COMMANDS

```bash
npm install          # install (then /trust once + /reload in session)
npm run typecheck    # tsc --noEmit — blocking gate, only suite present
pi-deu                # launch (node index.ts wrapper)
```

## NOTES

- `README.md` references `./LICENSE` + `docs/specs/design/DESIGN.md` — both absent; LICENSE gap blocks legal pass, DESIGN gap breaks guardrail link. Route to legal/owner.
- No test runner, no pipeline, no Dockerfile: `npm run typecheck` is the only green gate today.
- Config change (`SYSTEM.md`) takes effect only after copy to configDir + session reload.
