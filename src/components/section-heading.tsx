import type { ReactNode } from "react";
import { MonoLabel } from "@/components/mono-label";

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
      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {children}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
