"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio_session_loaded";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        setRemoved(true);
        return;
      }
    } catch {}

    const start = performance.now();
    const duration = 650; // ms

    const timer = setInterval(() => {
      const elapsed = performance.now() - start;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);
        try {
          sessionStorage.setItem(STORAGE_KEY, "true");
        } catch {}

        setTimeout(() => {
          setExiting(true);
          setTimeout(() => setRemoved(true), 400);
        }, 100);
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  if (removed) return null;

  return (
    <div
      id="initial-preloader"
      aria-hidden="true"
      suppressHydrationWarning
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg transition-opacity duration-400 ease-out ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-accent/15 rounded-full blur-3xl pointer-events-none" />

      {/* Brand & Progress Matrix */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="font-mono text-3xl font-bold tracking-tight text-text">
          ma
          <span className="relative inline-flex items-center justify-center text-accent">
            .
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-[2px] w-36 overflow-hidden rounded-full bg-line/80">
            <div
              className="h-full bg-accent transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-[11px] font-medium text-muted tracking-widest">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
