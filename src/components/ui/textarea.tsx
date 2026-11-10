import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full pixel-frame bg-background [--frame-color:var(--input)] px-2.5 py-2 text-base transition-[box-shadow] duration-150 ease-pixel outline-none motion-reduce:transition-none placeholder:text-muted-foreground focus-visible:[--frame-color:var(--highlight)] disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:[--frame-color:var(--destructive)]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
