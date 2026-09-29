# Refuter Review: SPEC-pi-deu-rename-release

**Reviewer:** skeptic (adversarial)
**Date:** 2026-09-29
**Verdict:** pass ("could not falsify")

## Mission

Attempt to **falsify** the implementation. Success = finding a counterexample.

## Attack Vectors Tried

| ID | Hypothesis | Attempt | Result |
|----|-----------|---------|--------|
| RF-001 | `bin pi-deu` apunta a un archivo inexistente | `npm pkg get bin` + `ls index.ts` | Confirmed (existe, typecheck lo compila) |
| RF-002 | Algún import viejo `deu-tui`/`deu-check` quedó colgando | `grep -rn "deu-tui\|deu-check\|DeuTuiConfig\|DeuHeader" extensions skills prompts lib` | Confirmed (0 matches fuera de histórico) |
| RF-003 | `piConfig.configDir` no coincide con `agentDir()` default | `npm pkg get piConfig` (`.pi-deu`) vs `index.ts` (`~/.pi-deu/agent`) | Confirmed (coinciden) |
| RF-004 | Workflow publica en push a main sin tag | inspección `on.push.tags: v*` + `if: startsWith(github.ref, 'refs/tags/v')` | Confirmed (doble guarda) |
| RF-005 | `NPM_TOKEN` hardcodeado filtra secreto | `grep -rni NPM_TOKEN .github/` | Confirmed (solo comentario fallback) |

## Counterexamples Found

| ID | Counterexample | Impact | Reproduction |
|----|---------------|--------|--------------|
| — | None | — | — |

## Verdict Rationale

- pass = attempted falsification, no counterexamples found. Cinco vectores, cero falsaciones.
