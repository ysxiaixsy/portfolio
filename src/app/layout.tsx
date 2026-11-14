import type { Metadata, Viewport } from "next";
import { Geist_Pixel } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toast";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import { themeScript } from "@/lib/theme";
import "./globals.css";

// The whole site is set in it (see the theme in globals.css). Next has no metrics to size-match a fallback for it, so fall back to a
// monospace face, which is closest in width while it loads.
const geistPixel = Geist_Pixel({
  variable: "--font-geist-pixel",
  subsets: ["latin"],
  adjustFontFallback: false,
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  // Canonical links and link-preview images resolve against this.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

// The browser's own chrome takes the HUD bar's colour: ink on the light
// theme, paper on the dark one.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#15171e" },
    { media: "(prefers-color-scheme: dark)", color: "#edeef2" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // themeScript sets data-theme before hydration, hence the suppression.
    <html
      lang="en"
      className={`${geistPixel.variable} h-full antialiased`}
      // Smooth scrolling is for the home page's sections, not route changes.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Toaster>
          {/* First stop for the keyboard: it steps into view when focused. */}
          <Button
            nativeButton={false}
            render={<a href="#content" />}
            className="fixed top-3 left-3 z-50 -translate-y-20 focus-visible:translate-y-0 print:hidden"
          >
            Skip to content
          </Button>
          <SiteHeader />
          {/* Full width, so bands that bleed past the column (pixel-bleed)
              are clipped at the window's edges. */}
          <main id="content" className="flex-1 overflow-x-clip">
            <div className="page-container print:max-w-none print:p-0">
              {children}
            </div>
          </main>
          <SiteFooter />
        </Toaster>
      </body>
    </html>
  );
}
