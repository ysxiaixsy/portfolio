import Link from "next/link";
import { site } from "@/data/site";

// Cached so the year is computed at build time instead of failing prerender.
async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border print:hidden">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          © <CurrentYear /> {site.name}
        </p>
        <ul className="flex gap-5">
          <li>
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </li>
          {site.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
