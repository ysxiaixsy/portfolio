import { MailIcon } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { JourneyTimeline } from "@/components/journey-timeline";
import { PageTransition } from "@/components/page-transition";
import { ProjectGrid } from "@/components/project-grid";
import { ResumeButton } from "@/components/resume-button";
import { SectionHeading } from "@/components/section-heading";
import { SectionLink } from "@/components/section-link";
import { TechStack } from "@/components/tech-stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Backlight } from "@/components/ui/backlight";
import { Button } from "@/components/ui/button";
import { DitherField } from "@/components/ui/dither-field";
import { KineticText } from "@/components/ui/kinetic-text";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col gap-20">
        {/* The margin lets the jump to this section reach the top of the page. */}
        <section
          id="main"
          className="relative isolate flex scroll-mt-40 flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Faded at the edges so it reads as light behind the hero, not a box. */}
          <DitherField
            pattern="horizon"
            color="var(--highlight)"
            intensity={0.7}
            dotSize={2}
            className="pointer-events-none absolute -inset-x-6 -top-16 -bottom-12 -z-10 mask-[radial-gradient(ellipse_55%_65%_at_82%_45%,black_25%,transparent_72%)]"
          />
          <div>
            <h1>
              <span className="block text-xl font-medium tracking-tight text-muted-foreground sm:text-2xl">
                Hi, I&apos;m
              </span>
              <KineticText
                as="span"
                text={site.name}
                className="mt-1 text-5xl tracking-tight sm:text-6xl lg:text-7xl"
              />
            </h1>
            <p className="mt-3 text-2xl font-medium tracking-tight text-highlight sm:text-3xl">
              {site.role}
            </p>
            <p className="mt-6 max-w-2xl text-lg whitespace-pre-line text-muted-foreground">
              {site.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ResumeButton size="lg">Download résumé</ResumeButton>
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
          </div>

          {/* Casts the photo's own colours around it as a glow. */}
          <Backlight blur={28} className="shrink-0">
            <Avatar className="size-28 sm:size-36 lg:size-44">
              {site.photo && <AvatarImage src={site.photo} alt={site.name} />}
              <AvatarFallback className="text-3xl font-medium">
                {site.initials}
              </AvatarFallback>
            </Avatar>
          </Backlight>
        </section>

        <Separator />

        <section id="projects" className="scroll-mt-24">
          <SectionHeading
            index={1}
            description="Things I've built or contributed to, newest first."
          >
            Projects
          </SectionHeading>
          <div className="mt-12">
            <ProjectGrid projects={projects} />
          </div>
        </section>

        <Separator />

        <section id="about" className="scroll-mt-24">
          <SectionHeading index={2}>About</SectionHeading>

          <div className="mt-10 flex flex-col gap-4 text-lg leading-relaxed">
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
              programming seriously at UP Visayas. Most recently, I designed the
              UI and every screen of{" "}
              <Link
                href="/projects/sackto"
                transitionTypes={["nav-forward"]}
                className="underline underline-offset-4 hover:text-muted-foreground"
              >
                SACKTO
              </Link>
              , a capacity-planning platform for the Iloilo Rice Processing
              Complex built at Hack Iloilo 2026, and helped plan and build it
              from start to finish.
            </p>
          </div>

          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">Stack</h3>
              <div className="mt-6">
                <TechStack />
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-semibold tracking-tight">
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

        <Separator />

        <section
          id="contact"
          className="grid scroll-mt-24 gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <SectionHeading index={3}>Contact</SectionHeading>
            <p className="mt-8 text-lg leading-relaxed">
              I&apos;m open to anything — internships, jobs, freelance design,
              collaborations, or just a chat about an idea.
            </p>
            <p className="mt-3 text-muted-foreground">
              Have a role, project, or question in mind? Send me a message, or
              email{" "}
              <a
                href={`mailto:${site.email}`}
                className="underline underline-offset-4 hover:text-foreground"
              >
                {site.email}
              </a>
              .
            </p>
          </div>
          {/* Lines up with the heading's number on wide screens. */}
          <div className="lg:pt-1">
            <ContactForm />
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
