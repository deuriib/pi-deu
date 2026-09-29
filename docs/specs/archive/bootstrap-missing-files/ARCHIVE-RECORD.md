# ARCHIVE-RECORD: bootstrap-missing-files

**Spec:** N/A — bootstrap lane (no `docs/specs/backlog/` file ever existed; lane docs were `work/engineering/PROPOSAL.md` et al.)
**Date:** 2026-09-29
**Gate verdict:** OPEN
**Commit(s):** pending            # release commit sha — backfill deferred with ship (see Notes)
**Tag:** deferred                 # no version bump in approved scope → no tag name planned
**Tag object:** pending           # backfill deferred with ship
**Backfilled by:** pending         # deferred with ship
**Ship type:** N/A — internal docs-only bootstrap

## Promoted (survive in archive/bootstrap-missing-files/)

- [x] REVIEW.md          — from `work/reviews/bootstrap-missing-files/`
- [x] HANDOFF.md              — from `work/engineering/`
- [x] DECISION-0004 link — `docs/specs/decisions/0004-design-singleton-bootstrap.md` (stays in decisions/, linked not copied)
- [ ] spec-file via git mv — N/A, no backlog source (reason above; no duplicate, nothing to rename)

## Purged (allowlist only, this spec-id)

- work/engineering/PROPOSAL.md
- work/engineering/PLAN.md
- work/engineering/TESTS.md
- work/engineering/HANDOFF.md
- work/reviews/bootstrap-missing-files/   (all <reviewer>.md; REVIEW.md promoted first)

## Rollback plan

Lane revert: `git revert` the lane commits in reverse, or `git rm LICENSE docs/specs/design/DESIGN.md` + lane docs. Owner deu, ETA minutes. Docs-only, nothing deployed to retract.

## Notes

- Other SPEC lanes active during this archive: none (4 untracked `AGENTS.md` are a prior lane's uncommitted files, not a spec lane — untouched).
- Residual risk / open conditions: legal sign-off on LICENSE before merge/publish (owner legal); push consent (owner user).
- Ship-close commands (run only after legal sign-off + explicit push consent + version-scope decision): `git tag -a vX.Y.Z -m "<annotation>"` → verify per `tagging.md` §3 → `git push origin main` + `git push origin vX.Y.Z` → confirm two-line `ls-remote` → backfill this record + push. Second reader per §2b.
- A literal `pending` above is truthful: the ship is open, not closed. Closing without backfill would be the violation — not the pending itself.
