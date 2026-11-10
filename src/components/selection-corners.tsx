import { cn } from "@/lib/utils";

// Where each bracket sits, how it turns, and which way it breathes.
const corners = [
  { place: "top-0 left-0", turn: "", nudge: "[--nudge-x:calc(var(--pixel)*-1)] [--nudge-y:calc(var(--pixel)*-1)]" },
  { place: "top-0 right-0", turn: "rotate-90", nudge: "[--nudge-x:var(--pixel)] [--nudge-y:calc(var(--pixel)*-1)]" },
  { place: "right-0 bottom-0", turn: "rotate-180", nudge: "[--nudge-x:var(--pixel)] [--nudge-y:var(--pixel)]" },
  { place: "bottom-0 left-0", turn: "-rotate-90", nudge: "[--nudge-x:calc(var(--pixel)*-1)] [--nudge-y:var(--pixel)]" },
];

// The game-menu selection for a block: pixel brackets on its four corners,
// just outside its frame, in the accent. Like MenuCursor, they show while
// the `group` link around the block is hovered or keyboard-focused, and
// breathe outward. Put it inside a `relative` block.
export function SelectionCorners() {
  return (
    <span
      aria-hidden="true"
      // Clear of the frame by one art pixel: frame, gap, then the bracket.
      className="pointer-events-none absolute -inset-[calc(var(--pixel)*3)]"
    >
      {corners.map(({ place, turn, nudge }) => (
        <span key={place} className={cn("absolute", place, nudge)}>
          <svg
            viewBox="0 0 4 4"
            fill="currentColor"
            shapeRendering="crispEdges"
            className={cn(
              // One art pixel per --pixel, so the arms match the frame.
              "size-[calc(var(--pixel)*4)] text-highlight opacity-0",
              "group-hover:animate-corner-nudge group-hover:opacity-100 group-focus-visible:animate-corner-nudge group-focus-visible:opacity-100 motion-reduce:animate-none",
              turn,
            )}
          >
            <path d="M0 0h4v1H1v3H0z" />
          </svg>
        </span>
      ))}
    </span>
  );
}
