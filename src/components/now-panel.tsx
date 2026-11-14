import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import { CardContent } from "@/components/ui/card";
import { Window } from "@/components/window";
import { getProject } from "@/data/projects";
import { site } from "@/data/site";

// Work under way: gold stripes marching along a thin framed bar. It shows
// that something is moving, never how far along it is.
function ProgressMarch() {
  return (
    <div
      aria-hidden="true"
      className="h-[calc(var(--pixel)*3)] overflow-hidden pixel-frame [--frame-color:var(--foreground)] [--frame-size:2px]"
    >
      <div className="h-full w-[calc(100%+var(--pixel)*4)] animate-march bg-[repeating-linear-gradient(90deg,var(--gold)_0_calc(var(--pixel)*2),transparent_calc(var(--pixel)*2)_calc(var(--pixel)*4))] motion-reduce:animate-none" />
    </div>
  );
}

// Beside the About prose: the quest I'm on right now, and my part in it.
export function NowPanel() {
  const current = getProject(site.now.project);
  if (!current) return null;

  return (
    <Window title="Current quest" aside={<StatusBadge project={current} />}>
      <CardContent className="flex flex-col gap-4 p-6">
        <Link
          href={`/projects/${current.slug}`}
          transitionTypes={["nav-forward"]}
          className="w-fit text-2xl text-link"
        >
          {/* Plain text: ProjectTitle's view-transition name belongs to
              the project's row. */}
          {current.title}
        </Link>
        <p className="leading-relaxed text-muted-foreground">
          {site.now.role}
        </p>
        <ProgressMarch />
      </CardContent>
    </Window>
  );
}
