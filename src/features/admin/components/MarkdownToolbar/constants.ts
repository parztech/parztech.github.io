import {
  Bold,
  Code,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  SquareCode,
} from "lucide-react";

import type { MarkdownEdit, ToolbarTool } from "./types";

export const TOOLBAR_TOOLS: ToolbarTool[] = [
  { icon: Heading2, label: "Վերնագիր", edit: { kind: "line", prefix: "## " } },
  {
    icon: Heading3,
    label: "Ենթավերնագիր",
    edit: { kind: "line", prefix: "### " },
  },
  {
    icon: Bold,
    label: "Թավ (⌘B)",
    edit: { kind: "wrap", before: "**", after: "**", placeholder: "թավ տեքստ" },
  },
  {
    icon: Italic,
    label: "Շեղ (⌘I)",
    edit: { kind: "wrap", before: "_", after: "_", placeholder: "շեղ տեքստ" },
  },
  {
    icon: Link2,
    label: "Հղում",
    edit: {
      kind: "wrap",
      before: "[",
      after: "](https://)",
      placeholder: "հղման տեքստ",
    },
  },
  { icon: List, label: "Ցուցակ", edit: { kind: "line", prefix: "- " } },
  {
    icon: ListOrdered,
    label: "Համարակալված ցուցակ",
    edit: { kind: "line", prefix: "1. " },
  },
  { icon: Quote, label: "Մեջբերում", edit: { kind: "line", prefix: "> " } },
  {
    icon: Code,
    label: "Կոդ տողում",
    edit: { kind: "wrap", before: "`", after: "`", placeholder: "code" },
  },
  {
    icon: SquareCode,
    label: "Կոդի բլոկ",
    edit: {
      kind: "wrap",
      before: "```\n",
      after: "\n```",
      placeholder: "code",
    },
  },
];

/** ⌘/Ctrl + key shortcuts inside the editor */
export const SHORTCUTS: Record<string, MarkdownEdit> = {
  b: TOOLBAR_TOOLS[2].edit,
  i: TOOLBAR_TOOLS[3].edit,
};
