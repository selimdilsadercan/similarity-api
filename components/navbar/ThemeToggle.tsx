"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import Icons from "../common/Icons";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Icons.Sun className="transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Icons.Moon className="absolute transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
      <span className="sr-only ">Toggle theme</span>
    </Button>
  );
}
