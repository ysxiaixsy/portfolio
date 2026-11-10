import type { ComponentProps } from "react";
import type { StackItem } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

// A tech stack logo in the current text colour, the one place it is drawn.
export function StackLogo({
  item,
  className,
  ...props
}: ComponentProps<"svg"> & { item: StackItem }) {
  return (
    <svg
      viewBox={item.viewBox ?? "0 0 24 24"}
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d={item.path} fillRule={item.fillRule} />
    </svg>
  );
}
