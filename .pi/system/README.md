# .pi/system/ — fuente del system prompt deu

Pi (skill `usage.md`: "Context and System Prompt Files") reemplaza el system
prompt por defecto con `.pi/SYSTEM.md` a nivel proyecto.

- Edita las partes: `persona.md`, `core.md`, `tools.md`, `guardrails.md`.
- Luego regenera: `node scripts/assemble-system.mjs` → escribe `.pi/SYSTEM.md`.
- `verify-v0` falla si `SYSTEM.md` está desactualizado respecto a las partes.
- `SYSTEM.md` y estas partes se commitean. Estado runtime (`todo.json`,
  `npm/`, `git/`) no — ver `.gitignore`.
