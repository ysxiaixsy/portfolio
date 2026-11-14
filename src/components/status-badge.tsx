import { Badge } from "@/components/ui/badge";
import { type Project, projectStatus } from "@/data/projects";

const variants = {
  Live: "live",
  "In progress": "progress",
  Complete: "complete",
} as const;

// Where a project stands, as a chip: green while it's live, gold while it's
// being built, plain once it's done.
export function StatusBadge({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const status = projectStatus(project);
  return (
    <Badge variant={variants[status]} className={className}>
      {status}
    </Badge>
  );
}
