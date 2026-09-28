# 0003 — deu ES deu: el CEO vive en el system prompt, no en agents

## Contexto

- `deu` (CEO, entry point, sole dispatcher) existía como `src/agents/deu.md`.
- Pero deu como sesión principal ya opera ese rol: tenerlo también como subagent invita al auto-dispatch (el CEO delegándose a sí mismo) y duplica la fuente del ruteo.

## Decisión

1. **deu es siempre el CEO.** El contenido operativo de `deu.md` se fusiona al system prompt como parte `.pi/system/router.md` (fuente) → `.pi/SYSTEM.md` (generado), igual que `persona/core/tools/guardrails`.
2. **Sin "Skill trigger".** deu no tiene los skills `frame-ship:*` del origen: la tabla Classify & Route lleva solo `ID | Pattern | Route To` (R1–R8 C-levels, R9 builtins `delegate/scout/researcher`, R10 `jimenez`). Se conserva el comportamiento (brief org-wide, max-2 lanes, reference-only packets, fast-path, synthesize, hard rules) sin nombres de skills inexistentes.
3. **Fuera del router:** `Gate` (ref de sesión `chat-BRIEF-deu 2026-09-19) y `Domains`(lane`santana`de aquella sesión) — contexto efímero, no reusable.`Delegation`— pasa a parte propia`.pi/system/delegation.md` (canónica; ver punto 4).
4. **`core/delegation-contract.md` al system prompt** como `.pi/system/delegation.md`, adaptado (`deu (CEO)` → `deu`). El fichero `src/agents/core/delegation-contract.md` queda como referencia de plantilla (los footers `> Canonical contract` de los agents lo siguen citando; el texto canónico vivo está en el prompt).
5. **`src/agents/deu.md` eliminado** y añadido al set `DROPPED` de `port-agents.mjs` (no se re-porta; `--check` falla si resurge). Las menciones "brief to deu" en los agents ahora resuelven a la sesión principal deu — semántica correcta sin tocar 70 ficheros.

## Consecuencias

- `assemble-system.mjs` ensambla 6 partes: `persona, core, router, delegation, tools, guardrails`. `verify-v0` exige las 6 marcas + ausencia de `deu.md` en `src/agents/`.
- Si el ruteo cambia (nuevo dominio/C-level), se edita `.pi/system/router.md` y se re-corre el assemble — nunca un agent.
- Estado: aceptado. Fecha: 2026-09-28.
