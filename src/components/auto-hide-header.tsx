"use client";

import { type ComponentProps, useEffect, useRef } from "react";

// A sticky header that follows the scroll: scrolling down slides it out of
// view pixel for pixel, and scrolling up by its own height brings it fully
// back, wherever you are on the page.
export function AutoHideHeader({ onFocus, ...props }: ComponentProps<"header">) {
  const ref = useRef<HTMLElement>(null);
  // How far the header is pushed up, from 0 (shown) to its height (hidden).
  const offset = useRef(0);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    let lastY = Math.max(window.scrollY, 0);
    let frame = 0;

    function update() {
      frame = 0;
      // Clamped so overscroll bounce at the edges doesn't move the header.
      const y = Math.max(window.scrollY, 0);
      offset.current = Math.min(
        Math.max(offset.current + y - lastY, 0),
        header!.offsetHeight,
      );
      lastY = y;
      header!.style.transform = offset.current
        ? `translateY(${-offset.current}px)`
        : "";
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      // Keyboard users tabbing into a hidden header get it back in view. The
      // header also needs focus-within:[transform:none]!, which applies before
      // the browser scrolls to the focused link; this alone runs too late and
      // the page jumps.
      onFocus={(event) => {
        offset.current = 0;
        if (ref.current) ref.current.style.transform = "";
        onFocus?.(event);
      }}
      {...props}
    />
  );
}
