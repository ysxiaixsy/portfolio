import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
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
