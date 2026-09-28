import {
  type ExtensionAPI,
  type ExtensionContext,
} from "@earendil-works/pi-coding-agent";
import type { Component, TUI } from "@earendil-works/pi-tui";
import { truncateToWidth, visibleWidth } from "@earendil-works/pi-tui";
import { getPackageMeta } from "./lib/pkg-meta.js";

// Versión local del paquete — fuente única: package.json (no el VERSION de Pi).
const DEU_VERSION = getPackageMeta(import.meta.url).version;

// Header DEU — override local del header de pi-open-tui@0.3.9.
// Estrategia: reinstalar con ctx.ui.setHeader() en session_start (+ re-assert
// diferido para ganarle la carrera a open-tui). Sin fork, sin tocar node_modules.
// Mantenimiento: si pi-open-tui agrega flag de header en su config, migrar.

const SLOGAN = "Haces las cosas como para Dios";
const FIXED_TIPS = ["/deu", "/open-tui", "/model", "/compact"] as const;

// Logo DEU pixelado estilo VASQUEZ (7 filas x 26 cols, █ = ancho 1).
const DEU_LOGO: readonly string[] = [
  "██████   ███████   ██   ██",
  "██  ██   ██        ██   ██",
  "██  ██   ██        ██   ██",
  "██  ██   ██████    ██   ██",
  "██  ██   ██        ██   ██",
  "██  ██   ██        ██   ██",
  "██████   ███████   ███████",
];

const MIN_LEFT_WIDTH = 28;
const MIN_TIPS_WIDTH = 16;
const MAX_TIPS_WIDTH = 28;
const COLUMN_GAP = 3;

function headerColumnWidths(innerWidth: number): {
  leftWidth: number;
  rightWidth: number;
  useTips: boolean;
} {
  if (innerWidth <= 0) return { leftWidth: 0, rightWidth: 0, useTips: false };
  if (innerWidth < MIN_LEFT_WIDTH + COLUMN_GAP + MIN_TIPS_WIDTH) {
    return { leftWidth: innerWidth, rightWidth: 0, useTips: false };
  }
  let rightWidth = Math.min(
    MAX_TIPS_WIDTH,
    Math.max(MIN_TIPS_WIDTH, Math.round(innerWidth * 0.28)),
  );
  let leftWidth = innerWidth - COLUMN_GAP - rightWidth;
  if (leftWidth < MIN_LEFT_WIDTH) {
    leftWidth = MIN_LEFT_WIDTH;
    rightWidth = innerWidth - COLUMN_GAP - leftWidth;
  }
  if (leftWidth <= rightWidth) {
    leftWidth = Math.ceil((innerWidth - COLUMN_GAP) * 0.65);
    rightWidth = innerWidth - COLUMN_GAP - leftWidth;
  }
  if (rightWidth < MIN_TIPS_WIDTH || leftWidth < MIN_LEFT_WIDTH) {
    return { leftWidth: innerWidth, rightWidth: 0, useTips: false };
  }
  return { leftWidth, rightWidth, useTips: true };
}

function padRight(text: string, width: number, ellipsis = ""): string {
  const clipped = truncateToWidth(text, width, ellipsis);
  return clipped + " ".repeat(Math.max(0, width - visibleWidth(clipped)));
}

function center(text: string, width: number): string {
  if (width <= 0) return "";
  const w = visibleWidth(text);
  if (w >= width) return truncateToWidth(text, width, "...");
  return `${" ".repeat(Math.floor((width - w) / 2))}${text}`;
}

function borderLine(
  left: string,
  label: string,
  right: string,
  width: number,
  paint: (text: string) => string,
): string {
  if (width <= 1) return "";
  if (width < 8 || label.length === 0) {
    return paint(
      truncateToWidth(
        left + "─".repeat(Math.max(0, width - 2)) + right,
        width,
        "",
      ),
    );
  }
  const before = "─── ";
  const after = " ─────";
  const fixedWidth =
    visibleWidth(before) + visibleWidth(label) + visibleWidth(after);
  const fill = Math.max(0, width - 2 - fixedWidth);
  return `${paint(left)}${paint(before)}${label}${paint(after)}${paint("─".repeat(fill))}${paint(right)}`;
}

