// Hand-written content. Everything else comes from the GitHub API (lib/github.ts).
export const GITHUB_USER = "maulanadityaa";
export const LINKEDIN_URL = "https://www.linkedin.com/in/maulanadityaa/";

export const profile = {
  name: "Maulana Aditya",
  role: "Software Engineer",
  tagline:
    "Backend-leaning engineer. I build APIs and services in Go, TypeScript, and Java — and care about the ones that stay fast after the demo.",
  location: "Indonesia",
  email: "hello@example.com",
  socials: [
    { label: "GitHub", href: `https://github.com/${GITHUB_USER}` },
    { label: "LinkedIn", href: LINKEDIN_URL },
  ],
};

// GitHub descriptions are mostly empty. Fill these in to override per repo —
// key is the repo name. Anything not listed falls back to the API description.
export const repoNotes: Record<string, string> = {
  "link-shortener-api":
    "URL shortener service with a documented REST API, deployed on Vercel.",
  "laundry-app-rest-api":
    "Laundry management backend in Go, with Swagger-documented endpoints.",
  "project-management-api":
    "Task and project tracking API — boards, assignments, and role-based access.",
  "contact-management-api":
    "CRUD contact service with auth, validation, and pagination.",
  "bank-merchant-api":
    "Merchant and transaction service in Go, modelling accounts and transfers.",
  "loan-app-api": "Loan application backend in Java, covering the approval flow.",
  "zoo-ticket":
    "Zoo ticketing service in Java — booking, pricing tiers, and validation.",
  "warehouse-app": "Warehouse stock and movement tracking built on .NET.",
  "bookshelf-app": "Bookshelf CRUD app — an early exercise in vanilla JavaScript.",
  "olshop-sepatu":
    "Shoe e-commerce storefront on Laravel + Livewire, with Midtrans payments.",
};

// Repos to keep off the site entirely (throwaways, coursework, joke commits).
export const hidden = new Set(["sha-test", "brain-teaser"]);

// Repos to pin at the top of the grid, in order. Rest follow by stars, then recency.
export const featured = [
  "loan-app-api",
  "zoo-ticket",
  "bank-merchant-api",
  "laundry-app-rest-api",
];

export const timeline = [
  {
    period: "2024 — now",
    role: "Software Engineer",
    org: "Freelance / Contract",
    detail:
      "Shipping backend services end to end: schema design, API surface, and the reliability work that nobody demos.",
  },
  {
    period: "2023 — 2024",
    role: "Backend Developer",
    org: "Enigma Camp",
    detail:
      "Built REST services across Go, Java, and .NET. Learned to read other people's code without complaining.",
  },
];
