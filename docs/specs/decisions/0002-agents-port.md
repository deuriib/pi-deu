# 0002 — Port de agents dotfiles + squad product (src/agents como fuente)

## Contexto

- Origen: `D:\2-Areas\GitHub\dotfiles\dot_gemini\config\agents` — 73 `.md` + `core/delegation-contract.md` (74 ficheros). Cero ficheros `*product*`.
- Destino `deu`: package autocontenido (`package.json:pi` → `src/`), `pi-subagents@0.73.1` como project package. Sin dir de agents previo.
- Frontmatter origen (Gemini): claves `name, description, mainAgent, subagent, effort, tools`. Solo `montilla.md` trae `tools:` (vocabulario Gemini: `list_directory, view_file, start_subagent, search_web…`), incompatible con Pi.

## Spike (verificado contra instalado)

- `docs/agents.md` de `pi-subagents@0.73.1` (en `.pi/npm/node_modules/pi-subagents/docs/agents.md`):
  > "Installed Pi packages can expose agent directories from either `{"pi-subagents":{"agents":["./agents"]}}` or `{"pi":{"subagents":{"agents":["./agents"]}}}` in their package manifest."
- Precedencia: builtin < package < user (`~/.pi/agent/agents/`) < project (`.pi/agents/`, legacy `.agents/` también leído).
- El bloque `pi` del propio `pi-subagents` solo declara `extensions/skills/prompts` — la clave de agents vive en top-level `pi-subagents` o en `pi.subagents`, NO en `pi.agents`.

## Decisión

1. **Fuente única `src/agents/`** (+ `src/agents/core/`), declarada en `package.json` con AMBAS formas (`"pi-subagents": {"agents": [...]}` y `"pi": {"subagents": {...}}`) para máxima compatibilidad.
2. **Fallback garantizado**: `scripts/sync-agents.mjs` espeja `src/agents/**` → `.pi/agents/**` (project agents = máxima precedencia, siempre funciona). `.pi/agents/` gitignored, como `.pi/SYSTEM.md`.
3. **Cuerpo intacto, solo frontmatter reescrito** por `scripts/port-agents.mjs` (re-ejecutable, idempotente). Citas a `skills/AGENTS.md` se conservan + nota (no se reescribe cuerpo).
4. **`core/delegation-contract.md` se copia verbatim** (es contrato canónico citado por todos; que sea descubierto como agent es inocuo, nunca se invoca directo).

## Tabla de conversión de frontmatter (única regla, sin excepciones ad-hoc)

| Origen (Gemini) | Destino (pi-subagents) | Nota |
|---|---|---|
| `name` | `name` (idéntico) | Preserva rutas `vasquez`, `montilla`, etc. |
| `description` | `description` (idéntica) | |
| `mainAgent: true` | ELIMINADO → `acceptanceRole: writer` + `maxSubagentDepth: 2` | Pi no tiene mainAgent; el rol orquestador se expresa así |
| `subagent: true` | ELIMINADO (implícito: todo fichero en agents/ ES subagent) | |
| `effort: high` (8 C-levels + `montilla` CEO por criterio: es el router de intent) | `thinking: high` | `barrera, dauhajre, espinoza, montero, santana, subero, vasquez, vera, montilla` |
| `tools:` Gemini (solo `montilla`) | `tools: read, grep, find, ls, subagent` | `list_directory→ls, view_file(_outline)→read, find_file→find, search_directory→grep, create/edit/multi_replace→write/edit, run_command→bash, start_subagent→subagent`; `ask_question, finish` (nativos Pi) y `search_web, read_url_content, generate_image` (vocabulario Gemini, web va por skill `pi-web-access`) se DROPEAN |

## Tiers de tools por rol (least-privilege documentado, no enforceado por origen)

| Tier | Miembros | `tools` | `acceptanceRole` |
|---|---|---|---|
| orchestrator | `montilla` + 8 C-levels (`vasquez, dauhajre, subero, vera, santana, barrera, montero, espinoza`) | `read, grep, find, ls, subagent` | `writer`, `defaultContext: fresh`, `maxSubagentDepth: 2` |
| readonly | `review-*`, `explore`, `*-analyst`, `legal-researcher`, `*-reviewer` (finance/people/revenue/security) | `read, grep, find, ls` (+`edit` solo en `review-*` para small fixes) | `read-only`, `completionGuard: false` |
| writer | resto (implementers, strategists, counsels, `qa`, `general`) | `read, write, edit, grep, find, ls, bash` | `writer`, `defaultContext: fresh` |
| `scout` | especial: SIN campo `tools` (hereda builtins + web de `pi-web-access`) | — | `read-only` |

Todos llevan `systemPromptMode: replace` (default Pi para customs: prompt limpio, sin herencia del base — coincide con la semántica origen de prompts autocontenidos).

## Squad product nuevo (gap: no existe en origen)

`jimenez` (CPO chain owner, tier orchestrator, `thinking: high`) + `discovery-researcher` (readonly) + `product-reviewer` (review tier, gate) + `growth-analyst` (readonly) + `product-writer` (writer). Patrón `vera.md/montero.md`: classify table + hard rules + delegation contract + frontera con `vasquez` (build) y `vera/montero` (claims). Registro R10 en `montilla.md` portado.

## Consecuencias

- `npm run agents:port` regenera `src/agents/` desde origen (idempotente); `npm run agents:sync` espeja a `.pi/agents/`; `verify-v0.mjs` chequea ambas puntas.
- Si un agent origen cambia, se re-corre el port (no se edita `src/agents/` a mano salvo los 5 de product + R10 de `montilla`, marcados con `<!-- deu:product -->` / `<!-- deu:R10 -->`).
- Estado: aceptado. Fecha: 2026-09-28.

## Addendum 2026-09-28 — drop `scout`/`explore`/`general` (duplican builtins)

- Origen `scout` (búsqueda externa web) ≈ builtin `researcher`; origen `explore` (recon local read-only) ≈ builtin `scout`; origen `general` (ejecutor versátil) ≈ builtin `delegate`.
- `plan`/`build` no existen ni en origen ni en `deu` — nada que remover.
- `port-agents.mjs` lleva set `DROPPED` (no porta + elimina destino si existe; `--check` falla si resurgen).
- Referencias rewired (ficheros marcados `<!-- deu:drop-… -->`, preservados por el port): `montilla` R9→`delegate`/`scout`/`researcher` + R10 product→`jimenez`; `vasquez` R3/R4/R13 `explore`→builtin `scout`; `barrera` R6, `copywriter`, `montero` R6, `santana` Benchmark `scout`(web)→builtin `researcher`. `architect` ("NEVER delegate… `explore`, `scout`") se deja intacto: la prohibición sigue válida contra los builtins.

## Addendum 2026-09-28 (bis) — origen retirado, deu es dueño

- Se elimina `scripts/port-agents.mjs` y el script `agents:port`. `src/agents/` es fuente única y canónica; el import desde dotfiles fue one-shot y no vuelve.
- Conformidad (frontmatter Pi, conteo, DROPPED ausentes) vive en `verify-v0.mjs`. Espejo a `.pi/agents/` vive en `scripts/sync-agents.mjs` (`agents:sync`).
- El owner eliminó `src/agents/core/delegation-contract.md` (el contrato canónico vive en `.pi/system/delegation.md`); `verify-v0` ya no lo exige.
