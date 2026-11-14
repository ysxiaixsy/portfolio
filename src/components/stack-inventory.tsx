"use client";

import Link from "next/link";
import { type ReactNode, useState } from "react";
import { MenuCursor } from "@/components/menu-cursor";
import { MenuList } from "@/components/menu-list";
import { MetaLabel } from "@/components/meta-label";
import { CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Window } from "@/components/window";
import { signalTitle } from "@/lib/styles";
import { cn } from "@/lib/utils";

// A tool as the inventory sees it: its name, its logo, already drawn on the
// server (TechStack) so the logo data never ships to the browser, and the
// projects that list it in their stack.
export type InventoryItem = {
  title: string;
  logo: ReactNode;
  usedIn: { slug: string; title: string }[];
};
export type InventoryGroup = { title: string; items: InventoryItem[] };

type Pointing = {
  // The slot picked with a click, tap or Enter: it stays lit, in the accent.
  selected: string | null;
  // The slot under the pointer or keyboard focus, read out while it's there.
  hovered: string | null;
};

// One kind of tool as a row of inventory slots: pixel logos in square
// frames. Beside the group's label it reads out the hovered or picked item,
// or how many it holds. Arrow keys move between slots.
function InventoryRow({
  title,
  items,
  pointing,
  onSelect,
  onHover,
}: InventoryGroup & {
  pointing: Pointing;
  onSelect: (title: string | null) => void;
  onHover: (title: string | null) => void;
}) {
  const names = items.map((item) => item.title);
  const shown = [pointing.hovered, pointing.selected].find(
    (name) => name && names.includes(name),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <MetaLabel>{title}</MetaLabel>
        <span
          aria-hidden="true"
          className={cn("text-sm", !shown && "text-muted-foreground")}
        >
          {shown ?? `${items.length} items`}
        </span>
      </div>
      <ToggleGroup
        aria-label={title}
        value={
          pointing.selected && names.includes(pointing.selected)
            ? [pointing.selected]
            : []
        }
        onValueChange={(value) => onSelect(value[0] ?? null)}
        variant="slot"
        size="slot"
        spacing={3}
        className="w-full flex-wrap"
      >
        {items.map((item) => (
          <ToggleGroupItem
            key={item.title}
            value={item.title}
            aria-label={item.title}
            onPointerEnter={() => onHover(item.title)}
            onPointerLeave={() => onHover(null)}
            // Keyboard focus reads out the item too.
            onFocus={() => onHover(item.title)}
            onBlur={() => onHover(null)}
          >
            {item.logo}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

// The picked item's description, like the box under a game inventory: its
// name and kind, and the projects it was used in. At rest it says what
// picking does, so the layout holds still.
function ItemWindow({
  item,
  group,
}: {
  item?: InventoryItem;
  group?: string;
}) {
  return (
    <Window title="Item" aside={group}>
      <CardContent className="flex min-h-28 flex-col justify-center gap-2 p-5">
        {!item ? (
          <p className="text-muted-foreground">
            Pick a tool to see where I&apos;ve used it.
          </p>
        ) : (
          <>
            <p className="text-xl tracking-tight">{item.title}</p>
            {item.usedIn.length === 0 ? (
              <p className="text-muted-foreground">
                Not in a project listed here.
              </p>
            ) : (
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <MetaLabel>Used in</MetaLabel>
                <MenuList
                  orientation="horizontal"
                  // Pulled left by the cursor's width and gap, so the first
                  // name lines up with the item's.
                  className="-ml-[14px] flex basis-full flex-wrap gap-x-4 gap-y-1"
                >
                  {item.usedIn.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/projects/${project.slug}`}
                        transitionTypes={["nav-forward"]}
                        className={cn(
                          "group flex items-center gap-1.5",
                          signalTitle,
                        )}
                      >
                        <MenuCursor />
                        {project.title}
                      </Link>
                    </li>
                  ))}
                </MenuList>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Window>
  );
}

// The interactive half of the stack: one selection across every group, the
// hovered or focused slot read out beside its group's label, and the picked
// one described in the window below.
export function StackInventory({ groups }: { groups: InventoryGroup[] }) {
  const [pointing, setPointing] = useState<Pointing>({
    selected: null,
    hovered: null,
  });
  const pickedGroup = groups.find((group) =>
    group.items.some((item) => item.title === pointing.selected),
  );
  const picked = pickedGroup?.items.find(
    (item) => item.title === pointing.selected,
  );

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <InventoryRow
          key={group.title}
          {...group}
          pointing={pointing}
          onSelect={(selected) => setPointing((p) => ({ ...p, selected }))}
          onHover={(hovered) => setPointing((p) => ({ ...p, hovered }))}
        />
      ))}
      <ItemWindow item={picked} group={pickedGroup?.title} />
    </div>
  );
}
