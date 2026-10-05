import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { CategoryBadge } from "@/features/blog/components/CategoryBadge";
import { PostCover } from "@/features/blog/components/PostCover";
import { PostMetaLine } from "@/features/blog/components/PostMetaLine";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import type { FeaturedPostProps } from "./types";

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/blog/${post.slug}/`} className="group block">
      <Card className="grid gap-0 py-0 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/15 group-hover:ring-primary/30 md:grid-cols-2">
        <PostCover
          category={post.category}
          className="min-h-56 md:min-h-80"
          iconClassName="size-28 md:size-36 right-8 bottom-8"
        />
        <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="gap-1 bg-linear-to-r from-brand-violet to-brand-pink text-white">
              <Sparkles />
              Ընտրված
            </Badge>
            <CategoryBadge slug={post.category} />
          </div>
          <h3 className="text-2xl leading-tight font-bold tracking-tight transition-colors group-hover:text-primary md:text-3xl">
            {post.title}
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            {post.description}
          </p>
          <PostMetaLine
            date={post.date}
            dateLabel={post.dateLabel}
            readingMinutes={post.readingMinutes}
          />
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Կարդալ հոդվածը
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
