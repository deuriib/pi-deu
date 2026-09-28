---
name: deu-check
description: Verifica que el agente deu v0 esté activo (system prompt + todo + memory) y reporta qué falta.
---

# deu-check

Úsalo cuando el usuario pregunte si deu está activo, o al inicio de una sesión para validar el paquete autocontenido.

## Pasos

1. Ejecuta `/deu` y anota `modo`, `cwd`, `hasUI`.
2. Llama `todo({ action: "list", filter: "all" })` — si falla, reporta "pi-todo no cargado" con el error exacto.
3. Llama `memory_status` — si falla, reporta "pi-memory no cargado" con el error exacto.
4. Pide al modelo que repita el credo deu en una línea para confirmar el system prompt del proyecto (`.pi/SYSTEM.md`).
5. Reporta en 5 líneas: system, todo, memory, modo, siguiente acción. Sin azúcar: si algo falta, se dice con severidad y path out.
