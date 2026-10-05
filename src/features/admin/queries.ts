import "server-only";

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { posts } from "@/db/schema";
import type { EditorPost } from "@/features/admin/types";

// Callers must run requireAdmin() first: these include drafts

export async function getAllPostsForAdmin() {
  return db.select().from(posts).orderBy(desc(posts.updatedAt));
}

export async function getPostForEditing(
  id: string,
): Promise<EditorPost | null> {
  const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    content: row.content,
    category: row.category,
    tags: row.tags,
    featured: row.featured,
    status: row.status,
  };
}
