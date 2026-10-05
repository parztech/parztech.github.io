import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { CategoryBadge } from "@/features/blog/components/CategoryBadge";
import { PostCover } from "@/features/blog/components/PostCover";
import { PostMetaLine } from "@/features/blog/components/PostMetaLine";
import { Card } from "@/components/ui/card";

import type { PostCardProps } from "./types";

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}/`} className="group block h-full">
      <Card className="h-full gap-0 py-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:ring-primary/30">
        <PostCover category={post.category} className="aspect-16/9" />
        <div className="flex flex-1 flex-col gap-3 p-5">
          <CategoryBadge slug={post.category} />
          <h3 className="text-lg leading-snug font-semibold tracking-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <PostMetaLine
              date={post.date}
              dateLabel={post.dateLabel}
              readingMinutes={post.readingMinutes}
            />
            <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
