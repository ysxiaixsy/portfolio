import type { ComponentProps, ReactNode } from "react";
import { capsLabel } from "@/lib/styles";
import { cn } from "@/lib/utils";

// The title every top-level heading shares, set in the pixel face: home page
// sections and the h1 of other pages, so the two always match.
export function Title({
  as: Tag = "h2",
  className,
  ...props
}: ComponentProps<"h2"> & { as?: "h1" | "h2" }) {
  return (
    <Tag
      className={cn(
        " text-4xl leading-none tracking-tight sm:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

// The heading that opens each section of the home page. The eyebrow is the
// section's name in the game: a small label over the title, behind a gold
// mark.
export function SectionHeading({
  children,
  eyebrow,
  description,
}: {
  children: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      {eyebrow && (
        <p
          className={cn(
            "flex items-center gap-2 text-muted-foreground",
            capsLabel,
          )}
        >
          <span
            aria-hidden="true"
            className="size-[calc(var(--pixel)*3)] bg-gold"
          />
          {eyebrow}
        </p>
      )}
      <Title>{children}</Title>
      {description && (
        <p className="text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
