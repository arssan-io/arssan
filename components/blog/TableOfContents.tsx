"use client";

import { useState, useEffect } from "react";
import type { TocHeading } from "@/lib/sanity/types";

interface TableOfContentsProps {
  headings: TocHeading[];
  label: string;
}

export function TableOfContents({ headings, label }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-96px 0px -65% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <>
      {/* Mobile Collapsible TOC Pill */}
      <div className="lg:hidden mb-7 rounded-[16px] bg-[#f3f3f3] border border-[#e5e7eb] overflow-hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-medium text-[#0d0d0d] cursor-pointer"
          aria-expanded={mobileOpen}
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d0e10]" />
            <span>{label}</span>
          </span>
          <span className="font-mono text-xs text-[#646f79]">
            {mobileOpen ? "−" : "+"}
          </span>
        </button>

        {mobileOpen && (
          <nav
            aria-label={label}
            className="px-4 pb-3.5 pt-1 border-t border-[#e5e7eb] space-y-2"
          >
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={() => setMobileOpen(false)}
                className={`block text-xs sm:text-[13px] py-1 transition-colors ${
                  h.level === 3 ? "ps-3" : ""
                } ${
                  activeId === h.id
                    ? "text-[#0d0d0d] font-semibold"
                    : "text-[#646f79] hover:text-[#0d0d0d]"
                }`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <nav
        aria-label={label}
        className="hidden lg:block sticky top-28 rounded-[20px] bg-[#f3f3f3] border border-[#e6e8eb] p-5"
      >
        <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-[#e5e7eb]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d0e10]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0d0d0d]">
            {label}
          </span>
        </div>

        <ul className="space-y-2 text-[13px]">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li key={h.id} className={h.level === 3 ? "ps-3" : ""}>
                <a
                  href={`#${h.id}`}
                  className={`block py-1 leading-snug transition-colors border-s-2 ps-2.5 ${
                    isActive
                      ? "border-[#0d0e10] text-[#0d0d0d] font-medium"
                      : "border-transparent text-[#646f79] hover:text-[#0d0d0d]"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
