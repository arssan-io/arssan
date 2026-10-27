"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AnimateInView } from "./AnimateInView";
import type { Locale } from "@/lib/i18n";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  categoryKey: string;
  categoryLabel: string;
  client: string;
  year: string;
  url: string;
  liveUrl?: string;
  description: string;
  metrics: {
    value: string;
    label: string;
  };
  tags: string[];
  inquiryMessage: string;
}

interface ProjectsViewProps {
  lang: Locale;
  dict: {
    nav: {
      home: string;
      contact: string;
    };
    projects_page: {
      badge: string;
      title: string;
      subtitle: string;
      all_filter: string;
      categories: Record<string, string>;
      stats: Array<{ value: string; label: string }>;
      projects: ProjectItem[];
      cta: {
        inquire_btn: string;
        visit_btn?: string;
      };
    };
  };
}

function AhmedMockupCanvas({ isAr }: { isAr: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-48 sm:h-52 bg-[#090808] text-[#f4f4f5] p-5 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden transition-colors"
    >
      {/* Subtle top metadata */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#a1a1aa]">
        <div className="flex items-center gap-1.5" dir="ltr">
          {/* Signature 4-pointed golden star from icon.svg */}
          <svg
            viewBox="0 0 1000 1000"
            className="w-3.5 h-3.5 text-[#ffbc00] fill-current flex-shrink-0"
          >
            <path d="M836.7,510.4c-222.5,57.3-275.9,116.2-326.2,366.1-2.3,11.4-18.7,11.4-21,0-50.3-249.8-103.7-308.8-326.2-366.1-10.7-2.8-10.7-18,0-20.7,222.5-57.3,275.9-116.2,326.2-366.1,2.3-11.4,18.7-11.4,21,0,50.3,249.8,103.7,308.8,326.2,366.1,10.7,2.8,10.7,18,0,20.7Z" />
          </svg>
          <span className="text-[#ffffff] font-medium">ahmedabdelwahed.me</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] uppercase tracking-wider">{isAr ? "متاح للعمل" : "Open to Work"}</span>
        </div>
      </div>

      {/* Hero display with Osmar Blobatar mascot */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#71717a] mb-0.5">
            {isAr ? "سيرة ذاتية وبايو" : "Personal Brand & Bio"}
          </div>
          <div className="text-lg sm:text-xl font-medium text-[#ffffff] tracking-tight">
            {isAr ? "أحمد عبدالواحد" : "Ahmed Abdelwahed"}
          </div>
          <div className="text-xs text-[#a1a1aa] mt-0.5 font-normal">
            {isAr ? "مهندس بيانات ومطور برمجيات" : "Data Engineer & Software Developer"}
          </div>
        </div>

        {/* Minimalist interactive Blobatar */}
        <div
          className={`w-11 h-11 rounded-2xl bg-[#18181b] border border-[#27272a] flex items-center justify-center p-1.5 transition-transform duration-300 ${
            isHovered ? "scale-110 -rotate-3" : ""
          }`}
          title="Osmar"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50 14 C74 14 88 28 88 50 C88 74 74 88 50 88 C26 88 12 74 12 50 C12 28 26 14 50 14 Z"
              fill="#2563eb"
            />
            {isHovered ? (
              <>
                <path d="M36 48 Q42 42 48 48" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
                <ellipse cx="62" cy="46" rx="4.5" ry="7" fill="#ffffff" />
                <circle cx="63" cy="46" r="2.5" fill="#090808" />
              </>
            ) : (
              <>
                <ellipse cx="38" cy="46" rx="4" ry="6.5" fill="#ffffff" />
                <ellipse cx="62" cy="46" rx="4" ry="6.5" fill="#ffffff" />
                <circle cx="39" cy="46" r="2.2" fill="#090808" />
                <circle cx="63" cy="46" r="2.2" fill="#090808" />
              </>
            )}
            <path d="M44 62 Q50 67 56 62" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>

      {/* Clean capability badges */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-[#a1a1aa]">
        <span className="px-2.5 py-0.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#e4e4e7]">
          Agent Ready RFC 9727
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#e4e4e7]">
          WebMCP
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#e4e4e7] hidden sm:inline">
          Next.js 16
        </span>
      </div>
    </div>
  );
}

function KuwaitMockupCanvas({ isAr }: { isAr: boolean }) {
  return (
    <div className="h-48 sm:h-52 bg-gradient-to-b from-[#f8f7f4] via-[#f3f0e8] to-[#e8e4db] text-[#1c1917] p-5 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Subtle top metadata */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#78716c]">
        <div className="flex items-center gap-1.5" dir="ltr">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          <span className="font-medium text-[#292524]">kuwait.arssan.com</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffffff]/80 border border-[#e7e5e4] text-[#44403c]">
          {isAr ? "٦٥ عاماً من النهضة" : "65 Years of Legacy"}
        </span>
      </div>

      {/* Center Editorial Typography Specimen */}
      <div className="py-1">
        <div className="text-[11px] font-mono text-amber-700 font-medium mb-1">
          {isAr ? "دولة الكويت" : "State of Kuwait"}
        </div>
        <div className="text-xl sm:text-2xl font-bold text-[#1c1917] tracking-tight leading-none mb-1.5">
          الـكـويـت، حـكـايـة أبــــــــعــــــــد
        </div>
        <div className="flex items-center gap-2 text-xs text-[#57534e]">
          <span className="w-5 h-[1.5px] bg-amber-600 inline-block" />
          <span>مِـنَ الأُفُـق • Editorial Scrollytelling</span>
        </div>
      </div>

      {/* Bottom capability tags */}
      <div className="flex items-center gap-1.5 overflow-hidden text-[10px] font-mono">
        <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#e7e5e4] text-[#57534e]">
          Arabic Typography
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#e7e5e4] text-[#57534e]">
          GSAP & Lenis
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#e7e5e4] text-[#57534e] hidden sm:inline">
          Scrollytelling
        </span>
      </div>
    </div>
  );
}

function ProjectMockupCanvas({ project }: { project: ProjectItem }) {
  const parts = project.title.split("—");
  const mainTitle = parts[0]?.trim() || project.title;
  const subtitle = parts[1]?.trim() || project.client;

  return (
    <div className="h-48 sm:h-52 bg-gradient-to-b from-[#fafafa] to-[#f4f5f7] p-5 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Subtle top metadata */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#646f79]">
        <span className="uppercase tracking-wider font-medium text-[#0d0d0d]">
          {project.categoryLabel}
        </span>
        <span className="text-[#9ca3af]">{project.year}</span>
      </div>

      {/* Center brand specimen */}
      <div>
        <div className="text-lg sm:text-xl font-medium text-[#0d0d0d] tracking-tight mb-1">
          {mainTitle}
        </div>
        <div className="text-xs text-[#646f79] line-clamp-1">
          {subtitle}
        </div>
      </div>

      {/* Bottom capability pills */}
      <div className="flex items-center gap-1.5 overflow-hidden">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#e5e7eb] text-[#646f79] whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectsView({ lang, dict }: ProjectsViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const isAr = lang === "ar";
  const t = dict.projects_page;

  const categories = [
    { key: "all", label: t.all_filter },
    ...Object.entries(t.categories).map(([key, label]) => ({ key, label })),
  ];

  const filteredProjects =
    activeCategory === "all"
      ? t.projects
      : t.projects.filter((p) => p.categoryKey === activeCategory);

  return (
    <div className="min-h-[100svh] pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-[#ffffff] text-[#0d0d0d] overflow-hidden border-b border-[#f3f3f3]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Navigation Breadcrumb / Back Link */}
        <AnimateInView className="mb-4 sm:mb-6">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[64px] bg-[#f3f3f3] border border-[#e5e7eb] text-xs font-medium text-[#646f79] hover:text-[#0d0d0d] hover:bg-[#e8eaed] transition-all duration-200 group"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180">
              ←
            </span>
            <span>{dict.nav.home}</span>
          </Link>
        </AnimateInView>

        {/* Page Hero Header */}
        <AnimateInView className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col items-start text-start max-w-3xl">
            {/* Asana Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-[64px] bg-[#f3f3f3] border border-[#e5e7eb] text-[12px] sm:text-[13px] font-medium text-[#646f79] mb-3 sm:mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] text-[#0d0d0d] leading-[1.2] mb-3 sm:mb-4">
              {t.title}
            </h1>

            <p className="text-[14px] sm:text-base text-[#646f79] leading-[1.65] font-normal">
              {t.subtitle}
            </p>
          </div>
        </AnimateInView>

        {/* Engineering Benchmark Strip (4 Key Standards) */}
        <AnimateInView delay={0.06} className="mb-8 sm:mb-10 md:mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-[20px] bg-[#f3f3f3] border border-[#e6e8eb]">
            {t.stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-[16px] bg-[#ffffff] border border-[#eceeef] p-3.5 sm:p-4 md:p-5 flex flex-col justify-center text-start shadow-[0_2px_6px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-[#646f79]">0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-[#0d0d0d]">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-[13px] text-[#646f79] mt-0.5 font-normal leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimateInView>

        {/* Interactive Filter Pills */}
        <AnimateInView delay={0.1} className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none text-start">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative flex-shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[64px] text-xs sm:text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#0d0e10] text-[#ffffff] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                      : "bg-[#f3f3f3] text-[#646f79] hover:text-[#0d0d0d] hover:bg-[#e8eaed]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </AnimateInView>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const projectHref = project.liveUrl || `https://${project.url}`;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <div className="group h-full rounded-[20px] bg-[#ffffff] border border-[#e6e8eb] p-5 sm:p-6 flex flex-col justify-between text-start transition-all duration-300 md:hover:-translate-y-1 hover:border-[#646f79]/40 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.02)]">
                    <div>
                      {/* Architectural Mockup Header (Browser Frame) */}
                      <div className="mb-5 rounded-[14px] bg-[#fafafa] border border-[#eceeef] overflow-hidden transition-colors duration-200 group-hover:border-[#d1d5db]">
                        {/* Browser Top Chrome */}
                        <div className="px-4 py-2.5 bg-[#ffffff] border-b border-[#eceeef] flex items-center justify-between gap-3">
                          {/* 3 Window Control Dots */}
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#e5e7eb] group-hover:bg-[#d1d5db] transition-colors" />
                            <span className="w-2 h-2 rounded-full bg-[#e5e7eb] group-hover:bg-[#d1d5db] transition-colors" />
                            <span className="w-2 h-2 rounded-full bg-[#e5e7eb] group-hover:bg-[#d1d5db] transition-colors" />
                          </div>

                          {/* URL Pill (Clickable) */}
                          <a
                            href={projectHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            dir="ltr"
                            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-[64px] bg-[#f8f9fa] border border-[#e5e7eb] text-[11px] font-mono text-[#646f79] hover:text-[#0d0d0d] hover:bg-[#ffffff] transition-all duration-200 group/url"
                            title={isAr ? `زيارة موقع ${project.url}` : `Visit ${project.url}`}
                          >
                            <span className="text-[10px] text-[#9ca3af]">https://</span>
                            <span className="font-medium text-[#0d0d0d]">{project.url}</span>
                            <span className="text-[10px] opacity-50 group-hover/url:opacity-100 transition-opacity">↗</span>
                          </a>

                          {/* Live Status Badge */}
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="hidden sm:inline text-[11px]">Live</span>
                          </div>
                        </div>

                        {/* Mockup Canvas Screen */}
                        {project.id === "ahmed-abdelwahed" ? (
                          <AhmedMockupCanvas isAr={isAr} />
                        ) : project.id === "kuwait-showcase" ? (
                          <KuwaitMockupCanvas isAr={isAr} />
                        ) : (
                          <ProjectMockupCanvas project={project} />
                        )}
                      </div>

                      {/* Metadata Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#646f79] truncate">
                          {project.client}
                        </span>
                        <span className="text-xs font-mono text-[#9ca3af]">
                          0{idx + 1}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-[22px] font-medium tracking-tight text-[#0d0d0d] mb-2 leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-[14px] text-[#646f79] leading-[1.65] mb-4 font-normal line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tags List */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-[64px] bg-[#f8f9fa] border border-[#e5e7eb] text-xs font-medium text-[#4b5563]"
                          >
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom Actions */}
                    <div className="pt-4 border-t border-[#f0f0f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-[#646f79]">
                          {project.metrics.label}:
                        </span>
                        <span className="text-sm font-semibold text-[#0d0d0d]">
                          {project.metrics.value}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={projectHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-[64px] bg-[#ffffff] border border-[#e5e7eb] text-[#0d0d0d] text-xs font-medium hover:bg-[#f3f3f3] hover:border-[#646f79]/40 transition-all duration-200 active:scale-[0.98]"
                          title={isAr ? `زيارة موقع ${project.url}` : `Visit ${project.url}`}
                        >
                          <span>{t.cta.visit_btn || (isAr ? "زيارة الموقع" : "Visit Site")}</span>
                          <span className="text-[11px] opacity-70">↗</span>
                        </a>

                        <a
                          href={`https://wa.me/46700265645?text=${encodeURIComponent(
                            project.inquiryMessage
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-xs font-medium hover:bg-[#646f79] transition-all duration-200 active:scale-[0.98]"
                        >
                          <span>{t.cta.inquire_btn}</span>
                          <span className="rtl:rotate-180 text-xs">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
