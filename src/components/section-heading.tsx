import type { ComponentProps, ReactNode } from "react";
import { MonoLabel } from "@/components/mono-label";
import { cn } from "@/lib/utils";

// The title size every top-level heading shares: home page sections and the
// h1 of other pages, so the two always match.
export function Title({
  as: Tag = "h2",
  className,
  ...props
}: ComponentProps<"h2"> & { as?: "h1" | "h2" }) {
  return (
    <Tag
      className={cn(
        "text-4xl font-semibold tracking-tight sm:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

// The heading that opens each section of the home page, numbered in order.
export function SectionHeading({
  index,
  children,
  description,
}: {
  index: number;
  children: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <MonoLabel>{String(index).padStart(2, "0")}</MonoLabel>
      <Title>{children}</Title>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
