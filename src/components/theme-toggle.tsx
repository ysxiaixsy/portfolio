"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

// Flips between light and dark. With no saved choice the site follows the OS
// (see themeScript in @/lib/theme), and picking the OS's own theme clears the
// saved choice so it goes back to following the OS.
function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  const system = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  try {
    if (next === system) localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {}
  root.dataset.theme = next;
}

export function ThemeToggle() {
  // Spin only once the visitor has clicked, not on every page load.
  const [animate, setAnimate] = useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        toggleTheme();
        setAnimate(true);
      }}
    >
      {/* CSS picks the icon and label, so they're right before hydration;
          the keyframes live in globals.css. */}
      <span className="grid place-items-center *:col-start-1 *:row-start-1">
        <SunIcon
          className={cn(
            "dark:scale-0 dark:opacity-0",
            animate &&
              "animate-[theme-icon-in_500ms_ease-out] dark:animate-[theme-icon-out_500ms_ease-in_forwards]",
            "motion-reduce:animate-none",
          )}
        />
        <MoonIcon
          className={cn(
            "scale-0 opacity-0 dark:scale-100 dark:opacity-100",
            animate &&
              "animate-[theme-icon-out_500ms_ease-in_forwards] dark:animate-[theme-icon-in_500ms_ease-out]",
            "motion-reduce:animate-none",
          )}
        />
      </span>
      <span className="sr-only dark:hidden">Switch to dark mode</span>
      <span className="sr-only hidden dark:inline">Switch to light mode</span>
    </Button>
  );
}
