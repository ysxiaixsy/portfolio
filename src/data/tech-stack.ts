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
  // The brand colour as six hex digits (simple-icons supplies it). Black and
  // white brands, and items without one, follow the text colour instead.
  hex?: string;
};

// The logo's brand colour, or undefined to follow the text colour: black or
// white logos would vanish in one of the themes.
export function brandColor({ hex }: { hex?: string }) {
  // Near-black and near-white brands (GitHub's 181717, say) count as black
  // and white.
  if (
    !hex ||
    /^(0|1)[0-9a-f](0|1)[0-9a-f](0|1)[0-9a-f]$|^(f|e)[0-9a-f](f|e)[0-9a-f](f|e)[0-9a-f]$/i.test(
      hex,
    )
  )
    return undefined;
  return `#${hex}`;
}

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
