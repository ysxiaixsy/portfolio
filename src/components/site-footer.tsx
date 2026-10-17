import { MailIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { ResumeButton } from "@/components/resume-button";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

// Cached so the year is computed at build time instead of failing prerender.
async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

const pages = [
  { label: "About", href: "/about", icon: UserIcon },
  { label: "Contact", href: "/contact", icon: MailIcon },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border print:hidden">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CurrentYear /> {site.name}
        </p>
        <ul className="-mx-2.5 flex flex-wrap gap-1">
          {pages.map((page) => (
            <li key={page.href}>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href={page.href} />}
              >
                <page.icon data-icon="inline-start" />
                {page.label}
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
