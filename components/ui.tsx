import type { ReactNode } from "react";

export function Section({
  id,
  title,
  action,
  children,
}: {
  id: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-14 sm:py-20">
      <h2 className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">/</span>
        {title}
        <span className="h-px flex-1 bg-line" />
        {action}
      </h2>
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}

// Language dot colours, roughly GitHub's. Unknown languages fall back to muted.
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00add8",
  Java: "#b07219",
  "C#": "#68217a",
  Python: "#3572a5",
  Dart: "#00b4ab",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Kotlin: "#a97bff",
  PHP: "#4f5d95",
  Shell: "#89e051",
};

export function LangDot({ lang }: { lang: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
      <span
        aria-hidden
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: LANG_COLORS[lang] ?? "var(--color-muted)" }}
      />
      {lang}
    </span>
  );
}

export function StarIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-3 w-3 fill-current"
    >
      <path d="M8 .25l2.29 4.64 5.12.74-3.7 3.61.87 5.1L8 11.93l-4.58 2.41.87-5.1L.59 5.63l5.12-.74L8 .25z" />
    </svg>
  );
}
