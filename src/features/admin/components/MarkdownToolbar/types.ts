import type { LucideIcon } from "lucide-react";
import type { RefObject } from "react";

/** A formatting action: wrap the selection, or prefix the current line */
export type MarkdownEdit =
  | { kind: "wrap"; before: string; after: string; placeholder: string }
  | { kind: "line"; prefix: string };

export type ToolbarTool = {
  icon: LucideIcon;
  label: string;
  edit: MarkdownEdit;
};

export type MarkdownToolbarProps = {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
};
