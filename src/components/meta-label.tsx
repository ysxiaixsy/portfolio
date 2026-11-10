import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// The small label for metadata such as "Role", "Stack" and "Year".
export function MetaLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
