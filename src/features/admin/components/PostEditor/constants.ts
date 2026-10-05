import type { EditorPost } from "@/features/admin/types";
import { categories } from "@/features/blog/config/categories";

export const EMPTY_POST: EditorPost = {
  title: "",
  slug: "",
  description: "",
  content: "",
  category: categories[0].slug,
  tags: [],
  featured: false,
  status: "draft",
};

/** Lets the Select show the category name for the chosen value */
export const CATEGORY_ITEMS = categories.map((c) => ({
  value: c.slug,
  label: c.name,
}));
