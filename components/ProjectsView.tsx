"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  image?: string;
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

                        {/* Real Project Image Preview */}
                        <a
                          href={projectHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block relative aspect-[16/10] w-full overflow-hidden bg-[#f4f5f7] cursor-pointer"
                          title={isAr ? `زيارة موقع ${project.url}` : `Visit ${project.url}`}
                        >
                          <Image
                            src={project.image || `/images/projects/${project.id}.webp`}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 560px"
                            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            priority={idx < 2}
                          />
                        </a>
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
                        {project.tags.slice(0, 5).map((tag) => (
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
