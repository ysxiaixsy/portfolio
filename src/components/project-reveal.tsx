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
      <div className="relative">
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
              !open && "blur-[3px]",
            )}
          >
            {children}
          </div>
        </motion.div>

        {!open && (
          <div className="absolute inset-0 flex items-end justify-center bg-linear-to-b from-transparent from-10% via-background/40 to-background pb-4">
            <Button
              variant="outline"
              size="lg"
              aria-expanded={false}
              aria-controls={id}
              onClick={() => setOpen(true)}
            >
              See all {total} projects
              <ChevronDownIcon data-icon="inline-end" />
            </Button>
          </div>
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
