// Class lists shared by more than one component (see AGENTS.md).

// Something that links somewhere and is bigger than a word: a raised block in
// a pixel frame (a project card). Put it on the framed element inside a link
// with the `group` class: while the link is hovered or keyboard-focused, its
// frame turns to the accent and it lifts one more art pixel off the page.
export const signalSurface =
  "transition-[box-shadow,translate] duration-150 ease-pixel group-hover:-translate-(--pixel) group-hover:[--frame-color:var(--highlight)] group-hover:[--raise-depth:calc(var(--pixel)*2)] group-focus-visible:-translate-(--pixel) group-focus-visible:[--frame-color:var(--highlight)] group-focus-visible:[--raise-depth:calc(var(--pixel)*2)] motion-reduce:transition-none";

// The title inside such a link, or a row in a list: it takes the accent.
// Pair it with a MenuCursor beside the title.
export const signalTitle =
  "transition-colors duration-150 ease-pixel group-hover:text-highlight group-focus-visible:text-highlight motion-reduce:transition-none";
