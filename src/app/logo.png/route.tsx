import { ImageResponse } from "next/og";

import { OgBrandMark } from "@/features/seo/components/OgBrandMark";
import { loadOgFonts } from "@/features/seo/lib/og";

export const dynamic = "force-static";

/** Square logo for structured data (Google uses it for the site in results) */
export async function GET() {
  return new ImageResponse(<OgBrandMark size={512} />, {
    width: 512,
    height: 512,
    fonts: await loadOgFonts(),
  });
}
