"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type SectionLinkProps = Omit<
  ComponentProps<typeof Link>,
  "href" | "onNavigate"
> & {
  // The id of a section on the home page.
  section: string;
};

// Links to a section of the home page. Already on the home page, it scrolls
// straight there: going through the router delays the scroll by half a second.
export function SectionLink({ section, ...props }: SectionLinkProps) {
  return (
    <Link
      href={`/#${section}`}
      onNavigate={(event) => {
        if (window.location.pathname !== "/") return;
        const target = document.getElementById(section);
        if (!target) return;
        event.preventDefault();
        window.history.pushState(null, "", `#${section}`);
        target.scrollIntoView();
      }}
      {...props}
    />
  );
}
