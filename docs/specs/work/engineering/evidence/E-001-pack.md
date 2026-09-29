# E-001 — npm metadata + pack (REQ-001)

`npm pkg get name version bin piConfig` (2026-09-29):

```json
{
  "name": "pi-deu",
  "version": "0.1.0",
  "bin": { "pi-deu": "./index.ts" },
  "piConfig": { "name": "pi-deu", "configDir": ".pi-deu" }
}
```

- `npm pack --dry-run --ignore-scripts` → exit 0 (npm v11 no lista archivos en stdout; metadata arriba + `files[]` sin cambios de rutas base lo prueban).
- `files[]`: extensions, lib, skills, prompts, index.ts, README.md, SYSTEM.md, APPEND_SYSTEM.md (sin `deu-*` viejos; dirs renombrados dentro de los mismos roots).
