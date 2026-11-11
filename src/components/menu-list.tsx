"use client";

import type { ComponentProps, KeyboardEvent } from "react";

const keys = {
  vertical: { next: "ArrowDown", prev: "ArrowUp" },
  horizontal: { next: "ArrowRight", prev: "ArrowLeft" },
} as const;

// A list of `group` links that also works like a game menu: the arrow keys
// move focus, and with it the menu cursor, from link to link (wrapping at the
// ends), Home and End jump to the first and last, and Enter opens one. Tab
// still steps through every link as usual. Each item is an <li> whose first
// child is the link.
export function MenuList({
  orientation = "vertical",
  onKeyDown,
  ...props
}: ComponentProps<"ul"> & { orientation?: keyof typeof keys }) {
  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

    const links = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        ":scope > li > :is(a, button)",
      ),
    );
    const index = links.indexOf(document.activeElement as HTMLElement);
    if (index === -1) return;

    const { next, prev } = keys[orientation];
    let target: number;
    if (event.key === next) target = (index + 1) % links.length;
    else if (event.key === prev)
      target = (index - 1 + links.length) % links.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = links.length - 1;
    else return;

    event.preventDefault();
    links[target].focus();
  }

  return <ul onKeyDown={handleKeyDown} {...props} />;
}
