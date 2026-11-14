"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { MenuCursor } from "@/components/menu-cursor";
import { MenuList } from "@/components/menu-list";
import { SectionLink } from "@/components/section-link";
import { Button } from "@/components/ui/button";
import { routeDepth, transitionTypesFor } from "@/lib/navigation";
import { cn } from "@/lib/utils";

// Each id is a section of the home page, in page order. "main" is the hero,
// which the site name in the header links to instead.
const sections = ["main", "projects", "about", "contact"] as const;
const links = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

// The section being read: the last one to reach 40% down the screen. The
// bottom of the page always counts as the last section, which may never
// reach that line on a tall screen.
function findActiveSection() {
  const { scrollHeight } = document.documentElement;
  if (window.scrollY + window.innerHeight >= scrollHeight - 1) {
    return sections[sections.length - 1];
  }
  const line = window.innerHeight * 0.4;
  return (
    sections.findLast((id) => {
      const top = document.getElementById(id)?.getBoundingClientRect().top;
      return top !== undefined && top <= line;
    }) ?? sections[0]
  );
}

function useActiveSection(pathname: string | null) {
  const [active, setActive] = useState<string>("main");

  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;

    function update() {
      frame = 0;
      setActive(findActiveSection());
    }

    function onChange() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    onChange();
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return active;
}

function Nav({ pathname }: { pathname: string | null }) {
  const section = useActiveSection(pathname);

  // Project pages count as "projects"; other pages mark nothing.
  let active: string | null = null;
  if (pathname === "/") active = section;
  else if (pathname && routeDepth(pathname) > 0) active = "projects";

  return (
    <nav aria-label="Sections">
      <MenuList orientation="horizontal" className="flex items-center">
        {links.map((link) => {
          const current = link.id === active;
          return (
            <li key={link.id}>
              <Button
                variant="ghost"
                nativeButton={false}
                aria-current={current ? "location" : undefined}
                // On the HUD's ink bar. The active link is the selected menu
                // item, "you are here": a paper chip with the cursor in it.
                className={cn(
                  "group gap-1 px-1.5 text-background/70 hover:text-highlight-inverse sm:gap-1.5 sm:px-2",
                  current &&
                    "bg-background text-foreground hover:text-foreground",
                )}
                render={
                  <SectionLink
                    section={link.id}
                    transitionTypes={
                      pathname ? transitionTypesFor(pathname, "/") : undefined
                    }
                  />
                }
              >
                <MenuCursor className="text-highlight-inverse group-aria-[current]:text-highlight" />
                {link.label}
              </Button>
            </li>
          );
        })}
      </MenuList>
    </nav>
  );
}

function CurrentNav() {
  return <Nav pathname={usePathname()} />;
}

export function SiteNav() {
  // usePathname suspends while prerendering routes whose params aren't known
  // at build time, so render the links with nothing marked until it resolves.
  return (
    <Suspense fallback={<Nav pathname={null} />}>
      <CurrentNav />
    </Suspense>
  );
}
