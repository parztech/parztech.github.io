import "server-only";

import { and, desc, eq } from "drizzle-orm";
import { cache } from "react";

import { siteConfig } from "@/config/site";
import { db } from "@/db";
import { posts, type PostRow } from "@/db/schema";
import { renderMarkdown, type Heading } from "@/features/blog/lib/markdown";
import { formatDate } from "@/lib/format";
import { getReadingMinutes } from "@/lib/reading-time";

export type PostMeta = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  /** Formatted on the server: browsers may lack Armenian locale data */
  dateLabel: string;
  updatedAt: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string; headings: Heading[] };

function toMeta(row: PostRow): PostMeta {
  const date = (row.publishedAt ?? row.createdAt).toISOString();
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    date,
    dateLabel: formatDate(date),
    updatedAt: row.updatedAt.toISOString(),
    category: row.category,
    tags: row.tags,
    author: siteConfig.author,
    featured: row.featured,
    readingMinutes: getReadingMinutes(row.content),
  };
}

export const getPublishedPosts = cache(async (): Promise<PostMeta[]> => {
  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt));
  return rows.map(toMeta);
});

export const getPublishedPost = cache(
  async (slug: string): Promise<Post | null> => {
    const [row] = await db
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
      .limit(1);
    if (!row) return null;
    return { ...toMeta(row), ...(await renderMarkdown(row.content)) };
  },
);
