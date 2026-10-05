import { getCategory } from "@/features/blog/config/categories";
import { cn } from "@/lib/utils";

import type { CategoryBadgeProps } from "./types";

export default function CategoryBadge({ slug, className }: CategoryBadgeProps) {
  const category = getCategory(slug);
  const Icon = category.icon;

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        category.tint,
        className,
      )}
    >
      <Icon className={cn("size-3.5", category.iconColor)} />
      {category.name}
    </span>
  );
}
