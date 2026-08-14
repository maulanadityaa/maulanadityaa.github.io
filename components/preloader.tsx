"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio_session_loaded";

export function Preloader() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Only run preloader on the first visit of the browser session
    try {
      const hasLoaded = sessionStorage.getItem(STORAGE_KEY);
      if (hasLoaded === "true") {
        return;
      }
    } catch {
      // In case storage is inaccessible
    }

    setLoading(true);

    const start = performance.now();
    const duration = 700; // ms

    const interval = setInterval(() => {
      const elapsed = performance.now() - start;
      const current = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        try {
          sessionStorage.setItem(STORAGE_KEY, "true");
        } catch {}

        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setLoading(false);
          }, 500); // exit fade duration
        }, 120);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg transition-all duration-500 ease-out ${
        exiting ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
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
