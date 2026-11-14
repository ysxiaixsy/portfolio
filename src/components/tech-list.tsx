import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// A project's stack as a row of chips, the loot from a quest.
export function TechList({
  tech,
  className,
}: {
  tech: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tech.map((name) => (
        <li key={name} className="flex">
          <Badge variant="outline">{name}</Badge>
        </li>
      ))}
    </ul>
  );
}
