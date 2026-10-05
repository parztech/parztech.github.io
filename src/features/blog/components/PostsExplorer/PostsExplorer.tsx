"use client";

import { Search, SearchX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { PostCard } from "@/features/blog/components/PostCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/features/blog/config/categories";
import { routes } from "@/lib/routes";

import { ALL_CATEGORIES } from "./constants";
import type { PostsExplorerProps } from "./types";

export default function PostsExplorer({ posts }: PostsExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // The URL is the source of truth, so footer/home topic links work on this page too
  const requested = searchParams.get("category");
  const category =
    requested && categories.some((c) => c.slug === requested)
      ? requested
      : ALL_CATEGORIES;
  const [query, setQuery] = useState("");

  function selectCategory(slug: string) {
    router.replace(
      slug === ALL_CATEGORIES ? routes.blog : routes.category(slug),
      { scroll: false },
    );
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (post) =>
        (category === ALL_CATEGORIES || post.category === category) &&
        (!q ||
          [post.title, post.description, ...post.tags].some((s) =>
            s.toLowerCase().includes(q),
          )),
    );
  }, [posts, category, query]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Որոնել հոդվածներ…"
            className="h-10 rounded-full pl-9"
          />
        </div>
        <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <Tabs
            value={category}
            onValueChange={(v) => selectCategory(String(v))}
          >
            <TabsList className="h-10! rounded-full bg-muted p-1">
              <TabsTrigger value={ALL_CATEGORIES} className="rounded-full px-4">
                Բոլորը
              </TabsTrigger>
              {categories.map((c) => (
                <TabsTrigger
                  key={c.slug}
                  value={c.slug}
                  className="rounded-full px-4"
                >
                  <c.icon className={c.iconColor} />
                  {c.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-20 text-center">
          <SearchX className="size-10 text-muted-foreground" />
          <p className="font-medium">Ոչինչ չգտնվեց</p>
          <p className="text-sm text-muted-foreground">
            Փորձիր այլ բառ կամ ընտրիր մեկ այլ թեմա։
          </p>
        </div>
      )}
    </div>
  );
}
