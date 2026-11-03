import { cn } from "@/lib/utils";

// The JP mark from the favicon, masked so it takes the text colour and stays
// visible in both themes.
export function SiteMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block size-7 shrink-0 bg-current mask-[url(/brand/jp-mark.png)] mask-contain mask-center mask-no-repeat",
        className,
      )}
    />
  );
}
