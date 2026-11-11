import Image from "next/image";
import { Toggle } from "@/components/ui/toggle";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// The hero portrait: me as pixel art at rest, flipping to the real photo
// while hovered, or when pressed (a tap, a click, or Space). The pixel art
// is 128px, shown at whole multiples: 1× on phones, 2× from lg, 3× from xl.
export function PortraitSwap({ className }: { className?: string }) {
  const art = site.pixelPortrait;
  // The photo sits over the art and shows in stepped frames.
  const photoShown =
    "opacity-0 transition-opacity duration-150 ease-pixel group-hover/toggle:opacity-100 group-aria-pressed/toggle:opacity-100 motion-reduce:transition-none";

  return (
    <Toggle
      variant="portrait"
      size="content"
      aria-label="Show my photo"
      className={cn(
        "relative size-[128px] overflow-hidden bg-muted lg:size-[256px] xl:size-[384px]",
        className,
      )}
    >
      <Image
        src={art.src}
        alt=""
        width={art.size}
        height={art.size}
        unoptimized
        preload
        className="absolute inset-0 size-full pixelated"
      />
      {site.photo && (
        <Image
          src={site.photo}
          alt=""
          width={957}
          height={960}
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 256px, 128px"
          // Loaded up front, so the first flip is instant.
          loading="eager"
          className={cn(
            "absolute inset-0 size-full object-cover",
            photoShown,
          )}
        />
      )}
    </Toggle>
  );
}
