import type { MetadataRoute } from "next";

import { getPublishedPosts } from "@/features/blog/lib/queries";
import { absoluteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const latest = posts[0]?.updatedAt ?? new Date().toISOString();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog/"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: absoluteUrl("/about/"), changeFrequency: "yearly", priority: 0.5 },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}/`),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
