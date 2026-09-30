# pi-deu — the Pi extension that ships clean, reviewed code

> Pi extension opinionada. Persona mentor, cadena **Frame→Ship** de 9 pasos, safety guards, memory + todo incluidos.
> _"Haces las cosas como para Dios, por eso trabajas con excelencia, dedicación y minimalismo."_

[![npm](https://img.shields.io/npm/v/pi-deu)](https://www.npmjs.com/package/pi-deu)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D22.19-green)](./package.json)
[![pi](https://img.shields.io/badge/runtime-pi--coding--agent-purple)](https://www.npmjs.com/package/@earendil-works/pi-coding-agent)

**One-liner:** `pi-deu` convierte ideas vagas en código revisado y shipeable — goal → requirements → proposal → build → review → verify → release. Sin vibe-coding, sin fallos silenciosos, sin historial sucio.

## Qué es

Extensión simple para [Pi](https://www.npmjs.com/package/@earendil-works/pi-coding-agent). No es un rebrand ni un bin propio: se instala como `npm:pi-deu` y Pi la carga automáticamente vía `package.json` → `pi.extensions/skills/prompts`.

## Por qué existe

Vanilla escribe rápido y te deja el desastre: goals difusos, diffs sin revisar, sin rollback.

`pi-deu` es el default opuesto:

1. **Diseño antes que código.** Todo cambio empieza con goal escrito + requisitos testeables + propuesta aprobada. Sin aprobación, no hay código.
2. **Mentor, no autocomplete.** Corrige con el _por qué_, nombra el problema real con severidad + salida, sin azúcar.
3. **Reproducible por defecto.** Ramas efímeras, Conventional Commits, gates en verde, plan de rollback.

## Qué te llevas

| Pillar | Qué hace por ti |
|---|---|
| **Frame→Ship (9 pasos)** | `agree-the-goal → write-the-requirements → propose → check-security/check-design → build → review → verify → release`. Cada paso es un skill con contrato IN/OUT/NEXT/STOP. |
| **Persona mentor (`pi-deu`)** | Profesional y cercana, directa, con calor dominicano. Reversible = rápido, irreversible = deliberado. |
| **Destructive guard (`pi-deu-core`)** | Bloquea bash destructivo antes de ejecutar. Fail-closed. |
| **Memory + todo incluidos** | `pi-hermes-memory` + `rpiv-todo` — contexto sobrevive sesiones, trabajo trackeable. |
| **Instalación autocontenida** | Un solo `npm` package. Sin wiring manual. |

Skills incluidos: `start-here`, `agree-the-goal`, `write-the-requirements`, `propose`, `check-security`, `check-design`, `build`, `review`, `verify`, `release`, más `pi-deu-check` (diagnóstico) y `fix-a-bug`, `init-deep`, `open-a-pull-request`.

## 30 segundos — quickstart

```bash
npm install -g pi-deu
# o en tu proyecto
npm install pi-deu

# lanza Pi normal (no hay bin propio)
pi
# dentro de la sesión:
/pi-deu-check   # persona + todo + memory deben aparecer habilitados
```

Dentro de este repo:

```bash
npm install
# en la sesión: /trust (una vez) + /reload → auto-instala packages del proyecto
pi config   # pi-deu + todo + memory deben aparecer habilitados
```

## pi-deu vs. vanilla Pi

| | vanilla Pi | pi-deu |
|---|---|---|
| Persona | genérica | mentor con credo: excelencia, dedicación, minimalismo |
| Workflow | prompting libre | cadena Frame→Ship, propuesta debe aprobarse primero |
| Safety | tú recuerdas flags | destructive-guard + gates check-security/design |
| Memory | por sesión | memoria persistente + todo entre sesiones |
| Historial | lo que emita el modelo | Conventional Commits atómicos, no direct-to-main |

## Cómo funciona (60s)

- **Prompt:** `SYSTEM.md` + `APPEND_SYSTEM.md` vía `package.json` → `pi.system_prompt` / `pi.append_system_prompt`. No hay `piConfig` ni `configDir` custom.
- **Wiring:** `package.json` → bloque `pi` apunta a `./extensions`, `./skills`, `./prompts` + `node_modules/` bundleados.
- **Extensión simple:** no hay `bin`, no hay `index.ts` launcher, no hay `.pi-deu` — es una extensión, no un host rebrandeado.

## Comandos que usarás

- `/pi-deu-check` — diagnóstico (persona, todo, memory)
- `agree-the-goal` — "qué construimos + qué cuenta como éxito"
- `propose` — planifica el diff (archivos, riesgos, plan de test), luego para y espera sí
- `build` — solo archivos aprobados, un test por requisito
- `review` → `verify` → `release` — reviewers no se ven entre sí, un solo fail = CLOSED, luego handoff + changelog + tag

## Non-goals

- Sin framework mágico ni lock-in. Monolito modular primero, core hexagonal, I/O en bordes.
- Sin claims sin sustento. Si no está en código, ADRs o tests, no se promete.

## Contribuir / docs

- Decisiones: `docs/specs/decisions/`
- Contrato arquitectura: `docs/specs/design/DESIGN.md` (cambios de contrato necesitan decision note)
- Licencia: MIT

---

_Con excelencia, dedicación y minimalismo._ Let's ship clean. 🚢
