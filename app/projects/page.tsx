import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { GITHUB_USER, getContent } from "@/lib/content";
import { getRepos } from "@/lib/github";
import { DOM_IDS } from "@/lib/constants";
import { TbArrowLeft } from "react-icons/tb";

export default async function Projects() {
  const content = await getContent();
  const repos = await getRepos(GITHUB_USER, new Set(content.hidden));
  const { repoNotes } = content;

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8">
      <header className="sticky top-0 z-40 -mx-5 flex items-center justify-between border-b border-line/60 bg-bg/80 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
        <Link
          id={DOM_IDS.NAV_BRAND}
          href="/"
          className="group font-mono text-sm font-semibold tracking-tight text-text"
        >
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
            <span>Back</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="py-14 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {repos.length} public repositories, pulled live from{" "}
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GitHub
          </a>
          . Forks and archived repos are filtered out.
        </p>

        {/* Interactive Tech Stack Filter & Grouped Repositories */}
        <ProjectsExplorer repos={repos} notes={repoNotes} />
      </main>

      <footer className="border-t border-line py-8 font-mono text-[11px] text-muted">
        © {new Date().getFullYear()} {content.profile.name}
      </footer>
    </div>
  );
}
