# extensions — AGENTS

`DOMAINS: Security & Privacy, Engineering, Cross-Domain`

## OVERVIEW

Runtime extensions: destructive-guard, external MCP registration, custom TUI.

## WHERE TO LOOK

| Task | Location | Notes |
|---|---|---|
| Destructive-guard | `pi-deu-core.ts` | Fail-closed `tool_call` gate; sole role since 0003 |
| External MCPs | `pi-deu-mcp.ts` | context7 + parallel-search; `session_start` register, notify-warn on fail |
| TUI shell | `pi-deu-tui/index.ts` | Lifecycle + telemetry wiring; widgets in sibling files |
| Package root/meta | `../lib/pkg-meta.ts` | `getPackageMeta` / `packageRoot`, fallback `pi-deu@0.0.0` |

## GUARDRAILS (THIS DIR)

- Security: guard denies by default, fail-closed — never weaken without security + platform review.
- Boundary: new MCP server/URL/payload → security review pre-merge; consent-gated browser/elicitation flows stay TUI-only.
- Engineering: erasable TS only (no compile step); strict, no `any`; side effects at edges.
- Ops: no background processes/sockets/timers in factory — start in `session_start`, close idempotent in `session_shutdown`.
- Privacy: no secrets/tokens/PII in code, logs, or notify text — vault/env only.

## CONVENTIONS

- Default export receives `ExtensionAPI`; async factory only for one-time startup, never for background resources.

## ANTI-PATTERNS

- No `pi.system_prompt` injection from extensions (retired per 0003 — configDir is the only reader).
- No trust of PATH binaries beyond launcher lookup + spawn; no `shell: true` except documented fallback.
