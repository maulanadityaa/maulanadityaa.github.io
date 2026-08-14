import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Error: MONGODB_URI not set in environment or .env.local");
  process.exit(1);
}

const dbName = process.env.MONGODB_DB ?? "porto";

const GITHUB_USER = "maulanadityaa";
const LINKEDIN_URL = "https://www.linkedin.com/in/maulanadityaa/";

const SEED = {
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
  },
  hidden: ["sha-test", "brain-teaser"],
  featured: [
    "loan-app-api",
    "zoo-ticket",
    "bank-merchant-api",
    "laundry-app-rest-api",
  ],
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
  ],
  education: {
    school: "University of Brawijaya",
    degree: "Bachelor's degree, Information Technology",
    period: "2018 — 2022",
  },
};

async function main() {
  const client = new MongoClient(uri);
  try {
    console.log(`Connecting to MongoDB (${dbName})...`);
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("content");

    // 1. Delete / Clear existing collection documents
    console.log("Clearing all existing content documents from MongoDB...");
    const deleteResult = await col.deleteMany({});
    console.log(`✓ Cleared ${deleteResult.deletedCount} documents from '${dbName}.content'.`);

    // 2. Insert new documents
    console.log("Seeding fresh data...");
    for (const [key, value] of Object.entries(SEED)) {
      await col.insertOne({
        _id: key,
        data: value,
      });
      console.log(`✓ Inserted document: ${key}`);
    }
    console.log("\n🎉 Database successfully reset and seeded with updated experience data!");
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
