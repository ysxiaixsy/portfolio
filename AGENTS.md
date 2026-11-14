# Design rules

The site should read as one continuous surface: every page and section uses the same container, type scale, accent and motion. When something new needs a style, reuse the pattern below; when no pattern fits, add one here and in a shared component, then use it.

The look is **a pixel-art game interface**: everything is drawn on a pixel grid (type, frames, rules, icons, logos) and laid out like a game's menus: a HUD bar, windows with title bars, a character sheet, a quest log, an inventory. It is meant to be bold. Game terms label real facts (a quest is a project, the level is my year), so nothing on a sheet is invented. Scenery (the skyline, the checkered floor, dither) is welcome when it is drawn in pixels, hidden from assistive tech and cheap to draw.

## Pixel art

- One art pixel is `--pixel` (3px). Frames, rules, the focus outline and the press offset are all multiples of it.
- Corners are square (`--radius` is 0). A box that needs an edge (cards, buttons, inputs, badges, alerts, images) takes the `pixel-frame` utility: a notched frame drawn with static shadows in the `frame` colour. Recolour it through `--frame-color`, and keep Tailwind's `ring-*` and `shadow-*` utilities off framed elements, since they replace the frame.
- Blocks you can press stand off the page on a **gold** hard shadow: buttons and the portrait add `pixel-raised`, a shadow of the frame's shape one art pixel deep (`--raise-depth`), and a press pushes them down onto it. Gold under a block means it responds.
- A `Window` (`src/components/window.tsx`) is the site's panel: a `Card` in an ink frame under an ink title bar, two art pixels off the page. One that only holds information (the hero sheet, `NowPanel`, the contact form) casts the neutral `frame-shadow`. A `linked` one (`ProjectCard`) casts gold, and lifts onto the accent while hovered or focused. The title bar names what the window holds; its corner holds three squares, or a status or count passed as `aside`.
- `--frame-color`, `--frame-size` and `--raise-depth` do not inherit (they are registered in `globals.css`), so set them on the framed element itself.
- Dividers are dotted pixel rules: `pixel-rule` (top), `pixel-rule-b` (bottom), `pixel-rule-s` (side). `Separator` draws one.
- Patterns: `pixel-dither` (a checkerboard one art pixel fine, half ink) and `pixel-checker` (the muted floor behind the hero). Add `pixel-bleed` to stretch either across the whole window while the content stays in the column. `Separator` with `variant="dither"` is the band between home page sections.
- Icons come from pixelarticons through `src/components/pixel-icons.tsx`, the only place icons are imported. Add a new one there.
- Photos and screenshots stay sharp, as they are; the pixel frame around them carries the style. The hero portrait is the one swap: `PortraitSwap` shows the pixel portrait at rest and flips to the real photo while hovered or when pressed (a `Toggle` with the `portrait` variant). Raster pixel art, if added, scales by whole multiples (sized in px, not rem) with the `pixelated` utility and `unoptimized`, since image optimisation smooths pixels.
- `npm run pixel-art` (`scripts/pixel-art.mjs`) generates the 16×16 stack logos in `src/data/stack-pixels.ts`. Run it after changing the stack, and commit the output.
- `npm run pixel-portrait` (`scripts/pixel-portrait.mjs`) draws `public/pixel-portrait.png`, the photo as 128×128 pixel art on a hand-picked palette, with hand-drawn eyes and a transparent background that the page fills with one theme colour (`bg-muted`). It shows at whole multiples in the hero (1×, 2×, 3×) and on the 404 page (2×). It cuts the figure out with `scripts/portrait-mask.png`, so a new photo needs a new mask. Run it after changing the photo, and commit the output.
- `npm run favicon` (`scripts/favicon.mjs`) draws `icon.svg`, `favicon.ico` and `apple-icon.png` in `src/app` from one 16×16 grid: JP in Geist Pixel strokes, paper on an ink tile with notched corners. Edit the grid there, run it, and commit the output.

## Building blocks

- Build UI from shadcn components (`src/components/ui`, registries in `components.json`) and their variants. Site-level pieces live in `src/components` and compose them.
- Shared styling lives in one place: a component variant, a theme token in `src/app/globals.css`, a class list in `src/lib/styles.ts`, or a shared component such as `SectionHeading` or `MetaLabel`. When two places need the same look, extract it so a change is a one-place edit.
- Colours come from the semantic tokens in `globals.css` (`foreground`, `muted-foreground`, `frame`, `highlight`, …), so light and dark stay in step. Logos and icons (`StackLogo`, the profile icons) follow the text colour.
- Profile links (`site.links` in `src/data/site.ts`) are the single list behind the home page socials, the contact list, the footer icons and the résumé.
- The hero is a character sheet in a `Window`: the portrait over a level plate, the name, then Class, Guild, Base and Status rows and three stats, all from `site` (`src/data/site.ts`). Each stat links to the project it comes from.
- A project is a quest: `projectNumber` gives its number and `StatusBadge` its status (Live, In progress or Complete, worked out by `projectStatus` in `src/data/projects.ts`). A stack is a row of chips, `TechList`.
- A project page is a case study, from `story` in `src/data/projects.ts`: Overview, What I did, Key decisions (numbered on gold plates), Where it stands, then the next quest as a `ProjectRow`. Its details sit in a `Window` rail that follows the scroll. Keep each part to facts the project can back up.
- Projects in `src/data/projects.ts` ship their logo or wordmark, stored in this repo, whenever the project has one; without one, the name shows as text. Projects marked `featured` show as cards with their screenshot (`ProjectCard`); the rest are rows in a list (`ProjectRow`). A featured project without a screenshot gets a cover from `ProjectMedia`.

