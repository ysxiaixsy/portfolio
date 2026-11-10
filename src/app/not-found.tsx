import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { ArrowLeftIcon } from "@/components/pixel-icons";
import { Title } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

// Unknown addresses and project slugs land here, in the same pixel style as
// the rest of the site.
export default function NotFound() {
  return (
    <PageTransition>
      <section className="page-section flex min-h-[calc(100svh-var(--header-height)-6rem)] flex-col justify-center">
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
      </section>
    </PageTransition>
  );
}
