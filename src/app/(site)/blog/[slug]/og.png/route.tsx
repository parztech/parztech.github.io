import { ImageResponse } from "next/og";

import { getCategory } from "@/features/blog/config/categories";
import { getPublishedPost } from "@/features/blog/lib/queries";
import { OgCard } from "@/features/seo/components/OgCard";
import { loadOgFonts, OG_SIZE } from "@/features/seo/lib/og";
import { formatReadingTime } from "@/lib/format";

/**
 * Social preview image at a stable URL (/blog/<slug>/og.png), so the same
 * address can be used in Open Graph tags and structured data.
 */
export async function GET(
  _req: Request,
  ctx: RouteContext<"/blog/[slug]/og.png">,
) {
  const { slug } = await ctx.params;
  const post = await getPublishedPost(slug);
  if (!post) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    <OgCard
      title={post.title}
      eyebrow={getCategory(post.category).name}
      footer={`${post.dateLabel} · ${formatReadingTime(post.readingMinutes)}`}
    />,
    {
      ...OG_SIZE,
      fonts: await loadOgFonts(),
      // CDN-cached; title edits show up within an hour
      headers: {
        "Cache-Control":
          "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
