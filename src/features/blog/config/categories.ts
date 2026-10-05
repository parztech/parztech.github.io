import {
  BrainCircuit,
  Code2,
  Cpu,
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
    name: "Արհեստական բանականություն",
    description: "Մոդելներ, գործիքներ և ինչպես են դրանք փոխում աշխարհը",
    icon: BrainCircuit,
    gradient: "from-brand-violet via-brand-pink to-brand-apricot",
    tint: "bg-brand-violet/12",
    iconColor: "text-brand-violet",
  },
  {
    slug: "programming",
    name: "Ծրագրավորում",
    description: "Լեզուներ, գործիքներ և խորհուրդներ սկսնակների համար",
    icon: Code2,
    gradient: "from-brand-cyan via-brand-violet to-brand-violet",
    tint: "bg-brand-cyan/15",
    iconColor: "text-brand-cyan",
  },
  {
    slug: "security",
    name: "Կիբեռանվտանգություն",
    description: "Ինչպես պաշտպանել քեզ և քո տվյալները համացանցում",
    icon: ShieldCheck,
    gradient: "from-brand-emerald via-brand-cyan to-brand-violet",
    tint: "bg-brand-emerald/15",
    iconColor: "text-brand-emerald",
  },
  {
    slug: "gadgets",
    name: "Սարքեր",
    description: "Նոութբուքներ, սմարթֆոններ և ընտրության խորհուրդներ",
    icon: Cpu,
    gradient: "from-brand-apricot via-brand-pink to-brand-violet",
    tint: "bg-brand-apricot/18",
    iconColor: "text-brand-apricot",
  },
] as const satisfies readonly Category[];

export type CategorySlug = (typeof categories)[number]["slug"];

export function getCategory(slug: string): Category {
  return categories.find((c) => c.slug === slug) ?? categories[0];
}
