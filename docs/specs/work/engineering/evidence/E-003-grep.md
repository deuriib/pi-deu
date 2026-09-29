# E-003 — grep audit (REQ-003/REQ-007)

Comando: `grep -rn -i "deu" package.json index.ts lib extensions skills/pi-deu-check prompts/pi-deu-check.md SYSTEM.md README.md AGENTS.md CHANGELOG.md .github | grep -v -i "pi-deu" | grep -v "PI_DEU_"`

Resultado (2026-09-29) — solo histórico allowlistado:

```
AGENTS.md:22:| Product | active | `docs/specs/brief-rebranding-deu-total.md`, `docs/specs/decisions/` |
AGENTS.md:46:| Rebrand scope (frozen) | `docs/specs/brief-rebranding-deu-total.md` | Visible + own code; `pi-*` externals untouched |
```

Cero restos `deu` en superficies runtime propias. `pi-*` externos intactos (`@earendil-works/pi-*`, `node_modules/pi-*`, `.agents/skills/pi-agent`).
Logo pixelado: arte DEU intacto (solo nombres internos `PI_DEU_*`), por decisión usuario 2026-09-29.