## Accent

Two colours, with separate jobs. Cobalt (`highlight`) is the **signal**: it marks what is active, hovered or focused, so it always means "you are here" or "this responds". Gold is the colour **at rest**: the hard shadow under anything you can press or open, the hero name's drop shadow, name plates, marks and work in progress. Green (`success`) only ever means live. Gold and green carry ink text in both themes (`gold-foreground`, `success-foreground`).

- The header is the HUD, an ink bar, and window title bars are ink too. What sits on them is paper, and their signal is `highlight-inverse`. The current nav link is the selected menu item: a paper chip with the cursor in it.

- A link bigger than a word is a `group` link, and signals the way a game menu marks a selection:
  - A **block** (a project card) is a `linked` `Window`, which takes `signalSurface` from `src/lib/styles.ts`, and holds `SelectionCorners`: hovered or focused, it lifts, its shadow turns from gold to cobalt and pixel brackets light its four corners. Its title keeps its own colours, since project names carry brand colours.
  - A **line** (nav links, project rows, contact rows) carries the **menu cursor** (`MenuCursor`), a pixel ▶ in the space to its left, nudging while hovered or focused and standing still beside the current nav link. A row's title takes `signalTitle`.
  - A new link of either kind does the same.
  - A list of line links is a `MenuList` (`src/components/menu-list.tsx`): the arrow keys move focus, and the cursor, through it like a game menu, while Tab still works as usual.
- A grid of things to inspect rather than open (the stack) is an inventory: `ToggleGroup` with the `slot` variant and size, one selection across the whole inventory, and the hovered, focused or picked item read out beside its group label. At rest no slot is lit. The picked item is described in the Item window under the inventory: its kind, and the projects that list it in their stack.
- A live status (the availability dot) blinks in the accent with `animate-blink` (in `highlight-inverse` on the HUD).
- Inline text links use the `text-link` utility. Buttons signal through their variants in `button.tsx`. Focus is one global rule in `globals.css`: a square outline in the accent, clear of any frame.

## Layout

- Every page, the header and the footer share one content column, the `page-container` utility in `globals.css`, and every section fills its full width. Sizes are in rem, which the root font size scales up on wide screens. To use wide space, split a section into columns (`grid lg:grid-cols-2 gap-16`) rather than narrowing it.
- Home page sections use the `page-section` utility (equal vertical padding, scrolling to just below the header), take the height of their content, and have a dither `Separator` between each pair.
- `<main>` spans the window and clips sideways, so `pixel-bleed` bands never cause horizontal scroll.
- Sections open with `SectionHeading`, and their content starts `mt-12` below it. Its `eyebrow` is the section's name in the game ("Quest log"), over the plain title ("Projects").
- The first focusable element on every page is the skip link in the layout. The footer opens with `Skyline`, a strip of scenery that follows the theme: day in light, night in dark.
- Links to a home page section use `SectionLink`, and the header nav lists every section after the hero.

## Type scale

Geist Pixel sets everything except the résumé, which loads Geist on its own page to stay a plain printable document. Geist Pixel has one weight and faux bold is off, so hierarchy comes from size and colour: leave out `font-*` weight classes.

| Role | Classes |
| --- | --- |
| Title (home section heading, page `h1`) | `Title` from `section-heading.tsx` |
| Hero name | poster size, with `pixel-title-shadow` |
| Project name | `ProjectTitle`: `text-2xl` on cards, `text-xl` in rows |
| Subheading (`h3` inside a section) | `text-2xl tracking-tight` |
| Prose | `text-lg leading-relaxed`; secondary prose adds `text-muted-foreground` |
| Metadata label (Role, Stack, Year) | `MetaLabel` |
| Small caps label (window titles, eyebrows, sheet rows) | `capsLabel` from `src/lib/styles.ts` |

## Motion

- Motion moves in whole steps, like a sprite: state changes use `duration-150 ease-pixel` (`steps(3)`), and stop under `motion-reduce`. Page transitions step too (keyframes in `globals.css`).
- Looping scenery (`animate-march`, `animate-drift`, `animate-walk`, `animate-blink`) only translates or blinks, in steps, and stops under `motion-reduce`.
- Motion and effects stay cheap to draw: animate `transform`, `opacity` and colour, and keep blur, `backdrop-filter`, masks and SVG filters off the page, since they repaint every frame.
- Route changes animate through `transitionTypes`: `nav-forward` going deeper, `nav-back` coming up (`transitionTypesFor` in `src/lib/navigation.ts`). The keyframes live in `globals.css`.

## Weight

The home page has a size budget. `npm run size` (`scripts/size.mjs`), run after `npm run build`, prints its gzipped HTML, CSS, JS and fonts, and fails past the budget set in that file. When a change needs more, raise the number in the same commit and say why.

- Only what is on screen when the page opens loads eagerly. The hidden photo in `PortraitSwap` and the home page's project screenshots load lazily.
- Data a client component imports ships to the browser. Draw it on the server and pass the elements in, as `TechStack` does for `StackInventory`.
- A font used for one word does not preload (`ProjectName`).

## Done means seen

A UI change is done once you have looked at it in the running app in both themes, at 375px and 1440px wide, with no horizontal scroll and no console errors, and `npm run size` passes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
