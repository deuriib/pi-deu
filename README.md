# deu — the Pi agent that ships clean, reviewed code

> Opinionated coding agent on top of Pi. Mentor persona, 9-step **Frame→Ship** chain, safety guards, memory + todo built-in.
> _"Haces las cosas como para Dios, por eso trabajas con excelencia, dedicación y minimalismo."_

[![npm](https://img.shields.io/npm/v/deu)](https://www.npmjs.com/package/deu)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D22.19-green)](./package.json)
[![pi](https://img.shields.io/badge/runtime-pi--coding--agent-purple)](https://www.npmjs.com/package/@earendil-works/pi-coding-agent)

**One-liner:** `deu` turns vague ideas into reviewed, shippable code — goal → requirements → proposal → build → review → verify → release. No vibe-coding, no silent failures, no messy history.

## Why deu exists

Vanilla coding agents write code fast and leave you the mess: unclear goals, unreviewed diffs, no rollback story.

`deu` is the opposite default:

1. **Design before code.** Every change starts with a written goal + testable requirements + an approved proposal. No approval, no code.
2. **Mentor, not autocomplete.** Corrects with the _why_, names real problems with severity + path out, no sugarcoating.
3. **Reproducible by default.** Short-lived branches, Conventional Commits, green CI gates, rollback plan. Small disciplines, big craftsmanship.

## What you get

| Pillar | What it does for you |
|---|---|
| **Frame→Ship chain (9 steps)** | `agree-the-goal → write-the-requirements → propose → check-security/check-design → build → review → verify → release`. Each step has a skill, an input contract and a stop rule. |
| **Mentor persona (`deu`)** | Professional but close, direct, Dominican warmth. Reversible = move fast, irreversible = deliberate. Defaults over hedging. |
| **Destructive guard (`deu-core`)** | Blocks destructive bash before it runs. Fail-closed. |
| **Memory + todo built-in** | `pi-hermes-memory` + `rpiv-todo` bundled — context survives sessions, work is trackable. |
| **Self-contained install** | One `npm` package bundles extensions, skills and prompts. No manual wiring. |

Skills included: `start-here`, `agree-the-goal`, `write-the-requirements`, `propose`, `check-security`, `check-design`, `build`, `review`, `verify`, `release`, plus `deu-check` (health diagnostic) and `fix-a-bug`, `init-deep`, `open-a-pull-request`.

## 30-second quickstart

```bash
npm install -g deu
deu
# inside the session:
/deu-check   # persona + todo + memory must show enabled
```

Working inside this repo:

```bash
npm install
# then in session: /trust (once) + /reload → project packages auto-install
deu config   # deu-core + todo + memory should appear enabled
```

## deu vs. vanilla Pi

| | vanilla Pi | deu |
|---|---|---|
| Persona | generic assistant | mentor with creed: excellence, dedication, minimalism |
| Workflow | free-form prompting | enforced Frame→Ship chain, proposal must be approved first |
| Safety | you remember flags | destructive-guard + security/design check gates |
| Memory | per-session | persistent memory + todo across sessions |
| History | whatever the model emits | atomic Conventional Commits, no direct-to-main |

## How it works (60 seconds)

- **Source of prompt:** `SYSTEM.md` + `APPEND_SYSTEM.md`. They ship with `npm:deu` as seed, but **the runtime loads them from the configDir**, not from the package root.
- **ConfigDir wins:** `<project>/.deu/SYSTEM.md` when trusted, else `~/.deu/agent/SYSTEM.md` (same for `APPEND_SYSTEM.md`). No custom loader — after copying a new `.md`, reload.
- **Package wiring:** `package.json` → `pi` block points at `./extensions`, `./skills`, `./prompts` + bundled `node_modules/`. Own paths live in `piConfig` (`name: deu`, `configDir: .deu`).
- **Why configDir, not extension?** See `docs/specs/decisions/0003-system-prompt-desde-configdir.md` (supersedes `0002`).

## Commands you'll actually use

- `/deu-check` — health diagnostic (persona, todo, memory)
- `agree-the-goal` — "what are we building + what counts as success"
- `propose` — plan the diff (files, risks, test plan), then stop and wait for yes
- `build` — only approved files, one test per requirement
- `review` → `verify` → `release` — reviewers can't see each other, single fail = CLOSED, then handoff + changelog + tag

## Non-goals

- No magic framework, no lock-in. Modular monolith first, hexagonal core, I/O at edges.
- No unsubstantiated claims. If it's not in code, ADRs or tests, it's not promised.

## Contributing / docs

- Decisions: `docs/specs/decisions/`
- Design singleton: `docs/specs/design/DESIGN.md` (contract changes need a decision note)
- License: MIT — use it, fork it, ship with it.

---

_Built con excelencia, dedicación y minimalismo._ How's it going? Let's ship clean. 🚢
