import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { PageTransition } from "@/components/page-transition";
import { Separator } from "@/components/ui/separator";
import { journey } from "@/data/journey";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { stacks } from "@/data/tech-stack";

export const metadata: Metadata = {
  title: "Résumé",
  alternates: { canonical: "/resume" },
};

// The résumé is a document to print and parse, so it keeps a plain sans
// instead of the site's pixel face. Loaded here, so only this page pays.
const geist = Geist({ subsets: ["latin"] });

// Printed to public/resume.pdf by `npm run resume`; the site chrome is hidden
// in print (see the print: classes in the layout), and entries carry
// break-inside-avoid so none splits across a page break.

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
  return url.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "");
}

const contacts = [
  { label: site.email, href: `mailto:${site.email}` },
  ...site.links
    .filter((link) => link.resume)
    .map((link) => ({
      label: displayUrl(link.href),
      href: link.href,
    })),
];

export default function ResumePage() {
  return (
    <PageTransition>
      <article
        className={`${geist.className} flex max-w-3xl flex-col gap-6 py-12 text-sm leading-relaxed sm:py-16 print:max-w-none print:py-0`}
      >
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
          <p className="mt-1 text-base text-muted-foreground">{site.role}</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a href={contact.href} className="text-link print:no-underline">
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <Separator />

        <Section title="Summary">
          <p>
            Third-year BS Computer Science student at the University of the
            Philippines Visayas and DOST-SEI merit scholar. A software engineer
            who builds web apps, games and language tooling end to end, from
            database rules and server logic to the interface, and designs the UI
            people use. Before UP, spent two years on a three-person research
            project at Philippine Science High School identifying endophytic
            fungi with pharmaceutical potential.
          </p>
        </Section>

        <Section title="Education & involvement">
          {journey.map((entry) => (
            <div
              key={`${entry.place}-${entry.start}`}
              className="break-inside-avoid"
            >
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
            <div key={project.slug} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">
                  {project.title}
                  {/* The live site when there is one, else the source. */}
                  {(project.liveUrl ?? project.repoUrl) && (
                    <>
                      {" · "}
                      <a
                        href={project.liveUrl ?? project.repoUrl}
                        className="text-link font-normal text-muted-foreground print:no-underline"
                      >
                        {displayUrl(project.liveUrl ?? project.repoUrl!)}
                      </a>
                    </>
                  )}
                </h3>
                <p className="text-muted-foreground">
                  {project.inProgress
                    ? `${project.year} – Present`
                    : project.year}
                </p>
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
                <dt className="w-32 shrink-0 font-medium">{group.title}</dt>
                <dd>{group.items.map((item) => item.title).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </article>
    </PageTransition>
  );
}
