import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { ArrowLeftIcon } from "@/components/pixel-icons";
import { Title } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Window } from "@/components/window";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
};

// Unknown addresses and project slugs land here, in the same pixel style as
// the rest of the site.
export default function NotFound() {
  return (
    <PageTransition>
      <section className="page-section grid min-h-[calc(100svh-var(--header-height)-6rem)] content-center pixel-checker pixel-bleed">
        <Window title="Game over">
          <div className="grid items-center gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div className="flex flex-col">
          <p
            aria-hidden="true"
            className="text-8xl leading-none tracking-tight text-muted-foreground sm:text-9xl"
          >
            404
          </p>
          <Title as="h1" className="mt-8">
            Level not found
          </Title>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            There&apos;s no page at this address. It may have moved, or the link
            has a typo.
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/" transitionTypes={["nav-back"]} />}
            >
              <ArrowLeftIcon data-icon="inline-start" />
              Go to the home page
            </Button>
          </div>
        </div>

        {/* Me as a sprite, lost on this level: the 128px art at exactly 2×,
            unsmoothed, on one solid colour from the theme. */}
        <Image
          src={site.pixelPortrait.src}
          alt={`${site.name}, drawn in pixel art`}
          width={site.pixelPortrait.size}
          height={site.pixelPortrait.size}
          unoptimized
          className="-order-1 size-[256px] bg-muted pixel-frame pixelated [--frame-color:var(--foreground)] lg:order-none"
        />
          </div>
        </Window>
      </section>
    </PageTransition>
  );
}
