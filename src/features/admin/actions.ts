"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { categories } from "@/features/blog/config/categories";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { requireAdmin } from "@/features/auth/require-admin";
import { renderMarkdown } from "@/features/blog/lib/markdown";
import { SLUG_PATTERN } from "@/features/admin/lib/slug";

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
  status: z.enum(["draft", "published"]),
});

export type PostInput = z.infer<typeof postInput>;

export type SaveResult =
  | { ok: true; id: string; slug: string; status: "draft" | "published" }
  | { ok: false; error: string };

// Public pages are prerendered; refresh them all after any change (small blog)
function refreshSite() {
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
}

export async function savePost(input: PostInput): Promise<SaveResult> {
  await requireAdmin();

  const parsed = postInput.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }
  const { id, ...data } = parsed.data;

  const [clash] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.slug, data.slug))
    .limit(1);
  if (clash && clash.id !== id) {
    return { ok: false, error: "Այս հասցեով հոդված արդեն կա" };
  }

  const existing = id
    ? (await db.select().from(posts).where(eq(posts.id, id)).limit(1))[0]
    : undefined;
  if (id && !existing) return { ok: false, error: "Հոդվածը չի գտնվել" };

  const publishedAt =
    data.status === "published"
      ? (existing?.publishedAt ?? new Date())
      : (existing?.publishedAt ?? null);

  const [row] = existing
    ? await db
        .update(posts)
        .set({ ...data, publishedAt })
        .where(eq(posts.id, existing.id))
        .returning()
    : await db
        .insert(posts)
        .values({ ...data, publishedAt })
        .returning();

  refreshSite();
  return { ok: true, id: row.id, slug: row.slug, status: row.status };
}

export async function deletePost(id: string) {
  await requireAdmin();
  await db.delete(posts).where(eq(posts.id, id));
  refreshSite();
}

export async function previewMarkdown(markdown: string) {
  await requireAdmin();
  return renderMarkdown(markdown);
}
