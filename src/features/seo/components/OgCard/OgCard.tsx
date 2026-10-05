import { OgBrandMark } from "@/features/seo/components/OgBrandMark";
import { OG_COLORS, OG_GRADIENT } from "@/features/seo/lib/og";

import type { OgCardProps } from "./types";

/** 1200×630 social preview card in the site's style */
export default function OgCard({ title, eyebrow, footer }: OgCardProps) {
  const titleSize = title.length > 70 ? 54 : title.length > 40 ? 64 : 76;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: OG_COLORS.ink,
        backgroundImage: `radial-gradient(circle at 15% 0%, ${OG_COLORS.violet}66, transparent 55%), radial-gradient(circle at 100% 100%, ${OG_COLORS.apricot}55, transparent 50%)`,
        color: OG_COLORS.text,
        fontFamily: "Noto Sans Armenian",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <OgBrandMark size={72} />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
          Parz
          <span
            style={{
              backgroundImage: OG_GRADIENT,
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Tech
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {eyebrow && (
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 22px",
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.1)",
              color: OG_COLORS.muted,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 26,
          color: OG_COLORS.muted,
        }}
      >
        <span>{footer}</span>
        <div
          style={{
            width: 160,
            height: 8,
            borderRadius: 999,
            backgroundImage: OG_GRADIENT,
          }}
        />
      </div>
    </div>
  );
}
