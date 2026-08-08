import { LangDot, StarIcon, Tag } from "@/components/ui";
import { repoNotes } from "@/lib/content";
import { formatDate, titleize, type Repo } from "@/lib/github";

export function RepoCard({ repo }: { repo: Repo }) {
  const blurb = repoNotes[repo.name] ?? repo.description;

  return (
    <li>
      <div className="group flex h-full flex-col rounded-md border border-line bg-surface p-5 transition-colors hover:border-accent/50">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base font-medium">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors group-hover:text-accent"
            >
              {titleize(repo.name)}
            </a>
          </h3>
          <span className="shrink-0 font-mono text-[11px] text-muted">
            {formatDate(repo.pushed_at)}
          </span>
        </div>

        {blurb ? (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{blurb}</p>
        ) : (
          <p className="mt-2 flex-1 font-mono text-xs text-muted/60">
            {repo.name}
          </p>
        )}

        {repo.topics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3">
          {repo.language && <LangDot lang={repo.language} />}
          {repo.stargazers_count > 0 && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted">
              <StarIcon />
              {repo.stargazers_count}
            </span>
          )}
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 ml-auto font-mono text-[11px] text-accent transition-opacity hover:opacity-70"
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
