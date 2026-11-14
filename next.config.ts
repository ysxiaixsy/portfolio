import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF where the browser takes it, WebP otherwise.
    formats: ["image/avif", "image/webp"],
    // Only the widths the layouts ask for: screenshots are 1600px wide at
    // most, and the portrait shows at 128, 256 or 384px.
    deviceSizes: [640, 828, 1080, 1200, 1600],
    imageSizes: [128, 256, 384],
  },
  // These pages are now sections of the home page.
  async redirects() {
    return ["projects", "about", "contact"].map((section) => ({
      source: `/${section}`,
      destination: `/#${section}`,
      permanent: false,
    }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
