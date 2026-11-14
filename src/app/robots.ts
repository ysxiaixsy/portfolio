import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Everything is public; this points crawlers at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
