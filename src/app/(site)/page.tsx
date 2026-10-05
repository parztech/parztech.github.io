import type { Metadata } from "next";
import { ArrowRight, BookOpen, Languages, Layers } from "lucide-react";
import Link from "next/link";

import { EmptyPosts } from "@/features/blog/components/EmptyPosts";
import { FeaturedPost } from "@/features/blog/components/FeaturedPost";
import { PostCard } from "@/features/blog/components/PostCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categories } from "@/features/blog/config/categories";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/features/seo/components/JsonLd";
import { pageMetadata } from "@/features/seo/lib/metadata";
import { websiteSchema } from "@/features/seo/lib/schema";
import { getPublishedPosts } from "@/features/blog/lib/queries";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: routes.home,
  absoluteTitle: true,
});

export default async function Home() {
  const posts = await getPublishedPosts();
  const latest = posts[0];
  const featured = posts.find((p) => p.featured) ?? latest;
  const recent = posts.filter((p) => p.slug !== featured?.slug).slice(0, 3);

  const stats = [
    ...(posts.length > 0
      ? [{ icon: BookOpen, value: posts.length, label: "հոդված" }]
      : []),
    { icon: Layers, value: categories.length, label: "թեմա" },
    { icon: Languages, value: "100%", label: "հայերեն" },
  ];

  return (
    <>
      <JsonLd data={websiteSchema()} />
      <section className="relative isolate overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-grid mask-[radial-gradient(ellipse_at_top,black,transparent_70%)] opacity-70" />
        <div className="absolute -top-48 left-1/2 -z-10 h-130 w-240 -translate-x-1/2 rounded-full bg-linear-to-r from-brand-violet/35 via-brand-pink/25 to-brand-apricot/35 blur-3xl" />

        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 md:pt-28 md:pb-20">
          {latest && (
            <Link
              href={routes.post(latest.slug)}
              className="group mb-8 inline-flex max-w-full items-center gap-2 rounded-full border bg-background/70 py-1 pr-3 pl-1 text-sm shadow-sm backdrop-blur transition-colors hover:border-primary/40"
            >
              <Badge className="rounded-full">Նոր</Badge>
              <span className="truncate text-muted-foreground group-hover:text-foreground">
                {latest.title}
              </span>
              <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}

          <h1 className="text-4xl leading-[1.15] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Տեխնոլոգիաներ և արհեստական բանականություն՝{" "}
            <span className="text-gradient">պարզ լեզվով</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            {siteConfig.description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={routes.blog}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-full px-6 shadow-lg shadow-primary/25",
              )}
            >
              Սկսել կարդալ
              <ArrowRight />
            </Link>
            <Link
              href={routes.about}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full bg-background/60 px-6 backdrop-blur",
              )}
            >
              Մեր մասին
            </Link>
          </div>

          <dl className="mt-14 flex w-full max-w-lg justify-center gap-12 sm:gap-16">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <s.icon className="mb-1 size-5 text-primary" />
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold">{s.value}</dd>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-24 px-4 pt-20 sm:px-6">
        <section>
          {featured ? (
            <>
              <SectionHeading
                eyebrow="Խմբագրի ընտրություն"
                title="Ընտրված հոդված"
              />
              <FeaturedPost post={featured} />
            </>
          ) : (
            <EmptyPosts />
          )}
        </section>

        <section>
          <SectionHeading
            eyebrow="Թեմաներ"
            title="Ինչի մասին ենք գրում"
            description="Ընտրիր քեզ հետաքրքրող ոլորտը և սկսիր այնտեղից։"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => {
              const count = posts.filter((p) => p.category === c.slug).length;
              return (
                <Link
                  key={c.slug}
                  href={routes.category(c.slug)}
                  className="group"
                >
                  <Card className="h-full gap-4 p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:ring-primary/30">
                    <div
                      className={cn(
                        "grid size-12 place-items-center rounded-2xl transition-transform group-hover:scale-110 group-hover:-rotate-6",
                        c.tint,
                      )}
                    >
                      <c.icon className={cn("size-6", c.iconColor)} />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-semibold">{c.name}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {c.description}
                      </p>
                    </div>
                    <p className="mt-auto text-xs font-medium text-primary">
                      {count > 0 ? `${count} հոդված →` : "Շուտով"}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {recent.length > 0 && (
          <section>
            <SectionHeading eyebrow="Բլոգ" title="Վերջին հոդվածները">
              <Link
                href={routes.blog}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full",
                )}
              >
                Բոլոր հոդվածները
                <ArrowRight />
              </Link>
            </SectionHeading>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        <section className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-brand-violet via-brand-pink to-brand-apricot px-6 py-16 text-center text-white shadow-2xl shadow-brand-violet/20 sm:px-12">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(white_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black,transparent_70%)] bg-size-[20px_20px] opacity-25" />
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Տեխնոլոգիաները բոլորի համար են
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Բարդ թեմաներ՝ բացատրված առանց ժարգոնի։ Կարդա, հասկացիր և կիսվիր
            ընկերներիդ հետ։
          </p>
          <Link
            href={routes.blog}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-11 rounded-full bg-white px-6 text-brand-violet hover:bg-white/90",
            )}
          >
            Բացահայտել բլոգը
            <ArrowRight />
          </Link>
        </section>
      </div>
    </>
  );
}
