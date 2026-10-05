import type { PostStatus } from "@/db/schema";

export const STATUS_STYLES: Record<
  PostStatus,
  { label: string; badge: string; dot: string }
> = {
  published: {
    label: "Հրապարակված",
    badge: "bg-brand-emerald/15",
    dot: "bg-brand-emerald",
  },
  draft: {
    label: "Սևագիր",
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};
