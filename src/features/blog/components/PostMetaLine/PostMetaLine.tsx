import { CalendarDays, Clock } from "lucide-react";

import { formatReadingTime } from "@/lib/format";
import { cn } from "@/lib/utils";

import type { PostMetaLineProps } from "./types";

export default function PostMetaLine({
  date,
  dateLabel,
  readingMinutes,
  className,
}: PostMetaLineProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="size-3.5" />
        <time dateTime={date}>{dateLabel}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-3.5" />
        {formatReadingTime(readingMinutes)}
      </span>
    </div>
  );
}
