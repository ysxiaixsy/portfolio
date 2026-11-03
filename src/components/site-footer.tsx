import { MailIcon, UserIcon } from "lucide-react";
import { BackToTop } from "@/components/back-to-top";
import { ResumeButton } from "@/components/resume-button";
import { SectionLink } from "@/components/section-link";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

// Cached so the year is computed at build time instead of failing prerender.
async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

const sections = [
  { label: "About", id: "about", icon: UserIcon },
  { label: "Contact", id: "contact", icon: MailIcon },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border print:hidden">
      <div className="page-container flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CurrentYear /> {site.name}
        </p>
        <ul className="-ml-2.5 flex flex-wrap items-center gap-1">
          {sections.map((section) => (
            <li key={section.id}>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<SectionLink section={section.id} />}
              >
                <section.icon data-icon="inline-start" />
                {section.label}
              </Button>
            </li>
          ))}
          <li>
            <ResumeButton variant="ghost" size="sm">
              Résumé
            </ResumeButton>
          </li>
          {/* Icons only here; the home page shows the handles. */}
          {site.links.map((link) => (
            <li key={link.href}>
              <Button
                variant="ghost"
                size="icon-sm"
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
          <li>
            <BackToTop />
          </li>
        </ul>
      </div>
    </footer>
  );
}
