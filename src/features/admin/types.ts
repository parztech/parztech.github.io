import type { PostInput } from "@/features/admin/actions";

/** A post as edited in the admin; `id` is missing until the first save */
export type EditorPost = Omit<PostInput, "id"> & { id?: string };
