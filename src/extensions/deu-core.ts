import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const PKG_NAME = "deu-pi-agent";
const PKG_VERSION = "0.1.0";

function packageRoot(fromUrl: string): string {
  // dirname = .../deu/src/extensions → "..", ".." = .../deu (package root).
  // OJO: un tercer ".." cae al PARENT del repo y rompe skillPaths/promptPaths.
  return resolve(dirname(fileURLToPath(fromUrl)), "..", "..");
}

function isDestructiveBash(command: unknown): boolean {
  if (typeof command !== "string") return false;
  const c = command.toLowerCase();
  return (
    c.includes("rm -rf /") ||
    c.includes("rm -rf ~") ||
    c.includes("--no-preserve-root") ||
    c.includes("mkfs.") ||
    c.includes("diskpart") ||
    c.includes("format c:")
  );
}

export default function (pi: ExtensionAPI) {
  const root = packageRoot(import.meta.url);

  pi.on("session_start", async (_event, ctx) => {
    if (ctx.hasUI) {
      ctx.ui.notify("deu v0 listo (system .pi/SYSTEM.md + todo + memory)", "info");
    }
  });

  // Skills/prompts: fuente única = package.json:pi (manifest). Registrarlos
  // también vía resources_discover duplica cada recurso y Pi reporta
  // "[Skill conflicts]" / "[Prompt conflicts]" (misma ruta, skipped).

  // System prompt: Pi es dueño — .pi/SYSTEM.md (skill: usage.md) reemplaza
  // el default a nivel proyecto. Esta extensión no lo inyecta para no
  // pelear con Pi ni romper caché. Fuente: .pi/system/*.md + assemble script.

  pi.on("tool_call", async (event, ctx) => {
    const name = event.toolName;
    if ((name === "bash" && isDestructiveBash(event.input?.command)) || name === "user_bash") {
      const cmd = event.input?.command;
      if (typeof cmd === "string" && isDestructiveBash(cmd)) {
        if (ctx.hasUI) {
          const ok = await ctx.ui.confirm("deu guard", `¿Permitir comando destructivo?\n${cmd}`);
          if (!ok) return { block: true, reason: "Bloqueado por deu-core: comando destructivo no confirmado" };
          return undefined;
        }
        return { block: true, reason: "Bloqueado por deu-core: comando destructivo sin UI para confirmar" };
      }
    }
    return undefined;
  });

  pi.registerCommand("deu", {
    description: "Muestra estado deu v0 (system prompt + integraciones)",
    handler: async (_args, ctx) => {
      const lines = [
        `${PKG_NAME} v${PKG_VERSION} autocontenido`,
        `root: ${root}`,
        `system: .pi/SYSTEM.md (Pi native, fuente .pi/system/* + assemble-system.mjs)`,
        `todo: tool 'todo' -> .pi/todo.json (project package npm:pi-todo)`,
        `memory: MEMORY.md + daily/ + SCRATCHPAD.md (project package npm:pi-memory, qmd opt-in)`,
        `modo: ${ctx.mode} | hasUI: ${String(ctx.hasUI)} | cwd: ${ctx.cwd}`,
      ];
      await ctx.ui.notify(lines.join("\n"), "info");
    },
  });
}
