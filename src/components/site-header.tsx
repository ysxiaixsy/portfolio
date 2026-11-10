import { SectionLink } from "@/components/section-link";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    // Named so it stays put while page content slides (see globals.css).
    <header
      className="sticky top-0 z-40 h-(--header-height) pixel-rule-b bg-background print:hidden"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="page-container flex h-full items-center justify-between gap-2">
        <SectionLink
          section="main"
          transitionTypes={["nav-back"]}
          aria-label={`${site.name}, back to the top`}
          className="flex shrink-0 items-center text-xl tracking-tight transition-colors duration-150 ease-pixel hover:text-highlight motion-reduce:transition-none"
        >
          {/* Just the initials: the hero right below carries the name. */}
          JP
        </SectionLink>
        <div className="flex items-center gap-1">
          <SiteNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
