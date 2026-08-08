// GitHub data layer. Fetched on the server, cached by Next for `revalidate` seconds.
// Set GITHUB_TOKEN in .env.local to raise the rate limit from 60/hr to 5000/hr.

import { hidden } from "@/lib/content";

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

export type Profile = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  public_repos: number;
  followers: number;
};

const API = "https://api.github.com";
const REVALIDATE = 3600; // 1 hour

function headers(): HeadersInit {
  const h: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    (h as Record<string, string>).Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

// Never let a GitHub outage or a rate-limit take the whole page down.
async function get<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) {
      console.error(`GitHub ${path} -> ${res.status} ${res.statusText}`);
      return fallback;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`GitHub ${path} failed`, err);
    return fallback;
  }
}

export function getProfile(user: string) {
  return get<Profile | null>(`/users/${user}`, null);
}

// Backend-first ordering. Backend work outranks everything; Java breaks ties
// above other languages. Tune by editing these two, not the sort below.
const BACKEND_NAME = /(^|[-_])(api|be|backend|server|rest|crud|service)([-_]|$)/i;
const BACKEND_LANGS = new Set(["Java", "Go", "C#", "Kotlin", "Rust", "Python"]);

// Language section order on /projects. Anything unlisted sorts to the end.
export const LANG_PRIORITY = [
  "Java",
  "Go",
  "C#",
  "TypeScript",
  "PHP",
  "JavaScript",
];

function rank(r: Repo): number {
  const backend =
    BACKEND_NAME.test(r.name) ||
    (r.language !== null && BACKEND_LANGS.has(r.language)) ||
    r.topics.some((t) => BACKEND_NAME.test(t));
  // Backend is worth more than Java alone, so a Go API outranks a Java UI.
  return (backend ? 2 : 0) + (r.language === "Java" ? 1 : 0);
}

export async function getRepos(user: string): Promise<Repo[]> {
  const repos = await get<Repo[]>(
    `/users/${user}/repos?per_page=100&sort=pushed`,
    [],
  );
  return repos
    .filter((r) => !r.fork && !r.archived && !hidden.has(r.name))
    .sort(
      (a, b) =>
        rank(b) - rank(a) ||
        b.stargazers_count - a.stargazers_count ||
        Date.parse(b.pushed_at) - Date.parse(a.pushed_at),
    );
}

// "link-shortener-api" -> "Link Shortener API"
const ACRONYMS = new Set(["api", "ui", "cli", "sdk", "db", "jwt", "sql", "rest"]);

export function titleize(slug: string): string {
  return slug
    .split(/[-_.]+/)
    .filter(Boolean)
    .map((w) =>
      ACRONYMS.has(w.toLowerCase())
        ? w.toUpperCase()
        : w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const year = d.getUTCFullYear();
  return `${month} ${year}`;
}
