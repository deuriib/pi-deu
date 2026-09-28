# BRIEF — parallel-tools extension (CEO-owned)

> Dueño: deu (CEO) · Estado: FROZEN · Fecha: 2026-09-28
> Destino: `vasquez` (CTO) vía `delegate` — ejecución ingeniería.
> Revisores requeridos: `barrera` (seguridad: bash paralelo), `vasquez` (calidad onda).

## 1. Intención estratégica
Darle a Pi la capacidad de disparar N tools en paralelo dentro de un mismo turno y juntar resultados, empezando por lo seguro y útil: `bash` + `read`. Sin teatro, sin magia oculta. Como para Dios: excelente, minimalista, verificable.

## 2. Alcance v1 (congelado por usuario 2026-09-28)
- **Patrón:** fan-out en un turno. Una llamada → N ejecuciones → un resultado agregado.
- **Tools cubiertas:** solo `bash` + `read`. Nada genérico, nada MCP en v1.
- **Límites conservadores (default):**
  - max 4 concurrentes
  - timeout 30s por item (jitter no necesario en v1, abort limpio sí)
  - fail-closed: niega por defecto, bash destructivo bloqueado (reusar `isDestructiveBash` de `deu-core.ts`)
  - sin secretos en logs/eventos; mascar PII; sin `eval`, sin SQL-string, sin path traversal
- **Patrón de implementación:** extensión local `src/extensions/parallel-tools.ts` estilo `deu-core.ts` / `deu-header.ts`:
  - `export default function (pi: ExtensionAPI)`
  - una tool o comando (propone CTO: `parallel_run` o `/parallel`) con input `{ jobs: [{ kind: "bash"|"read", command?: string, path?: string, cwd?: string, timeoutMs?: number }], maxConcurrency?: number }`
  - output agregado `{ results: [{ index, ok, output|error, ms }], truncated: boolean }`
  - respeta truncate 50KB / 2000 líneas
- **Fuera de alcance v1:** auto-paralelo transparente, cola background persistente, MCP genérico, cualquier-tool genérica, UI fancy.

## 3. Restricciones no-negociables (guardrails)
- Seguridad: OWASP por boundary nuevo; bash = trust boundary. Allowlist de cwd dentro del proyecto. Bloqueo destructivo obligatorio con prueba.
- Testing con cambio: `tests/unit/parallel-tools/` + `tests/integration/` mínimo; floors línea ≥80%. Suite verde antes de done. Críticos (bash exec) ≥95% en paths de bloqueo.
- Engineering: TS strict, no `any` (`unknown` + narrowing). Funciones puras, efectos en bordes. Complejidad ≤10, nesting ≤3. Sin TODO sin ticket.
- Docs/commits: ADR en `docs/specs/decisions/` si cambia contrato; Conventional Commits; rama corta, no direct-to-main.

## 4. Paquete de referencia (solo lectura, no inlinear)
- `src/extensions/deu-core.ts` — patrón `ExtensionAPI`, guard destructivo, `/deu` command
- `src/extensions/deu-header.ts` — patrón header/TUI, estrategia re-assert
- `src/extensions/lib/pkg-meta.ts` — meta package.json
- `package.json` → `pi.extensions: ./src/extensions/*.ts`
- `scripts/verify-v0.mjs` + `npm run typecheck` — gates locales

## 5. Criterios de aceptación (falsables)
1. `npm run typecheck` verde.
2. `npm run verify:v0` (o suite relevante) verde.
3. Demo: 4 jobs (2 bash `echo` + 2 read) corren en paralelo en < tiempo secuencial, resultado agregado correcto con `ms` por job.
4. Prueba adversa: comando destructivo (`rm -rf /`) bloqueado con reason explícito; timeout (sleep > timeoutMs) aborta con error tipado, no cuelga.
5. Sin secretos/PII en output de prueba.

## 6. Riesgos retenidos
- Paralelizar `bash` puede saturar runner si el usuario sube `maxConcurrency` — mitigado con cap 4 default + documentar.
- Agregación de outputs grandes puede romper TUI — mitigado con truncate 50KB.

## 7. Siguiente paso (CTO)
SPEC → proposal → HANDOFF con DoD + evidencia escopada. Gate FAIL tras 2 reintentos escala a CEO, nunca tercer retry. Sin sideways.

---
*Small disciplines, big craftsmanship.*
