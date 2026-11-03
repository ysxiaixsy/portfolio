# Design rules

The site should read as one continuous surface: every page and section uses the same container, type scale, accent and motion. When something new needs a style, reuse the pattern below; when no pattern fits, add one here and in a shared component, then use it.

## Building blocks

- Build UI from shadcn components (`src/components/ui`, registries in `components.json`) and their variants. Site-level pieces live in `src/components` and compose them.
- Shared styling lives in one place: a component variant, a theme token in `src/app/globals.css`, or a shared component such as `SectionHeading` or `MonoLabel`. When two places need the same look, extract it so a change is a one-place edit.
- Colours come from the semantic tokens in `globals.css` (`foreground`, `muted-foreground`, `border`, `highlight`, …), so light and dark stay in step.
- Every project in `src/data/projects.ts` ships its logo or wordmark, stored in this repo.

## Accent

Orange (`highlight`) is the **signal**: it marks what is active, hovered or focused, so it always means "you are here" or "this responds".

- Interactive surfaces (cards, the active nav tab) signal with `ring-highlight` and `shadow-glow`. Cards rest at `ring-2 ring-foreground/15` and move to `ring-3 ring-highlight/60 shadow-glow` on hover and focus.
- Text links are `underline underline-offset-4` and turn `text-highlight` on hover and focus. Buttons and footer links signal the same way, through their variants.
- Outside interaction, orange appears only in the role line and the hero's dither field.

## Layout

- Every page shares the container in `src/app/layout.tsx` (`max-w-5xl px-6`), and every section fills its full width. To use wide space, split a section into columns (`grid lg:grid-cols-2 gap-16`) rather than narrowing it.
- Home page sections sit `gap-20` apart with a `Separator` between each, and open with `SectionHeading`, numbered in page order. The section's content starts `mt-10` below the heading.
- Links to a home page section use `SectionLink`, and the nav tabs list every section.

## Type scale

| Role | Classes |
| --- | --- |
| Title (home section heading, page `h1`) | `text-4xl font-semibold tracking-tight sm:text-5xl` |
| Subheading (`h3` inside a section) | `text-2xl font-semibold tracking-tight` |
| Card title | `text-xl` |
| Prose | `text-lg leading-relaxed`; secondary prose adds `text-muted-foreground` |
| Metadata label (Role, Stack, Year, section numbers) | `MonoLabel` |

## Motion

- State changes ease with `duration-300 ease-out` and stop under `motion-reduce`.
- Route changes animate through `transitionTypes`: `nav-forward` going deeper, `nav-back` coming up (`transitionTypesFor` in `src/lib/navigation.ts`). The keyframes live in `globals.css`.

## Done means seen

A UI change is done once you have looked at it in the running app in both themes, at 375px and 1440px wide, with no horizontal scroll and no console errors.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
