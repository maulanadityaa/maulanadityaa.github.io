import { LangDot, StarIcon, Tag } from "@/components/ui";
import { formatDate, titleize, type Repo } from "@/lib/github";
import { TbArrowUpRight } from "react-icons/tb";

export function RepoCard({
  repo,
  notes = {},
}: {
  repo: Repo;
  notes?: Record<string, string>;
}) {
  const blurb = notes[repo.name] ?? repo.description;

  return (
    <li>
      <div className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-5.5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base font-medium tracking-tight">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors group-hover:text-accent"
            >
              {titleize(repo.name)}
            </a>
          </h3>
          <span className="shrink-0 font-mono text-[11px] text-muted transition-colors group-hover:text-muted/80">
            {formatDate(repo.pushed_at)}
          </span>
        </div>

        {blurb ? (
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{blurb}</p>
        ) : (
          <p className="mt-2.5 flex-1 font-mono text-xs text-muted/60">
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

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/70 pt-3">
          {repo.language && <LangDot lang={repo.language} />}
          {repo.stargazers_count > 0 && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted transition-colors hover:text-text">
              <StarIcon />
              {repo.stargazers_count}
            </span>
          )}
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="group/live relative z-10 ml-auto inline-flex items-center gap-1 font-mono text-[11px] font-medium text-accent transition-all duration-200 hover:opacity-80"
            >
              <span>Live</span>
              <TbArrowUpRight
                size={13}
                className="transition-transform duration-200 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
