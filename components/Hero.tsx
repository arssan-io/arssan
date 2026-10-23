"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { FloatingShapes, heroShapes } from "./FloatingShapes";

interface HeroProps {
  lang: Locale;
  dict: {
    nav: {
      contact: string;
    };
    hero: {
      tagline: string;
      title_line1: string;
      title_line2: string;
      title_line3: string;
      description: string;
      cta: string;
      pipeline_design: string;
      pipeline_dev: string;
      pipeline_seo: string;
    };
  };
}

const easeAsana = [0.22, 1, 0.36, 1] as [number, number, number, number];

function AsanaProjectShowcase({
  lang,
  labels,
}: {
  lang: Locale;
  labels: { design: string; dev: string; seo: string };
}) {
  const isAr = lang === "ar";
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [isHovered, setIsHovered] = useState(false);

  // Subtle 3D parallax mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 180,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 180,
    damping: 25,
  });

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, 4200);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const tabs = [
    { id: 0 as const, num: "01", title: labels.design },
    { id: 1 as const, num: "02", title: labels.dev },
    { id: 2 as const, num: "03", title: labels.seo },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.25, ease: easeAsana }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-[580px] mx-auto select-none"
    >
      {/* Ambient soft backdrop glow */}
      <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-[#f3f3f3] via-[#e8eaed]/60 to-transparent blur-2xl -z-10" />

      {/* Outer Asana Surface Container */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="rounded-[20px] bg-[#f3f3f3] p-3 sm:p-4 border border-[#e5e7eb] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]"
      >
        {/* Top Workspace Bar */}
        <div className="flex items-center justify-between px-2 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0d0e10]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#646f79]/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#646f79]/25" />
            <span className="ms-2 text-[12px] font-medium text-[#646f79]">
              {isAr ? "منصة مشاريع أرسان • الكويت" : "Arssan Studio • Kuwait Workspace"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-[64px] bg-[#ffffff] border border-[#e5e7eb] text-[11px] font-medium text-[#0d0d0d] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>{isAr ? "مباشر" : "Live Sync"}</span>
          </div>
        </div>

        {/* Interactive Stage Switcher Pills */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-[14px] bg-[#e6e8eb]/70 mb-3">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-2 px-2.5 rounded-[10px] text-[12px] font-medium transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  active ? "text-[#0d0d0d]" : "text-[#646f79] hover:text-[#0d0d0d]"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="hero-showcase-tab"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-[10px] bg-[#ffffff] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  />
                )}
                <span className="relative z-10 text-[11px] text-[#646f79] font-mono">
                  {tab.num}
                </span>
                <span className="relative z-10 truncate">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Inner White Canvas Card */}
        <div className="rounded-[16px] bg-[#ffffff] border border-[#eceeef] p-4 sm:p-6 min-h-[290px] sm:min-h-[310px] flex flex-col justify-between relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="stage-design"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#f3f3f3] pb-3">
                  <div>
                    <span className="text-[11px] font-medium text-[#646f79] uppercase tracking-wider block">
                      {isAr ? "نظام التصميم الثنائي" : "Bilingual Design System"}
                    </span>
                    <h4 className="text-base sm:text-lg font-medium text-[#0d0d0d] mt-0.5">
                      {isAr ? "واجهة مستخدم عصرية (عربي / English)" : "Executive RTL & LTR Interface"}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-[64px] bg-[#f3f3f3] text-[11px] font-medium text-[#0d0d0d]">
                    Figma + Design Tokens
                  </span>
                </div>

                {/* Simulated UI Wireframe Grid */}
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-7 rounded-[12px] bg-[#f3f3f3] p-3.5 space-y-2.5 border border-[#e8eaed]">
                    <div className="flex items-center justify-between">
                      <span className="w-16 h-2 rounded-full bg-[#0d0e10]" />
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#ffffff] text-[10px] font-medium text-[#646f79]">
                        RTL / LTR
                      </span>
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <motion.div
                        initial={{ width: "40%" }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 0.8, ease: easeAsana }}
                        className="h-3 rounded-[4px] bg-[#0d0d0d]"
                      />
                      <motion.div
                        initial={{ width: "30%" }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: easeAsana }}
                        className="h-3 rounded-[4px] bg-[#646f79]/60"
                      />
                    </div>
                    <div className="pt-2 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-[10px] font-medium">
                        {isAr ? "تصفح الخدمات" : "Primary Action"}
                      </span>
                      <span className="px-3 py-1 rounded-[64px] bg-[#ffffff] text-[#0d0d0d] text-[10px] font-medium border border-[#e5e7eb]">
                        150 {isAr ? "د.ك" : "KWD"}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-5 flex flex-col justify-between rounded-[12px] border border-[#eceeef] p-3.5 bg-[#ffffff]">
                    <span className="text-[11px] font-medium text-[#646f79]">
                      {isAr ? "معايير الوصول" : "Accessibility"}
                    </span>
                    <div className="my-2">
                      <div className="text-2xl font-medium text-[#0d0d0d]">18.5:1</div>
                      <div className="text-[11px] text-emerald-700 font-medium">
                        WCAG AAA Contrast
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#0d0e10] border border-black/10" />
                      <span className="w-5 h-5 rounded-full bg-[#646f79] border border-black/10" />
                      <span className="w-5 h-5 rounded-full bg-[#f3f3f3] border border-black/15" />
                      <span className="w-5 h-5 rounded-full bg-[#ffffff] border border-black/15" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                key="stage-dev"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#f3f3f3] pb-3">
                  <div>
                    <span className="text-[11px] font-medium text-[#646f79] uppercase tracking-wider block">
                      {isAr ? "البنية البرمجية والربط المالي" : "Cloud & Payment Architecture"}
                    </span>
                    <h4 className="text-base sm:text-lg font-medium text-[#0d0d0d] mt-0.5">
                      {isAr ? "تطوير Next.js + بوابات الدفع الكويتية" : "Next.js 16 + Kuwait Payment Gateways"}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-[11px] font-medium">
                    99.9% Uptime
                  </span>
                </div>

                {/* Live Task Execution Rows */}
                <div className="space-y-2.5">
                  {[
                    {
                      label: isAr
                        ? "بنية سحابية فائقة السرعة (Next.js App Router)"
                        : "Next.js Server Rendering & Edge Caching",
                      badge: "12ms TTFB",
                    },
                    {
                      label: isAr
                        ? "ربط بوابات الدفع المعتمدة (KNET / MyFatoorah / Tap)"
                        : "KNET, Tap & MyFatoorah Payment Gateway Ready",
                      badge: "KWD Ready",
                    },
                    {
                      label: isAr
                        ? "حماية SSL متقدمة وتوافق كامل مع كافة الأجهزة"
                        : "Enterprise SSL Security & Mobile Optimization",
                      badge: "Verified",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: isAr ? 12 : -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.25 }}
                      className="flex items-center justify-between p-3 rounded-[12px] bg-[#f3f3f3] border border-[#e8eaed]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-[#0d0e10] text-[#ffffff] flex items-center justify-center text-[11px] flex-shrink-0">
                          ✓
                        </span>
                        <span className="text-[13px] font-medium text-[#0d0d0d] truncate">
                          {item.label}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-[64px] bg-[#ffffff] text-[11px] font-mono text-[#646f79] flex-shrink-0 ms-2">
                        {item.badge}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 2 && (
              <motion.div
                key="stage-seo"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#f3f3f3] pb-3">
                  <div>
                    <span className="text-[11px] font-medium text-[#646f79] uppercase tracking-wider block">
                      {isAr ? "النمو وتصدر نتائج البحث" : "Search Visibility & Conversion"}
                    </span>
                    <h4 className="text-base sm:text-lg font-medium text-[#0d0d0d] mt-0.5">
                      {isAr ? "تصدّر نتائج بحث جوجل في الكويت" : "Google Kuwait #1 Ranking Architecture"}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-[64px] bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium">
                    +240% ROI
                  </span>
                </div>

                {/* Animated Metrics & Bar Graph */}
                <div className="grid grid-cols-12 gap-3 items-stretch">
                  <div className="col-span-7 rounded-[12px] bg-[#f3f3f3] p-3.5 border border-[#e8eaed] flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] text-[#646f79] mb-2">
                      <span>{isAr ? "نمو الزيارات العضوية (الكويت)" : "Organic Traffic Growth (KW)"}</span>
                      <span className="font-mono text-[#0d0d0d] font-semibold">Q1 → Q4</span>
                    </div>
                    <div className="flex items-end gap-2 h-24 pt-2 px-1">
                      {[35, 50, 68, 84, 100].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.5, delay: i * 0.07, ease: easeAsana }}
                            className={`w-full rounded-t-[6px] ${
                              i === 4 ? "bg-[#0d0e10]" : "bg-[#646f79]/40"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-5 rounded-[12px] bg-[#0d0e10] text-[#ffffff] p-4 flex flex-col justify-between">
                    <span className="text-[11px] text-[#ffffff]/70">
                      Core Web Vitals
                    </span>
                    <div>
                      <div className="text-3xl font-light tracking-tight">99/100</div>
                      <div className="text-[11px] text-emerald-400 mt-1">
                        {isAr ? "أداء فائق السرعة" : "Optimal Speed"}
                      </div>
                    </div>
                    <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "99%" }}
                        transition={{ duration: 0.7, ease: easeAsana }}
                        className="bg-emerald-400 h-full rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Workspace Status Footer */}
          <div className="pt-4 mt-4 border-t border-[#f3f3f3] flex items-center justify-between text-[12px] text-[#646f79]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#646f79]" />
              <span>
                {isAr
                  ? "الباقات تبدأ من 150 د.ك • تسليم احترافي سريع"
                  : "Packages from 150 KWD • Rapid Executive Delivery"}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#0d0d0d] font-medium">
              29°22&apos;N 47°58&apos;E
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero({ lang, dict }: HeroProps) {
  const isAr = lang === "ar";
  const titleLines = [
    dict.hero.title_line1,
    dict.hero.title_line2,
    dict.hero.title_line3,
  ];

  return (
    <section className="relative min-h-[92svh] bg-[#ffffff] text-[#0d0d0d] flex flex-col justify-between pt-20 sm:pt-24 md:pt-24 overflow-hidden border-b border-[#f3f3f3]">
      {/* Subtle Architectural Grid + Floating Geometry */}
      <div className="absolute inset-0 bg-asana-grid opacity-70 pointer-events-none" />
      <FloatingShapes shapes={heroShapes} color="text-[#646f79]" />

      {/* Main Content Container (8px base grid aligned) */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-5 sm:px-8 flex-1 flex flex-col justify-center pt-3 pb-8 md:pt-5 md:pb-12 text-start">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Asana Display Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Calm Competence Tagline Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeAsana }}
              className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-[64px] bg-[#f3f3f3] border border-[#e6e8eb] text-[13px] font-medium text-[#0d0d0d]">
                <span className="w-2 h-2 rounded-full bg-[#0d0e10]" />
                <span>{dict.hero.tagline}</span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-[64px] border border-[#f3f3f3] text-[12px] font-mono text-[#646f79]">
                KW • KWD (د.ك)
              </span>
            </motion.div>

            {/* Asana Display Hierarchy (54px+ scale, light/measured weight, tight tracking in EN, generous breathing room in AR) */}
            <div className="mb-6 sm:mb-8 space-y-1 sm:space-y-2">
              {titleLines.map((line, idx) => (
                <div key={idx} className="overflow-hidden py-0.5">
                  <motion.h1
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + idx * 0.08,
                      duration: 0.55,
                      ease: easeAsana,
                    }}
                    className={`${
                      isAr
                        ? "text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-medium leading-[1.24]"
                        : "text-4xl sm:text-6xl md:text-[3.75rem] lg:text-[4.25rem] font-light leading-[1.06] tracking-[-0.025em]"
                    } ${idx === 1 ? "text-[#646f79]" : "text-[#0d0d0d]"}`}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Measured Body Lead Copy (16px–18px, 1.6 line-height, #646f79) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: easeAsana }}
              className="text-base sm:text-lg text-[#646f79] leading-[1.65] max-w-xl mb-8 sm:mb-10 font-normal"
            >
              {dict.hero.description}
            </motion.p>

            {/* High-Affordance Pill Buttons (48px height, 64px radius) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.5, ease: easeAsana }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <a
                href={`/${lang}#pricing`}
                className="group inline-flex items-center justify-center gap-3 h-12 px-8 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-[15px] font-medium hover:bg-[#646f79] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-200 active:scale-[0.98]"
              >
                <span>{dict.hero.cta}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
                  →
                </span>
              </a>

              <a
                href="https://wa.me/46700265645"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-[64px] bg-[#f3f3f3] text-[#0d0d0d] border border-[#e5e7eb] hover:bg-[#e8eaed] text-[15px] font-medium transition-all duration-200 active:scale-[0.98]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>{dict.nav.contact}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Asana Workspace Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <AsanaProjectShowcase
              lang={lang}
              labels={{
                design: dict.hero.pipeline_design,
                dev: dict.hero.pipeline_dev,
                seo: dict.hero.pipeline_seo,
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Calm Surface Metrics & Workflow Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="relative z-10 bg-[#f3f3f3]/80 backdrop-blur-sm border-t border-[#e8eaed] py-4"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#646f79]">
          <div className="grid grid-cols-3 sm:flex sm:items-center gap-3 sm:gap-8 w-full sm:w-auto text-center sm:text-start">
            <span className="flex items-center justify-center sm:justify-start gap-2 text-[#0d0d0d] font-medium">
              <span className="px-2 py-0.5 rounded-[4px] bg-[#ffffff] border border-[#e5e7eb] text-[11px] font-mono text-[#646f79]">
                01
              </span>
              <span>{dict.hero.pipeline_design}</span>
            </span>
            <span className="flex items-center justify-center sm:justify-start gap-2 text-[#0d0d0d] font-medium">
              <span className="px-2 py-0.5 rounded-[4px] bg-[#ffffff] border border-[#e5e7eb] text-[11px] font-mono text-[#646f79]">
                02
              </span>
              <span>{dict.hero.pipeline_dev}</span>
            </span>
            <span className="flex items-center justify-center sm:justify-start gap-2 text-[#0d0d0d] font-medium">
              <span className="px-2 py-0.5 rounded-[4px] bg-[#ffffff] border border-[#e5e7eb] text-[11px] font-mono text-[#646f79]">
                03
              </span>
              <span>{dict.hero.pipeline_seo}</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[12px] text-[#646f79]">
            <span>{isAr ? "مصمّم للسوق الكويتي والخليجي" : "Engineered for Kuwait & GCC"}</span>
            <span className="text-[#0d0d0d]">•</span>
            <span className="font-mono text-[#0d0d0d] font-medium">KNET / RTL / SEO</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
