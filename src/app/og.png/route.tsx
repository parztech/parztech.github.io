import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { OgCard } from "@/features/seo/components/OgCard";
import { loadOgFonts, OG_SIZE } from "@/features/seo/lib/og";

export const dynamic = "force-static";

/** Default social preview image for pages without their own */
export async function GET() {
  return new ImageResponse(
    <OgCard
      title={siteConfig.tagline}
      footer="Հայալեզու բլոգ տեխնոլոգիաների մասին"
    />,
    { ...OG_SIZE, fonts: await loadOgFonts() },
  );
}
