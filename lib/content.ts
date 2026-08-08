// Hand-written content. Everything else comes from the GitHub API (lib/github.ts).
export const GITHUB_USER = "maulanadityaa";
export const LINKEDIN_URL = "https://www.linkedin.com/in/maulanadityaa/";

export const profile = {
  name: "Muhamad Maulana Zuhad Aditya",
  role: "Java Spring Boot Developer",
  tagline:
    "Java Spring Boot developer building REST APIs, backend services, and reliable software with clean, practical engineering.",
  location: "Jombang, East Java, Indonesia",
  email: "maulanadityaaa@gmail.com",
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
    id: "7b7d3b4e-4d6a-4b9f-8b4f-1e8f2f5f4a10",
    period: "Aug 2025 — now",
    role: "SAP Hybris Consultant",
    org: "PT. Astra Graphia Information Technology (AGIT)",
    detail:
      "Working on enterprise commerce systems with Java, Spring Boot, and backend integrations.",
  },
  {
    id: "f8f7e32e-b0a8-4f7c-9cb3-f5d94d0df841",
    period: "Aug 2025 — now",
    role: "Back End Developer",
    org: "PT Astra International Tbk",
    detail:
      "Developing backend services and APIs for production systems in an on-site engineering team.",
  },
  {
    id: "49a76220-5cb2-4422-9fa3-1b8a41a7024d",
    period: "Jan 2024 — May 2024",
    role: "Trainee IT Bootcamp",
    org: "Enigma Camp",
    detail:
      "Learned RESTful API development with Java Spring Boot, interactive React web development, React Native, clean code, and industry-standard practices.",
  },
  {
    id: "ace279be-4644-41b1-a9c8-e9ec8d3fd6e1",
    period: "Jun 2021 — Aug 2021",
    role: "Quality Assurance Quality Control",
    org: "Widya Wicara",
    detail: "Manual tested smart-speaker products and reported product issues.",
  },
];

export const education = {
  school: "University of Brawijaya",
  degree: "Bachelor's degree, Information Technology",
  period: "2018 — 2022",
};

export const experienceSource = LINKEDIN_URL;
