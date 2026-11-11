import Link from "next/link";
import { MetaLabel } from "@/components/meta-label";
import { Card, CardContent } from "@/components/ui/card";
import { getProject } from "@/data/projects";
import { site } from "@/data/site";

// Beside the About prose: what I'm building right now, then a few hard
// numbers, each linked to the project it comes from.
export function NowPanel() {
  const current = getProject(site.now.project);

  return (
    <Card className="gap-0 py-0 text-base">
      {current && (
        <CardContent className="flex flex-col gap-3 p-6">
          <MetaLabel>Now building</MetaLabel>
          <Link
            href={`/projects/${current.slug}`}
            transitionTypes={["nav-forward"]}
            className="w-fit text-xl text-link"
          >
            {/* Plain text: ProjectTitle's view-transition name belongs to
                the project's row. */}
            {current.title}
          </Link>
          <p className="leading-relaxed text-muted-foreground">
            {site.now.role}
          </p>
        </CardContent>
      )}

      <dl className="grid grid-cols-3 pixel-rule">
        {site.numbers.map((number) => {
          const project = getProject(number.project);
          return (
            <div
              key={number.label}
              className="flex flex-col gap-1 p-6 not-first:pixel-rule-s max-sm:px-4"
            >
              {/* Read as "label: value", shown value first. */}
              <dt className="order-2 text-sm text-muted-foreground">
                {number.label}
              </dt>
              <dd className="order-1 text-2xl tracking-tight">
                {number.value}
              </dd>
              {project && (
                <dd className="order-3 mt-auto pt-2 text-sm">
                  <Link
                    href={`/projects/${project.slug}`}
                    transitionTypes={["nav-forward"]}
                    className="text-link"
                  >
                    {project.title}
                  </Link>
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </Card>
  );
}
