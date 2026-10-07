import { routes } from "@/lib/routes";

export const siteConfig = {
  name: "Parz Tech",
  tagline: "Տեխնոլոգիաներ և ՍԻ (արհեստական բանականություն)՝ պարզ լեզվով",
  description:
    "Parz Tech-ը հայալեզու բլոգ է տեխնոլոգիաների և արհեստական բանականության (ՍԻ) մասին՝ բացատրված պարզ ու հասկանալի։",
  /** Other names people search for; listed in structured data for Google */
  alternateNames: ["Parz", "ParzTech", "Պարզ", "Պարզ Թեք"],
  locale: "hy_AM",
  author: "Թամարա Մարտիրոսյան",
  nav: [
    { title: "Գլխավոր", href: routes.home },
    { title: "Բլոգ", href: routes.blog },
    { title: "Իմ մասին", href: routes.about },
  ],
} as const;

export const siteTitle = `${siteConfig.name} | ${siteConfig.tagline}`;

export const authorInitials = siteConfig.author
  .split(" ")
  .map((part) => part[0])
  .join("");
