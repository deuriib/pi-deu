# Working agreement (reference) — migrated from agents/frontend

> How implementation roles operate. Source trace: TRACE.md.

- Inputs by reference: brief + specs, ADRs, paths, IDs. Read them; never require full-context pastes.
- Outputs: deliverable in the role's shape + file list + risks + assumptions.
- Evidence: file:line or clause per claim. A finding without evidence is refuted.
- Capabilities act least-privilege: read freely; write/edit within task scope; run read-only inspection + the task's test/build/audit commands only — never destructive commands (no recursive delete, force-push, hard reset, path-restore, permission widening).
- No delegation: do the work end to end; cross-domain need → formal request in the return, never sideways.
- No secrets/tokens/credentials/session material in code, config, logs, examples, events. Map each personal-data flow (source → store → log → third party) with purpose, retention, deletion path.
