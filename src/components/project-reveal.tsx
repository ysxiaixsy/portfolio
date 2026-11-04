"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// How much of the hidden projects shows while collapsed: the top of the next
// row, enough to read as "there's more".
const PEEK = "10rem";

// The projects past the featured ones: a blurred peek with a "See all"
// button, opening to the full grid. While collapsed the peek is inert, so
// keyboard and screen reader users skip it.
export function ProjectReveal({
  total,
  children,
}: {
  total: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  // Overflow clips the cards' hover glow, so it lifts once fully open.
  const [settled, setSettled] = useState(false);
  const reduceMotion = useReducedMotion();
  const id = useId();
  const root = useRef<HTMLDivElement>(null);

  function collapse() {
    setOpen(false);
    setSettled(false);
    // Back to the top of Projects, so the reader isn't left far below it.
    root.current?.closest("section")?.scrollIntoView({ block: "start" });
  }

  return (
    <div ref={root} className="mt-4">
      <div className="group/peek relative">
        <motion.div
          id={id}
          initial={false}
          animate={{ height: open ? "auto" : PEEK }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          }
          onAnimationComplete={() => setSettled(open)}
          inert={!open}
          className={cn(!(open && settled) && "overflow-hidden")}
        >
          <div
            className={cn(
              "transition-[filter] duration-300 ease-out motion-reduce:transition-none",
              // Hovering the peek eases the blur, hinting at what opens.
              !open && "blur-[3px] group-hover/peek:blur-[1.5px]",
            )}
          >
            {children}
          </div>
        </motion.div>

        {!open && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent from-10% via-background/40 to-background"
            />
            {/* On hover or focus, accent light rises from the bottom edge,
                even across the full width so the sides read as clickable. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover/peek:opacity-100 group-has-focus-visible/peek:opacity-100 motion-reduce:transition-none"
            >
              {/* The light rising off the line. */}
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-highlight/20 via-highlight/5 to-transparent" />
              {/* The source: a glowing line along the bottom edge. */}
              <div className="absolute inset-x-6 bottom-0 h-0.5 rounded-full bg-highlight shadow-glow" />
            </div>
            {/* The whole peek is the button, as wide as both columns: click
                anywhere on the blurred cards to open them. */}
            <Button
              variant="ghost"
              aria-expanded={false}
              aria-controls={id}
              onClick={() => setOpen(true)}
              className="absolute inset-0 h-full w-full items-end rounded-xl pb-6 text-base hover:bg-transparent dark:hover:bg-transparent"
            >
              See all {total} projects
              <ChevronDownIcon data-icon="inline-end" />
            </Button>
          </>
        )}
      </div>

      {open && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            aria-expanded
            aria-controls={id}
            onClick={collapse}
          >
            Show fewer
            <ChevronUpIcon data-icon="inline-end" />
          </Button>
        </div>
      )}
    </div>
  );
}
