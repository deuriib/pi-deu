# deu-pi-agent v0 — Pi agent autocontenido

Custom Pi agent `deu`: system prompt autocontenido vía extensión (`before_agent_start`, replace). Fuente: `SYSTEM.md` + `APPEND_SYSTEM.md` en la raíz del package.

## Estructura

- `package.json` — bloque `pi` (`extensions/skills/prompts` → `./extensions`, `./skills`, `./prompts`, más `node_modules/` bundleados). Sin claves `pi.system_prompt`: Pi no las lee. Los paths propios viven en el bloque `deu` (`systemPrompt`, `appendSystemPrompt`).
- `SYSTEM.md` + `APPEND_SYSTEM.md` — fuente del system prompt (vive con el package, viaja con `npm:deu`).
- `lib/system-prompts.ts` — loader best-effort (`loadDeuPrompts`, `composeDeuSystemPrompt`): lee ambos `.md` en utf8, `trimEnd + \n`, missing-file → `""` sin romper carga.
- `extensions/deu-core.ts` — inyecta `systemPrompt` en `before_agent_start` (replace, preserva `customPrompt` + `appendSystemPrompt` del usuario como sufijo), comando `/deu` (chars + fuentes), guard destructivo en `tool_call`, `/deu-config`.
- No se usa `.deu/SYSTEM.md` ni `~/.deu/agent/SYSTEM.md`: la inyección forced-prompt pisa el default y evita doble carga.
- `docs/specs/decisions/0002-deu-system-prompt-autocontenido.md` — por qué autocontenido vía extensión, orden de composición, replace vs append.

## Uso

```bash
npm install            # dev local
node scripts/verify-v0.mjs
# en Pi, dentro del repo: /trust (una vez) + /reload → auto-instala los project packages
pi config              # deu-core + todo + memory deben aparecer enabled
```

En sesión: `/deu` estado, `/skill:deu-check` o `/deu-check` diagnóstico, `todo({action:"list"})`, `memory_status`.
