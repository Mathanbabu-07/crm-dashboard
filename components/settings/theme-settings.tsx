"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Monitor, Moon, Sun } from "lucide-react";

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
      </div>
    );
  }

  return (
    <div className="grid max-w-md grid-cols-3 gap-4">
      <div className="relative">
        <input
          type="radio"
          name="theme"
          value="light"
          id="theme-light"
          className="peer sr-only"
          checked={theme === "light"}
          onChange={() => setTheme("light")}
        />
        <label
          htmlFor="theme-light"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary cursor-pointer text-sm font-medium"
        >
          <Sun className="mb-3 h-6 w-6" />
          Light
        </label>
      </div>
      <div className="relative">
        <input
          type="radio"
          name="theme"
          value="dark"
          id="theme-dark"
          className="peer sr-only"
          checked={theme === "dark"}
          onChange={() => setTheme("dark")}
        />
        <label
          htmlFor="theme-dark"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary cursor-pointer text-sm font-medium"
        >
          <Moon className="mb-3 h-6 w-6" />
          Dark
        </label>
      </div>
      <div className="relative">
        <input
          type="radio"
          name="theme"
          value="system"
          id="theme-system"
          className="peer sr-only"
          checked={theme === "system"}
          onChange={() => setTheme("system")}
        />
        <label
          htmlFor="theme-system"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary cursor-pointer text-sm font-medium"
        >
          <Monitor className="mb-3 h-6 w-6" />
          System
        </label>
      </div>
    </div>
  );
}
