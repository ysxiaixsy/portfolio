import Link from "next/link";
import { MainTabs } from "@/components/main-tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    // Named so it stays put while page content slides (see globals.css).
    <header
      className="border-b border-border print:hidden"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
        <MainTabs />
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="truncate font-semibold tracking-tight"
          >
            {site.name}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
