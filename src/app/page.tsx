import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ContactMethods } from "@/components/contact-methods";
import { JourneyTimeline } from "@/components/journey-timeline";
import { JsonLd } from "@/components/json-ld";
import { PageTransition } from "@/components/page-transition";
import { NowPanel } from "@/components/now-panel";
import { MailIcon, MapPinIcon } from "@/components/pixel-icons";
import { PortraitSwap } from "@/components/portrait-swap";
import { ProjectGrid } from "@/components/project-grid";
import { ResumeButton } from "@/components/resume-button";
import { SectionHeading } from "@/components/section-heading";
import { SectionLink } from "@/components/section-link";
import { SocialLinks } from "@/components/social-links";
import { TechStack } from "@/components/tech-stack";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Window } from "@/components/window";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import { capsLabel } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The rows of the hero's character sheet, under the name.
const sheet = [
  { label: "Class", value: site.role },
  { label: "Guild", value: site.education },
  { label: "Base", value: site.location },
];

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col">
        <JsonLd
          data={{
            "@type": "Person",
            name: site.name,
            url: siteUrl,
            jobTitle: site.role,
            description: site.description,
            image: `${siteUrl}${site.photo}`,
            affiliation: {
              "@type": "CollegeOrUniversity",
              name: "University of the Philippines Visayas",
            },
            sameAs: site.links.map((link) => link.href),
          }}
        />
        {/* The hero is a character sheet, in a window on a checkered floor.
            The name, at poster size, is the one loud thing on the page. */}
        <section
          id="main"
          className="page-section scroll-mt-40 pixel-checker pixel-bleed pt-10 sm:pt-14"
        >
          <Window title="Player 1">
            {/* Two columns on wide screens: the portrait over the stats, and
                the sheet beside them. On narrow ones both columns dissolve
                (`contents`) and the four parts stack in reading order:
                portrait, sheet, stats, actions. */}
            <div className="flex flex-col gap-8 p-4 sm:p-6 lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-10 lg:p-8">
              <div className="contents lg:flex lg:w-[256px] lg:flex-col lg:gap-6 xl:w-[384px]">
                {/* Me in pixel art, flipping to the real photo, over a name
                    plate with my year as a level. */}
                <div className="order-1 flex items-end gap-4 lg:flex-col lg:items-stretch lg:gap-[calc(var(--pixel)*4)]">
                  <PortraitSwap />
                  <Badge
                    variant="progress"
                    className="h-6 pixel-frame [--frame-color:var(--foreground)] lg:w-full"
                  >
                    {site.level}
                  </Badge>
                </div>

                {/* A few hard numbers, each from the project it links to:
                    three across on narrow screens, stacked under the
                    portrait on wide ones. */}
                <dl className="order-3 grid grid-cols-3 gap-3 lg:grid-cols-1">
                  {site.numbers.map((number) => {
                    const project = getProject(number.project);
                    return (
                      <div
                        key={number.label}
                        className="flex flex-col gap-0.5 border-l-(length:--pixel) border-gold bg-muted px-3 py-2 lg:grid lg:grid-cols-[4.5rem_minmax(0,1fr)] lg:items-center lg:gap-x-3 lg:gap-y-0 xl:grid-cols-[5.5rem_minmax(0,1fr)]"
                      >
                        {/* Read as "label: value", shown value first. */}
                        <dt className="order-2 text-xs text-muted-foreground sm:text-sm lg:col-start-2 lg:row-start-1">
                          {number.label}
                        </dt>
                        <dd className="order-1 text-2xl tracking-tight lg:col-start-1 lg:row-span-2 lg:row-start-1 xl:text-3xl">
                          {number.value}
                        </dd>
                        {project && (
                          <dd className="order-3 mt-auto pt-1 text-xs sm:text-sm lg:col-start-2 lg:row-start-2 lg:mt-0 lg:pt-0">
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
              </div>

              {/* As tall as the portrait column, with the actions at its
                  foot, so the two columns end on one line. */}
              <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:justify-between lg:gap-8 lg:self-stretch">
                <div className="order-2 flex min-w-0 flex-col">
                  <h1 className="text-[3.25rem] leading-[0.9] tracking-tight pixel-title-shadow sm:text-7xl lg:text-[6rem] xl:text-[6.5rem]">
                    {site.name}
                  </h1>
                  <p className="mt-6 text-xl tracking-tight text-muted-foreground sm:text-2xl">
                    {site.motto}
                  </p>

                  <dl className="mt-6 grid grid-cols-[4rem_minmax(0,1fr)] gap-x-4 gap-y-2">
                    {sheet.map((row) => (
                      <div key={row.label} className="contents">
                        <dt
                          className={cn(
                            "pt-1 text-muted-foreground",
                            capsLabel,
                          )}
                        >
                          {row.label}
                        </dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                    <div className="contents">
                      <dt
                        className={cn(
                          "pt-1 text-muted-foreground",
                          capsLabel,
                        )}
                      >
                        Status
                      </dt>
                      <dd className="flex items-baseline gap-2">
                        {/* Live status: a dot blinking in the accent. */}
                        <span
                          aria-hidden="true"
                          className="size-1.5 shrink-0 -translate-y-0.5 animate-blink bg-highlight motion-reduce:animate-none"
                        />
                        {site.status}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                    {site.tagline}
                  </p>
                </div>

                <div className="order-4 flex flex-col gap-6">
                  <div className="flex flex-wrap gap-3">
                    {/* Short on phones, so both buttons fit on one line. */}
                    <ResumeButton size="lg">
                      <span className="sm:hidden">Résumé</span>
                      <span className="max-sm:hidden">Download résumé</span>
                    </ResumeButton>
                    <Button
                      size="lg"
                      variant="outline"
                      nativeButton={false}
                      render={<SectionLink section="contact" />}
                    >
                      <MailIcon data-icon="inline-start" />
                      Get in touch
                    </Button>
                  </div>
                  <SocialLinks />
                </div>
              </div>
            </div>
          </Window>
        </section>

        <Separator variant="dither" />

        <section id="projects" className="page-section">
          <SectionHeading
            eyebrow={`Quest log · ${projects.length} entries`}
            description="Things I've built or contributed to, from games and web apps to a programming language."
          >
            Projects
          </SectionHeading>
          <div className="mt-12">
            <ProjectGrid projects={projects} />
          </div>
        </section>

        <Separator variant="dither" />

        <section id="about" className="page-section">
          <SectionHeading eyebrow="Character">About</SectionHeading>

          {/* The story on the left, what I'm on now on the right. */}
          <div className="mt-12 grid items-start gap-16 lg:grid-cols-2">
            <div className="flex flex-col gap-5 text-lg leading-relaxed">
              <p>
                I&apos;m {site.name}, a third-year Computer Science student at the
                University of the Philippines Visayas. I design and build
                software, from the interface to the code behind it.
              </p>
              <p>
                I&apos;ve loved making art for as long as I can remember. I
                started with drawing, picked up Photoshop at 11, and it only
                snowballed in high school, where I kept joining publication
                committees. At 12, I started producing music too. To me, art
                isn&apos;t limited to what you can see; it&apos;s anything
                beautiful. That&apos;s what drew me to software: a product where
                everything fits together and just works is beautiful too.
              </p>
              <p>
                At Philippine Science High School – Western Visayas Campus, my
                engineering and Design &amp; Make Technologies (DMT) classes gave
                me my first taste of building things, and I started taking
                programming seriously at UP Visayas. At Hack Iloilo 2026, I
                designed the brand and every screen of{" "}
                <Link
                  href="/projects/sackto"
                  transitionTypes={["nav-forward"]}
                  className="text-link"
                >
                  SACKTO
                </Link>
                , a capacity-planning platform for the Iloilo Rice Processing
                Complex, and helped plan and build it from start to finish.
              </p>
            </div>
            <NowPanel />
          </div>

          <div className="mt-20 grid gap-16 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl tracking-tight">Stack</h3>
              <div className="mt-6">
                <TechStack />
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl tracking-tight">
                  Journey
                </h3>
                <ResumeButton variant="outline" size="sm">
                  Résumé
                </ResumeButton>
              </div>
              <div className="mt-6">
                <JourneyTimeline />
              </div>
            </div>
          </div>
        </section>

        <Separator variant="dither" />

        <section
          id="contact"
          className="page-section grid gap-16 lg:grid-cols-2"
        >
          <div className="flex flex-col">
            <SectionHeading
              eyebrow="Comms"
              description="Have a role, a project or an idea? I'm open to internships, full-time roles, freelance design and collaborations."
            >
              Contact
            </SectionHeading>
            <ul className="mt-6 flex flex-wrap items-center gap-2">
              <li className="flex">
                <Badge variant="outline">
                  <span
                    data-icon="inline-start"
                    aria-hidden="true"
                    className="flex size-3 shrink-0 items-center justify-center"
                  >
                    {/* Live status: a dot blinking in the accent. */}
                    <span className="size-1.5 animate-blink bg-highlight motion-reduce:animate-none" />
                  </span>
                  {site.status}
                </Badge>
              </li>
              <li className="flex">
                <Badge variant="outline">
                  <MapPinIcon data-icon="inline-start" />
                  {site.location}
                </Badge>
              </li>
            </ul>
            <div className="mt-10">
              <ContactMethods />
            </div>
          </div>
          <ContactForm />
        </section>
      </div>
    </PageTransition>
  );
}
