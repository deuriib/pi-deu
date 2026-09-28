import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fail = (m) => {
  console.error(`FAIL: ${m}`);
  process.exitCode = 1;
};
const ok = (m) => console.log(`OK: ${m}`);

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!pkg.pi?.extensions?.includes("./src/extensions/*.ts"))
  fail("package.json pi.extensions debe incluir ./src/extensions/*.ts");
else ok("pi.extensions -> src/");
if (!pkg.keywords?.includes("pi-package"))
  fail("keywords debe incluir pi-package");
else ok("keywords pi-package");
for (const entry of pkg.pi?.extensions ?? []) {
  if (entry.includes("node_modules"))
    fail(
      `pi.extensions no debe referenciar node_modules (${entry}): los packages van en .pi/settings.json -> packages[]`,
    );
}
ok("pi.extensions sin node_modules (packages viven en .pi/settings.json)");
const settings = JSON.parse(
  readFileSync(join(root, ".pi", "settings.json"), "utf8"),
);
for (const p of [
  "npm:pi-subagents@0.73.1",
  "npm:pi-opencode-direct@0.1.7",
  "npm:pi-antigravity@0.8.1",
  "npm:pi-mcp-adapter@3.1.0",
  "npm:pi-web-access@0.33.0",
  "npm:@juicesharp/rpiv-ask-user-question@2.11.0",
  "npm:@gotgenes/pi-permission-system@35.0.1",
  "npm:@upstash/context7-pi@0.1.2",
  "npm:@schovest/pi-goal@0.2.0",
  "npm:pi-open-tui@0.3.9",
  "npm:pi-hermes-memory@0.9.9",
  "npm:@juicesharp/rpiv-todo@2.11.0",
  "npm:pi-cache-optimizer@2.8.11",
  "npm:@ar-llm/pi-custom-compaction@0.5.0",
  "npm:pi-rewind-hook@1.8.7",
]) {
  if (!(settings.packages ?? []).includes(p))
    fail(`.pi/settings.json packages debe incluir ${p}`);
  else ok(`packages -> ${p}`);
}
for (const d of [
  "pi-todo",
  "pi-memory",
  "pi-interview",
  "pi-subagents",
  "pi-opencode-direct",
  "pi-antigravity",
  "pi-mcp-adapter",
  "pi-web-access",
  "@juicesharp/rpiv-ask-user-question",
  "@gotgenes/pi-permission-system",
  "@upstash/context7-pi",
  "@schovest/pi-goal",
  "pi-open-tui",
  "pi-hermes-memory",
  "@juicesharp/rpiv-todo",
  "pi-cache-optimizer",
  "@ar-llm/pi-custom-compaction",
  "pi-rewind-hook",
]) {
  if (pkg.dependencies?.[d])
    fail(
      `dependencies no debe incluir ${d}: los packages los gestiona Pi en .pi/npm/`,
    );
}
ok("sin Pi packages en dependencies (Pi los gestiona)");
if (pkg.bundledDependencies?.length)
  fail(
    "bundledDependencies debe estar vacío: Pi gestiona los packages como project packages de primera clase",
  );
else ok("sin bundledDependencies");
for (const f of [
  "src/extensions/deu-core.ts",
  "src/extensions/deu-header.ts",
  ".pi/SYSTEM.md",
  ".pi/system/persona.md",
  ".pi/system/core.md",
  ".pi/system/router.md",
  ".pi/system/delegation.md",
  ".pi/system/tools.md",
  ".pi/system/guardrails.md",
  ".pi/system/README.md",
  "src/skills/deu-check/SKILL.md",
  "src/prompts/deu-check.md",
  "scripts/assemble-system.mjs",
]) {
  if (!existsSync(join(root, f))) fail(`falta ${f}`);
  else ok(f);
}
// SYSTEM.md debe estar regenerado desde las partes (no editado a mano)
{
  const { execFileSync } = await import("node:child_process");
  const before = readFileSync(join(root, ".pi", "SYSTEM.md"), "utf8");
  execFileSync(
    process.execPath,
    [join(root, "scripts", "assemble-system.mjs")],
    { stdio: "pipe" },
  );
  const after = readFileSync(join(root, ".pi", "SYSTEM.md"), "utf8");
  if (before !== after)
    fail(
      ".pi/SYSTEM.md desactualizado: corre node scripts/assemble-system.mjs y commitea",
    );
  else ok(".pi/SYSTEM.md al día con .pi/system/*");
  for (const marker of [
    "deu:persona.md",
    "deu:core.md",
    "deu:router.md",
    "deu:delegation.md",
    "deu:tools.md",
    "deu:guardrails.md",
  ]) {
    if (!after.includes(marker)) fail(`.pi/SYSTEM.md sin marca ${marker}`);
  }
  ok(".pi/SYSTEM.md contiene las 6 partes");
}
const core = readFileSync(join(root, "src/extensions/deu-core.ts"), "utf8");
for (const hook of ["session_start", "registerCommand"]) {
  if (!core.includes(hook)) fail(`deu-core.ts debe usar ${hook}`);
  else ok(`hook ${hook}`);
}
if (
  core.includes('on("resources_discover"') ||
  core.includes("on('resources_discover'")
)
  fail(
    "deu-core no debe registrar resources_discover: duplica skills/prompts del manifest ([Skill/Prompt conflicts])",
  );
