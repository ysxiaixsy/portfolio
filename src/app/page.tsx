import { MailIcon } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { JourneyTimeline } from "@/components/journey-timeline";
import { PageTransition } from "@/components/page-transition";
import { ProjectGrid } from "@/components/project-grid";
import { ResumeButton } from "@/components/resume-button";
import { SectionLink } from "@/components/section-link";
import { TechStack } from "@/components/tech-stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { KineticText } from "@/components/ui/kinetic-text";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col gap-24">
        {/* The margin lets the jump to this section reach the top of the page. */}
        <section
          id="main"
          className="flex scroll-mt-40 flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between"
        >
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

          <Avatar className="size-28 shrink-0 sm:size-36 lg:size-44">
            {site.photo && <AvatarImage src={site.photo} alt={site.name} />}
            <AvatarFallback className="text-3xl font-medium">
              {site.initials}
            </AvatarFallback>
          </Avatar>
        </section>

        <section id="projects" className="scroll-mt-24">
          <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-3 text-muted-foreground">
            Things I&apos;ve built or contributed to, newest first.
          </p>
          <div className="mt-10">
            <ProjectGrid projects={projects} />
          </div>
        </section>

        <section id="about" className="max-w-3xl scroll-mt-24">
          <h2 className="text-3xl font-semibold tracking-tight">About</h2>

          <div className="mt-8 flex flex-col gap-4 leading-relaxed">
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

          <h3 className="mt-14 text-xl font-semibold tracking-tight">Stack</h3>
          <div className="mt-5">
            <TechStack />
          </div>

          <div className="mt-14 flex items-baseline justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-tight">Journey</h3>
            <ResumeButton variant="outline" size="sm">
              Résumé
            </ResumeButton>
          </div>
          <div className="mt-6">
            <JourneyTimeline />
          </div>
        </section>

        <section id="contact" className="max-w-3xl scroll-mt-24">
          <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
          <p className="mt-4 leading-relaxed">
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
          <div className="mt-10 max-w-xl">
            <ContactForm />
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
