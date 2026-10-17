import { ViewTransition } from "react";

// Slide in the direction of the link's transition type; crossfade otherwise
// (untyped links, browser back/forward). Animations live in globals.css.
const animations = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "page-fade",
};

// Wrap each page's root element. Layouts persist across navigations, so the
// enter/exit animations only fire when this sits in a page.
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={animations} exit={animations} default="none">
      {children}
    </ViewTransition>
  );
}
