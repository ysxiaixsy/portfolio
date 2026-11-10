"use client";

import { ArrowUpIcon } from "@/components/pixel-icons";
import { Button } from "@/components/ui/button";

// Scrolls the current page back to its top; smooth unless reduced motion is
// on (see the scroll-behavior rule in globals.css).
export function BackToTop() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground"
      onClick={() => window.scrollTo(0, 0)}
    >
      <ArrowUpIcon data-icon="inline-start" />
      Back to top
    </Button>
  );
}
