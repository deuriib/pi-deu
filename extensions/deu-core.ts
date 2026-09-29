import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

import {
  composeDeuSystemPrompt,
  getPackageMeta,
  loadDeuPrompts,
  packageRoot,
} from "../lib/index.js";

// Fuente única: package.json
const { name: PKG_NAME, version: PKG_VERSION } = getPackageMeta(
  import.meta.url,
);

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
  const prompts = loadDeuPrompts(root);

  pi.on("session_start", async (_event, ctx) => {
    try {
    } catch (err) {
      if (ctx.hasUI) {
        ctx.ui.notify(
          `deu-core: (${err instanceof Error ? err.message : String(err)})`,
          "warning",
        );
      }
    }
  });

  // System prompt autocontenido (skill pi-agent extensions.md: before_agent_start).
  // Replace deu puro; el customPrompt del usuario se preserva como sufijo (ADR-0001).
  // Solo retorna systemPrompt (replace completo). Pi lo proyecta al head del
  // request y conserva sections/tools del transcript — no rompe skills ni tools.
  pi.on("before_agent_start", async (event, ctx) => {
    try {
      if (!prompts.systemFound && !prompts.appendFound) return {};
      if (prompts.systemChars === 0 && prompts.appendChars === 0) return {};
      const finalPrompt = composeDeuSystemPrompt(prompts, {
        customPrompt: event.systemPromptOptions.customPrompt,
        appendSystemPrompt: event.systemPromptOptions.appendSystemPrompt,
      });
      if (finalPrompt.length === 0) return {};
      return { systemPrompt: finalPrompt };
    } catch (err) {
      if (ctx.hasUI) {
        ctx.ui.notify(
          `deu-core: no se pudo cargar SYSTEM.md (${err instanceof Error ? err.message : String(err)})`,
          "warning",
        );
      }
      return {};
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
    description: "Show state deu",
    handler: async (_args, ctx) => {
      const prompts = loadDeuPrompts(root);
      let liveChars = 0;
      try {
        const live =
          typeof (ctx as unknown as { getSystemPrompt?: () => string })
            .getSystemPrompt === "function"
            ? (
                ctx as unknown as { getSystemPrompt: () => string }
              ).getSystemPrompt()
            : "";
        liveChars = live.length;
      } catch {
        liveChars = 0;
      }

      const systemLine =
        prompts.systemFound || prompts.appendFound
          ? `SYSTEM ${prompts.systemChars} chars (${prompts.systemFound ? "ok" : "missing"}) | APPEND ${prompts.appendChars} chars (${prompts.appendFound ? "ok" : "missing"}) | live ${liveChars} chars`
          : "SYSTEM missing (SYSTEM.md + APPEND_SYSTEM.md no encontrados en package root)";

      const lines = [
        `${PKG_NAME} v${PKG_VERSION}`,
        `root: ${root}`,
        systemLine,
        `modo: ${ctx.mode} | hasUI: ${String(ctx.hasUI)} | cwd: ${ctx.cwd}`,
      ];

      ctx.ui.notify(lines.join("\n"), "info");
    },
  });
}
