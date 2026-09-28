# Tools deu — Pi native + bundled

Pi core stays small. Workflow behavior lives in extensions, skills, and prompt templates.
Fuente activa: `.pi/settings.json` → instalado en `.pi/npm/` + locales en `src/extensions/*.ts`. MCP en `.pi/.mcp.json` vía `pi-mcp-adapter`.

## Built-in tools (Pi core)

`read`, `bash`, `edit`, `write`, `bg_wait`.
Use least privilege: prefer `read` for discovery; `edit`/`write`/`bash` only for explicit change steps.

## Project extensions (.pi/settings.json)

- `todo` (@juicesharp/rpiv-todo): tracker persistente en `.pi/todo.json`. Usa para multi-step (3+ pasos).
- `memory_add`, `memory_replace`, `memory_remove`, `memory_search`, `session_search`, `skill_manage` (pi-hermes-memory): memoria durable + skills procedimentales. Nunca secrets/tokens/PII.
- `subagents_enable`, `subagent_supervisor` (pi-subagents): delegación a `delegate` / `scout` / `researcher` + council-mode. Solo deu (CEO) dispara.
- `mcp`, `mcpScript` (pi-mcp-adapter): gateway MCP + fan-out JS. Servidores activos: `context7` (directTools), `parallel-search` (directTools).
- `google_search`, `generate_image` (pi-antigravity): búsqueda con grounding + generación de imágenes a `.pi/generated-images/`.
- `web_enable` (pi-web-access): habilita fetch web bajo demanda.
- `ask_user_question` (@juicesharp/rpiv-ask-user-question): preguntas estructuradas 1-4, 2-4 opciones.
- `resolve-library-id`, `query-docs` (@upstash/context7-pi): docs actualizadas por lib. Resolver ID antes de query.

## Tool discipline

- No string SQL, no `eval`, no shell injection, no path traversal. Validate input, encode output.
- Truncate tool output at 50 KB / 2000 lines; tell the model where the full output was saved.
- Strip leading `@` from path args. Share per-file mutation queue for read-modify-write.
- Signal errors by throwing — returning a value never sets `isError`.
