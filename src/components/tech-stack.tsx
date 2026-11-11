"use client";

import { useState } from "react";
import { MetaLabel } from "@/components/meta-label";
import { StackLogo } from "@/components/stack-logo";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type StackItem, stacks } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

type Pointing = {
  // The slot picked with a click, tap or Enter: it stays lit, in the accent.
  selected: string | null;
  // The slot under the pointer or keyboard focus, read out while it's there.
  hovered: string | null;
};

// One kind of tool as a row of inventory slots: pixel logos in square
// frames. Beside the group's label it reads out the hovered or picked item,
// or how many it holds. Arrow keys move between slots.
function StackGroup({
  title,
  items,
  pointing,
  onSelect,
  onHover,
}: {
  title: string;
  items: StackItem[];
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
            <StackLogo item={item} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

// Every tool I use, grouped by kind, as one inventory: at rest it's all ink,
// and at most one slot, the picked one, lights up.
export function TechStack() {
  const [pointing, setPointing] = useState<Pointing>({
    selected: null,
    hovered: null,
  });

  return (
    <div className="flex flex-col gap-8">
      {stacks.map((group) => (
        <StackGroup
          key={group.title}
          {...group}
          pointing={pointing}
          onSelect={(selected) => setPointing((p) => ({ ...p, selected }))}
          onHover={(hovered) => setPointing((p) => ({ ...p, hovered }))}
        />
      ))}
    </div>
  );
}
