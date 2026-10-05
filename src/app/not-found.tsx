import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
          <p className="text-gradient text-8xl font-extrabold">404</p>
          <h1 className="mt-6 text-2xl font-bold">Էջը չի գտնվել</h1>
          <p className="mt-3 text-muted-foreground">
            Կարծես այս էջը գոյություն չունի կամ տեղափոխվել է։
          </p>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-8 rounded-full",
            )}
          >
            <ArrowLeft />
            Վերադառնալ գլխավոր էջ
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
