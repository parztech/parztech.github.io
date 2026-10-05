/**
 * Public site address used for canonical URLs, sitemap, RSS and social previews.
 * Set NEXT_PUBLIC_SITE_URL once there is a custom domain; until then Vercel's
 * production address is used automatically.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
