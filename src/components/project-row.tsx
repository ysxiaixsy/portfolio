import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { ProjectTitle } from "@/components/project-title";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { Project } from "@/data/projects";
import { signalTitle } from "@/lib/styles";
import { cn } from "@/lib/utils";

// A project past the featured ones, as one row of a list: title and summary,
// with its role and year on the right on wide screens.
export function ProjectRow({ project }: { project: Project }) {
  return (
    <Item
      className="group gap-x-6 gap-y-1 rounded-none border-0 border-b px-0 py-5 [a]:hover:bg-transparent"
      render={
        <Link
          href={`/projects/${project.slug}`}
          transitionTypes={["nav-forward"]}
        />
      }
    >
      <ItemContent className="min-w-0 gap-1.5">
        {/* Not clamped: the title and its badge wrap together. */}
        <ItemTitle
          className={cn("line-clamp-none flex-wrap text-xl", signalTitle)}
          style={{ display: "flex" }}
        >
          <ProjectTitle project={project} />
          {project.inProgress && <Badge variant="outline">In progress</Badge>}
        </ItemTitle>
        <ItemDescription className="line-clamp-none text-base">
          {project.summary}
        </ItemDescription>
      </ItemContent>
      <ItemActions className="w-full gap-4 text-sm text-muted-foreground sm:w-auto sm:max-w-64 sm:self-start sm:pt-1.5">
        <span className="sm:text-right">{project.role}</span>
        <ArrowRightIcon
          aria-hidden="true"
          className={cn("ml-auto size-4 shrink-0 max-sm:hidden", signalTitle)}
        />
      </ItemActions>
    </Item>
  );
}
