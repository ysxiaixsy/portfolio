import { cn } from "@/lib/utils";

// The game-menu cursor: a pixel ▶ beside whatever a `group` link points at.
// It shows while the link is hovered or keyboard-focused (nudging, like a
// menu selection) and, standing still, while the link is the current page
// (aria-current). Position it in the space left of its item.
export function MenuCursor({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 4 7"
      fill="currentColor"
      shapeRendering="crispEdges"
      className={cn(
        // Two screen pixels per art pixel, sized in px so it stays whole.
        "pointer-events-none h-[14px] w-[8px] shrink-0 text-highlight opacity-0",
        "group-hover:animate-cursor-nudge group-hover:opacity-100 group-focus-visible:animate-cursor-nudge group-focus-visible:opacity-100 group-aria-[current]:opacity-100 motion-reduce:animate-none",
        className,
      )}
    >
      <path d="M0 0h1v7H0zM1 1h1v5H1zM2 2h1v3H2zM3 3h1v1H3z" />
    </svg>
  );
}
