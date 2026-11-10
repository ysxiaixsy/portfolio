import type { Metadata } from "next";
import { Geist_Pixel } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/toast";
import { site } from "@/data/site";
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
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
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
          <SiteHeader />
          <main className="page-container flex-1 print:max-w-none print:p-0">
            {children}
          </main>
          <SiteFooter />
        </Toaster>
      </body>
    </html>
  );
}
