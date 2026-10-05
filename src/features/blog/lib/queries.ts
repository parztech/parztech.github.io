import "server-only";

import { and, desc, eq } from "drizzle-orm";
import readingTime from "reading-time";
import { cache } from "react";

import { siteConfig } from "@/config/site";
import { db } from "@/db";
import { posts, type PostRow } from "@/db/schema";
import { formatDate } from "@/lib/format";
import {
  extractHeadings,
  renderMarkdown,
  type Heading,
} from "@/features/blog/lib/markdown";

export type { Heading };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** Armenian date label, formatted on the server (browsers may lack hy locale data) */
  dateLabel: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string; headings: Heading[] };

export function getReadingMinutes(markdown: string) {
  return Math.max(1, Math.round(readingTime(markdown).minutes));
}

function toMeta(row: PostRow): PostMeta {
  const date = (row.publishedAt ?? row.createdAt).toISOString();
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    date,
    dateLabel: formatDate(date),
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
    return {
      ...toMeta(row),
      html: await renderMarkdown(row.content),
      headings: extractHeadings(row.content),
    };
  },
);
