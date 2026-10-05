"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { isActivePath } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 rounded-full border bg-background/60 p-1 md:flex">
      {siteConfig.nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
            isActivePath(pathname, item.href) &&
              "bg-primary text-primary-foreground shadow-sm hover:text-primary-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
