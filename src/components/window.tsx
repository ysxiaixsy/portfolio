import type { ComponentProps, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { capsLabel, signalSurface } from "@/lib/styles";
import { cn } from "@/lib/utils";

// The corner of a title bar: three squares, the first one gold.
function WindowDots() {
  return (
    <span aria-hidden="true" className="flex shrink-0 gap-(--pixel)">
      <span className="size-[calc(var(--pixel)*3)] bg-gold" />
      <span className="size-[calc(var(--pixel)*3)] bg-background" />
      <span className="size-[calc(var(--pixel)*3)] bg-background" />
    </span>
  );
}

// A game window: a Card in an ink frame under an ink title bar, standing two
// art pixels off the page on a hard shadow. The title names what the window
// holds; `aside` replaces the corner squares (a status, a count).
//
// A window that only holds information casts a neutral shadow. A `linked`
// one sits inside a `group` link: its shadow is gold, and while the link is
// hovered or focused it lifts and the shadow turns to the accent (put
// SelectionCorners inside it too).
export function Window({
  title,
  aside,
  linked,
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Card>, "title"> & {
  title: ReactNode;
  aside?: ReactNode;
  linked?: boolean;
}) {
  return (
    <Card
      className={cn(
        "relative gap-0 py-0 text-base [--frame-color:var(--foreground)] [--raise-depth:calc(var(--pixel)*2)]",
        linked && ["[--frame-shadow:var(--gold)]", signalSurface],
        className,
      )}
      {...props}
    >
      <div
        data-slot="window-bar"
        className={cn(
          "flex min-h-7 items-center justify-between gap-3 bg-foreground px-3 py-1 text-background",
          capsLabel,
        )}
      >
        <span className="truncate">{title}</span>
        {aside ?? <WindowDots />}
      </div>
      {children}
    </Card>
  );
}
