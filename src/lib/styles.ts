// Class lists shared by more than one component (see AGENTS.md).

// Something that links somewhere and is bigger than a word, in a pixel frame
// (a project card). Put it on the framed element inside a link with the
// `group` class: its frame turns to the accent while the link is hovered or
// keyboard-focused.
export const signalSurface =
  "transition-[box-shadow] duration-150 ease-pixel group-hover:[--frame-color:var(--highlight)] group-focus-visible:[--frame-color:var(--highlight)] motion-reduce:transition-none";

// The title inside such a link, or a row in a list: it takes the accent.
export const signalTitle =
  "transition-colors duration-150 ease-pixel group-hover:text-highlight group-focus-visible:text-highlight motion-reduce:transition-none";
