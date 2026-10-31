"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { THEME_STORAGE_KEY } from "@/lib/theme";

// With no saved choice the site follows the OS (see themeScript in @/lib/theme),
// and picking the OS's own theme clears the saved choice so it goes back to
// following the OS.
function applyTheme(next: "light" | "dark") {
  const system = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  try {
    if (next === system) localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {}
  document.documentElement.dataset.theme = next;
}

export function ThemeToggle() {
  return (
    <AnimatedThemeToggler
      onThemeChange={applyTheme}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    />
  );
}
