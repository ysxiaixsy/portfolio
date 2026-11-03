import { StackLogo } from "@/components/stack-logo";
import { Marquee } from "@/components/ui/marquee";
import { stacks } from "@/data/tech-stack";

// Every logo from the tech stack, scrolling in a loop. Closes the hero and
// leads into the next section, in place of a separator.
export function StackMarquee() {
  const items = stacks.flatMap((group) => group.items);

  return (
    <Marquee
      pauseOnHover
      aria-label="Tech stack"
      className="border-y py-8 [--duration:60s] [--gap:3.5rem] mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      {items.map((item) => (
        <span
          key={item.title}
          className="flex items-center gap-3 text-lg font-medium text-muted-foreground"
        >
          <StackLogo item={item} className="size-11" />
          {item.title}
        </span>
      ))}
    </Marquee>
  );
}
