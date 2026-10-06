import type { MetadataRoute } from "next";

import { getPublishedPosts } from "@/features/blog/lib/queries";
import { absoluteUrl } from "@/lib/site-url";
import { routes } from "@/lib/routes";

// Publishing also refreshes it (see admin actions); this is a fallback, since
// Vercel was observed serving a build-time sitemap after on-demand revalidation
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const latest = posts[0]?.updatedAt ?? new Date().toISOString();

  return [
    {
      url: absoluteUrl(routes.home),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl(routes.blog),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(routes.about),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(routes.post(post.slug)),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
