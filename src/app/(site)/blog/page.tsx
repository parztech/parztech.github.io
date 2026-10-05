import type { Metadata } from "next";
import { Suspense } from "react";

import { PostsExplorer } from "@/features/blog/components/PostsExplorer";
import { EmptyPosts } from "@/features/blog/components/EmptyPosts";
import { pageMetadata } from "@/features/seo/lib/metadata";
import { getPublishedPosts } from "@/features/blog/lib/queries";

export const metadata: Metadata = pageMetadata({
  title: "Բլոգ",
  description:
    "Բոլոր հոդվածները տեխնոլոգիաների, արհեստական բանականության, ծրագրավորման և կիբեռանվտանգության մասին՝ հայերենով։",
  path: "/blog/",
});

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="relative isolate">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-linear-to-b from-accent/70 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <header className="mb-12 max-w-2xl space-y-4">
          <p className="text-sm font-semibold text-primary">Բլոգ</p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Բոլոր <span className="text-gradient">հոդվածները</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Գտիր քեզ հետաքրքրող թեման կամ որոնիր ըստ բանալի բառի։
          </p>
        </header>
        {posts.length > 0 ? (
          <Suspense>
            <PostsExplorer posts={posts} />
          </Suspense>
        ) : (
          <EmptyPosts />
        )}
      </div>
    </div>
  );
}
