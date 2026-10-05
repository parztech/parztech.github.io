import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The OG renderer (Satori) needs explicit fonts and plain hex colors (no oklch)
export const OG_COLORS = {
  ink: "#0f0c1d",
  violet: "#7c3aed",
  pink: "#ec4899",
  apricot: "#fb923c",
  text: "#f5f3ff",
  muted: "#c4b5fd",
};

export const OG_GRADIENT = `linear-gradient(135deg, ${OG_COLORS.violet}, ${OG_COLORS.pink} 55%, ${OG_COLORS.apricot})`;

export const OG_SIZE = { width: 1200, height: 630 };

const FONT_DIR = join(process.cwd(), "assets/fonts");

const FONT_FILES = [
  ["armenian", 700],
  ["latin", 700],
  ["armenian", 800],
  ["latin", 800],
] as const;

let fontsPromise: ReturnType<typeof readFonts> | undefined;

function readFonts() {
  return Promise.all(
    FONT_FILES.map(async ([subset, weight]) => ({
      name: "Noto Sans Armenian",
      data: await readFile(
        join(FONT_DIR, `noto-sans-armenian-${subset}-${weight}-normal.woff`),
      ),
      weight,
      style: "normal" as const,
    })),
  );
}

/**
 * Noto Sans Armenian, split by script (the renderer falls back between them per
 * glyph). Read from disk once per server instance; a failed read is retried.
 */
export function loadOgFonts() {
  fontsPromise ??= readFonts().catch((error: unknown) => {
    fontsPromise = undefined;
    throw error;
  });
  return fontsPromise;
}
