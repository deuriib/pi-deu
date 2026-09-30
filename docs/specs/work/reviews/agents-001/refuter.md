# skeptic (refuter, adversarial) — agents-001

**Reviewer:** skeptic | **Date:** 2026-09-30 | **Verdict:** APPROVE
**Scope:** adversarial pass before QA, PR #2

## Attacks attempted (all refuted with proof)

1. "Restore smuggles code/secrets that break the rename" — REFUTED: `agents/*.md` are persona markdown; `git diff 72b0adb -- agents/` = 0; no `.ts` changes; `package.json` pi-* pins untouched.
2. "Full revert was the honest path; scoped checkout hides changes" — REFUTED: full revert would also undo `APPEND_SYSTEM.md`, `extensions/`, `lib/`, `package.json` evolved by rename+release; scoped restore is the minimal honest unit, documented in PROPOSAL §Alternatives.
3. "74 markdown files could shadow frame-ship skills at runtime" — REFUTED: skills load from `skills/` + `.pi-deu/configDir`; nothing imports `agents/`; `grep frame-ship skills/*/SKILL.md` still hits start-here/propose/build/review.

## Evidence

- diff-0 + typecheck EXIT:0 + skill grep hits (see run-the-tests).
- No PII/secrets in diff, body, or logs.
