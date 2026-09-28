import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { getPackageMeta } from "./lib/pkg-meta.js";

// Fuente única: package.json
const { name: PKG_NAME, version: PKG_VERSION } = getPackageMeta(
  import.meta.url,
);

function packageRoot(fromUrl: string): string {
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
      //
    }
  });

  pi.on("tool_call", async (event, ctx) => {
    const name = event.toolName;
    if (
      (name === "bash" && isDestructiveBash(event.input?.command)) ||
      name === "user_bash"
    ) {
      const cmd = event.input?.command;
      if (typeof cmd === "string" && isDestructiveBash(cmd)) {
        if (ctx.hasUI) {
          const ok = await ctx.ui.confirm(
            "deu guard",
            `¿Permitir comando destructivo?\n${cmd}`,
          );
          if (!ok)
            return {
              block: true,
              reason:
                "Bloqueado por deu-core: comando destructivo no confirmado",
            };
          return undefined;
        }
        return {
          block: true,
          reason:
            "Bloqueado por deu-core: comando destructivo sin UI para confirmar",
        };
      }
    }
    return undefined;
  });

  pi.registerCommand("deu", {
    description: "Muestra estado deu (system prompt + integraciones)",
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
