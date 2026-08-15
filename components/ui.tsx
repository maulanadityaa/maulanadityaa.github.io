import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FaLinkedin, FaJava } from "react-icons/fa6";
import {
  TbBrandCSharp,
  TbApi,
  TbServer,
  TbBug,
  TbFlask,
  TbCreditCard,
  TbRocket,
  TbCode,
  TbBrandWindows,
} from "react-icons/tb";
import {
  SiAndroid,
  SiApple,
  SiC,
  SiCplusplus,
  SiCss,
  SiDart,
  SiDjango,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGnubash,
  SiGo,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiKotlin,
  SiKubernetes,
  SiLaravel,
  SiLinux,
  SiLivewire,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPug,
  SiPython,
  SiReact,
  SiRedis,
  SiRuby,
  SiRubyonrails,
  SiRust,
  SiSap,
  SiSass,
  SiSocketdotio,
  SiSpring,
  SiSpringboot,
  SiSqlite,
  SiSupabase,
  SiSwagger,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
  SiWebpack,
} from "react-icons/si";
import { VscCode, VscStarFull } from "react-icons/vsc";

type TechIcon = ComponentType<{
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}>;

// Comprehensive mapping of language & technology aliases to official icons
const TECH_ICONS: Record<string, TechIcon> = {
  // Programming & Template Languages
  java: FaJava,
  go: SiGo,
  golang: SiGo,
  typescript: SiTypescript,
  ts: SiTypescript,
  javascript: SiJavascript,
  js: SiJavascript,
  python: SiPython,
  py: SiPython,
  "c#": TbBrandCSharp,
  csharp: TbBrandCSharp,
  c: SiC,
  "c++": SiCplusplus,
  cpp: SiCplusplus,
  php: SiPhp,
  rust: SiRust,
  kotlin: SiKotlin,
  dart: SiDart,
  swift: SiSwift,
  ios: SiApple,
  android: SiAndroid,
  ruby: SiRuby,
  rails: SiRubyonrails,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  sass: SiSass,
  scss: SiSass,
  shell: SiGnubash,
  bash: SiGnubash,
  sh: SiGnubash,
  zsh: SiGnubash,
  blade: SiLaravel,
  ejs: SiJavascript,
  pug: SiPug,
  jade: SiPug,

  // Frameworks & Enterprise
  sap: SiSap,
  "sap hybris": SiSap,
  hybris: SiSap,
  spring: SiSpring,
  "spring boot": SiSpringboot,
  springboot: SiSpringboot,
  "spring-boot": SiSpringboot,
  react: SiReact,
  "react.js": SiReact,
  "react native": SiReact,
  "react-native": SiReact,
  nextjs: SiNextdotjs,
  "next.js": SiNextdotjs,
  vue: SiVuedotjs,
  "vue.js": SiVuedotjs,
  laravel: SiLaravel,
  livewire: SiLivewire,
  flutter: SiFlutter,
  node: SiNodedotjs,
  "node.js": SiNodedotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  "express.js": SiExpress,
  nestjs: SiNestjs,
  fastapi: SiFastapi,
  django: SiDjango,
  flask: SiFlask,
  ".net": SiDotnet,
  dotnet: SiDotnet,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  vite: SiVite,
  webpack: SiWebpack,

  // Architecture & APIs
  api: TbApi,
  "rest api": TbApi,
  "restful api": TbApi,
  rest: TbApi,
  microservices: TbServer,
  microservice: TbServer,
  server: TbServer,
  graphql: SiGraphql,
  swagger: SiSwagger,
  postman: SiPostman,
  jwt: SiJsonwebtokens,
  websocket: SiSocketdotio,
  "socket.io": SiSocketdotio,
  socketio: SiSocketdotio,

  // Payment & Services
  midtrans: TbCreditCard,
  payment: TbCreditCard,
  turbolinks: TbRocket,
  turbo: TbRocket,

  // Testing & QA
  qa: TbBug,
  "quality assurance": TbBug,
  testing: TbFlask,
  test: TbFlask,

  // Databases, Cloud & DevOps
  mongodb: SiMongodb,
  mongo: SiMongodb,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mysql: SiMysql,
  redis: SiRedis,
  sqlite: SiSqlite,
  supabase: SiSupabase,
  firebase: SiFirebase,
  prisma: SiPrisma,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  git: SiGit,
  linux: SiLinux,
  windows: TbBrandWindows,
  macos: SiApple,

  // Fallback category
  other: TbCode,
  code: TbCode,
};

