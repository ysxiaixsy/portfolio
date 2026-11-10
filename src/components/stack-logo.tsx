import type { ComponentProps } from "react";
import { STACK_PIXEL_GRID, stackPixels } from "@/data/stack-pixels";
import type { StackItem } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

// A tech stack logo as pixel art, in the current text colour: the one place
// it is drawn. The pixel grids come from `npm run pixel-art`; a logo added
// since then falls back to its vector path until the script runs again.
export function StackLogo({
  item,
  className,
  ...props
}: ComponentProps<"svg"> & { item: StackItem }) {
  const pixels = stackPixels[item.title];
  return (
    <svg
      viewBox={
        pixels
          ? `0 0 ${STACK_PIXEL_GRID} ${STACK_PIXEL_GRID}`
          : (item.viewBox ?? "0 0 24 24")
      }
      fill="currentColor"
      shapeRendering={pixels ? "crispEdges" : undefined}
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path
        d={pixels ?? item.path}
        fillRule={pixels ? undefined : item.fillRule}
      />
    </svg>
  );
}
