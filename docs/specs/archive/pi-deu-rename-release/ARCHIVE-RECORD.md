# ARCHIVE-RECORD: pi-deu-rename-release

**Spec:** docs/specs/archive/pi-deu-rename-release/SPEC-pi-deu-rename-release.md
**Date:** 2026-09-29
**Gate verdict:** OPEN
**Commit(s):** pending
**Tag:** v0.1.0
**Tag object:** pending
**Backfilled by:** pending
**Ship type:** deploy

## Promoted (survive in archive/pi-deu-rename-release/)

- [x] SPEC-pi-deu-rename-release.md — moved via git mv (R rename)
- [x] REVIEW.md — from work/reviews/pi-deu-rename-release/
- [x] HANDOFF.md — from work/engineering/
- [x] DECISION-0005-rename-pi-deu-release-npm.md — link: `docs/specs/decisions/0005-rename-pi-deu-release-npm.md` (decisions/, not copied)

## Purged (allowlist only, this pi-deu-rename-release)

- work/engineering/PROPOSAL.md
- work/engineering/PLAN.md
- work/engineering/TESTS.md
- work/engineering/HANDOFF.md
- work/reviews/pi-deu-rename-release/ (all reviewer files; REVIEW.md promoted first)

## Rollback plan

Código: `git revert` del release commit (owner engineering, minutos). Workflow: `.github/workflows/release.yml` → `.disabled` (owner automation). Tag local por error: `git tag -d v0.1.0`; publicado a retirar: `git push --delete origin v0.1.0` con aprobación del owner. npm: `unpublish` <72h sino `deprecate`. Usuario: volver a `~/.deu/agent`.

## Notes

- Other SPEC lanes active during this archive: none — purge proceeds.
- Residual risk / open conditions: none (9/9 pass). Pre-publish owner steps: `npm view pi-deu`, Trusted Publisher, renombre remoto a `deuriib/pi-deu` (ver HANDOFF §Blockers).
- Evidence kept in place (outside purge allowlist): `docs/specs/work/engineering/evidence/E-001..E-006.md`.
