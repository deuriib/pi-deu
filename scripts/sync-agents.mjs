// Espejo repeatable: src/agents/** -> .pi/agents/** (project agents, máxima precedencia).
// Uso: node scripts/sync-agents.mjs [--check]
// .pi/agents/ es generado (gitignored): nunca editar a mano.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "src", "agents");
const DEST = join(root, ".pi", "agents");
const checkOnly = process.argv.includes("--check");

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".md")) out.push(p);
  }
  return out;
}

if (!existsSync(SRC)) {
  console.error("FAIL: src/agents/ no existe (corre npm run agents:port primero)");
  process.exitCode = 1;
  process.exit();
}

const files = walk(SRC);
let copied = 0;
const errors = [];
for (const src of files) {
  const rel = relative(SRC, src);
  const dest = join(DEST, rel);
  const content = readFileSync(src, "utf8");
  if (existsSync(dest) && readFileSync(dest, "utf8") === content) continue;
  if (checkOnly) { errors.push(`${rel}: desactualizado en .pi/agents/`); continue; }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, content, "utf8");
  copied++;
}

// Limpia huérfanos en destino (solo --no-check): un agent borrado en src no debe sobrevivir en .pi.
if (!checkOnly) {
  if (existsSync(DEST)) {
    const wanted = new Set(files.map((f) => relative(SRC, f)));
    for (const f of walk(DEST)) {
      if (!wanted.has(relative(DEST, f))) rmSync(f);
    }
  }
}

console.log(`sync-agents: ${files.length} en src, ${copied} copiados`);
if (errors.length) {
  for (const e of errors) console.error(`FAIL: ${e}`);
  process.exitCode = 1;
} else if (!checkOnly) {
  console.log("sync-agents PASS");
}
