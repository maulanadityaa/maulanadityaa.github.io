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
      <body suppressHydrationWarning className="relative min-h-screen">
        {/* Synchronous script to handle instant theme and instant preloader state before first paint */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('portfolio-theme'),d=window.matchMedia('(prefers-color-scheme: dark)').matches,t=s==='light'||s==='dark'?s:(d?'dark':'light');document.documentElement.setAttribute('data-theme',t);if(sessionStorage.getItem('portfolio_session_loaded')==='true'){document.documentElement.classList.add('hide-preloader');}}catch(e){}})();`,
          }}
        />

        {/* Initial Brand Preloader (Rendered on Frame 0) */}
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
