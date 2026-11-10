import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ContactMethods } from "@/components/contact-methods";
import { JourneyTimeline } from "@/components/journey-timeline";
import { PageTransition } from "@/components/page-transition";
import { MailIcon, MapPinIcon } from "@/components/pixel-icons";
import { ProjectGrid } from "@/components/project-grid";
import { ResumeButton } from "@/components/resume-button";
import { SectionHeading } from "@/components/section-heading";
import { SectionLink } from "@/components/section-link";
import { SocialLinks } from "@/components/social-links";
import { TechStack } from "@/components/tech-stack";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* The name, in the pixel face, is the one loud thing on the page. */}
        <section
          id="main"
          className="page-section grid scroll-mt-40 items-center gap-10 pt-12 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16"
        >
          <div className="flex flex-col">
            <p className="text-muted-foreground">{site.education}</p>
            <h1 className="mt-4 text-6xl leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              {site.name}
            </h1>
            <p className="mt-8 text-xl tracking-tight sm:text-2xl">
              {site.role}
            </p>
            <p className="mt-1 text-xl tracking-tight text-muted-foreground sm:text-2xl">
              {site.motto}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
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
            <SocialLinks className="mt-6" />
          </div>

          {/* The real photo, sharp, in a pixel frame. */}
          {site.photo && (
            <Image
              src={site.photo}
              alt={site.name}
              width={957}
              height={960}
              preload
              sizes="(min-width: 1024px) 20rem, 8rem"
              className="-order-1 size-32 object-cover pixel-frame pixel-raised lg:order-none lg:size-80"
            />
          )}
        </section>

        <Separator />

        <section id="projects" className="page-section">
          <SectionHeading description="Things I've built or contributed to, from games and web apps to a programming language.">
            Projects
          </SectionHeading>
          <div className="mt-12">
            <ProjectGrid projects={projects} />
          </div>
        </section>

        <Separator />

        <section id="about" className="page-section">
          <SectionHeading>About</SectionHeading>

          <div className="mt-12 flex max-w-3xl flex-col gap-5 text-lg leading-relaxed">
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
            <p>
              Right now I&apos;m working on my next big project,{" "}
              <Link
                href="/projects/solnexus"
                transitionTypes={["nav-forward"]}
                className="text-link"
              >
                SolNexus
              </Link>
              : a lead and client communication pipeline for SolTech EMR, a real
              client. On a five-person team, I&apos;m the full-stack developer,
              lead UI/UX designer and Scrum Master.
            </p>
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

        <Separator />

        <section
          id="contact"
          className="page-section grid gap-16 lg:grid-cols-2"
        >
          <div className="flex flex-col">
            <SectionHeading description="Have a role, a project or an idea? I'm open to internships, full-time roles, freelance design and collaborations.">
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
                    <span className="size-1.5 bg-foreground" />
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
