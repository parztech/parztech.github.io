export const siteConfig = {
  name: "Parz Tech",
  tagline: "Տեխնոլոգիաներ և արհեստական բանականություն՝ պարզ լեզվով",
  description:
    "Parz Tech-ը հայալեզու բլոգ է տեխնոլոգիաների, արհեստական բանականության և ծրագրավորման մասին՝ բացատրված պարզ ու հասկանալի։",
  url: "https://parztech.github.io",
  locale: "hy_AM",
  author: "Parz Tech խմբագրություն",
  nav: [
    { title: "Գլխավոր", href: "/" },
    { title: "Բլոգ", href: "/blog/" },
    { title: "Մեր մասին", href: "/about/" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
