import { ArrowRight, HeartHandshake, Lightbulb, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/features/seo/lib/metadata";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata({
  title: "Մեր մասին",
  description:
    "Ովքեր ենք մենք և ինչու ենք ստեղծել Parz Tech-ը՝ հայալեզու բլոգ տեխնոլոգիաների և արհեստական բանականության մասին։",
  path: routes.about,
});

const values = [
  {
    icon: Lightbulb,
    title: "Պարզություն",
    text: "Բարդ գաղափարները բացատրում ենք օրինակներով և առանց ավելորդ ժարգոնի։",
    tint: "bg-brand-apricot/18 text-brand-apricot",
  },
  {
    icon: Target,
    title: "Ճշգրտություն",
    text: "Ստուգում ենք փաստերը և նշում աղբյուրները, որպեսզի կարողանաս վստահել կարդացածին։",
    tint: "bg-brand-violet/12 text-brand-violet",
  },
  {
    icon: HeartHandshake,
    title: "Մայրենի լեզու",
    text: "Հավատում ենք, որ ժամանակակից գիտելիքը պետք է հասանելի լինի հայերենով։",
    tint: "bg-brand-pink/12 text-brand-pink",
  },
];

export default function AboutPage() {
  return (
    <div className="relative isolate">
      <div className="absolute -top-32 left-1/2 -z-10 h-96 w-200 -translate-x-1/2 rounded-full bg-linear-to-r from-brand-violet/25 via-brand-pink/20 to-brand-apricot/25 blur-3xl" />
      <div className="mx-auto max-w-4xl px-4 pt-16 sm:px-6 md:pt-24">
        <header className="space-y-5 text-center">
          <p className="text-sm font-semibold text-primary">Մեր մասին</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
            Մենք սիրում ենք տեխնոլոգիաներ և{" "}
            <span className="text-gradient">հայերենը</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {siteConfig.name}-ը ստեղծվել է մեկ պարզ նպատակով՝ տեխնոլոգիաների և
            արհեստական բանականության մասին որակյալ, հասկանալի բովանդակություն
            ստեղծել հայերենով։
          </p>
        </header>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="gap-4">
              <CardHeader>
                <div
                  className={cn(
                    "mb-2 grid size-11 place-items-center rounded-xl",
                    v.tint,
                  )}
                >
                  <v.icon className="size-5" />
                </div>
                <CardTitle className="text-lg font-semibold">
                  {v.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {v.text}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={routes.blog}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-full px-6",
            )}
          >
            Կարդալ հոդվածները
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
