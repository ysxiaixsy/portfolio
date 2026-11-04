import { ArrowUpRightIcon, MailIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { site } from "@/data/site";
import { brandColor } from "@/data/tech-stack";
import { signalSurface } from "@/lib/styles";
import { cn } from "@/lib/utils";

type Method = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  // Brand colour; email and black or white brands follow the text colour.
  hex?: string;
  external: boolean;
};

const methods: Method[] = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: MailIcon,
    external: false,
  },
  ...site.links.map((link) => ({
    label: link.label,
    value: link.handle,
    href: link.href,
    icon: link.icon,
    hex: link.hex,
    external: true,
  })),
];

// Every way to reach me directly, as cards with the same signal as the
// project cards. Email spans the full row; the profiles pair up.
export function ContactMethods() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {methods.map((method, index) => (
        <li key={method.href} className={cn(index === 0 && "sm:col-span-2")}>
          <a
            href={method.href}
            // The card shows only the icon and handle; this names the platform.
            aria-label={`${method.label}: ${method.value}`}
            {...(method.external && { target: "_blank", rel: "noreferrer" })}
            className="group block rounded-xl outline-none"
          >
            <Card size="sm" className={signalSurface}>
              <CardContent className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <method.icon
                    aria-hidden="true"
                    className="size-5"
                    style={{ color: brandColor(method) }}
                  />
                </span>
                <span className="min-w-0 flex-1 truncate font-medium">
                  {method.value}
                </span>
                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground transition-colors duration-300 ease-out group-hover:text-highlight group-focus-visible:text-highlight motion-reduce:transition-none"
                />
              </CardContent>
            </Card>
          </a>
        </li>
      ))}
    </ul>
  );
}
