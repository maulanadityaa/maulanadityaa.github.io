import Link from "next/link";
import { RevealSection, ScrollReveal, StaggerList } from "@/components/animated";
import { RepoCard } from "@/components/repo-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon, LinkedinIcon, Section, Tag, TechMark } from "@/components/ui";
import {
  GITHUB_USER,
  LINKEDIN_URL,
  experienceSource,
  getContent,
} from "@/lib/content";
import { LANG_PRIORITY, getProfile, getRepos } from "@/lib/github";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default async function Home() {
  const content = await getContent();
  const [gh, repos] = await Promise.all([
    getProfile(GITHUB_USER),
    getRepos(GITHUB_USER, new Set(content.hidden)),
  ]);
  const { profile, timeline, education, featured } = content;

  // Pinned repos first (in the order listed), then the rest by stars/recency.
  const pinned = featured
    .map((name) => repos.find((r) => r.name === name))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const rest = repos.filter((r) => !featured.includes(r.name));
  const notes = content.repoNotes;
  const shown = [...pinned, ...rest].slice(0, 6);

  // Languages by repo count, but backend ones lead — raw counts would put
  // JavaScript first, which misrepresents what the work actually is.
  const langs = Object.entries(
    repos.reduce<Record<string, number>>((acc, r) => {
      if (r.language) acc[r.language] = (acc[r.language] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => {
      const at = (l: string) => {
        const i = LANG_PRIORITY.indexOf(l);
        return i === -1 ? LANG_PRIORITY.length : i;
      };
      return at(a[0]) - at(b[0]) || b[1] - a[1];
    })
    .map(([lang]) => lang);

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8">
      <header className="sticky top-0 z-40 -mx-5 flex items-center justify-between border-b border-line/60 bg-bg/80 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
        <a href="#main" className="group font-mono text-sm font-semibold tracking-tight text-text">
          ma<span className="inline-block text-accent transition-transform duration-300 group-hover:scale-150 group-hover:rotate-12">.</span>
        </a>
        <nav className="flex items-center gap-5 text-sm text-muted">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative py-1 transition-colors hover:text-text after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </header>

      <main id="main">
        <RevealSection className="py-16 sm:py-24">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line/80 bg-surface/70 px-3 py-1 font-mono text-xs text-accent backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-surface">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>{profile.role} · {profile.location}</span>
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            {gh?.bio ?? profile.tagline}
          </p>

          {gh && (
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-muted">
              <div className="group transition-colors hover:text-text">
                <dt className="sr-only">Public repositories</dt>
                <dd>
                  <span className="font-semibold text-text transition-colors group-hover:text-accent">{gh.public_repos}</span> repos
                </dd>
              </div>
              <div className="group transition-colors hover:text-text">
                <dt className="sr-only">Followers</dt>
                <dd>
                  <span className="font-semibold text-text transition-colors group-hover:text-accent">{gh.followers}</span> followers
                </dd>
              </div>
              <div className="group transition-colors hover:text-text">
                <dt className="sr-only">Primary languages</dt>
                <dd>{langs.slice(0, 3).join(" · ")}</dd>
              </div>
            </dl>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent shadow-md shadow-accent/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25 active:translate-y-0 active:scale-95"
            >
              <span>Get in touch</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2.5 text-sm text-muted backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-muted hover:bg-surface hover:text-text hover:shadow-sm"
            >
              <GithubIcon /> GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2.5 text-sm text-muted backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-muted hover:bg-surface hover:text-text hover:shadow-sm"
            >
              <LinkedinIcon /> LinkedIn
            </a>
          </div>
        </RevealSection>

        <Section
          id="work"
          title="Projects"
          action={
            <Link
              href="/projects"
              className="group shrink-0 inline-flex items-center gap-1 font-mono text-[11px] normal-case tracking-normal text-accent transition-opacity hover:opacity-80"
            >
              <span>All {repos.length}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          }
        >
          {shown.length > 0 ? (
            <ScrollReveal>
              <StaggerList as="ul" className="grid gap-3.5 sm:grid-cols-2">
                {shown.map((r) => (
                  <RepoCard key={r.name} repo={r} notes={notes} />
                ))}
              </StaggerList>
            </ScrollReveal>
          ) : (
            <p className="rounded-md border border-line bg-surface p-5 text-sm text-muted">
              Could not load repositories from GitHub right now. See them at{" "}
              <a
                href={`https://github.com/${GITHUB_USER}`}
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/{GITHUB_USER}
              </a>
              .
            </p>
          )}
        </Section>

        <Section id="about" title="About">
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            {profile.tagline} Most of what I build lives on GitHub — the list
            above is generated from it, so it is never out of date.
          </p>

          {langs.length > 0 && (
            <ScrollReveal className="mt-6">
              <div className="flex flex-wrap gap-1.5">
                {langs.map((l) => (
                  <Tag key={l} icon={<TechMark lang={l} />}>
                    {l}
                  </Tag>
                ))}
              </div>
            </ScrollReveal>
          )}

          <StaggerList as="ol" className="mt-10 border-l border-line">
            {timeline.map((t) => {
              const isCurrent =
                t.period.toLowerCase().includes("present") ||
                t.period.toLowerCase().includes("now");

              return (
                <li
                  key={t.id}
                  className="group relative pl-6 pb-8 last:pb-0 transition-transform duration-200 hover:translate-x-0.5"
                >
                  {isCurrent ? (
                    <span className="absolute left-[-5px] top-1.5 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                    </span>
                  ) : (
                    <span className="absolute left-[-4.5px] top-1.5 h-2 w-2 rounded-full bg-accent/60 transition-colors group-hover:bg-accent" />
                  )}

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted">
                    <span className="uppercase tracking-widest">{t.period}</span>
                    {t.employmentType && <span>· {t.employmentType}</span>}
                    {t.locationType && (
                      <span className="rounded border border-line bg-surface/80 px-1.5 py-0.2 text-[10px] font-medium text-accent">
                        {t.locationType}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm font-medium transition-colors group-hover:text-accent">
                    {t.role} <span className="text-muted">· {t.org}</span>
                  </p>

                  {t.location && (
                    <p className="mt-0.5 font-mono text-[11px] text-muted/75">
                      {t.location}
                    </p>
                  )}

                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.detail}</p>

                  {t.skills && t.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {t.skills.map((skill) => (
                        <Tag key={skill}>{skill}</Tag>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </StaggerList>
          <a
            href={experienceSource}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-1 font-mono text-[11px] text-accent transition-opacity hover:opacity-80"
          >
            <span>View full experience on LinkedIn</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>

          <ScrollReveal className="mt-10 border-t border-line pt-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Education
            </p>
            <p className="mt-2 text-sm font-medium">{education.school}</p>
            <p className="mt-1 text-sm text-muted">{education.degree}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">{education.period}</p>
          </ScrollReveal>
        </Section>

        <Section id="contact" title="Contact">
          <ScrollReveal>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              Open to backend and full-stack work. Easiest way to reach me is
              email.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-opacity hover:opacity-80"
            >
              <span>{profile.email}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </ScrollReveal>
        </Section>
      </main>

      <footer className="flex flex-col gap-4 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px]">
          © 2026 {profile.name}
        </p>
        <div className="flex gap-4">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="inline-flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:text-text"
              rel="noopener noreferrer"
              target="_blank"
            >
              {s.label === "GitHub" ? <GithubIcon size={14} /> : <LinkedinIcon size={14} />}
              {s.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
