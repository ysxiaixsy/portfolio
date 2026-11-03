import { StackLogo } from "@/components/stack-logo";
import { Card, CardContent } from "@/components/ui/card";
import { stacks } from "@/data/tech-stack";

export function TechStack() {
  return (
    <div className="flex flex-col gap-8">
      {stacks.map((group) => (
        <section key={group.title}>
          <h4 className="text-sm font-medium text-muted-foreground">
            {group.title}
          </h4>
          <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {group.items.map((item) => (
              <li key={item.title}>
                <Card size="sm" className="h-full">
                  <CardContent className="flex flex-col items-center gap-2">
                    <StackLogo item={item} className="size-8" />
                    <span className="text-center text-xs text-muted-foreground">
                      {item.title}
                    </span>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