// Official brand colors with strong contrast in both light and dark themes
const TECH_COLORS: Record<string, string> = {
  java: "#EA2D2E",
  go: "#00ADD8",
  golang: "#00ADD8",
  typescript: "#3178C6",
  ts: "#3178C6",
  javascript: "#F7DF1E",
  js: "#F7DF1E",
  python: "#3776AB",
  py: "#3776AB",
  "c#": "#68217A",
  csharp: "#68217A",
  c: "#A8B9CC",
  "c++": "#00599C",
  cpp: "#00599C",
  php: "#777BB4",
  rust: "#DEA584",
  kotlin: "#7F52FF",
  dart: "#0175C2",
  swift: "#F05138",
  ios: "#A2AAAD",
  android: "#3DDC84",
  ruby: "#CC342D",
  rails: "#CC0000",
  html: "#E34F26",
  html5: "#E34F26",
  css: "#1572B6",
  css3: "#1572B6",
  sass: "#CC6699",
  scss: "#CC6699",
  shell: "#4EAA25",
  bash: "#4EAA25",
  sh: "#4EAA25",
  zsh: "#4EAA25",
  blade: "#FF2D20",
  ejs: "#B4CA65",
  pug: "#A86454",
  jade: "#A86454",

  // Frameworks & Enterprise
  sap: "#008FD3",
  "sap hybris": "#008FD3",
  hybris: "#008FD3",
  spring: "#6DB33F",
  "spring boot": "#6DB33F",
  springboot: "#6DB33F",
  "spring-boot": "#6DB33F",
  react: "#61DAFB",
  "react.js": "#61DAFB",
  "react native": "#61DAFB",
  "react-native": "#61DAFB",
  "next.js": "currentColor",
  nextjs: "currentColor",
  vue: "#4FC08D",
  "vue.js": "#4FC08D",
  laravel: "#FF2D20",
  livewire: "#FB70A9",
  flutter: "#02569B",
  node: "#5FA04E",
  "node.js": "#5FA04E",
  nodejs: "#5FA04E",
  express: "currentColor",
  "express.js": "currentColor",
  nestjs: "#E0234E",
  fastapi: "#009688",
  django: "#092E20",
  flask: "currentColor",
  ".net": "#512BD4",
  dotnet: "#512BD4",
  tailwind: "#06B6D4",
  tailwindcss: "#06B6D4",
  "tailwind css": "#06B6D4",
  vite: "#646CFF",
  webpack: "#8DD6F9",

  // Architecture & APIs
  api: "#0284C7",
  "rest api": "#0284C7",
  "restful api": "#0284C7",
  rest: "#0284C7",
  microservices: "#3B82F6",
  microservice: "#3B82F6",
  server: "#3B82F6",
  graphql: "#E10098",
  swagger: "#85EA2D",
  postman: "#FF6C37",
  jwt: "#D63AFF",
  websocket: "#010101",
  "socket.io": "#010101",
  socketio: "#010101",

  // Payment & Services
  midtrans: "#0082CA",
  payment: "#0082CA",
  turbolinks: "#3B82F6",
  turbo: "#3B82F6",

  // Testing & QA
  qa: "#EF4444",
  "quality assurance": "#EF4444",
  testing: "#8B5CF6",
  test: "#8B5CF6",

  // Databases & Tools
  mongodb: "#47A248",
  mongo: "#47A248",
  postgresql: "#4169E1",
  postgres: "#4169E1",
  mysql: "#4479A1",
  redis: "#DC382D",
  sqlite: "#003B57",
  supabase: "#3ECF8E",
  firebase: "#FFCA28",
  prisma: "#2D3748",
  docker: "#2496ED",
  kubernetes: "#326CE5",
  k8s: "#326CE5",
  git: "#F05032",
  linux: "#FCC624",
  windows: "#0078D6",
  macos: "#A2AAAD",

  // Fallback category
  other: "currentColor",
  code: "currentColor",
};

export function getTechInfo(name: string) {
  const key = name.trim().toLowerCase();
  const Icon = TECH_ICONS[key] ?? VscCode;
  const color = TECH_COLORS[key];
  return { Icon, color };
}

export function TechMark({ lang, size = 14 }: { lang: string; size?: number }) {
  const { Icon, color } = getTechInfo(lang);
  return (
    <span
      style={color ? { color } : undefined}
      className="inline-flex shrink-0 items-center justify-center"
    >
      <Icon aria-hidden size={size} />
    </span>
  );
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
    <section id={id} className="scroll-mt-20 py-10 sm:py-14">
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

export function Tag({
  children,
  icon,
}: {
  children: ReactNode;
  icon?: ReactNode;
}) {
  // If no explicit icon provided and children is a string, automatically match tech icon
  const content = typeof children === "string" ? children : null;
  const techIcon = icon ?? (content ? <TechMark lang={content} size={13} /> : null);

  return (
    <span className="group/tag inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-2.5 py-0.5 font-mono text-[11px] text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface hover:text-text hover:shadow-sm">
      {techIcon}
      <span>{children}</span>
    </span>
  );
}

export function LangDot({ lang }: { lang: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted transition-colors hover:text-text">
      <TechMark lang={lang} size={13} />
      <span>{lang}</span>
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

export function getOrgInitials(name: string): string {
  const clean = name
    .replace(/^PT\.?\s+/i, "")
    .replace(/\s+Tbk\.?$/i, "")
    .trim();

  // If acronym in parentheses e.g. "(AGIT)"
  const parenMatch = clean.match(/\(([^)]+)\)/);
  if (parenMatch && parenMatch[1]) {
    return parenMatch[1].slice(0, 3).toUpperCase();
  }

  const words = clean.split(/[\s-]+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

export function OrgLogo({
  name,
  logo,
  className,
}: {
  name: string;
  logo?: string;
  className?: string;
}) {
  const initials = getOrgInitials(name);

  return (
    <div
      className={cn(
        "relative flex h-11 w-11 shrink-0 select-none items-center justify-center overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-1 shadow-sm transition-all duration-300 group-hover:border-accent group-hover:scale-105 group-hover:shadow-md dark:border-zinc-700/60 dark:bg-white",
        className
      )}
      title={name}
      aria-label={name}
    >
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="h-full w-full object-contain rounded-lg"
          loading="lazy"
        />
      ) : (
        <span className="font-mono text-xs font-bold text-zinc-900 tracking-tight transition-transform duration-300 group-hover:scale-110">
          {initials}
        </span>
      )}
    </div>
  );
}