function boxedLine(
  content: string,
  width: number,
  paint: (text: string) => string,
): string {
  if (width <= 2) return truncateToWidth(content, width, "");
  return `${paint("│")}${padRight(content, width - 2)}${paint("│")}`;
}

function twoColumn(
  left: string,
  right: string,
  leftWidth: number,
  rightWidth: number,
  paint: (text: string) => string,
): string {
  return `${padRight(left, leftWidth)} ${paint("│")} ${padRight(right, rightWidth, "…")}`;
}

function isTuiContext(ctx: ExtensionContext): boolean {
  try {
    const mode = (ctx as unknown as { mode?: string }).mode;
    return ctx.hasUI && (mode === undefined || mode === "tui");
  } catch {
    return false;
  }
}

class DeuHeader implements Component {
  private readonly ctx: ExtensionContext;

  constructor(_pi: ExtensionAPI, ctx: ExtensionContext) {
    this.ctx = ctx;
  }

  render(width: number): string[] {
    const theme = this.ctx.ui.theme;
    const paint = (s: string): string => theme.fg("accent", s);
    const muted = (s: string): string => theme.fg("muted", s);
    const bold = (s: string): string => theme.bold(s);

    if (width < 24) return [paint(`Deu v${DEU_VERSION}`)];

    const innerWidth = width - 2;
    const { leftWidth, rightWidth, useTips } = headerColumnWidths(innerWidth);

    const leftLines = [
      ...DEU_LOGO.map((line) => center(paint(line), leftWidth)),
      center(bold(SLOGAN), leftWidth),
    ];

    const tipDivider = paint("─".repeat(Math.max(8, Math.min(rightWidth, 22))));
    const [cmd0 = "", cmd1 = "", cmd2 = "", cmd3 = ""] = FIXED_TIPS;
    const tipLines = [
      paint(bold("Welcome")),
      muted("Ask Deu anything"),
      tipDivider,
      paint(bold("Commands")),
      muted(cmd0),
      muted(cmd1),
      muted(cmd2),
      muted(cmd3),
    ];

    const lines = [
      borderLine("╭", `${paint("Deu")} v${DEU_VERSION}`, "╮", width, paint),
    ];
    for (let i = 0; i < leftLines.length; i++) {
      const content = useTips
        ? twoColumn(
            leftLines[i] ?? "",
            tipLines[i] ?? "",
            leftWidth,
            rightWidth,
            paint,
          )
        : padRight(leftLines[i] ?? "", leftWidth);
      lines.push(boxedLine(content, width, paint));
    }
    lines.push(borderLine("╰", "", "╯", width, paint));
    return lines.map((line) => truncateToWidth(line, width, ""));
  }

  invalidate(): void {}

  dispose(): void {}
}

export default function (pi: ExtensionAPI): void {
  let header: DeuHeader | undefined;

  const install = (ctx: ExtensionContext): void => {
    if (!isTuiContext(ctx)) return;
    ctx.ui.setHeader((_tui: TUI) => {
      header?.dispose();
      header = new DeuHeader(pi, ctx);
      return header;
    });
  };

  const cleanup = (ctx: ExtensionContext): void => {
    header?.dispose();
    header = undefined;
    try {
      if (isTuiContext(ctx)) ctx.ui.setHeader(undefined);
    } catch {
      // best-effort: Pi restaura su header nativo al cerrar sesión.
    }
  };

  pi.on("session_start", async (_event, ctx) => {
    install(ctx);
    // open-tui instala su header también en session_start; el re-assert
    // diferido garantiza que el nuestro quede último sin importar el orden
    // de carga entre el paquete npm y esta extensión local.
    install(ctx);
  });

  pi.on("session_shutdown", async (_event, ctx) => {
    cleanup(ctx);
  });
}
