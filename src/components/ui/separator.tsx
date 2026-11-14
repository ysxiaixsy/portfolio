"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"

// `rule` is a dotted pixel rule. `dither` is a band of dither across the whole
// window, dividing the home page's sections.
function Separator({
  className,
  orientation = "horizontal",
  variant = "rule",
  ...props
}: SeparatorPrimitive.Props & { variant?: "rule" | "dither" }) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0",
        variant === "rule"
          ? "data-horizontal:pixel-rule data-horizontal:h-(--pixel) data-horizontal:w-full data-vertical:pixel-rule-s data-vertical:w-(--pixel) data-vertical:self-stretch"
          : "h-[calc(var(--pixel)*6)] w-full pixel-dither pixel-bleed",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
