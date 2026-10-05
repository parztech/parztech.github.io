import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path with trailing slash, e.g. "/blog/my-post/" */
  path: string;
  /** Use the title as-is instead of the "%s | Parz Tech" template */
  absoluteTitle?: boolean;
  /** Social preview image path; defaults to the site-wide card (/og.png) */
  image?: string;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    tags: string[];
    section: string;
  };
};

export const RSS_PATH = "/rss.xml";
export const DEFAULT_OG_IMAGE = "/og.png";

/**
 * Builds per-page metadata. Next.js merges metadata shallowly, so each page
 * sets its own canonical URL and Open Graph block through this helper.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  image,
  article,
}: PageMetadataInput): Metadata {
  const images = [
    { url: image ?? DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title },
  ];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": RSS_PATH },
    },
    openGraph: {
      type: article ? "article" : "website",
      url: path,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images,
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        tags: article.tags,
        section: article.section,
        authors: [siteConfig.author],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
