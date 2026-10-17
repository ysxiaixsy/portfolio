import { DownloadIcon, MailIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { JourneyTimeline } from "@/components/journey-timeline";
import { PageTransition } from "@/components/page-transition";
import { TechStack } from "@/components/tech-stack";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>

        <div className="mt-8 flex flex-col gap-4 leading-relaxed">
          <p>
            I&apos;m {site.name}, a third-year Computer Science student at the
            University of the Philippines Visayas. I design and build software,
            from the interface to the code behind it.
          </p>
          <p>
            I&apos;ve loved making art for as long as I can remember. I started
            with drawing, picked up Photoshop at 11, and it only snowballed in
            high school, where I kept joining publication committees. At 12, I
            started producing music too. To me, art isn&apos;t limited to what
            you can see; it&apos;s anything beautiful. That&apos;s what drew me
            to software: a product where everything fits together and just
            works is beautiful too.
          </p>
          <p>
            At Philippine Science High School – Western Visayas Campus, my
            engineering and Design &amp; Make Technologies (DMT) classes gave me
            my first taste of building things, and I started taking programming
            seriously at UP Visayas. Most recently, I designed the UI and every
            screen of{" "}
            <Link
              href="/projects/sackto"
              transitionTypes={["nav-forward"]}
              className="underline underline-offset-4 hover:text-muted-foreground"
            >
              SACKTO
            </Link>
            , a capacity-planning platform for the Iloilo Rice Processing
            Complex built at Hack Iloilo 2026, and helped plan and build it from
            start to finish.
          </p>
        </div>

        <h2 className="mt-14 text-xl font-semibold tracking-tight">Stack</h2>
        <div className="mt-5">
          <TechStack />
        </div>

        <div className="mt-14 flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Journey</h2>
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<a href={site.resume} download />}
          >
            <DownloadIcon data-icon="inline-start" />
            Résumé
          </Button>
        </div>
        <div className="mt-6">
          <JourneyTimeline />
        </div>

        <h2 className="mt-14 text-xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-4 leading-relaxed">
          I&apos;m open to anything — internships, jobs, freelance design,
          collaborations, or just a chat about an idea.
        </p>
        <Button
          className="mt-5"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          <MailIcon data-icon="inline-start" />
          Get in touch
        </Button>
      </div>
    </PageTransition>
  );
}
