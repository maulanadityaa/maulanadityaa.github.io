"use client";

import { FaMoon, FaSun } from "react-icons/fa6";
import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const next = saved === "dark" || saved === "light" ? saved : preferred;
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-text hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {theme === "dark" ? <FaSun aria-hidden size={14} /> : <FaMoon aria-hidden size={14} />}
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
