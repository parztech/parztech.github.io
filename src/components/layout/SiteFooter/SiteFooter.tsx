import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/features/blog/config/categories";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Նավարկում</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Թեմաներ</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={routes.category(c.slug)}
                  className="hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Separator />
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}։ Բոլոր իրավունքները
          պաշտպանված են։
        </p>
        <p>Ստեղծված է սիրով՝ հայ ընթերցողի համար 🇦🇲</p>
      </div>
    </footer>
  );
}
