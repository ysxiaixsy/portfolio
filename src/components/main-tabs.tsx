"use client";

import { FolderIcon, HouseIcon, MailIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { routeDepth, transitionTypesFor } from "@/lib/navigation";

const tabs = [
  { value: "main", label: "Main", href: "/", icon: HouseIcon },
  { value: "projects", label: "Projects", href: "/projects", icon: FolderIcon },
  { value: "about", label: "About", href: "/about", icon: UserIcon },
  { value: "contact", label: "Contact", href: "/contact", icon: MailIcon },
] as const;

// Project pages count as "projects"; any other unlisted page as "main".
function tabForPath(pathname: string) {
  if (routeDepth(pathname) > 0) return "projects";
  return tabs.find((tab) => tab.href === pathname)?.value ?? "main";
}

function TabsNav({ pathname }: { pathname: string | null }) {
  return (
    <Tabs value={pathname ? tabForPath(pathname) : null}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            nativeButton={false}
            render={
              <Link
                href={tab.href}
                transitionTypes={
                  pathname ? transitionTypesFor(pathname, tab.href) : undefined
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
