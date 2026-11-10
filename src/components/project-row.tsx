import Link from "next/link";
import { MenuCursor } from "@/components/menu-cursor";
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
// with its role on the right on wide screens. The menu cursor sits in the
// gutter left of the title.
export function ProjectRow({ project }: { project: Project }) {
  return (
    <Item
      className="group gap-x-6 gap-y-1 border-0 pixel-rule-b px-0 pt-5 pb-[calc(1.25rem+var(--pixel))]"
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
          className={cn(
            "relative line-clamp-none flex-wrap text-xl",
            signalTitle,
          )}
          style={{ display: "flex" }}
        >
          <MenuCursor className="absolute top-[calc(50%-7px)] -left-4" />
          <ProjectTitle project={project} />
          {project.inProgress && <Badge variant="outline">In progress</Badge>}
        </ItemTitle>
        <ItemDescription className="line-clamp-none text-base">
          {project.summary}
        </ItemDescription>
      </ItemContent>
      <ItemActions className="w-full text-sm text-muted-foreground sm:w-auto sm:max-w-64 sm:self-start sm:pt-1.5 sm:text-right">
        {project.role}
      </ItemActions>
    </Item>
  );
}
