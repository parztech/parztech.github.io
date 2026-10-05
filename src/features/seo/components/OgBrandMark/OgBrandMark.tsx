import { OG_GRADIENT } from "@/features/seo/lib/og";

import type { OgBrandMarkProps } from "./types";

/** The gradient «Պ» mark used in the header logo */
export default function OgBrandMark({ size }: OgBrandMarkProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        backgroundImage: OG_GRADIENT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: size * 0.56,
        fontWeight: 800,
      }}
    >
      Պ
    </div>
  );
}
