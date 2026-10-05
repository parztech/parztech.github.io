"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { posts, postStatuses, reactions, type PostStatus } from "@/db/schema";
import { SLUG_PATTERN } from "@/features/admin/lib/slug";
import { requireAdmin } from "@/features/auth/require-admin";
import { categories } from "@/features/blog/config/categories";
import { renderMarkdown } from "@/features/blog/lib/markdown";
import { routes } from "@/lib/routes";

const postInput = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, "Վերնագիրը պարտադիր է"),
  slug: z
    .string()
    .trim()
    .regex(
      SLUG_PATTERN,
      "Հասցեն կարող է պարունակել միայն լատինատառ, թվեր և գծիկ",
    ),
  description: z.string().trim().min(1, "Նկարագրությունը պարտադիր է"),
  content: z.string().min(1, "Բովանդակությունը պարտադիր է"),
  category: z.enum(categories.map((c) => c.slug) as [string, ...string[]]),
  tags: z.array(z.string().trim().min(1)).max(10),
  featured: z.boolean(),
  status: z.enum(postStatuses),
});

export type PostInput = z.infer<typeof postInput>;

export type SaveResult =
  { ok: true; id: string; status: PostStatus } | { ok: false; error: string };

// Public pages are prerendered; refresh them all after any change (small blog)
function refreshSite() {
  revalidatePath(routes.home, "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath(routes.rss);
}

/** The DB unique index is the source of truth, which also covers concurrent saves */
function isSlugTaken(error: unknown) {
  for (let e = error; e instanceof Error; e = e.cause) {
    if (e.message.includes("UNIQUE constraint failed: posts.slug")) return true;
  }
  return false;
}

export async function savePost(input: PostInput): Promise<SaveResult> {
  await requireAdmin();

  const parsed = postInput.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }
  const { id, ...data } = parsed.data;
  const isPublishing = data.status === "published";

  try {
    const [row] = id
      ? await db
          .update(posts)
          .set({
            ...data,
            // Keep the original publish date when re-publishing or editing
            ...(isPublishing && {
              publishedAt: sql`coalesce(${posts.publishedAt}, unixepoch())`,
            }),
          })
          .where(eq(posts.id, id))
          .returning()
      : await db
          .insert(posts)
          .values({ ...data, publishedAt: isPublishing ? new Date() : null })
          .returning();

    if (!row) return { ok: false, error: "Հոդվածը չի գտնվել" };

    refreshSite();
    return { ok: true, id: row.id, status: row.status };
  } catch (error) {
    if (isSlugTaken(error)) {
      return { ok: false, error: "Այս հասցեով հոդված արդեն կա" };
    }
    throw error;
  }
}

export async function deletePost(id: string) {
  await requireAdmin();
  // Explicit cleanup in case SQLite foreign-key enforcement is off
  await db.batch([
    db.delete(reactions).where(eq(reactions.postId, id)),
    db.delete(posts).where(eq(posts.id, id)),
  ]);
  refreshSite();
}

export async function previewMarkdown(markdown: string) {
  await requireAdmin();
  return (await renderMarkdown(markdown)).html;
}
