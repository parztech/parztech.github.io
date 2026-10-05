import { ImageResponse } from "next/og";

import { OgBrandMark } from "@/features/seo/components/OgBrandMark";
import { loadOgFonts } from "@/features/seo/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<OgBrandMark size={64} />, {
    ...size,
    fonts: await loadOgFonts(),
  });
}
