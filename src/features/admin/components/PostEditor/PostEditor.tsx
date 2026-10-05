"use client";

import {
  ArrowLeft,
  ExternalLink,
  Eye,
  Loader2,
  PenLine,
  Send,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { previewMarkdown, savePost } from "@/features/admin/actions";
import { DeletePostButton } from "@/features/admin/components/DeletePostButton";
import {
  MarkdownToolbar,
  applyEdit,
  SHORTCUTS,
} from "@/features/admin/components/MarkdownToolbar";
import { StatusBadge } from "@/features/admin/components/StatusBadge";
import { TagsInput } from "@/features/admin/components/TagsInput";
import { slugify } from "@/features/admin/lib/slug";
import { PostBody } from "@/features/blog/components/PostBody";
import { categories } from "@/features/blog/config/categories";
import type { EditorPost } from "@/features/admin/types";
import { cn } from "@/lib/utils";

import { CATEGORY_ITEMS, EMPTY_POST } from "./constants";
import type { EditorTab, PostEditorProps } from "./types";
import { countWords, estimateReadingMinutes } from "./utils";

export default function PostEditor({ initial }: PostEditorProps) {
  const router = useRouter();
  const [post, setPost] = useState<EditorPost>(initial ?? EMPTY_POST);
  const [saved, setSaved] = useState(JSON.stringify(initial ?? EMPTY_POST));
  // Existing posts keep their URL unless edited by hand (changing it breaks shared links)
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [tab, setTab] = useState<EditorTab>("write");
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();
  const [previewing, startPreview] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const dirty = JSON.stringify(post) !== saved;
  const isPublished = post.status === "published";
  const words = countWords(post.content);

  function update<K extends keyof EditorPost>(key: K, value: EditorPost[K]) {
    setPost((p) => ({ ...p, [key]: value }));
  }

  function setTitle(title: string) {
    setPost((p) => ({
      ...p,
      title,
      slug: slugTouched ? p.slug : slugify(title),
    }));
  }

  function save(status: EditorPost["status"]) {
    startSaving(async () => {
      const next = { ...post, status };
      const result = await savePost(next);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      const savedPost = { ...next, id: result.id };
      setPost(savedPost);
      setSaved(JSON.stringify(savedPost));
      toast.success(
        status === "published"
          ? isPublished
            ? "Հոդվածը թարմացված է"
            : "Հոդվածը հրապարակված է 🎉"
          : "Սևագիրը պահպանված է",
      );
      if (!post.id) router.replace(`/admin/posts/${result.id}/`);
      else router.refresh();
    });
  }

  function showPreview() {
    setTab("preview");
    startPreview(async () => {
      setPreviewHtml(
        await previewMarkdown(post.content || "_Դեռ բովանդակություն չկա_"),
      );
    });
  }

  // ⌘S / Ctrl+S saves without changing the publish state
  const onSaveShortcut = useEffectEvent(() => save(post.status));
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        onSaveShortcut();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Action bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft />
            Հոդվածներ
          </Link>
          <StatusBadge status={post.status} />
          {dirty && (
            <span className="text-xs text-muted-foreground">
              Չպահպանված փոփոխություններ
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isPublished ? (
            <>
              <Button
                variant="outline"
                className="rounded-full"
                disabled={saving}
                onClick={() => save("draft")}
              >
                Հանել հրապարակումից
              </Button>
              <Button
                className="rounded-full shadow-lg shadow-primary/25"
                disabled={saving || !dirty}
                onClick={() => save("published")}
              >
                {saving ? <Loader2 className="animate-spin" /> : <Send />}
                Թարմացնել
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="rounded-full"
                disabled={saving}
                onClick={() => save("draft")}
              >
                Պահպանել սևագիրը
              </Button>
              <Button
                className="rounded-full shadow-lg shadow-primary/25"
                disabled={saving}
                onClick={() => save("published")}
              >
                {saving ? <Loader2 className="animate-spin" /> : <Send />}
                Հրապարակել
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Writing area */}
        <div className="min-w-0 space-y-4">
          <Textarea
            value={post.title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Հոդվածի վերնագիրը"
            rows={1}
            className="field-sizing-content min-h-0 resize-none border-none bg-transparent! px-0 text-3xl leading-tight font-extrabold tracking-tight shadow-none focus-visible:ring-0 md:text-4xl"
          />
          <Textarea
            value={post.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Կարճ նկարագրություն (երևում է քարտերում և որոնման արդյունքներում)"
            rows={2}
            className="field-sizing-content min-h-0 resize-none border-none bg-transparent! px-0 text-lg text-muted-foreground shadow-none focus-visible:ring-0"
          />

          <Card className="gap-0 py-0">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2">
              <Tabs
                value={tab}
                onValueChange={(v) =>
                  v === "preview" ? showPreview() : setTab("write")
                }
              >
                <TabsList>
                  <TabsTrigger value="write" className="px-3">
                    <PenLine />
                    Գրել
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="px-3">
                    <Eye />
                    Նախադիտում
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {tab === "write" && (
                <MarkdownToolbar
                  textareaRef={textareaRef}
                  onChange={(v) => update("content", v)}
                />
              )}
            </div>

            {tab === "write" ? (
              <Textarea
                ref={textareaRef}
                value={post.content}
                onChange={(e) => update("content", e.target.value)}
                onKeyDown={(e) => {
                  const edit = (e.metaKey || e.ctrlKey) && SHORTCUTS[e.key];
                  if (edit) {
                    e.preventDefault();
                    applyEdit(e.currentTarget, edit, (v) =>
                      update("content", v),
                    );
                  }
                }}
                placeholder={
                  "Գրիր հոդվածը այստեղ…\n\n## Վերնագիր\n\nՏեքստը կարող ես ձևավորել Markdown-ով՝ **թավ**, _շեղ_, [հղում](https://), ցուցակներ և կոդ։"
                }
                className="min-h-[60vh] resize-y rounded-none border-none bg-transparent! p-5 text-base leading-relaxed shadow-none focus-visible:ring-0"
              />
            ) : (
              <div className="min-h-[60vh] p-6 md:p-8">
                {previewing || previewHtml === null ? (
                  <div className="space-y-3">
                    <Skeleton className="h-8 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ) : (
                  <PostBody html={previewHtml} />
                )}
              </div>
            )}

            <div className="flex justify-between border-t px-5 py-2 text-xs text-muted-foreground">
              <span>
                {words} բառ · մոտ {estimateReadingMinutes(words)} րոպե
                ընթերցանություն
              </span>
              <span className="hidden sm:inline">⌘S՝ պահպանել</span>
            </div>
          </Card>
        </div>

        {/* Settings */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="gap-5 px-5">
            <p className="font-semibold">Կարգավորումներ</p>

            <div className="space-y-2">
              <Label htmlFor="slug">Հասցե (URL)</Label>
              <div className="flex items-center rounded-lg border bg-muted/40 pl-3 text-sm focus-within:ring-3 focus-within:ring-ring/50">
                <span className="text-muted-foreground">/blog/</span>
                <Input
                  id="slug"
                  value={post.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    update("slug", slugify(e.target.value) || e.target.value);
                  }}
                  placeholder="hodvatsi-hasce"
                  className="border-none bg-transparent! pl-0.5 shadow-none focus-visible:ring-0"
                />
              </div>
              {isPublished && slugTouched && initial?.slug !== post.slug && (
                <p className="text-xs text-brand-apricot">
                  Հասցեն փոխելիս հին հղումները չեն աշխատի։
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Թեմա</Label>
              <Select
                items={CATEGORY_ITEMS}
                value={post.category}
                onValueChange={(v) => v && update("category", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      <c.icon className={c.iconColor} />
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Պիտակներ</Label>
              <TagsInput
                id="tags"
                value={post.tags}
                onChange={(tags) => update("tags", tags)}
              />
            </div>

            <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="featured" className="flex items-center gap-1.5">
                  <Star className="size-3.5 text-brand-apricot" />
                  Ընտրված
                </Label>
                <p className="text-xs text-muted-foreground">
                  Ցուցադրել գլխավոր էջում
                </p>
              </div>
              <Switch
                id="featured"
                checked={post.featured}
                onCheckedChange={(v) => update("featured", v)}
              />
            </div>
          </Card>

          {post.id && (
            <Card className="gap-2 px-5">
              {isPublished && (
                <Link
                  href={`/blog/${post.slug}/`}
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full",
                  )}
                >
                  <ExternalLink />
                  Դիտել կայքում
                </Link>
              )}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                Ջնջել հոդվածը
                <DeletePostButton
                  id={post.id}
                  title={post.title}
                  onDeleted={() => router.replace("/admin/")}
                />
              </div>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
