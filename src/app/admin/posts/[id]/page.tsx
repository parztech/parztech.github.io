import { notFound } from "next/navigation";

import { PostEditor } from "@/features/admin/components/PostEditor";
import { getPostForEditing } from "@/features/admin/queries";
import { requireAdmin } from "@/features/auth/require-admin";

export default async function EditPostPage(
  props: PageProps<"/admin/posts/[id]">,
) {
  await requireAdmin();
  const { id } = await props.params;
  const post = await getPostForEditing(id);
  if (!post) notFound();
  return <PostEditor key={post.id} initial={post} />;
}
