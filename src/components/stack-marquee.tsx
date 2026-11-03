import { Marquee } from "@/components/ui/marquee";
import { type StackItem, stacks } from "@/data/tech-stack";

// Black or white logos would vanish in one of the themes, so they follow the
// text colour; every other logo shows its brand colour.
function brandColor({ hex }: StackItem) {
  if (!hex || /^(0{6}|f{6})$/i.test(hex)) return undefined;
  return `#${hex}`;
}

// Every logo from the tech stack, scrolling in a loop. Closes the hero and
// leads into the next section, in place of a separator.
export function StackMarquee() {
  const items = stacks.flatMap((group) => group.items);

  return (
    <Marquee
      pauseOnHover
      aria-label="Tech stack"
      className="border-y py-5 [--duration:50s] [--gap:2.5rem] mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      {items.map((item) => (
        <span
          key={item.title}
          className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground"
        >
          <svg
            viewBox={item.viewBox ?? "0 0 24 24"}
            fill="currentColor"
            aria-hidden="true"
            className="size-7 shrink-0 text-foreground"
            style={{ color: brandColor(item) }}
          >
            <path d={item.path} fillRule={item.fillRule} />
          </svg>
          {item.title}
        </span>
      ))}
    </Marquee>
  );
}
