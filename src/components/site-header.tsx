import { MainTabs } from "@/components/main-tabs";
import { SectionLink } from "@/components/section-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    // Named so it stays put while page content slides (see globals.css).
    <header
      className="sticky top-0 z-40 border-b border-border bg-background print:hidden"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-4 sm:gap-4">
        <SectionLink
          section="main"
          transitionTypes={["nav-back"]}
          className="min-w-0 shrink-0 text-base font-semibold tracking-tight sm:text-lg"
        >
          {site.name}
        </SectionLink>
        <div className="flex items-center gap-1 sm:gap-2">
          <MainTabs />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
