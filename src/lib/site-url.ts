// The site's public address, with no trailing slash: the base for canonical
// links, link-preview images, the sitemap and robots.txt. Set
// NEXT_PUBLIC_SITE_URL for a custom domain; without it, a Vercel build uses
// the project's production address, and anything else is localhost.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
