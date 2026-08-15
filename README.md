<div align="center">

# 🌐 Maulana Aditya — Software Engineer Portfolio

Personal portfolio and interactive developer showcase built with **Next.js 16 (Turbopack)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **MongoDB**.

[![Live Site](https://img.shields.io/badge/Live%20Demo-maulanadityaa.github.io-404F68?style=for-the-badge&logo=githubpages&logoColor=white)](https://maulanadityaa.github.io)
[![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---

## 🚀 Overview

A fast, minimalist, and backend-focused personal portfolio website featuring live GitHub synchronization, interactive multi-stack project filtering, dynamic database-backed experience timelines, and fluid animations.

---

## ✨ Key Features

- ⚡ **Next.js 16 + Turbopack & React 19:** Ultra-fast static page generation (SSG) with zero runtime JavaScript bloat.
- 🎨 **Monochromatic Design System:** Custom Slate/Charcoal palette (`#404F68` / `#7D94B5`) with full Light & Dark mode support.
- 🔍 **Interactive Projects Explorer:**
  - **Desktop (>= 640px):** Wrapped visual badges with smooth **GSAP floating indicator pill**.
  - **Mobile (< 640px):** Ultra-compact **Animated Dropdown Picker** with fluid *enter & exit* spring transitions.
  - **Alphabetical A-Z Filter Ordering** with `Other` strictly at the end, while project card groupings stay **Backend-First**.
- 📡 **GitHub API Live Integration:** Real-time repository synchronization, automated Flutter/Dart boilerplate normalization, multi-language detection, and offline snapshot resilience ([`lib/repos-fallback.json`](lib/repos-fallback.json)).
- 🗄️ **MongoDB Atlas Dynamic Layer:** Database-backed experience timeline and credentials with DNS resolution resilience.
- 🏢 **Authentic Brand Assets:** Verified high-resolution logos for Astra International, AGIT, Enigma Camp, Widya Wicara, and Universitas Brawijaya.
- 🎭 **Micro-animations & Accessibility:** FLIP navbar flight preloader, semantic HTML5 hierarchy, and prefers-reduced-motion compliance.
- 🚀 **Automated CI/CD:** Continuous Deployment to GitHub Pages via GitHub Actions.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router, Turbopack)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Animations** | [GSAP](https://greensock.com/gsap/) & CSS Keyframes |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/) |
| **Icons** | [React Icons (Simple Icons & Tabler Icons)](https://react-icons.github.io/react-icons/) |
| **Deployment** | [GitHub Pages & GitHub Actions](https://pages.github.com/) |

---

## 📁 Project Structure

```text
├── app/
│   ├── globals.css           # Design tokens, variables, & animations
│   ├── layout.tsx            # Root layout with fonts, preloader, & scripts
│   ├── page.tsx              # Home / Hero / Experience / Skills
│   ├── projects/page.tsx     # Projects showcase page
│   └── template.tsx          # Page transitions
├── components/
│   ├── preloader.tsx         # Brand logo flight preloader
│   ├── projects-explorer.tsx # Interactive filter & hybrid mobile dropdown
│   ├── repo-card.tsx         # GitHub repository card with live badges
│   ├── theme-toggle.tsx      # Light/Dark mode switcher
│   └── ui.tsx                # Brand marks, org logos, & reusable UI
├── lib/
│   ├── constants.ts          # Centralized configuration & tokens
│   ├── content.ts            # Content data layer (DB + Fallback)
│   ├── github.ts             # GitHub API integration & stack normalization
│   ├── mongo.ts              # Resilient MongoDB client
│   └── repos-fallback.json   # Offline snapshot for rate-limit resilience
├── public/
│   └── logos/                # Official company & university assets
├── scripts/
│   └── seed.mjs              # Database seeding script
└── .github/workflows/
    └── deploy.yml            # Automated GitHub Pages CI/CD workflow
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js `18.x` or higher
- npm or pnpm
- (Optional) MongoDB Atlas database & GitHub Personal Access Token

### 1. Clone the repository
```bash
git clone https://github.com/maulanadityaa/maulanadityaa.github.io.git
cd maulanadityaa.github.io
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env.local` file in the root directory:
```env
# Optional: Raise GitHub API rate limits (60/hr -> 5000/hr)
GH_TOKEN=ghp_your_token_here

# Optional: MongoDB connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/porto?retryWrites=true&w=majority
```

### 4. Seed the database (Optional)
```bash
node scripts/seed.mjs
```

### 5. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production
```bash
npm run build
```

---

## 🚢 Deployment

Deployment is 100% automated using GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

Every push to the `main` branch triggers an automated build and publishes the static export to GitHub Pages.

To configure secrets on GitHub:
1. Go to **Settings** $\to$ **Secrets and variables** $\to$ **Actions**.
2. Add:
   - `GH_TOKEN`: Your GitHub Personal Access Token.
   - `MONGODB_URI`: Your MongoDB Atlas connection string.

---

## 📄 License

MIT © [Maulana Aditya](https://github.com/maulanadityaa)
