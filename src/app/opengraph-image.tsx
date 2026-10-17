import { site } from "@/data/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

// Used by every page that doesn't define its own opengraph-image.
export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Portfolio", title: site.tagline });
}
