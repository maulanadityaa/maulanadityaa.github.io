// Centralized Application Constants

// ==========================================
// 1. Social & Profile Defaults
// ==========================================
export const GITHUB_USERNAME = "maulanadityaa";
export const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/maulanadityaa/";

// ==========================================
// 2. Storage Keys & Values
// ==========================================
export const STORAGE_KEYS = {
  THEME: "portfolio-theme",
  SESSION_LOADED: "portfolio_session_loaded",
} as const;

export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

// ==========================================
// 3. DOM Element IDs
// ==========================================
export const DOM_IDS = {
  NAV_BRAND: "nav-brand",
  INITIAL_PRELOADER: "initial-preloader",
  MAIN_CONTENT: "main",
} as const;

// ==========================================
// 4. CSS Classes & Media Queries
// ==========================================
export const CSS_CLASSES = {
  HIDE_PRELOADER: "hide-preloader",
  IS_REVEALED: "is-revealed",
  REVEAL_ON_SCROLL: "reveal-on-scroll",
} as const;

export const MEDIA_QUERIES = {
  REDUCED_MOTION: "(prefers-reduced-motion: reduce)",
  DARK_COLOR_SCHEME: "(prefers-color-scheme: dark)",
} as const;

// ==========================================
// 5. Database & Content Collections
// ==========================================
export const DB_CONFIG = {
  DEFAULT_DATABASE_NAME: "porto",
  CONTENT_COLLECTION: "content",
  CONNECTION_TIMEOUT_MS: 3000,
  SERVER_SELECTION_TIMEOUT_MS: 3000,
  DNS_FALLBACK_SERVERS: ["8.8.8.8", "1.1.1.1"],
} as const;

export const CONTENT_SECTION_KEYS = [
  "profile",
  "timeline",
  "education",
  "repoNotes",
  "featured",
  "hidden",
] as const;

export type ContentSectionKey = (typeof CONTENT_SECTION_KEYS)[number];

export const CACHE_CONFIG = {
  CONTENT_TAG: "content",
  CONTENT_REVALIDATE_SECONDS: 3600, // 1 hour
  GITHUB_REVALIDATE_SECONDS: 3600,  // 1 hour
} as const;

// ==========================================
// 6. GitHub API Constants
// ==========================================
export const GITHUB_CONFIG = {
  API_BASE_URL: "https://api.github.com",
  API_VERSION: "2022-11-28",
  ACCEPT_HEADER: "application/vnd.github+json",
  REPOS_PER_PAGE: 100,
  SORT_ORDER: "pushed",
} as const;

// ==========================================
// 7. Animation Timings & Settings
// ==========================================
export const ANIMATION_CONFIG = {
  PRELOADER_DURATION_MS: 650,
  PRELOADER_TICK_INTERVAL_MS: 20,
  PRELOADER_FLIP_DELAY_MS: 120,
  PRELOADER_REMOVAL_DELAY_MS: 680,
  PAGE_TRANSITION_DURATION_SECONDS: 0.45,
  PAGE_TRANSITION_OFFSET_PX: 48,
  PAGE_TRANSITION_EASE: "power2.out",
} as const;
