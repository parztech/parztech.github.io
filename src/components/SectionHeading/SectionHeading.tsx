import { cn } from "@/lib/utils";

import type { SectionHeadingProps } from "./types";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-2">
        {eyebrow && (
          <p className="text-sm font-semibold text-primary">{eyebrow}</p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-xl text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