else ok("sin resources_discover (manifest única fuente)");
for (const [field, entry] of [
  ["skills", "./src/skills/*/"],
  ["prompts", "./src/prompts/*.md"],
]) {
  if (!(pkg.pi?.[field] ?? []).includes(entry))
    fail(`package.json pi.${field} debe incluir ${entry}`);
  else ok(`pi.${field} -> ${entry}`);
}
// Agents: Pi auto-descubre project agents en .pi/agents/ (sin manifest dual).
// Ver ADR-0002 actualizado: src/agents/ eliminado, fuente única .pi/agents/.
{
  if (pkg.pi?.subagents?.agents ?? pkg["pi-subagents"]?.agents)
    fail("package.json no debe declarar manifest manual de agents: Pi auto-descubre .pi/agents/");
  else ok("sin manifest manual (Pi auto-descubre .pi/agents/)");
  const { readdirSync } = await import("node:fs");
  const piAgents = readdirSync(join(root, ".pi", "agents")).filter((f) =>
    f.endsWith(".md"),
  );
  if (piAgents.length < 74)
    fail(
      `.pi/agents/ debe tener 74 .md (69 origen tras drop + 5 product), tiene ${piAgents.length}`,
    );
  else ok(`.pi/agents/ con ${piAgents.length} top-level`);
  for (const dropped of ["scout.md", "explore.md", "general.md", "deu.md"]) {
    if (existsSync(join(root, ".pi", "agents", dropped)))
      fail(`.pi/agents/${dropped} dropeado: debe eliminarse`);
  }
  ok("drop scout/explore/general/deu respetado (builtins + deu-es-CEO)");
  for (const must of ["vasquez.md", "jimenez.md", "product-reviewer.md"]) {
    if (!existsSync(join(root, ".pi", "agents", must)))
      fail(`falta .pi/agents/${must}`);
  }
  ok("agents clave presentes (vasquez, jimenez, product-reviewer)");
  // Sin vocabulario Gemini residual en frontmatter (solo cuerpo puede citarlo).
  for (const f of piAgents) {
    const head =
      readFileSync(join(root, ".pi", "agents", f), "utf8").split("---")[1] ??
      "";
    for (const bad of [
      "list_directory",
      "view_file",
      "start_subagent",
      "search_web",
      "mainAgent",
      "subagent:",
    ]) {
      if (head.includes(bad)) {
        fail(`.pi/agents/${f} frontmatter con resto Gemini (${bad})`);
        break;
      }
    }
  }
  ok("frontmatter Pi limpio (sin vocabulario Gemini)");
}
if (core.includes("before_agent_start") || core.includes("systemPrompt"))
  fail(
    "deu-core.ts no debe inyectar systemPrompt: Pi es dueño via .pi/SYSTEM.md",
  );
else ok("sin inyección de prompt (Pi native)");
if (core.includes("readFileSync") || core.includes("loadSystemPrompt"))
  fail("deu-core no debe leer archivos en runtime (system prompt lo sirve Pi)");
else ok("sin lecturas de disco en runtime");
if (core.includes('"..", "..", ".."'))
  fail(
    'packageRoot con 3 ".." cae al parent del repo (bug skill path does not exist): deben ser 2',
  );
else ok("packageRoot sube 2 niveles");
if (!process.exitCode) console.log("\nverify:v0 PASS — paquete autocontenido");
