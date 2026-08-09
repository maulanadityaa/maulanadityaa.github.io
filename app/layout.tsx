import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeToggle } from "@/components/theme-toggle";
import { getContent } from "@/lib/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  return {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-on-accent"
        >
          Skip to content
        </a>
        <div className="fixed right-5 top-4 z-40 sm:right-8">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
