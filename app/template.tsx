"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MEDIA_QUERIES, ANIMATION_CONFIG } from "@/lib/constants";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia(MEDIA_QUERIES.REDUCED_MOTION).matches) return;

      // Navigasi maju (ke /projects): meluncur dari Kanan (x: +48px)
      // Navigasi mundur (ke /): meluncur dari Kiri (x: -48px)
      const isRoot = pathname === "/";
      const initialX = isRoot
        ? -ANIMATION_CONFIG.PAGE_TRANSITION_OFFSET_PX
        : ANIMATION_CONFIG.PAGE_TRANSITION_OFFSET_PX;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          x: initialX,
        },
        {
          opacity: 1,
          x: 0,
          duration: ANIMATION_CONFIG.PAGE_TRANSITION_DURATION_SECONDS,
          ease: ANIMATION_CONFIG.PAGE_TRANSITION_EASE,
          clearProps: "all",
        }
      );
    },
    { scope: containerRef, dependencies: [pathname] }
  );

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
