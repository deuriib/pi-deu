# Proposed Changes: revert 24c090f — restore agents/

**Spec Reference:** N/A — revert request for `24c090f7db019a0c1212c73b324dff11d07e952f`
**Agent:** engineering lead
**Date:** 2026-09-30
**Execution_Mode:** single lane, isolated branch
**Domains-Touched:** engineering

## Summary

`24c090f refactor(core): replace C-level org with frame-ship chain` deleted `agents/` (70+ files, ~4500 deletions). User asked to return it via safe revert on a new branch + PR.
Proposal restores `agents/` exactly as it existed at `24c090f^` (`72b0adb`), keeps the frame-ship chain intact, verifies `typecheck` stays green.

## Changes

| Target | Change Type | Description |
| ------ | ----------- | ----------- |
| `agents/*.md` (70+ files, from `24c090f^`) | file-create | Restore `agents/` directory deleted in 24c090f, byte-identical to parent `72b0adb` |
| `docs/specs/work/engineering/PROPOSAL.md` | document-create | This proposal (committed now, impl untouched) |

Change types: `file-create | file-modify | file-delete | document-create | campaign-update | contract-update | policy-update | model-update | workflow-update | config-update`.

Implementation will run on branch `revert/restore-agents-from-24c090f` (off `main` @ `a5dcbdd`), single commit, then PR. No direct-to-main. No `reset --hard`. History preserved.

## Rationale

- Full `git revert 24c090f` on top of current `main` also tries to undo `APPEND_SYSTEM.md`, `extensions/deu-core.ts`, `lib/*`, `package.json`, `skills/deu-check` — all heavily evolved since (pi-deu rename + release 0.1.0). High conflict risk.
- Scoped restore (`git checkout 24c090f^ -- agents/`) achieves the stated goal — "los agents" — without touching the frame-ship chain or the rename. Minimal blast radius, reversible (`git rm agents/` + revert the revert).
- Assumption behind judgment call: user wants the personas back to use/reference, not to undo frame-ship. If the intent was to kill frame-ship and go back to C-level org, this proposal is wrong — reject it and we re-scope.

## Alternatives Considered

| Alternative | Reason Rejected |
| ----------- | --------------- |
| Full `git revert 24c090f` (all 80 files) | Reverts unrelated refactor (core prompts, extensions, lib, package.json) on top of rename+release; guaranteed conflicts, breaks chain contract |
| `git reset --hard 24c090f^` or to 24c090f | Destructive: erases release 0.1.0 (`a5dcbdd`, `cf0c39a`, tags), rename work, docs gates. Irreversible without force-push; violates no-destructive + no-direct-to-main |
| Do nothing, keep `agents/` deleted | Rejected by requester — explicit restore request |

## Risk Assessment

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Restored `agents/*.md` collide with current prompts/skills naming (`pi-*` externals, `.agents/skills/pi-agent`) | Med | Med | Restore to `agents/` only (legacy path); never rename `pi-*` externals; `typecheck` + grep verify no import pulls from `agents/` |
| R-002 | Full-revert conflicts if executor runs plain `git revert` instead of scoped checkout | Med | Med | Freeze plan: scoped `checkout 24c090f^ -- agents/` only; any other file touched = abort + escalate |
| R-003 | Repo bloat / confusion: two org models coexist (C-level agents + frame-ship skills) | High | Low | Document coexistence in PR description; follow-up decision (keep/archive/duplicar) out of scope here |

### What else could break

- Engineering: `typecheck` (`tsc --noEmit`) — `agents/` are markdown, should not affect it; verified post-restore. No build pipeline, no runtime import from `agents/`.
- Teams: anyone relying on "no agents/ dir" assumption (docs, scripts grepping the tree) sees 70+ new files; PR diff is large but additive-only.
- External surface: none — no endpoint, adapter, secret, or dependency change. Two MCP endpoints (`context7`, `parallel`) untouched.

### Rollback Plan

- Before merge: delete branch `revert/restore-agents-from-24c090f`, no trace on `main`. Owner: engineering lead, ETA minutes.
- After merge: `git revert <restore-commit>` (single commit, removes `agents/` again) + follow-up PR. Owner: engineering lead, ETA <1h.

### Security Considerations

No login, no personal data store, no outside service call, no secret handling. `agents/*.md` are prompt/persona markdown. No OWASP surface. No PII — tokenise any names at capture (`[USER-1]`); no secrets in commits.

### Domain Considerations

- Engineering only. Finance/legal/marketing/people/revenue/automation-ops: no impact, deleted from scope.

## Test Plan

> Required section, standard owned by `references/test-strategy.md`. Plan frozen at approval; results go to `TESTS.md` at build.

### REQ-ID to Test Mapping

| REQ-ID | Test ID | Scope / Path | Test Type | Expected Behavior / Boundary Checked |
| ------ | ------- | ------------ | --------- | ------------------------------------ |
| REQ-001 | T-001 | `agents/` tree vs `24c090f^` | Regression | `git diff 72b0adb -- agents/ \| wc -l` = 0 after restore; file count matches parent (±0); negative: no other path modified (`git status --porcelain` shows only `agents/` + proposal) |
| REQ-002 | T-002 | repo root | Regression | `npm run typecheck` (`tsc --noEmit`) exits 0; negative: fails if any `.ts` import broke (none expected — md-only change) |
| REQ-003 | T-003 | `skills/`, `SYSTEM.md`, `APPEND_SYSTEM.md`, `extensions/` | Architecture | frame-ship chain intact: `skills/start-here`, `skills/propose`, `skills/build` present; grep `frame-ship` still hits; `pi-*` externals unrenamed |

### Declared Coverage Floors

| Metric | Floor Declared | Scope / Justification |
| ------ | -------------- | --------------------- |
| Line | N/A | No test runner in repo; change is markdown-only. Justification: `typecheck` is the only green gate; covered by T-002 with log evidence |
| Branch | N/A | Same as above |
| Function | N/A | Same as above |
| Unit suite runtime | N/A | No unit suite present |

### Test Environment & Setup

- **Prerequisites:** clean worktree on branch `revert/restore-agents-from-24c090f`, HEAD `a5dcbdd`
- **Environment Variables:** none (never real credentials or PII)
- **Cleanup & Isolation:** restore touches `agents/` only; `git status` must show no other modified paths; abort on conflict

## Approval Required From

- [ ] Owning domain lead: engineering owner
- [ ] engineering owner (architecture/cross-cutting impact — coexistence of two org models)
- [ ] Test Plan present and covering every REQ-ID (per `references/test-strategy.md`) — yes: REQ-001..003 → T-001..003

reviews: N/A — no auth/data/API/PII surface, no public API / data-model / shared-contract change, single engineering lane. Recorded as decision, not skip.

## C2 challenge hook

- Trigger checklist evaluated: no auth/data/API/PII surface; single-domain scope; blast radius limited to local repo scaffolding with no external surface; no approver re-grill requested.
- Verdict: challenge round NOT triggered. Proceed to approval.

---
*Propose phase: repo impl untouched except this file. No revert executed. Awaiting yes before `build`.*
