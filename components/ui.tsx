import type { ComponentType, ReactNode } from "react";
import { FaLinkedin } from "react-icons/fa6";
import {
  SiCss,
  SiDart,
  SiDocker,
  SiDotnet,
  SiGithub,
  SiGnubash,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiPhp,
  SiPython,
  SiReact,
  SiRust,
  SiTypescript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscCode, VscStarFull } from "react-icons/vsc";

type TechIcon = ComponentType<{
  size?: string | number;
  className?: string;
}>;

const TECH_ICONS: Record<string, TechIcon> = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Go: SiGo,
  Java: FaJava,
  "C#": SiDotnet,
  Python: SiPython,
  Dart: SiDart,
  HTML: SiHtml5,
  CSS: SiCss,
  Kotlin: SiKotlin,
  PHP: SiPhp,
  Rust: SiRust,
  Docker: SiDocker,
  React: SiReact,
  Shell: SiGnubash,
};

export function TechMark({ lang }: { lang: string }) {
  const Icon = TECH_ICONS[lang] ?? VscCode;
  return <Icon aria-hidden size={14} className="shrink-0" />;
}


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

export function Tag({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
      {icon}
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
      <span className="text-accent" style={{ color: LANG_COLORS[lang] ?? "var(--color-accent)" }}>
        <TechMark lang={lang} />
      </span>
      {lang}
    </span>
  );
}

export function StarIcon() {
  return <VscStarFull aria-hidden size={13} className="shrink-0 text-[#e3b341]" />;
}

export function GithubIcon({ size = 16 }: { size?: number }) {
  return <SiGithub aria-hidden size={size} className="shrink-0" />;
}

export function LinkedinIcon({ size = 16 }: { size?: number }) {
  return <FaLinkedin aria-hidden size={size} className="shrink-0 text-[#0A66C2]" />;
}
