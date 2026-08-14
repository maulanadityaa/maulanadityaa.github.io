import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { getContent } from "@/lib/content";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Preloader } from "@/components/preloader";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
    <html
      lang="en"
      className={cn(
        "font-sans antialiased",
        sans.variable,
        mono.variable,
        jetbrainsMono.variable
      )}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="relative min-h-screen">
        {/* Synchronous script to handle instant theme, scroll reset to top, and preloader bypass */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(history.scrollRestoration){history.scrollRestoration='manual';}window.scrollTo(0,0);var s=localStorage.getItem('portfolio-theme'),d=window.matchMedia('(prefers-color-scheme: dark)').matches,t=s==='light'||s==='dark'?s:(d?'dark':'light');document.documentElement.setAttribute('data-theme',t);if(sessionStorage.getItem('portfolio_session_loaded')==='true'){document.documentElement.classList.add('hide-preloader');}}catch(e){}})();`,
          }}
        />

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
