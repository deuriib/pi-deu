import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fail = (m) => { console.error(`FAIL: ${m}`); process.exitCode = 1; };
const ok = (m) => console.log(`OK: ${m}`);

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!pkg.pi?.extensions?.includes("./src/extensions/*.ts")) fail("package.json pi.extensions debe incluir ./src/extensions/*.ts");
else ok("pi.extensions -> src/");
if (!pkg.keywords?.includes("pi-package")) fail("keywords debe incluir pi-package");
else ok("keywords pi-package");
for (const entry of (pkg.pi?.extensions ?? [])) {
  if (entry.includes("node_modules")) fail(`pi.extensions no debe referenciar node_modules (${entry}): los packages van en .pi/settings.json -> packages[]`);
}
ok("pi.extensions sin node_modules (packages viven en .pi/settings.json)");
const settings = JSON.parse(readFileSync(join(root, ".pi", "settings.json"), "utf8"));
for (const p of ["npm:pi-todo@1.2.0", "npm:pi-memory@0.4.0", "npm:pi-subagents@0.73.1", "npm:pi-mcp-adapter@3.1.0", "npm:pi-web-access@0.33.0", "npm:pi-interview@0.13.0", "npm:@gotgenes/pi-permission-system@35.0.1"]) {
  if (!(settings.packages ?? []).includes(p)) fail(`.pi/settings.json packages debe incluir ${p}`);
  else ok(`packages -> ${p}`);
}
for (const d of ["pi-todo", "pi-memory", "pi-subagents", "pi-mcp-adapter", "pi-web-access", "pi-interview", "@gotgenes/pi-permission-system"]) {
  if (pkg.dependencies?.[d]) fail(`dependencies no debe incluir ${d}: los packages los gestiona Pi en .pi/npm/`);
}
ok("sin Pi packages en dependencies (Pi los gestiona)");
if (pkg.bundledDependencies?.length) fail("bundledDependencies debe estar vacío: Pi gestiona los packages como project packages de primera clase");
else ok("sin bundledDependencies");
for (const f of ["src/extensions/deu-core.ts", ".pi/SYSTEM.md", ".pi/system/persona.md", ".pi/system/core.md", ".pi/system/router.md", ".pi/system/delegation.md", ".pi/system/tools.md", ".pi/system/guardrails.md", ".pi/system/README.md", "src/skills/deu-check/SKILL.md", "src/prompts/deu-check.md", "scripts/assemble-system.mjs"]) {
  if (!existsSync(join(root, f))) fail(`falta ${f}`);
  else ok(f);
}
// SYSTEM.md debe estar regenerado desde las partes (no editado a mano)
{
  const { execFileSync } = await import("node:child_process");
  const before = readFileSync(join(root, ".pi", "SYSTEM.md"), "utf8");
  execFileSync(process.execPath, [join(root, "scripts", "assemble-system.mjs")], { stdio: "pipe" });
  const after = readFileSync(join(root, ".pi", "SYSTEM.md"), "utf8");
  if (before !== after) fail(".pi/SYSTEM.md desactualizado: corre node scripts/assemble-system.mjs y commitea");
  else ok(".pi/SYSTEM.md al día con .pi/system/*");
  for (const marker of ["deu:persona.md", "deu:core.md", "deu:router.md", "deu:delegation.md", "deu:tools.md", "deu:guardrails.md"]) {
    if (!after.includes(marker)) fail(`.pi/SYSTEM.md sin marca ${marker}`);
  }
  ok(".pi/SYSTEM.md contiene las 6 partes");
}
const core = readFileSync(join(root, "src/extensions/deu-core.ts"), "utf8");
for (const hook of ["session_start", "registerCommand"]) {
  if (!core.includes(hook)) fail(`deu-core.ts debe usar ${hook}`);
  else ok(`hook ${hook}`);
}
if (core.includes('on("resources_discover"') || core.includes("on('resources_discover'")) fail("deu-core no debe registrar resources_discover: duplica skills/prompts del manifest ([Skill/Prompt conflicts])");
else ok("sin resources_discover (manifest única fuente)");
for (const [field, entry] of [["skills", "./src/skills/*/"], ["prompts", "./src/prompts/*.md"]]) {
  if (!(pkg.pi?.[field] ?? []).includes(entry)) fail(`package.json pi.${field} debe incluir ${entry}`);
  else ok(`pi.${field} -> ${entry}`);
}
// Agents: manifest dual (package) + espejo project (.pi/agents). Ver ADR-0002.
for (const [path, entry] of [["pi.subagents.agents", pkg.pi?.subagents?.agents], ["pi-subagents.agents", pkg["pi-subagents"]?.agents]]) {
  if (!(entry ?? []).includes("./src/agents")) fail(`package.json ${path} debe incluir ./src/agents`);
  else ok(`${path} -> ./src/agents`);
}
{
  const { readdirSync } = await import("node:fs");
  const srcAgents = readdirSync(join(root, "src", "agents")).filter((f) => f.endsWith(".md"));
  if (srcAgents.length < 74) fail(`src/agents/ debe tener 74 .md (69 origen tras drop + 5 product), tiene ${srcAgents.length}`);
  else ok(`src/agents/ con ${srcAgents.length} top-level + core/`);
  for (const dropped of ["scout.md", "explore.md", "general.md", "montilla.md"]) {
    if (existsSync(join(root, "src", "agents", dropped))) fail(`src/agents/${dropped} dropeado: debe eliminarse`);
  }
  ok("drop scout/explore/general/montilla respetado (builtins + deu-es-CEO)");
  for (const must of ["vasquez.md", "jimenez.md", "product-reviewer.md"]) {
    if (!existsSync(join(root, "src", "agents", must))) fail(`falta src/agents/${must}`);
  }
  ok("agents clave presentes (vasquez, jimenez, product-reviewer)");
  // Sin vocabulario Gemini residual en frontmatter (solo cuerpo puede citarlo).
  for (const f of srcAgents) {
    const head = readFileSync(join(root, "src", "agents", f), "utf8").split("---")[1] ?? "";
    for (const bad of ["list_directory", "view_file", "start_subagent", "search_web", "mainAgent", "subagent:"]) {
      if (head.includes(bad)) { fail(`src/agents/${f} frontmatter con resto Gemini (${bad})`); break; }
    }
  }
  ok("frontmatter Pi limpio (sin vocabulario Gemini)");
}
if (core.includes("before_agent_start") || core.includes("systemPrompt")) fail("deu-core.ts no debe inyectar systemPrompt: Pi es dueño via .pi/SYSTEM.md");
else ok("sin inyección de prompt (Pi native)");
if (core.includes("readFileSync") || core.includes("loadSystemPrompt")) fail("deu-core no debe leer archivos en runtime (system prompt lo sirve Pi)");
else ok("sin lecturas de disco en runtime");
if (core.includes('"..", "..", ".."')) fail('packageRoot con 3 ".." cae al parent del repo (bug skill path does not exist): deben ser 2');
else ok("packageRoot sube 2 niveles");
if (!process.exitCode) console.log("\nverify:v0 PASS — paquete autocontenido");
