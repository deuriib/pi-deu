import { registerMcpServer } from "pi-mcp-adapter";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { packageRoot } from "../lib/index.js";

function registerMcps(pi: ExtensionAPI) {
  registerMcpServer({
    pi,
    name: "context7",
    definition: {
      url: "https://mcp.context7.com/mcp",
      directTools: true,
      protocolVersion: "auto",
    },
  });

  registerMcpServer({
    pi,
    name: "parallel-search",
    definition: {
      url: "https://search.parallel.ai/mcp",
      directTools: true,
      protocolVersion: "auto",
    },
  });
}

export default function (pi: ExtensionAPI) {
  const root = packageRoot(import.meta.url);

  pi.on("session_start", async (_event, ctx) => {
    try {
      registerMcps(pi);
    } catch (err) {
      if (ctx.hasUI) {
        ctx.ui.notify(
          `deu-core: no se pudo cargar src/system/* (${err instanceof Error ? err.message : String(err)})`,
          "warning",
        );
      }
    }
  });
}
