import { SectionLink } from "@/components/section-link";
import { SiteMark } from "@/components/site-mark";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    // Named so it stays put while page content slides (see globals.css).
    <header
      className="sticky top-0 z-40 h-(--header-height) border-b bg-background print:hidden"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="page-container flex h-full items-center justify-between gap-2">
        <SectionLink
          section="main"
          transitionTypes={["nav-back"]}
          aria-label={`${site.name}, back to the top`}
          className="flex shrink-0 items-center gap-2.5 rounded-md font-medium tracking-tight transition-colors duration-300 ease-out outline-none hover:text-highlight focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
        >
          <SiteMark className="size-6" />
          <span className="max-sm:sr-only">{site.name}</span>
        </SectionLink>
        <div className="flex items-center gap-1">
          <SiteNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
