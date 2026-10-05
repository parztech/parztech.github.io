import type { EditorPost } from "@/features/admin/types";

export type PostEditorProps = {
  initial?: EditorPost;
};

export type EditorTab = "write" | "preview";
