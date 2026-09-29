# extensions/pi-deu-tui — AGENTS

`DOMAINS: Engineering, Cross-Domain`

## OVERVIEW

Custom TUI layer: header/footer, git + runtime status, peek, telemetry, settings.

## WHERE TO LOOK

| Task | Location | Notes |
|---|---|---|
| Install/uninstall switch | `index.ts` → `getPendingUiChange`, `isTuiContext` | Enabled-vs-active diff only |
| Layout slots | `header.ts`, `footer.ts`, `editor.ts`, `fullscreen-scroll.ts` | Pinned bottom widgets; Kitty graphics, iTerm2 = text placeholder |
| Live state | `state.ts`, `runtime.ts`, `git.ts`, `telemetry.ts` | Usage cache + `readGitStatus` / `readRuntimeInfo` |
| Peek + session | `peek.ts`, `session-lifecycle.ts`, `settings-command.ts` | Transient preview reduce; lifecycle owns startup/shutdown |
| Static assets | `config.ts`, `icons.ts`, `utils.ts` | Glyph resolve + `ensureConfigExists`/`loadConfig`/`saveConfig` |

## GUARDRAILS (THIS DIR)

- Engineering: small components (props down, events up); no render side effects; abort on unmount.
- Boundary: TUI-only behaviors (URL mode, native viewers) never assumed in RPC/JSON/print — gate on `isTuiContext`.
- Ops: fullscreen reserves scrollbar column (`HIDDEN_THINKING_*`); viewport scroll must not break pinned footer/editor.
- Privacy: telemetry formats turns only — no PII/secrets in labels or logs.

## ANTI-PATTERNS

- No visible "Pi agent" strings in header/messages (rename: `pi-deu` total per ADR-0005; logo art stays DEU per brief §2).
- No drill >2, no global mutable UI state outside `FooterState` + reducers.
