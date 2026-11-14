import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site-url";

// Every page a search engine should know: the home page, each project and
// the résumé.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      priority: 0.8,
    })),
    { url: `${siteUrl}/resume`, priority: 0.5 },
  ];
}
