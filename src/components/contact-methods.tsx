import type { ComponentType, SVGProps } from "react";
import { MenuCursor } from "@/components/menu-cursor";
import { ExternalLinkIcon, MailIcon } from "@/components/pixel-icons";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { site } from "@/data/site";
import { signalTitle } from "@/lib/styles";
import { cn } from "@/lib/utils";

type Method = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
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
    external: true,
  })),
];

// Every way to reach me directly, as a list in the same row style as the
// projects past the featured ones, menu cursor included.
export function ContactMethods() {
  return (
    <ul className="pixel-rule pt-(--pixel)">
      {methods.map((method) => (
        <li key={method.href}>
          <Item
            className="group relative border-0 pixel-rule-b px-0 pt-3.5 pb-[calc(0.875rem+var(--pixel))] text-base"
            render={
              <a
                href={method.href}
                {...(method.external && {
                  target: "_blank",
                  rel: "noreferrer",
                })}
              />
            }
          >
            <MenuCursor className="absolute top-[calc(50%-8px)] -left-4" />
            <ItemMedia variant="icon" className="text-muted-foreground">
              <method.icon aria-hidden="true" className="size-4" />
            </ItemMedia>
            <ItemContent className="flex-row items-baseline gap-3">
              <span className="w-20 shrink-0 text-sm text-muted-foreground">
                {method.label}
              </span>
              <ItemTitle className={cn("min-w-0 text-base", signalTitle)}>
                <span className="truncate">{method.value}</span>
              </ItemTitle>
            </ItemContent>
            <ItemActions>
              {/* Opens elsewhere: email app or a new tab. */}
              <ExternalLinkIcon className="size-4 text-muted-foreground" />
            </ItemActions>
          </Item>
        </li>
      ))}
    </ul>
  );
}
