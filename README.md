# deu-pi-agent v0 — Pi agent autocontenido

Custom Pi agent `deu`: system prompt + `pi-todo` + `pi-memory`, todo declarado en `package.json` bajo `src/`. Sin `.pi/settings.json`, sin `SYSTEM.md` suelto.

## Estructura

- `package.json` — bloque `pi` (`extensions/skills/prompts` → `src/` propio). `dependencies` conserva `pi-todo` + `pi-memory` solo para dev local.
- `.pi/settings.json` — project packages pineados (Pi auto-instala al arrancar tras `/trust`): `pi-todo@1.2.0`, `pi-memory@0.4.0`, `pi-subagents@0.73.1`, `pi-mcp-adapter@3.1.0`, `pi-web-access@0.33.0`, `pi-interview@0.13.0`, `@gotgenes/pi-permission-system@35.0.1`.
- `.pi/system/{persona,core,tools,guardrails}.md` — fuente del system prompt. `node scripts/assemble-system.mjs` genera `.pi/SYSTEM.md`, que Pi usa como prompt del proyecto (skill `usage.md`). Nunca editar `SYSTEM.md` a mano.
- `src/extensions/deu-core.ts` — guarda destructivo, comando `/deu`, discover de skills/prompts. No inyecta prompt: Pi es dueño vía `.pi/SYSTEM.md`.
- `src/system/{persona,core,tools,guardrails}.md` — system prompt deu por partes; `SYSTEM.md` es vista de lectura.
- `src/extensions/deu-core.ts` — inyecta `systemPrompt` en `before_agent_start` (replace, preserva `customPrompt`), expone `skillPaths/promptPaths` en `resources_discover`, comando `/deu`, guard destructivo en `tool_call`.
- `src/skills/deu-check/` + `src/prompts/deu-check.md` — diagnóstico v0.
- `scripts/verify-v0.mjs` — `node scripts/verify-v0.mjs`.
- `docs/specs/decisions/0001-deu-v0-autocontenido.md` — por qué autocontenido, por qué `pi-memory` sin worker, replace vs append.

## Uso

```bash
npm install            # dev local
node scripts/verify-v0.mjs
# en Pi, dentro del repo: /trust (una vez) + /reload → auto-instala los project packages
pi config              # deu-core + todo + memory deben aparecer enabled
```

En sesión: `/deu` estado, `/skill:deu-check` o `/deu-check` diagnóstico, `todo({action:"list"})`, `memory_status`.
