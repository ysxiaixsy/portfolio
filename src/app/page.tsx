import { ArrowRightIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { ProjectCard } from "@/components/project-card";
import { ResumeButton } from "@/components/resume-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function Home() {
  const featured = projects.filter((project) => project.featured);

  return (
    <PageTransition>
      <div className="flex flex-col gap-20">
        <section className="flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{site.role}</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              Hi, I&apos;m {site.name}.
            </h1>
            <p className="mt-5 max-w-xl text-lg whitespace-pre-line text-muted-foreground">
              {site.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ResumeButton size="lg">Download résumé</ResumeButton>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                <MailIcon data-icon="inline-start" />
                Get in touch
              </Button>
            </div>
          </div>

          <Avatar className="size-28 shrink-0 sm:size-36">
            {site.photo && <AvatarImage src={site.photo} alt={site.name} />}
            <AvatarFallback className="text-3xl font-medium">
              {site.initials}
            </AvatarFallback>
          </Avatar>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Featured projects
            </h2>
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href="/projects" transitionTypes={["nav-forward"]} />}
            >
              All projects
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </div>
          <div className="mt-6 grid gap-4">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
