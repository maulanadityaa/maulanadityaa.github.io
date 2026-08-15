"use client";

import { useState, useMemo, useRef, useEffect, useLayoutEffect } from "react";
import { TechMark } from "@/components/ui";
import { RepoCard } from "@/components/repo-card";
import { cn } from "@/lib/utils";
import type { Repo } from "@/lib/github";
import { LANG_PRIORITY } from "@/lib/github";
import { TbChevronDown, TbFilter, TbCheck, TbX } from "react-icons/tb";
import gsap from "gsap";

interface ProjectsExplorerProps {
  repos: Repo[];
  notes?: Record<string, string>;
}

export function ProjectsExplorer({ repos, notes = {} }: ProjectsExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isInitialMount = useRef(true);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    if (isMobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  // Helper to extract effective stacks of a repository
  const getRepoStacks = (r: Repo): string[] => {
    if (r.techStacks && r.techStacks.length > 0) return r.techStacks;
    if (r.language && r.language.toLowerCase() !== "other") return [r.language];
    return ["Other"];
  };

  // Compute distinct tech stack counts across all repositories
  const stackCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of repos) {
      const stacks = getRepoStacks(r);
      for (const s of stacks) {
        counts[s] = (counts[s] ?? 0) + 1;
      }
    }
    return counts;
  }, [repos]);

  // Order tech stack pills & dropdown: Alphabetical (A-Z), with 'Other' guaranteed at the absolute end
  const orderedStacks = useMemo(() => {
    return Object.entries(stackCounts)
      .sort((a, b) => {
        const nameA = a[0];
        const nameB = b[0];
        if (nameA.toLowerCase() === "other") return 1;
        if (nameB.toLowerCase() === "other") return -1;
        return nameA.localeCompare(nameB, undefined, { sensitivity: "base" });
      })
      .map(([stack, count]) => ({ stack, count }));
  }, [stackCounts]);

  // Group all repositories by primary language/stack for "All" view (Backend-First Priority)
  const defaultGroups = useMemo(() => {
    const map = repos.reduce<Record<string, Repo[]>>((acc, r) => {
      const stacks = getRepoStacks(r);
      const key = r.language ?? stacks[0] ?? "Other";
      (acc[key] ??= []).push(r);
      return acc;
    }, {});

    const at = (lang: string) => {
      if (lang.toLowerCase() === "other") return 9999;
      const i = LANG_PRIORITY.indexOf(lang);
      return i === -1 ? LANG_PRIORITY.length : i;
    };

    return Object.entries(map)
      .sort((a, b) => {
        if (a[0].toLowerCase() === "other") return 1;
        if (b[0].toLowerCase() === "other") return -1;
        return at(a[0]) - at(b[0]) || b[1].length - a[1].length;
      })
      .map(([lang, items]) => ({ lang, items, count: items.length }));
  }, [repos]);

  // Filtered repositories when a specific stack is active
  const filteredRepos = useMemo(() => {
    if (!activeFilter) return [];
    const isOther = activeFilter.toLowerCase() === "other";
    return repos.filter((r) => {
      const stacks = getRepoStacks(r);
      if (isOther) {
        return (
          stacks.includes("Other") ||
          !r.language ||
          r.language.toLowerCase() === "other" ||
          !r.techStacks ||
          r.techStacks.length === 0
        );
      }
      return stacks.some(
        (s) => s.toLowerCase() === activeFilter.toLowerCase()
      );
    });
  }, [repos, activeFilter]);

  // Floating background indicator animation for desktop view
  const updateIndicator = (animate = true) => {
    const indicator = indicatorRef.current;
    const container = containerRef.current;
    if (!indicator || !container) return;

    const targetKey = activeFilter ?? "__ALL__";
    const target = buttonRefs.current.get(targetKey);

    if (!target) {
      gsap.to(indicator, { opacity: 0, duration: 0.2 });
      return;
    }

    const { offsetLeft: left, offsetTop: top, offsetWidth: width, offsetHeight: height } = target;

    if (!animate || isInitialMount.current) {
      gsap.set(indicator, { x: left, y: top, width, height, opacity: 1 });
      isInitialMount.current = false;
    } else {
      gsap.to(indicator, {
        x: left,
        y: top,
        width,
        height,
        opacity: 1,
        duration: 0.32,
        ease: "power3.out",
      });
    }
  };

  useLayoutEffect(() => {
    updateIndicator(!isInitialMount.current);
  }, [activeFilter, orderedStacks]);

  const handleSelectFilter = (stack: string | null) => {
    setActiveFilter((prev) => (prev?.toLowerCase() === stack?.toLowerCase() ? null : stack));
    setIsMobileOpen(false);
  };

  return (
    <div className="mt-8">
      {/* ========================================================================= */}
      {/* 1. MOBILE COMPACT DROPDOWN PICKER (visible on screens < 640px)            */}
      {/* ========================================================================= */}
      <div ref={dropdownRef} className="relative block sm:hidden mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted">
            Filter by Tech Stack
          </span>
          {activeFilter && (
            <button
              type="button"
              onClick={() => handleSelectFilter(null)}
              className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline cursor-pointer"
            >
              <TbX size={13} />
              <span>Reset ({filteredRepos.length} of {repos.length})</span>
            </button>
          )}
        </div>

        {/* Dropdown Trigger Button */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className={cn(
            "flex w-full items-center justify-between rounded-xl border p-3.5 font-mono text-xs transition-all duration-200 cursor-pointer shadow-xs",
            activeFilter
              ? "border-accent/70 bg-surface text-text ring-1 ring-accent/30"
              : "border-line bg-surface/80 text-muted hover:border-accent/40"
          )}
        >
          <div className="flex items-center gap-2.5">
            <TbFilter className="text-accent shrink-0" size={15} />
            {activeFilter ? (
              <span className="flex items-center gap-1.5 font-semibold text-text">
                <TechMark lang={activeFilter} size={15} />
                <span>{activeFilter}</span>
              </span>
            ) : (
              <span className="font-medium text-text">All Tech Stacks</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-surface border border-line px-2 py-0.5 text-[10px] font-bold text-muted">
              {activeFilter ? `${filteredRepos.length} repos` : `${repos.length} total`}
            </span>
            <TbChevronDown
              size={16}
              className={cn("text-muted transition-transform duration-200", isMobileOpen && "rotate-180")}
            />
          </div>
        </button>

        {/* Mobile Floating Menu Popover with Enter and Exit Animations */}
        <div
          className={cn(
            "absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-line bg-surface/95 p-1.5 shadow-2xl backdrop-blur-md ring-1 ring-black/5 dark:ring-white/10 transition-all duration-200 ease-out origin-top",
            isMobileOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto visible"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none invisible"
          )}
        >
          {/* 'All' Option */}
          <button
            type="button"
            onClick={() => handleSelectFilter(null)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-mono transition-all duration-150 cursor-pointer",
              activeFilter === null
                ? "bg-accent text-on-accent font-bold shadow-xs"
                : "text-text hover:bg-bg/80 hover:translate-x-0.5"
            )}
          >
            <span className="flex items-center gap-2">
              <span>All Projects</span>
            </span>
            <div className="flex items-center gap-2">
              <span className={cn("text-[10px] font-bold", activeFilter === null ? "text-on-accent/80" : "text-muted")}>
                {repos.length}
              </span>
              {activeFilter === null && <TbCheck size={14} />}
            </div>
          </button>

          <div className="my-1 border-t border-line/50" />

          {/* Individual Stacks */}
          <div className="space-y-0.5">
            {orderedStacks.map(({ stack, count }) => {
              const isActive = activeFilter?.toLowerCase() === stack.toLowerCase();
              return (
                <button
                  key={`mobile-${stack}`}
                  type="button"
                  onClick={() => handleSelectFilter(stack)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-mono transition-all duration-150 cursor-pointer",
                    isActive
                      ? "bg-accent text-on-accent font-bold shadow-xs"
                      : "text-text hover:bg-bg/80 hover:translate-x-0.5"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <TechMark lang={stack} size={15} />
                    <span>{stack}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[10px] font-bold", isActive ? "text-on-accent/80" : "text-muted")}>
                      {count}
                    </span>
                    {isActive && <TbCheck size={14} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP WRAPPED PILLS CLUSTER (visible on screens >= 640px)             */}
      {/* ========================================================================= */}
      <div className="hidden sm:block mb-14 rounded-2xl border border-line/70 bg-surface/60 p-6 shadow-sm backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-line/50 pb-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted">
            Filter by Tech Stack
          </span>
          {activeFilter && (
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              className="font-mono text-xs text-accent transition-colors hover:underline cursor-pointer"
            >
              Reset filter ({filteredRepos.length} of {repos.length})
            </button>
          )}
        </div>

        {/* Desktop Pills Container with Floating Animated Pill */}
        <div ref={containerRef} className="relative flex flex-wrap items-center gap-2">
          {/* Animated Background Indicator */}
          <div
            ref={indicatorRef}
            className="pointer-events-none absolute left-0 top-0 rounded-full border border-accent bg-accent shadow-md shadow-accent/20 opacity-0"
            aria-hidden="true"
          />

          {/* 'All' Option Button */}
          <button
            ref={(el) => {
              if (el) buttonRefs.current.set("__ALL__", el);
              else buttonRefs.current.delete("__ALL__");
            }}
            type="button"
            onClick={() => setActiveFilter(null)}
            aria-pressed={activeFilter === null}
            className={cn(
              "group relative z-10 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium transition-all duration-200 cursor-pointer",
              activeFilter === null
                ? "border-transparent font-bold text-on-accent"
                : "border-line bg-surface text-muted hover:border-accent/40 hover:text-text hover:-translate-y-0.5"
            )}
          >
            <span>All</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] transition-all duration-200",
                activeFilter === null
                  ? "bg-white/25 font-bold text-on-accent shadow-xs"
                  : "border border-line/80 bg-bg text-muted"
              )}
            >
              {repos.length}
            </span>
          </button>

          {/* Individual Tech Stack Buttons */}
          {orderedStacks.map(({ stack, count }) => {
            const isActive = activeFilter?.toLowerCase() === stack.toLowerCase();
            return (
              <button
                key={`desktop-${stack}`}
                ref={(el) => {
                  if (el) buttonRefs.current.set(stack, el);
                  else buttonRefs.current.delete(stack);
                }}
                type="button"
                onClick={() => setActiveFilter(isActive ? null : stack)}
                aria-pressed={isActive}
                className={cn(
                  "group relative z-10 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium transition-all duration-200 cursor-pointer",
                  isActive
                    ? "border-transparent font-bold text-on-accent"
                    : "border-line bg-surface text-muted hover:border-accent/40 hover:text-text hover:-translate-y-0.5"
                )}
              >
                <TechMark lang={stack} size={14} />
                <span>{stack}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] transition-all duration-200",
                    isActive
                      ? "bg-white/25 font-bold text-on-accent shadow-xs"
                      : "border border-line/80 bg-bg text-muted"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Repositories List with Stable Key Transition */}
      <div key={activeFilter ?? "all-groups"} className="space-y-16 animate-in fade-in-50 duration-200">
        {activeFilter ? (
          /* Single Stack Filtered View */
          <section key={`section-${activeFilter}`} className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-xs text-accent">/</span>
              <div className="flex items-center gap-2">
                <TechMark lang={activeFilter} size={15} />
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text">
                  {activeFilter}
                </h2>
              </div>
              <span className="rounded-full border border-line/80 bg-surface/80 px-2 py-0.5 font-mono text-[10px] text-muted">
                {filteredRepos.length}
              </span>
              <div className="h-px flex-1 bg-line" />
            </div>

            {filteredRepos.length > 0 ? (
              <ul className="grid gap-4 sm:grid-cols-2">
                {filteredRepos.map((r) => (
                  <RepoCard key={r.name} repo={r} notes={notes} />
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-line bg-surface/60 p-10 text-center shadow-sm">
                <p className="text-sm text-muted">
                  No repositories found for &ldquo;{activeFilter}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveFilter(null)}
                  className="mt-3 inline-block font-mono text-xs text-accent hover:underline cursor-pointer"
                >
                  Show all repositories
                </button>
              </div>
            )}
          </section>
        ) : (
          /* All View: Grouped by Primary Stack */
          defaultGroups.map(({ lang, items }) => (
            <section key={`section-group-${lang}`} className="scroll-mt-24">
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-xs text-accent">/</span>
                <div className="flex items-center gap-2">
                  <TechMark lang={lang} size={15} />
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text">
                    {lang}
                  </h2>
                </div>
                <span className="rounded-full border border-line/80 bg-surface/80 px-2 py-0.5 font-mono text-[10px] text-muted">
                  {items.length}
                </span>
                <div className="h-px flex-1 bg-line" />
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {items.map((r) => (
                  <RepoCard key={r.name} repo={r} notes={notes} />
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
