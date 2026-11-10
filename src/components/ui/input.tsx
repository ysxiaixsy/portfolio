import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 pixel-frame bg-background [--frame-color:var(--input)] px-2.5 py-1 text-base transition-[box-shadow] duration-150 ease-pixel outline-none motion-reduce:transition-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:[--frame-color:var(--highlight)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:[--frame-color:var(--destructive)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
