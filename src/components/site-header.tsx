import { SectionLink } from "@/components/section-link";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

// The HUD: an ink bar across the top, so everything on it is paper, and its
// signal is `highlight-inverse`.
export function SiteHeader() {
  return (
    // Named so it stays put while page content slides (see globals.css).
    <header
      className="sticky top-0 z-40 h-(--header-height) bg-foreground text-background print:hidden"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="page-container flex h-full items-center justify-between gap-2">
        <SectionLink
          section="main"
          transitionTypes={["nav-back"]}
          aria-label={`${site.name}, back to the top`}
          className="flex shrink-0 items-center text-xl tracking-tight transition-colors duration-150 ease-pixel hover:text-highlight-inverse motion-reduce:transition-none"
        >
          {/* Just the initials: the hero right below carries the name. */}
          JP
        </SectionLink>
        <SiteNav />
        <div className="flex items-center gap-3">
          {/* Live status: a dot blinking in the signal. */}
          <p className="flex items-center gap-2 text-sm max-md:hidden">
            <span
              aria-hidden="true"
              className="size-1.5 animate-blink bg-highlight-inverse motion-reduce:animate-none"
            />
            {site.statusShort}
          </p>
          <ThemeToggle className="text-background/70 hover:text-highlight-inverse" />
        </div>
      </div>
    </header>
  );
}
