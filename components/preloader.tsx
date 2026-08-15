"use client";

import { useEffect, useRef, useState } from "react";
import { STORAGE_KEYS, DOM_IDS, ANIMATION_CONFIG } from "@/lib/constants";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [flying, setFlying] = useState(false);
  const [fadeBg, setFadeBg] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEYS.SESSION_LOADED) === "true") {
        setRemoved(true);
        return;
      }
    } catch {}

    const start = performance.now();
    const duration = ANIMATION_CONFIG.PRELOADER_DURATION_MS;

    const timer = setInterval(() => {
      const elapsed = performance.now() - start;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);
        try {
          sessionStorage.setItem(STORAGE_KEYS.SESSION_LOADED, "true");
        } catch {}

        // Calculate FLIP animation to target navbar brand icon
        setTimeout(() => {
          const navBrand = document.getElementById(DOM_IDS.NAV_BRAND);
          const logoEl = logoRef.current;

          if (navBrand && logoEl) {
            const navRect = navBrand.getBoundingClientRect();
            const logoRect = logoEl.getBoundingClientRect();

            const deltaX = navRect.left + navRect.width / 2 - (logoRect.left + logoRect.width / 2);
            const deltaY = navRect.top + navRect.height / 2 - (logoRect.top + logoRect.height / 2);
            const scale = Math.min(navRect.height / logoRect.height, 0.45);

            setFlyStyle({
              transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`,
              transition: "transform 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 650ms ease",
            });
          } else {
            setFlyStyle({
              transform: "translate3d(-40vw, -40vh, 0) scale(0.45)",
              transition: "transform 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 650ms ease",
            });
          }

          setFlying(true);
          setFadeBg(true);

          setTimeout(() => {
            setRemoved(true);
          }, ANIMATION_CONFIG.PRELOADER_REMOVAL_DELAY_MS);
        }, ANIMATION_CONFIG.PRELOADER_FLIP_DELAY_MS);
      }
    }, ANIMATION_CONFIG.PRELOADER_TICK_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  if (removed) {
    return (
      <div
        id={DOM_IDS.INITIAL_PRELOADER}
        aria-hidden="true"
        suppressHydrationWarning
        className="hidden"
      />
    );
  }

  return (
    <div
      id={DOM_IDS.INITIAL_PRELOADER}
      aria-hidden="true"
      suppressHydrationWarning
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-colors duration-600 ease-out pointer-events-none ${
        fadeBg ? "bg-transparent backdrop-blur-none" : "bg-bg"
      }`}
    >
      {/* Ambient background glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-accent/15 rounded-full blur-3xl pointer-events-none transition-opacity duration-400 ${
          flying ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Brand Logo with Dynamic Flight Animation to Navbar */}
      <div
        ref={logoRef}
        style={flyStyle}
        className="relative z-20 flex flex-col items-center origin-center"
      >
        <div className="font-mono text-3xl font-bold tracking-tight text-text">
          ma
          <span className="relative inline-flex items-center justify-center text-accent">
            .
            <span
              className={`absolute -top-1 -right-1 flex h-2 w-2 transition-opacity duration-300 ${
                flying ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          </span>
        </div>
      </div>

      {/* Minimal Progress Bar & Counter (Fades out when flying starts) */}
      <div
        className={`relative z-10 mt-4 flex flex-col items-center gap-2 transition-all duration-300 ${
          flying ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
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
  );
}
