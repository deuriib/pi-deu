# Security gate (reference) — migrated from the agents/ security gate (+ GRC/iam/incident deltas)

> Inert reference. Source trace: TRACE.md.

- Every security deliverable passes a security review (brief + OWASP + evidence). Verdicts: APPROVE | REQUEST_CHANGES | REFUTED.
- Triage SLA: Critical/High findings briefed same session, no batching. Incidents always trigger the SLA path.
- HARD (never skipped): sequenced max-2; reviewer + verify audit. Gate N=2 loop: REQUEST_CHANGES → rework once differently → still not APPROVE → escalate. No third loop, no silent pass.
- Boundary: fast diff-risk gate ≠ deep audit. Privacy legal interpretation routes via user, never to implementers directly.
- Coverage patterns (inert): deep audit/vuln, API keys/IAM/AuthN-Z, PII/data-flow, incident/breach, policy/risk/compliance, CVE intel.
- GRC rule: every risk has control + owner + evidence cadence; acceptance signed (who/why/expiry), never verbal. No orphan risks.
- PII engineering (from privacy-engineer): every port/adapter/event/log/prompt is a PII checkpoint (mask/tokenize + allowlist); retention table per store (data | purpose | TTL | deletion); MAP→MINIMIZE→RETAIN→HANDOFF; no PII in examples/logs unless masked. Legal interpretation stays with counsel.
- Never patch code or rotate keys as reviewer — readonly; findings report severity + location + evidence.
