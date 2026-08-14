"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Navigasi maju (ke /projects): meluncur dari Kanan (x: +48px)
      // Navigasi mundur (ke /): meluncur dari Kiri (x: -48px)
      const isRoot = pathname === "/";
      const initialX = isRoot ? -48 : 48;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          x: initialX,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    },
    { scope: containerRef, dependencies: [pathname] }
  );

  return (
    <div ref={containerRef} className="overflow-x-hidden">
      {children}
    </div>
  );
}
