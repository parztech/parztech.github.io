import {
  BrainCircuit,
  Mountain,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind classes for the cover gradient */
  gradient: string;
  /** Tinted background for chips and icon tiles */
  tint: string;
  /** Icon color (text stays foreground for contrast) */
  iconColor: string;
};

export const categories = [
  {
    slug: "ai",
    name: "ՍԻ",
    description:
      "Մոդելներ, ագենտներ և ինչպես է ՍԻ-ն փոխում մեր աշխատանքն ու առօրյան",
    icon: BrainCircuit,
    gradient: "from-brand-violet via-brand-pink to-brand-apricot",
    tint: "bg-brand-violet/12",
    iconColor: "text-brand-violet",
  },
  {
    slug: "security",
    name: "Անվտանգություն",
    description:
      "ՍԻ-ի և տեխնոլոգիաների ռիսկերը, և ինչպես պաշտպանել քեզ ու քո տվյալները",
    icon: ShieldCheck,
    gradient: "from-brand-emerald via-brand-cyan to-brand-violet",
    tint: "bg-brand-emerald/15",
    iconColor: "text-brand-emerald",
  },
  {
    slug: "armenia",
    name: "Հայկական IT և միջոցառումներ",
    description:
      "Հայաստանի տեխնոլոգիական ոլորտի նորություններ, իրադարձություններ և նախաձեռնություններ",
    icon: Mountain,
    gradient: "from-brand-apricot via-brand-pink to-brand-violet",
    tint: "bg-brand-apricot/18",
    iconColor: "text-brand-apricot",
  },
] as const satisfies readonly Category[];

export type CategorySlug = (typeof categories)[number]["slug"];

export const DEFAULT_CATEGORY = categories[0];

export function isCategorySlug(slug: string | null): slug is CategorySlug {
  return categories.some((c) => c.slug === slug);
}

/** Posts saved under a removed topic (e.g. "programming") are shown under the default one */
export function normalizeCategorySlug(slug: string): CategorySlug {
  return isCategorySlug(slug) ? slug : DEFAULT_CATEGORY.slug;
}

export function getCategory(slug: string): Category {
  return categories.find((c) => c.slug === slug) ?? DEFAULT_CATEGORY;
}
