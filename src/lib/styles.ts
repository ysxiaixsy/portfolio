// Class lists shared by more than one component (see AGENTS.md).

// Something that links somewhere and is bigger than a word: a project card
// or a row in a list. Put it on the element inside a link with the `group`
// class: its border turns to the accent while the link is hovered or
// keyboard-focused.
export const signalSurface =
  "ring-1 ring-border transition-[box-shadow,color] duration-300 ease-out group-hover:ring-highlight group-focus-visible:ring-2 group-focus-visible:ring-highlight motion-reduce:transition-none";

// The title inside such a link: it takes the accent with the border.
export const signalTitle =
  "transition-colors duration-300 ease-out group-hover:text-highlight group-focus-visible:text-highlight motion-reduce:transition-none";
