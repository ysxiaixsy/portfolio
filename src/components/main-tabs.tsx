"use client";

import { FolderIcon, HouseIcon, MailIcon, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { SectionLink } from "@/components/section-link";
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { routeDepth, transitionTypesFor } from "@/lib/navigation";

// Each value is the id of a section on the home page.
const tabs = [
  { value: "main", label: "Main", icon: HouseIcon },
  { value: "projects", label: "Projects", icon: FolderIcon },
  { value: "about", label: "About", icon: UserIcon },
  { value: "contact", label: "Contact", icon: MailIcon },
] as const;

// The section being read: the last one to reach 40% down the screen. The ends
// of the page always count as the first and last sections, since those may
// never reach that line on a tall screen.
function findActiveSection() {
  const sections = tabs.map((tab) => tab.value);
  const { scrollHeight } = document.documentElement;
  if (window.scrollY <= 0) return sections[0];
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

function TabsNav({ pathname }: { pathname: string | null }) {
  const section = useActiveSection(pathname);

  // Project pages count as "projects"; any other page as "main".
  let value: string | null = null;
  if (pathname === "/") value = section;
  else if (pathname) value = routeDepth(pathname) > 0 ? "projects" : "main";

  return (
    <Tabs value={value}>
      <TabsList className="relative isolate p-1 group-data-horizontal/tabs:h-10">
        {/* Glows in the highlight colour and slides to the section being read. */}
        <TabsIndicator className="ring-1 ring-highlight/50 shadow-[0_0_18px_-2px_color-mix(in_oklab,var(--highlight)_65%,transparent)] dark:ring-highlight/50" />
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="px-2.5 has-data-[icon=inline-start]:pl-2.5 sm:px-3 sm:text-[0.9375rem]"
            nativeButton={false}
            render={
              <SectionLink
                section={tab.value}
                transitionTypes={
                  pathname ? transitionTypesFor(pathname, "/") : undefined
                }
              />
            }
          >
            <tab.icon data-icon="inline-start" />
            {/* Icon-only on small screens; the label stays for screen readers. */}
            <span className="max-sm:sr-only">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

function CurrentTabsNav() {
  return <TabsNav pathname={usePathname()} />;
}

export function MainTabs() {
  // usePathname suspends while prerendering routes whose params aren't known
  // at build time, so render the tabs with nothing selected until it resolves.
  return (
    <Suspense fallback={<TabsNav pathname={null} />}>
      <CurrentTabsNav />
    </Suspense>
  );
}
