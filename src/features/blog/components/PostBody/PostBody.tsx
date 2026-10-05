import { cn } from "@/lib/utils";

import { PROSE_CLASS_NAME } from "./constants";
import type { PostBodyProps } from "./types";

/** Renders HTML produced by renderMarkdown (raw HTML in markdown is stripped there) */
export default function PostBody({ html, className }: PostBodyProps) {
  return (
    <div
      className={cn(PROSE_CLASS_NAME, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
