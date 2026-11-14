"use client";

import { MoonIcon, SunIcon } from "@/components/pixel-icons";
import { Button } from "@/components/ui/button";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

// With no saved choice the site follows the OS (see themeScript in @/lib/theme),
// and picking the OS's own theme clears the saved choice so it goes back to
// following the OS.
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

// The icon shows the theme a click switches to. CSS picks it from data-theme,
// so the button renders the same on the server and the client.
export function ThemeToggle({ className }: { className?: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className={cn("text-muted-foreground", className)}
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </Button>
  );
}
