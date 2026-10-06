import Link from "next/link";

import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";

export default function Logo() {
  return (
    <Link
      href={routes.home}
      aria-label={`${siteConfig.name} — գլխավոր էջ`}
      className="group flex items-center gap-2.5"
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-brand-violet via-brand-pink to-brand-apricot text-lg font-bold text-white shadow-lg shadow-brand-violet/25 transition-transform group-hover:scale-105 group-hover:-rotate-6"
      >
        Պ
      </span>
      <span className="text-lg font-bold tracking-tight">
        Parz<span className="text-gradient">Tech</span>
      </span>
    </Link>
  );
}
