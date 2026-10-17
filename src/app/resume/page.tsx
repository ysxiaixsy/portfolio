import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { Separator } from "@/components/ui/separator";
import { journey } from "@/data/journey";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { stacks } from "@/data/tech-stack";

export const metadata: Metadata = {
  title: "Résumé",
};

// Printed to public/resume.pdf by `npm run resume`; the site chrome is hidden
// in print (see the print: classes in the layout).

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function displayUrl(url: string) {
  return url.replace(/^(https?:\/\/)?(www\.)?/, "");
}

const contacts = [
  { label: site.email, href: `mailto:${site.email}` },
  ...site.links.map((link) => ({
    label: displayUrl(link.href),
    href: link.href,
  })),
];

export default function ResumePage() {
  return (
    <PageTransition>
      <article className="flex flex-col gap-6 text-sm leading-relaxed">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
          <p className="mt-1 text-base text-muted-foreground">{site.role}</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a href={contact.href} className="underline-offset-4 hover:underline">
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <Separator />

        <Section title="Summary">
          <p>
            Third-year Computer Science student at the University of the
            Philippines Visayas who designs and builds software, from the
            interface to the code behind it. Graphic designer since age 11,
            with publication, branding and yearbook work across high school
            and university.
          </p>
        </Section>

        <Section title="Education & involvement">
          {journey.map((entry) => (
            <div key={`${entry.place}-${entry.start}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">{entry.place}</h3>
                <p className="text-muted-foreground">
                  {entry.start} – {entry.end ?? "Present"}
                </p>
              </div>
              <p className="text-muted-foreground">{entry.title}</p>
              <ul className="mt-1.5 flex list-disc flex-col gap-0.5 ps-5">
                {entry.involvements
                  // Project work is listed under Projects instead.
                  .filter((item) => !item.href?.startsWith("/projects"))
                  .map((item) => (
                    <li key={`${item.org}-${item.role}`}>
                      {item.role}, {item.org}
                      {item.years && (
                        <span className="text-muted-foreground">
                          {" "}
                          ({item.years})
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Projects">
          {projects.map((project) => (
            <div key={project.slug}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">
                  {project.title}
                  {project.liveUrl && (
                    <>
                      {" · "}
                      <a
                        href={project.liveUrl}
                        className="font-normal text-muted-foreground underline-offset-4 hover:underline"
                      >
                        {displayUrl(project.liveUrl)}
                      </a>
                    </>
                  )}
                </h3>
                <p className="text-muted-foreground">{project.year}</p>
              </div>
              <p className="text-muted-foreground">
                {project.role}
                {project.event && ` · ${project.event}`}
              </p>
              <p className="mt-1.5">{project.summary}</p>
              <p className="mt-1 text-muted-foreground">
                {project.tech.join(", ")}
              </p>
            </div>
          ))}
        </Section>

        <Section title="Skills">
          <dl className="flex flex-col gap-1">
            {stacks.map((group) => (
              <div key={group.title} className="flex gap-2">
                <dt className="w-24 shrink-0 font-medium">{group.title}</dt>
                <dd>{group.items.map((item) => item.title).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </article>
    </PageTransition>
  );
}
