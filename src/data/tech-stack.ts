import {
  siC,
  siClaudecode,
  siCss,
  siDart,
  siDocker,
  siExpo,
  siFastapi,
  siFigma,
  siFirebase,
  siFlutter,
  siGit,
  siHtml5,
  siJavascript,
  siMui,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRenpy,
  siRust,
  siShadcnui,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
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

// The logo's brand colour, or undefined to follow the text colour: very dark
// or very light logos would vanish in one of the themes.
export function brandColor({ hex }: { hex?: string }) {
  if (!hex) return undefined;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (luminance < 0.03 || luminance > 0.9) return undefined;
  return `#${hex}`;
}

// Logos come from simple-icons (https://simpleicons.org). To add one, find
// its slug there and import it as `si<Slug>`, e.g. Docker → siDocker. For
// brands it doesn't carry, add a path to stack-icons.ts.
// React Native has no logo of its own in simple-icons, so it uses React's.
const reactNative: StackItem = { ...siReact, title: "React Native" };
// Oracle had Java's logo removed from simple-icons; OpenJDK is Java's
// open-source reference build.
const java: StackItem = { ...siOpenjdk, title: "Java" };
// simple-icons names it by its short name, MUI.
const materialUi: StackItem = { ...siMui, title: "Material UI" };

// Grouped by kind. Keep these in step with the projects' tech lists: anything
// a project of mine leans on belongs here.
export const stacks: { title: string; items: StackItem[] }[] = [
  {
    title: "Languages",
    items: [
      siTypescript,
      siJavascript,
      siPython,
      siRust,
      siC,
      java,
      siDart,
      siPhp,
      siRenpy,
      siHtml5,
      siCss,
    ],
  },
  {
    title: "Frameworks",
    items: [
      siReact,
      reactNative,
      siNextdotjs,
      siNodedotjs,
      siExpo,
      siFlutter,
      siFastapi,
      siTailwindcss,
      siShadcnui,
      materialUi,
    ],
  },
  {
    title: "Data & platforms",
    items: [siPostgresql, siMysql, siSupabase, siFirebase, siVercel],
  },
  {
    title: "Design",
    items: [siFigma, adobeIllustrator, adobePhotoshop],
  },
  {
    title: "Tools",
    items: [siGit, siDocker, siVite, siVitest, siClaudecode, codex],
  },
];
