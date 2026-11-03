import { cn } from "@/lib/utils";
import { brandColor, type StackItem } from "@/data/tech-stack";

// A tech stack logo in its brand colour, the one place it is drawn, so the
// carousel and the About section always match.
export function StackLogo({
  item,
  className,
}: {
  item: StackItem;
  className?: string;
}) {
  return (
    <svg
      viewBox={item.viewBox ?? "0 0 24 24"}
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0 text-foreground", className)}
      style={{ color: brandColor(item) }}
    >
      <path d={item.path} fillRule={item.fillRule} />
    </svg>
  );
}
