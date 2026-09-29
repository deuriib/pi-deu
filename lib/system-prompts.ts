import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface DeuPrompts {
  system: string;
  append: string;
  systemChars: number;
  appendChars: number;
  systemPath: string;
  appendPath: string;
  systemFound: boolean;
  appendFound: boolean;
}

function readOne(path: string): { text: string; found: boolean } {
  try {
    const raw = readFileSync(path, "utf8");
    // Normaliza finales sin alterar el contenido: trimEnd + un \n.
    const text = raw.length > 0 ? `${raw.trimEnd()}\n` : "";
    return { text, found: true };
  } catch {
    return { text: "", found: false };
  }
}

/**
 * Carga SYSTEM.md + APPEND_SYSTEM.md desde la raíz del package.
 * Best-effort: si falta un archivo retorna "" y found=false sin lanzar.
 */
export function loadDeuPrompts(root: string): DeuPrompts {
  const systemPath = join(root, "SYSTEM.md");
  const appendPath = join(root, "APPEND_SYSTEM.md");
  const system = readOne(systemPath);
  const append = readOne(appendPath);
  return {
    system: system.text,
    append: append.text,
    systemChars: system.text.length,
    appendChars: append.text.length,
    systemPath,
    appendPath,
    systemFound: system.found,
    appendFound: append.found,
  };
}

/**
 * Compone el systemPrompt final (modo replace).
 * Orden: SYSTEM + APPEND + customPrompt (--system-prompt) + appendSystemPrompt (--append-system-prompt).
 * Partes vacías se omiten sin dejar separadores huérfanos.
 */
export function composeDeuSystemPrompt(
  prompts: Pick<DeuPrompts, "system" | "append">,
  opts: { customPrompt?: string; appendSystemPrompt?: string },
): string {
  const parts: string[] = [];
  if (prompts.system.length > 0) parts.push(prompts.system.trimEnd());
  if (prompts.append.length > 0) parts.push(prompts.append.trimEnd());
  const custom = opts.customPrompt?.trim();
  if (custom) parts.push(custom);
  const extra = opts.appendSystemPrompt?.trim();
  if (extra) parts.push(extra);
  return parts.length > 0 ? `${parts.join("\n\n")}\n` : "";
}
