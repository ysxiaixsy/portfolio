import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// The small uppercase label used for metadata such as "Role" and "Stack".
export function MonoLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "font-mono text-xs tracking-wider text-muted-foreground uppercase",
        className,
      )}
      {...props}
    />
  );
}
