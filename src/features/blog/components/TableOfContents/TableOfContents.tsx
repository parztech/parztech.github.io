"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import type { TableOfContentsProps } from "./types";

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-3">
      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        Բովանդակություն
      </p>
      <ul className="space-y-1 border-l text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l-2 border-transparent py-1 pl-3 text-muted-foreground transition-colors hover:text-foreground",
                h.level === 3 && "pl-6",
                activeId === h.id && "border-primary font-medium text-primary",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
