import { MailIcon, UserIcon } from "lucide-react";
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
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CurrentYear /> {site.name}
        </p>
        <ul className="-mx-2.5 flex flex-wrap gap-1">
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
          {site.links.map((link) => (
            <li key={link.href}>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<a href={link.href} target="_blank" rel="noreferrer" />}
              >
                <link.icon data-icon="inline-start" />
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
