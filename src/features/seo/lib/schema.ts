import { siteConfig } from "@/config/site";
import { getCategory } from "@/features/blog/config/categories";
import type { PostMeta } from "@/features/blog/lib/queries";
import { absoluteUrl } from "@/lib/site-url";

const ORGANIZATION_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

/** Home page: tells Google the site's name (and alternate names like "Parz") */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: siteConfig.name,
        alternateName: siteConfig.alternateNames,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/logo.png"),
        description: siteConfig.description,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: siteConfig.name,
        alternateName: siteConfig.alternateNames,
        url: absoluteUrl("/"),
        description: siteConfig.description,
        inLanguage: "hy",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

export function blogPostingSchema(post: PostMeta) {
  const url = absoluteUrl(`/blog/${post.slug}/`);
  const category = getCategory(post.category);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        image: absoluteUrl(`/blog/${post.slug}/og.png`),
        datePublished: post.date,
        dateModified: post.updatedAt,
        inLanguage: "hy",
        articleSection: category.name,
        keywords: post.tags.join(", "),
        author: {
          "@type": "Organization",
          "@id": ORGANIZATION_ID,
          name: siteConfig.name,
        },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Գլխավոր",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Բլոգ",
            item: absoluteUrl("/blog/"),
          },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}
