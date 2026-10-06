import "server-only";

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { posts } from "@/db/schema";
import type { EditorPost } from "@/features/admin/types";
import { normalizeCategorySlug } from "@/features/blog/config/categories";

// Callers must run requireAdmin() first: these include drafts

export async function getAllPostsForAdmin() {
  return db.select().from(posts).orderBy(desc(posts.updatedAt));
}

export async function getPostForEditing(
  id: string,
): Promise<EditorPost | null> {
  const [post] = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      description: posts.description,
      content: posts.content,
      category: posts.category,
      tags: posts.tags,
      featured: posts.featured,
      status: posts.status,
    })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);
  // A removed topic would fail validation on save, so offer the default instead
  return post
    ? { ...post, category: normalizeCategorySlug(post.category) }
    : null;
}
