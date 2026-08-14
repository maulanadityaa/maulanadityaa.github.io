"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "portfolio-theme";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const toggle = () => {
    const current = document.documentElement.dataset.theme;
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      className={cn(
        "group/theme relative grid h-8 w-16 grid-cols-2 cursor-pointer select-none items-center rounded-full border p-[3px] transition-colors duration-300",
        "border-[#D5D9E0] bg-[#FFFFFF] dark:border-[#4A4A4A] dark:bg-[#282C34]",
        className
      )}
      onClick={toggle}
    >
      {/* Sliding Pill - Driven entirely by CSS to guarantee 0 hydration mismatches */}
      <span
        className={cn(
          "absolute top-[3px] left-[5px] h-6 w-6 rounded-full shadow-sm pointer-events-none transition-transform duration-300 ease-out",
          "border border-[#E2E5EB] bg-[#F3F4F6] translate-x-0",
          "dark:border-transparent dark:bg-[#404F68] dark:translate-x-[28px]"
        )}
      />

      {/* Sun Icon */}
      <span className="relative z-10 flex h-6 w-full items-center justify-center pointer-events-none">
        <Sun
          className="h-3.5 w-3.5 text-[#F59E0B] scale-100 transition-all duration-300 dark:text-[#777777] dark:scale-85"
          strokeWidth={2.25}
        />
      </span>

      {/* Moon Icon */}
      <span className="relative z-10 flex h-6 w-full items-center justify-center pointer-events-none">
        <Moon
          className="h-3.5 w-3.5 text-[#777777] scale-85 transition-all duration-300 dark:text-[#60A5FA] dark:scale-100"
          strokeWidth={2.25}
        />
      </span>
    </button>
  );
}