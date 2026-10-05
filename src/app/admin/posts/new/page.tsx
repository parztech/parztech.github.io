import { PostEditor } from "@/features/admin/components/PostEditor";
import { requireAdmin } from "@/features/auth/require-admin";

export default async function NewPostPage() {
  await requireAdmin();
  return <PostEditor />;
}
