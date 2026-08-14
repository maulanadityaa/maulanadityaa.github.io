import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { getContent } from "@/lib/content";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Preloader } from "@/components/preloader";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        {/* Synchronous inline script to prevent Flash of Dark Mode (FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var saved = localStorage.getItem('portfolio-theme');
                var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = saved === 'light' || saved === 'dark' ? saved : (systemDark ? 'dark' : 'light');
                document.documentElement.dataset.theme = theme;
              } catch(e) {}
            })();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="relative min-h-screen">
        {/* Initial Brand Preloader */}
        <Preloader />

        {/* Subtle Minimal Ambient Background */}
        <div className="geometric-bg" aria-hidden="true">
          <div className="geometric-glow" />
          <div className="geometric-grid" />
        </div>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-on-accent"
        >
          Skip to content
        </a>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
