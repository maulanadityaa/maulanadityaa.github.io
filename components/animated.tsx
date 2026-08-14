"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export function RevealSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function ScrollReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "60px" }
    );

    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      el.classList.add("reveal-on-scroll");
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerList({
  children,
  className = "",
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  selector?: string;
}) {
  return <Component className={className}>{children}</Component>;
}