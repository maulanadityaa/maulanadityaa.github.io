import Link from "next/link";
import { RepoCard } from "@/components/repo-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { GITHUB_USER, getContent } from "@/lib/content";
import { LANG_PRIORITY, getRepos, type Repo } from "@/lib/github";
import { ScrollReveal, StaggerList } from "@/components/animated";
import { TbArrowLeft } from "react-icons/tb";

export default async function Projects() {
  const content = await getContent();
  const repos = await getRepos(GITHUB_USER, new Set(content.hidden));
  const { repoNotes } = content;

  // Group by language so a long list does not read as one undifferentiated wall.
  const groups = repos.reduce<Record<string, Repo[]>>((acc, r) => {
    const key = r.language ?? "Other";
    (acc[key] ??= []).push(r);
    return acc;
  }, {});
  // Backend languages lead; unlisted ones fall to the end, then by repo count.
  const at = (lang: string) => {
    const i = LANG_PRIORITY.indexOf(lang);
    return i === -1 ? LANG_PRIORITY.length : i;
  };
  const ordered = Object.entries(groups).sort(
    (a, b) => at(a[0]) - at(b[0]) || b[1].length - a[1].length,
  );

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8">
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
            <span>Back</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="py-14 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
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

        {ordered.map(([lang, items]) => (
          <ScrollReveal key={lang} className="mt-12">
            <h2 className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">/</span>
              {lang}
              <span className="rounded-full border border-line/80 bg-surface/60 px-2 py-0.5 text-[10px] text-muted/70">
                {items.length}
              </span>
              <span className="h-px flex-1 bg-line" />
            </h2>
            <StaggerList as="ul" className="grid gap-3.5 sm:grid-cols-2">
              {items.map((r) => (
                <RepoCard key={r.name} repo={r} notes={repoNotes} />
              ))}
            </StaggerList>
          </ScrollReveal>
        ))}
      </main>

      <footer className="border-t border-line py-8 font-mono text-[11px] text-muted">
        © {new Date().getFullYear()} {content.profile.name}
      </footer>
    </div>
  );
}
