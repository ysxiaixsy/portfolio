# Design rules

The site should read as one continuous surface: every page and section uses the same container, type scale, accent and motion. When something new needs a style, reuse the pattern below; when no pattern fits, add one here and in a shared component, then use it.

The look is **minimal pixel art**: everything is drawn on a pixel grid (type, frames, rules, icons, logos), on a quiet surface of ink and paper. Anything new earns its place by carrying information, and is drawn in pixels too.

## Pixel art

- One art pixel is `--pixel` (3px). Frames, rules, the focus outline and the press offset are all multiples of it.
- Corners are square (`--radius` is 0). A box that needs an edge (cards, buttons, inputs, badges, alerts, images) takes the `pixel-frame` utility: a notched frame drawn with static shadows in the `frame` colour. Recolour it through `--frame-color`, and keep Tailwind's `ring-*` and `shadow-*` utilities off framed elements, since they replace the frame.
- Blocks you can press or open stand off the page: buttons, cards and the portrait add `pixel-raised`, a hard shadow of the frame's shape one art pixel deep (`--raise-depth`). A press pushes a button down onto it; hovering a card lifts it one more pixel.
- Dividers are dotted pixel rules: `pixel-rule` (top), `pixel-rule-b` (bottom), `pixel-rule-s` (side). `Separator` draws one.
- Icons come from pixelarticons through `src/components/pixel-icons.tsx`, the only place icons are imported. Add a new one there.
- Photos and screenshots stay sharp, as they are; the pixel frame around them carries the style. Raster pixel art, if added, scales by whole multiples (sized in px, not rem) with the `pixelated` utility and `unoptimized`, since image optimisation smooths pixels.
- `npm run pixel-art` (`scripts/pixel-art.mjs`) generates the 16×16 stack logos in `src/data/stack-pixels.ts`. Run it after changing the stack, and commit the output.

## Building blocks

- Build UI from shadcn components (`src/components/ui`, registries in `components.json`) and their variants. Site-level pieces live in `src/components` and compose them.
- Shared styling lives in one place: a component variant, a theme token in `src/app/globals.css`, a class list in `src/lib/styles.ts`, or a shared component such as `SectionHeading` or `MetaLabel`. When two places need the same look, extract it so a change is a one-place edit.
- Colours come from the semantic tokens in `globals.css` (`foreground`, `muted-foreground`, `frame`, `highlight`, …), so light and dark stay in step. Logos and icons (`StackLogo`, the profile icons) follow the text colour.
- Profile links (`site.links` in `src/data/site.ts`) are the single list behind the home page socials, the contact list, the footer icons and the résumé.
- Projects in `src/data/projects.ts` ship their logo or wordmark, stored in this repo, whenever the project has one; without one, the name shows as text. Projects marked `featured` show as cards with their screenshot (`ProjectCard`); the rest are rows in a list (`ProjectRow`). A featured project without a screenshot gets a cover from `ProjectMedia`.

## Accent

Cobalt (`highlight`) is the **signal**: it marks what is active, hovered or focused, so it always means "you are here" or "this responds". At rest, everything is ink and paper.

- A link bigger than a word is a `group` link, and signals the way a game menu marks a selection:
  - A **block** (a project card) takes `signalSurface` from `src/lib/styles.ts` and holds `SelectionCorners`: hovered or focused, it lifts and pixel brackets light its four corners. Its title keeps its own colours, since project names carry brand colours.
  - A **line** (nav links, project rows, contact rows) carries the **menu cursor** (`MenuCursor`), a pixel ▶ in the space to its left, nudging while hovered or focused and standing still beside the current nav link. A row's title takes `signalTitle`.
  - A new link of either kind does the same.
- Inline text links use the `text-link` utility. Buttons signal through their variants in `button.tsx`. Focus is one global rule in `globals.css`: a square outline in the accent, clear of any frame.

## Layout

- Every page, the header and the footer share one content column, the `page-container` utility in `globals.css`, and every section fills its full width. Sizes are in rem, which the root font size scales up on wide screens. To use wide space, split a section into columns (`grid lg:grid-cols-2 gap-16`) rather than narrowing it.
- Home page sections use the `page-section` utility (equal vertical padding, scrolling to just below the header), take the height of their content, and have a `Separator` between each pair.
- Sections open with `SectionHeading`, and their content starts `mt-12` below it.
- Links to a home page section use `SectionLink`, and the header nav lists every section after the hero.

## Type scale

Geist Pixel sets everything except the résumé, which loads Geist on its own page to stay a plain printable document. Geist Pixel has one weight and faux bold is off, so hierarchy comes from size and colour: leave out `font-*` weight classes.

| Role | Classes |
| --- | --- |
| Title (home section heading, page `h1`) | `Title` from `section-heading.tsx` |
| Hero name | the one size above `Title` |
| Project name | `ProjectTitle`: `text-2xl` on cards, `text-xl` in rows |
| Subheading (`h3` inside a section) | `text-2xl tracking-tight` |
| Prose | `text-lg leading-relaxed`; secondary prose adds `text-muted-foreground` |
| Metadata label (Role, Stack, Year) | `MetaLabel` |

## Motion

- Motion moves in whole steps, like a sprite: state changes use `duration-150 ease-pixel` (`steps(3)`), and stop under `motion-reduce`. Page transitions step too (keyframes in `globals.css`).
- Motion and effects stay cheap to draw: animate `transform`, `opacity` and colour, and keep blur, `backdrop-filter`, masks and SVG filters off the page, since they repaint every frame.
- Route changes animate through `transitionTypes`: `nav-forward` going deeper, `nav-back` coming up (`transitionTypesFor` in `src/lib/navigation.ts`). The keyframes live in `globals.css`.

## Done means seen

A UI change is done once you have looked at it in the running app in both themes, at 375px and 1440px wide, with no horizontal scroll and no console errors.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
