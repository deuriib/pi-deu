import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

import { getPackageMeta, packageRoot } from "../lib/index.js";

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
}
