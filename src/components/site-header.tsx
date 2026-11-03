import { MainTabs } from "@/components/main-tabs";
import { SectionLink } from "@/components/section-link";
import { SiteMark } from "@/components/site-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    // Named so it stays put while page content slides (see globals.css).
    <header
      className="sticky top-0 z-40 h-(--header-height) border-b border-border bg-background print:hidden"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-3 px-6 sm:gap-4">
        <SectionLink
          section="main"
          transitionTypes={["nav-back"]}
          className="flex min-w-0 shrink-0 items-center gap-2 text-base font-semibold tracking-tight transition-colors duration-300 ease-out hover:text-highlight motion-reduce:transition-none sm:text-lg"
        >
          <SiteMark />
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
