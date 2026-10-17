import {
  siClaudecode,
  siFigma,
  siGit,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { adobeIllustrator, adobePhotoshop, codex } from "@/data/stack-icons";

// A single-color logo path. simple-icons entries fit as-is (24×24, nonzero).
export type StackItem = {
  title: string;
  path: string;
  viewBox?: string;
  fillRule?: "evenodd";
};

// Logos come from simple-icons (https://simpleicons.org). To add one, find
// its slug there and import it as `si<Slug>`, e.g. Docker → siDocker. For
// brands it doesn't carry, add a path to stack-icons.ts.
export const stacks: { title: string; items: StackItem[] }[] = [
  {
    title: "Development",
    items: [
      siTypescript,
      siJavascript,
      siPython,
      siReact,
      siNextdotjs,
      siNodedotjs,
      siTailwindcss,
      siPostgresql,
    ],
  },
  {
    title: "Design",
    items: [siFigma, adobeIllustrator, adobePhotoshop],
  },
  {
    title: "Tools",
    items: [siGit, siClaudecode, codex],
  },
];
