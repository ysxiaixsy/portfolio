import { MetaLabel } from "@/components/meta-label";
import { StackLogo } from "@/components/stack-logo";
import { Badge } from "@/components/ui/badge";
import { stacks } from "@/data/tech-stack";

// Every tool I use, grouped by kind, as one-colour logo badges.
export function TechStack() {
  return (
    <dl className="flex flex-col gap-6">
      {stacks.map((group) => (
        <div key={group.title} className="flex flex-col gap-2.5">
          <dt>
            <MetaLabel>{group.title}</MetaLabel>
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item.title}>
                  <Badge
                    variant="outline"
                    className="h-7 gap-1.5 px-2.5 text-sm font-normal has-data-[icon=inline-start]:pl-2 [&>svg]:size-3.5!"
                  >
                    <StackLogo item={item} data-icon="inline-start" />
                    {item.title}
                  </Badge>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
