import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// Each profile as its icon followed by the handle, e.g. Instagram @jp_gaultier_.
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("-mx-2.5 flex flex-wrap gap-1", className)}>
      {site.links.map((link) => (
        <li key={link.href}>
          <Button
            variant="ghost"
            nativeButton={false}
            render={
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${link.label}: ${link.handle}`}
              />
            }
          >
            <link.icon data-icon="inline-start" />
            {link.handle}
          </Button>
        </li>
      ))}
    </ul>
  );
}
