# Architecture Contract: deu

**Owner:** engineering owner (vasquez); owning domain leads for non-engineering contracts (linked, engineering consolidates index only)
**Version:** v1
**Last Updated:** 2026-09-29
**Domains-Touched:** Legal, Engineering, Product, Cross-Domain

## Overview

`deu` — opinionated Pi coding-agent distribution. Modular monolith, hexagonal core, I/O at edges. Delivery via Frame→Ship chain (`skills/start-here/SKILL.md` canonical order). Full guardrails: `SYSTEM.md` + `APPEND_SYSTEM.md` (single source of truth, cited — never pasted here).

## The 4-line note

Inter-step handoff reference, one line. Grammar (authoritative — this section):

```text
SPEC:<spec-path>#<REQ-IDs> / HARD:<constraints> / GATE:<verdict> / DOMAINS:[<list>]
```

- `SPEC` — canonical spec/proposal path + covered REQ-IDs (e.g. `docs/specs/work/engineering/PROPOSAL.md#REQ-001,REQ-002`).
- `HARD` — hard constraints for the lane (e.g. `single-thread,no-impl-touch,legal-route`).
- `GATE` — `reviewing | awaiting-approval | APPROVED | CONDITIONAL | REJECTED`.
- `DOMAINS` — canonical domain names touching the work (max relevant, e.g. `[Legal,Engineering]`).
- Rule: paths by reference only, never pasted files. Bootstrap exception (this file missing) is recorded once in `docs/specs/decisions/0004-design-singleton-bootstrap.md` — never repeated.

## Components

| Component | Responsibility | Interface |
|-----------|---------------|-----------|
| launcher (`index.ts`) | Resolve + spawn Pi runtime, set configDir | PATH lookup `pi-launcher.js`, `PI_CODING_AGENT_DIR` → `~/.deu/agent` |
| lib (`lib/pkg-meta.ts`) | Package name/version, root resolve | `getPackageMeta(callerUrl)`, `packageRoot(fromUrl)` + fallback |
| deu-core (`extensions/deu-core.ts`) | Destructive-guard, fail-closed | `tool_call` gate; sole role since decision `0003` |
| deu-mcp (`extensions/deu-mcp.ts`) | External MCP registration | `session_start` → context7 + parallel-search; notify-warn on fail |
| deu-tui (`extensions/deu-tui/`) | Custom TUI widgets + telemetry | `getPendingUiChange`, `isTuiContext`, lifecycle/state/peek |
| skills (`skills/`) | Frame→Ship step contracts | One `SKILL.md` per step, IN/OUT/NEXT/STOP |
| prompt seed (`SYSTEM.md`, `APPEND_SYSTEM.md`) | Persona + guardrails seed | Copied to configDir; runtime loads from `.deu/`, reload required |
| decisions (`docs/specs/decisions/`) | ADRs for contract turns | `NNNN-<slug>.md`, one number = one file, never reuse |

## Data Flow

User goal → `agree-the-goal` → requirements + this contract → `propose` (PROPOSAL.md, touches nothing) → `check-security`/`check-design` gates → `build` (approved files only, REQ-ID → test → file) → `review` (blind, one fail = CLOSED) → `verify` (HANDOFF.md) → `release` (notes, changelog, tag). External MCP traffic stays in `deu-mcp` boundary; TUI-only behaviors gated on TUI context.

## Invariants

- INV-001: No code before approved proposal (docs-only bootstrap with recorded exception aside); no handoff while review CLOSED without written domain-lead + orchestrator exception.
- INV-002: `pi-*` externals never renamed (deps, imports `@earendil-works/pi-*`, `.agents/skills/pi-agent/**`).
- INV-003: Strict erasable TS only (`strict` + `noImplicitAny`, no `any`, no proof-less assertion/`ts-ignore`); no compile step.
- INV-004: Secrets/PII never in code, logs, prompts, commits — vault/env only; names/emails/IDs tokenised at capture.
- INV-005: This file is the singleton — update-in-place, never `DESIGN-*.md`; API/component shapes live in Components table, no separate contract doc.
- INV-006: Max 2 parallel lanes, isolated worktrees, sequential fallback keeps same gates (no silent downgrade).

## Non-Functional Requirements

- Correctness: `npm run typecheck` green is blocking; docs-only lanes attest via evidence instead of tests.
- Reversibility: every change states rollback (code revert + non-code undo with owner + ETA); no big-bang rewrites (Strangler Fig).
- Attention: telegraphic docs, no generic filler, no parent-repeat in subdir files; budgets root AGENTS.md ≤150 lines, subdir ≤80.

## Contract changes

Any invariant/component/cross-domain change needs a decision note in `docs/specs/decisions/` before merge. This section + `0004` are the birth record — future turns cite, never re-justify.
