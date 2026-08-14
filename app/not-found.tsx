import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col px-5 sm:px-8">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 -mx-5 flex items-center justify-between border-b border-line/60 bg-bg/80 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
        <Link href="/" className="group font-mono text-sm font-semibold tracking-tight text-text">
          ma<span className="inline-block text-accent transition-transform duration-300 group-hover:scale-150 group-hover:rotate-12">.</span>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="group flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
          >
            <TbArrowLeft
              size={15}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span>Home</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main 404 Section */}
      <main className="flex flex-1 flex-col items-center justify-center py-16 text-center sm:py-24">
        {/* Status Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1 font-mono text-xs text-accent backdrop-blur-sm shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="font-semibold">404 · ENDPOINT_NOT_FOUND</span>
        </div>

        {/* Big Glitch/Monospace 404 Headline */}
        <h1 className="font-mono text-6xl font-bold tracking-tight text-text sm:text-8xl">
          4<span className="text-accent">0</span>4
        </h1>

        <p className="mt-4 text-xl font-semibold text-text sm:text-2xl">
          Page Not Found
        </p>

        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          The endpoint or page you requested does not exist, was moved, or is currently unavailable.
        </p>

        {/* Minimal Terminal Error Snippet */}
        <div className="mt-8 w-full max-w-md rounded-xl border border-line bg-surface/90 p-4 text-left font-mono text-xs shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-line/60 pb-2.5 text-[11px] text-muted">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500/70" />
              <span className="h-2 w-2 rounded-full bg-amber-500/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
            </div>
            <span>http_status: 404</span>
          </div>
          <div className="mt-3 space-y-1.5 text-muted">
            <p>
              <span className="text-accent">&gt;</span> request_status: <span className="text-red-400">FAILED</span>
            </p>
            <p>
              <span className="text-accent">&gt;</span> message: &quot;Resource could not be located&quot;
            </p>
            <p>
              <span className="text-accent">&gt;</span> action: &quot;Redirecting to valid route&quot;
            </p>
          </div>
        </div>

        {/* CTA Navigation Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent shadow-md shadow-accent/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25 active:translate-y-0 active:scale-95"
          >
            <TbArrowLeft
              size={15}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4.5 py-2.5 text-sm text-muted backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-muted hover:bg-surface hover:text-text hover:shadow-sm"
          >
            <span>Explore Projects</span>
            <TbArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-line py-8 text-center font-mono text-[11px] text-muted">
        © {new Date().getFullYear()} Muhamad Maulana Zuhad Aditya
      </footer>
    </div>
  );
}
