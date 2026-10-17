import { type ComponentProps, useId } from "react";
import { siGithub } from "simple-icons";

// Single-color brand icons that size and color like lucide icons.

export function GitHubIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d={siGithub.path} />
    </svg>
  );
}

// LinkedIn's official In bug (brand.linkedin.com) only ships as PNG, so it's
// applied as an alpha mask to take on the text color. The viewBox stops at
// the square, cropping the ® that sits to its right in the artwork.
export function LinkedInIcon(props: ComponentProps<"svg">) {
  const maskId = `linkedin-${useId().replace(/[^\w-]/g, "")}`;
  return (
    <svg viewBox="0 0 779 779" fill="currentColor" aria-hidden="true" {...props}>
      <mask id={maskId} style={{ maskType: "alpha" }}>
        <image href="/brand/linkedin-in-bug.png" width="840" height="779" />
      </mask>
      <rect width="779" height="779" mask={`url(#${maskId})`} />
    </svg>
  );
}
