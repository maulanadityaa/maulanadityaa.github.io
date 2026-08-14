"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(true);

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative grid h-8 w-16 grid-cols-2 cursor-pointer select-none items-center rounded-full border p-[3px]",
        isDark ? "border-[#4A4A4A] bg-[#282C34]" : "border-[#D5D9E0] bg-[#FFFFFF]",
        className
      )}
      style={{
        transition: "background-color 300ms ease, border-color 300ms ease",
      }}
      onClick={() => setIsDark(!isDark)}
    >
      {/* Mathematically centered active sliding pill */}
      <span
        className={cn(
          "absolute top-[3px] left-[5px] h-6 w-6 rounded-full shadow-sm pointer-events-none",
          isDark ? "bg-[#404F68]" : "bg-[#F3F4F6] border border-[#E2E5EB]"
        )}
        style={{
          transform: isDark ? "translate3d(28px, 0, 0)" : "translate3d(0px, 0, 0)",
          transition: "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 300ms ease",
          willChange: "transform",
        }}
      />

      {/* Sun Icon (Column 1 - Active Amber Gold / Inactive Steel Grey) */}
      <span className="relative z-10 flex h-6 w-full items-center justify-center pointer-events-none">
        <Sun
          className={cn(
            "h-3.5 w-3.5",
            isDark ? "text-[#777777]" : "text-[#F59E0B]"
          )}
          style={{
            transition: "color 300ms ease, transform 300ms ease",
            transform: isDark ? "scale(0.85)" : "scale(1)",
          }}
          strokeWidth={2.25}
        />
      </span>

      {/* Moon Icon (Column 2 - Active Celestial Blue / Inactive Steel Grey) */}
      <span className="relative z-10 flex h-6 w-full items-center justify-center pointer-events-none">
        <Moon
          className={cn(
            "h-3.5 w-3.5",
            isDark ? "text-[#60A5FA]" : "text-[#777777]"
          )}
          style={{
            transition: "color 300ms ease, transform 300ms ease",
            transform: isDark ? "scale(1)" : "scale(0.85)",
          }}
          strokeWidth={2.25}
        />
      </span>
    </button>
  );
}
