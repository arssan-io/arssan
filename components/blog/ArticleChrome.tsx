"use client";

import { useState, useEffect } from "react";
import { trackBlogView, trackBlogShare } from "@/lib/analytics";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-transparent pointer-events-none"
    >
      <div
        style={{ width: `${progress}%` }}
        className="h-full bg-[#0d0e10] transition-[width] duration-75"
      />
    </div>
  );
}

export function ArticleViewTracker({
  slug,
  title,
  language,
  category,
  readingTime,
}: {
  slug: string;
  title: string;
  language: string;
  category?: string;
  readingTime?: number;
}) {
  useEffect(() => {
    trackBlogView({ slug, title, language, category, readingTime });
  }, [slug, title, language, category, readingTime]);

  return null;
}

export function ShareBar({
  slug,
  title,
  labels,
}: {
  slug: string;
  title: string;
  labels: {
    share_article: string;
    copy_link: string;
    link_copied: string;
  };
}) {
  const [copied, setCopied] = useState(false);

  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      trackBlogShare({ articleSlug: slug, method: "copy_link" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-y border-[#f3f3f3]">
      <span className="text-xs font-medium uppercase tracking-wider text-[#646f79]">
        {labels.share_article}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[64px] bg-[#f3f3f3] hover:bg-[#e5e7eb] text-xs font-medium text-[#0d0d0d] transition-colors cursor-pointer"
        >
          <span>{copied ? labels.link_copied : labels.copy_link}</span>
        </button>

        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackBlogShare({ articleSlug: slug, method: "x" })}
          className="inline-flex items-center justify-center h-9 px-3.5 rounded-[64px] bg-[#f3f3f3] hover:bg-[#0d0e10] text-xs font-medium text-[#0d0d0d] hover:text-[#ffffff] transition-colors"
        >
          X
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackBlogShare({ articleSlug: slug, method: "linkedin" })
          }
          className="inline-flex items-center justify-center h-9 px-3.5 rounded-[64px] bg-[#f3f3f3] hover:bg-[#0d0e10] text-xs font-medium text-[#0d0d0d] hover:text-[#ffffff] transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
