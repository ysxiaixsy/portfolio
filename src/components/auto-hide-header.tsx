"use client";

import { type ComponentProps, useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]",
]
  .map((selector) => `${selector}:not([tabindex="-1"])`)
  .join(",");

// Whether pressing Tab (or Shift+Tab) moves focus into the header. An
// approximation of the browser's tab order, good enough to reveal in time.
function tabEntersHeader(header: HTMLElement, backwards: boolean) {
  const stops = Array.from(
    document.querySelectorAll<HTMLElement>(FOCUSABLE),
  ).filter((el) => el.getClientRects().length > 0);
  const current = stops.indexOf(document.activeElement as HTMLElement);
  const next =
    current === -1
      ? stops[backwards ? stops.length - 1 : 0]
      : stops[current + (backwards ? -1 : 1)];
  return next !== undefined && header.contains(next);
}

// A sticky header that follows the scroll: scrolling down slides it out of
// view pixel for pixel, and scrolling up by its own height brings it fully
// back, wherever you are on the page.
export function AutoHideHeader(props: ComponentProps<"header">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    // How far the header is pushed up, from 0 (shown) to its height (hidden).
    let offset = 0;
    let lastY = Math.max(window.scrollY, 0);
    let frame = 0;

    function setOffset(value: number) {
      offset = value;
      header!.style.transform = offset ? `translateY(${-offset}px)` : "";
    }

    function update() {
      frame = 0;
      // Clamped so overscroll bounce at the edges doesn't move the header.
      const y = Math.max(window.scrollY, 0);
      setOffset(Math.min(Math.max(offset + y - lastY, 0), header!.offsetHeight));
      lastY = y;
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    // Reveal before keyboard focus moves into a hidden header. Revealing on
    // focus instead is too late: the browser has already scrolled the page
    // to the hidden link, making it jump.
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key === "Tab" &&
        offset > 0 &&
        tabEntersHeader(header!, event.shiftKey)
      ) {
        setOffset(0);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      cancelAnimationFrame(frame);
    };
  }, []);

  return <header ref={ref} {...props} />;
}
