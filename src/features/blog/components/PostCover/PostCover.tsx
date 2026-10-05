import { getCategory } from "@/features/blog/config/categories";
import { cn } from "@/lib/utils";

import type { PostCoverProps } from "./types";

/** Generated gradient artwork per category, so posts look good without images */
export default function PostCover({
  category: slug,
  className,
  iconClassName,
}: PostCoverProps) {
  const category = getCategory(slug);
  const Icon = category.icon;

  return (
    <div
      aria-hidden
      className={cn(
        "relative isolate overflow-hidden bg-linear-to-br",
        category.gradient,
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)] bg-size-[18px_18px] opacity-30" />
      <div className="absolute -top-10 -left-10 size-48 rounded-full bg-white/25 blur-3xl" />
      <div className="absolute -right-12 -bottom-16 size-56 rounded-full bg-black/15 blur-3xl" />
      <Icon
        strokeWidth={1.25}
        className={cn(
          "absolute right-6 bottom-5 size-20 text-white/90 drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
          iconClassName,
        )}
      />
    </div>
  );
}
