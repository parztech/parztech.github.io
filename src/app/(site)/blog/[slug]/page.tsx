import { ArrowLeft, Hash } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostBody } from "@/features/blog/components/PostBody";
import { CategoryBadge } from "@/features/blog/components/CategoryBadge";
import { PostCard } from "@/features/blog/components/PostCard";
import { PostCover } from "@/features/blog/components/PostCover";
import { PostMetaLine } from "@/features/blog/components/PostMetaLine";
import { ReadingProgress } from "@/features/blog/components/ReadingProgress";
import { TableOfContents } from "@/features/blog/components/TableOfContents";
import { SectionHeading } from "@/components/SectionHeading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getPublishedPost,
  getPublishedPosts,
} from "@/features/blog/lib/queries";
import { getCategory } from "@/features/blog/config/categories";
import { JsonLd } from "@/features/seo/components/JsonLd";
import { pageMetadata } from "@/features/seo/lib/metadata";
import { blogPostingSchema } from "@/features/seo/lib/schema";

// Prerender existing posts at build; new ones render on first visit and are cached
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPublishedPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    image: `/blog/${post.slug}/og.png`,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      section: getCategory(post.category).name,
    },
  });
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const others = (await getPublishedPosts()).filter(
    (p) => p.slug !== post.slug,
  );
  const related = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 3);

  return (
    <article>
      <JsonLd data={blogPostingSchema(post)} />
      <ReadingProgress />

      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid mask-[radial-gradient(ellipse_at_top,black,transparent_65%)] opacity-60" />
        <div className="mx-auto max-w-3xl px-4 pt-12 pb-10 sm:px-6 md:pt-16">
          <Link
            href="/blog/"
            className="mb-8 flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Բոլոր հոդվածները
          </Link>
          <CategoryBadge slug={post.category} className="mb-5" />
          <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-balance md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarFallback className="bg-linear-to-br from-brand-violet to-brand-pink font-bold text-white">
                  Պ
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{post.author}</p>
                <PostMetaLine
                  date={post.date}
                  dateLabel={post.dateLabel}
                  readingMinutes={post.readingMinutes}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <PostCover
          category={post.category}
          className="aspect-21/9 rounded-3xl shadow-2xl shadow-primary/10"
          iconClassName="size-24 md:size-40 right-8 bottom-6 md:right-12 md:bottom-10"
        />
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0">
          <PostBody html={post.html} />

          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="h-7 gap-1 rounded-full px-3"
                >
                  <Hash />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents headings={post.headings} />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
          <Separator className="mb-16" />
          <SectionHeading
            eyebrow="Շարունակիր կարդալ"
            title="Կարող է քեզ հետաքրքրել"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
