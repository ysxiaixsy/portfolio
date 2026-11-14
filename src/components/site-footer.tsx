import { BackToTop } from "@/components/back-to-top";
import { Skyline } from "@/components/skyline";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

// Cached so the year is computed at build time instead of failing prerender.
async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="print:hidden">
      <Skyline />
      <div className="page-container flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6 text-sm text-muted-foreground">
        <p>
          © <CurrentYear /> {site.name}
        </p>
        <ul className="-mr-2 flex items-center gap-1">
          {site.links.map((link) => (
            <li key={link.href}>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground"
                nativeButton={false}
                render={
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                  />
                }
              >
                <link.icon />
              </Button>
            </li>
          ))}
          <li className="ml-2">
            <BackToTop />
          </li>
        </ul>
      </div>
    </footer>
  );
}
