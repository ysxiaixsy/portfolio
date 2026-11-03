# Design rules

The site should read as one continuous surface: every page and section uses the same container, type scale, accent and motion. When something new needs a style, reuse the pattern below; when no pattern fits, add one here and in a shared component, then use it.

## Building blocks

- Build UI from shadcn components (`src/components/ui`, registries in `components.json`) and their variants. Site-level pieces live in `src/components` and compose them.
- Shared styling lives in one place: a component variant, a theme token in `src/app/globals.css`, or a shared component such as `SectionHeading` or `MonoLabel`. When two places need the same look, extract it so a change is a one-place edit.
- Colours come from the semantic tokens in `globals.css` (`foreground`, `muted-foreground`, `border`, `highlight`, …), so light and dark stay in step. Brand logos are the one exception: the stack carousel shows each logo in its brand colour (`hex` in `src/data/tech-stack.ts`), with black and white brands following the text colour.
- Profile links (`site.links` in `src/data/site.ts`) are the single list behind the home page socials, the footer icons and the résumé.
- Every project in `src/data/projects.ts` ships its logo or wordmark, stored in this repo.

## Accent

Orange (`highlight`) is the **signal**: it marks what is active, hovered or focused, so it always means "you are here" or "this responds".

- Interactive surfaces signal with `ring-highlight` and `shadow-glow`. A card that links somewhere (project cards, contact cards) takes `signalSurface` from `src/lib/styles.ts` inside a `group` link; the active nav tab glows the same way.
- Inline text links use the `text-link` utility. Buttons signal through their variants in `button.tsx`, and focus rings through the `--ring` token, which is the accent.
- Outside interaction, orange appears only in the role line and the hero's dither field.

## Layout

- Every page, the header and the footer share one content column, the `page-container` utility in `globals.css`, and every section fills its full width. Sizes are in rem, which the root font size scales up on wide screens. To use wide space, split a section into columns (`grid lg:grid-cols-2 gap-16`) rather than narrowing it.
- Each home page section is at least one screen tall (`min-h-page`, `py-20`, content centred) and scrolls to just below the header (`scroll-mt-(--header-height)`). The hero's screen ends with the tech stack carousel, which leads into Projects; every later pair of sections has a `Separator` between them.
- Sections open with `SectionHeading`, numbered in page order, and their content starts `mt-10` below it.
- Links to a home page section use `SectionLink`, and the nav tabs list every section.

## Type scale

| Role | Classes |
| --- | --- |
| Title (home section heading, page `h1`) | `Title` from `section-heading.tsx` |
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
