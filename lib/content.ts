// Hand-written content. Everything else comes from the GitHub API (lib/github.ts).
//
// Editable via MongoDB Atlas UI, one document per section in the `content` collection
// ({_id: "profile", data: {...}}, etc — see scripts/seed.mjs). FALLBACK below is what
// renders when MONGODB_URI is unset or the DB is unreachable, so the site never goes down.
import { unstable_cache } from "next/cache";
import { db } from "@/lib/mongo";
import {
  GITHUB_USERNAME,
  LINKEDIN_PROFILE_URL,
  DB_CONFIG,
  CONTENT_SECTION_KEYS,
  CACHE_CONFIG,
} from "@/lib/constants";

export const GITHUB_USER = GITHUB_USERNAME;
export const LINKEDIN_URL = LINKEDIN_PROFILE_URL;
export const experienceSource = LINKEDIN_URL;

export type TimelineEntry = {
  id: string;
  period: string;
  role: string;
  org: string;
  employmentType?: string;
  location?: string;
  locationType?: "On-site" | "Hybrid" | "Remote" | string;
  detail: string;
  skills?: string[];
};

const FALLBACK = {
  profile: {
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
  },

  // GitHub descriptions are mostly empty. Fill these in to override per repo —
  // key is the repo name. Anything not listed falls back to the API description.
  repoNotes: {
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
  } as Record<string, string>,

  // Repos to keep off the site entirely (throwaways, coursework, joke commits).
  hidden: ["sha-test", "brain-teaser"] as string[],

  // Repos to pin at the top of the grid, in order. Rest follow by stars, then recency.
  featured: [
    "loan-app-api",
    "zoo-ticket",
    "bank-merchant-api",
    "laundry-app-rest-api",
  ] as string[],

  timeline: [
    {
      id: "7b7d3b4e-4d6a-4b9f-8b4f-1e8f2f5f4a10",
      period: "Aug 2025 — Present",
      role: "SAP Hybris Consultant",
      org: "PT. Astra Graphia Information Technology (AGIT)",
      employmentType: "Full-time",
      location: "North Jakarta, Jakarta, Indonesia",
      locationType: "On-site",
      detail:
        "Working on enterprise commerce systems with Java, Spring Boot, and backend integrations.",
      skills: ["Java", "Spring Boot", "SAP Hybris"],
    },
    {
      id: "f8f7e32e-b0a8-4f7c-9cb3-f5d94d0df841",
      period: "Aug 2025 — Present",
      role: "Back End Developer",
      org: "PT Astra International Tbk",
      employmentType: "Full-time",
      location: "North Jakarta, Jakarta, Indonesia",
      locationType: "On-site",
      detail:
        "Developing backend services and APIs for production systems in an on-site engineering team.",
      skills: ["Java", "Spring Boot", "REST API", "Microservices"],
    },
    {
      id: "49a76220-5cb2-4422-9fa3-1b8a41a7024d",
      period: "Jan 2024 — May 2024",
      role: "Trainee IT Bootcamp",
      org: "Enigma Camp",
      employmentType: "Contract",
      location: "Malang, East Java, Indonesia",
      locationType: "On-site",
      detail:
        "Learning RESTful API development with Java Spring Boot. Exploring interactive and responsive web development with React.",
      skills: ["Java", "Spring Boot", "JavaScript", "React", "React Native"],
    },
    {
      id: "ace279be-4644-41b1-a9c8-e9ec8d3fd6e1",
      period: "Jun 2021 — Aug 2021",
      role: "Quality Assurance Quality Control",
      org: "Widya Wicara",
      employmentType: "Internship",
      location: "Yogyakarta, Indonesia",
      locationType: "On-site",
      detail: "Manual tester product smart speaker and reported product issues.",
      skills: ["QA", "Testing"],
    },
  ] as TimelineEntry[],

  education: {
    school: "University of Brawijaya",
    degree: "Bachelor's degree, Information Technology",
    period: "2018 — 2022",
  },
};

type ContentDoc<T> = { _id: string; data: T };

async function fetchContent() {
  try {
    const database = await db();
    if (!database) return FALLBACK;

    const docs = await database
      .collection<ContentDoc<unknown>>(DB_CONFIG.CONTENT_COLLECTION)
      .find({
        _id: { $in: [...CONTENT_SECTION_KEYS] },
      })
      .toArray();

    const map = new Map(docs.map((d) => [d._id, d.data]));

    return {
      profile: (map.get("profile") as typeof FALLBACK.profile) ?? FALLBACK.profile,
      timeline: (map.get("timeline") as typeof FALLBACK.timeline) ?? FALLBACK.timeline,
      education: (map.get("education") as typeof FALLBACK.education) ?? FALLBACK.education,
      repoNotes: (map.get("repoNotes") as typeof FALLBACK.repoNotes) ?? FALLBACK.repoNotes,
      featured: (map.get("featured") as typeof FALLBACK.featured) ?? FALLBACK.featured,
      hidden: (map.get("hidden") as typeof FALLBACK.hidden) ?? FALLBACK.hidden,
    };
  } catch (err) {
    console.warn("Content fetch from MongoDB failed, using fallback:", (err as Error).message || err);
    return FALLBACK;
  }
}

const getCachedContent = unstable_cache(
  fetchContent,
  [CACHE_CONFIG.CONTENT_TAG],
  {
    revalidate: CACHE_CONFIG.CONTENT_REVALIDATE_SECONDS,
    tags: [CACHE_CONFIG.CONTENT_TAG],
  },
);

export const getContent = () => {
  if (process.env.NODE_ENV === "development") {
    return fetchContent();
  }
  return getCachedContent();
};
