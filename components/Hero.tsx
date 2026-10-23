"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const canTiltRef = useRef(false);

  // Subtle 3D parallax mouse tracking (desktop fine-pointer only)
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
    canTiltRef.current = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, 4200);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleMouseEnter = () => {
    if (canTiltRef.current) setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTiltRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (!canTiltRef.current) return;
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const tabs = [
    { id: 0 as const, num: "01", title: labels.design },
    { id: 1 as const, num: "02", title: labels.dev },
    { id: 2 as const, num: "03", title: labels.seo },
  ];

  const devItems = [
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
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2, ease: easeAsana }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[580px] mx-auto select-none md:perspective-[1200px]"
    >
      {/* Ambient soft backdrop glow (desktop/tablet only to save mobile GPU fill-rate) */}
      <div className="hidden sm:block absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-[#f3f3f3] via-[#e8eaed]/60 to-transparent blur-2xl -z-10" />

      {/* Outer Asana Surface Container */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="rounded-[20px] bg-[#f3f3f3] p-2.5 sm:p-4 border border-[#e5e7eb] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]"
      >
        {/* Top Workspace Bar */}
        <div className="flex items-center justify-between px-1.5 sm:px-2 pb-2.5 sm:pb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#0d0e10] flex-shrink-0" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#646f79]/50 flex-shrink-0" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#646f79]/25 flex-shrink-0" />
            <span className="ms-1.5 sm:ms-2 text-[11px] sm:text-[12px] font-medium text-[#646f79] truncate">
              {isAr ? "منصة مشاريع أرسان • الكويت" : "Arssan Studio • Kuwait Workspace"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 rounded-[64px] bg-[#ffffff] border border-[#e5e7eb] text-[10px] sm:text-[11px] font-medium text-[#0d0d0d] shadow-2xs flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>{isAr ? "مباشر" : "Live Sync"}</span>
          </div>
        </div>

        {/* Interactive Stage Switcher Pills (Compositor/CSS transitions without FLIP layoutId reflows) */}
        <div className="grid grid-cols-3 gap-1 sm:gap-1.5 p-1 rounded-[14px] bg-[#e6e8eb]/70 mb-2.5 sm:mb-3">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-[10px] text-[10px] xs:text-[11px] sm:text-[12px] font-medium transition-[background-color,color,box-shadow] duration-200 flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                  active
                    ? "bg-[#ffffff] text-[#0d0d0d] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    : "text-[#646f79] hover:text-[#0d0d0d]"
                }`}
              >
                <span className="text-[10px] sm:text-[11px] text-[#646f79] font-mono">
                  {tab.num}
                </span>
                <span className="truncate">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Inner White Canvas Card — CSS Grid Stack locks height across all 3 stages to prevent mobile page reflow */}
        <div className="rounded-[16px] bg-[#ffffff] border border-[#eceeef] p-3.5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="grid grid-cols-1 items-start">
            {/* Stage 0: Design */}
            <div
              aria-hidden={activeTab !== 0}
              className={`col-start-1 row-start-1 space-y-3 sm:space-y-4 transition-[opacity,transform] duration-300 ease-out ${
                activeTab === 0
                  ? "opacity-100 translate-y-0 relative z-10"
                  : "opacity-0 translate-y-1.5 pointer-events-none select-none"
              }`}
            >
              <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-[#f3f3f3] pb-2.5 sm:pb-3 gap-1">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-[#646f79] uppercase tracking-wider block">
                    {isAr ? "نظام التصميم الثنائي" : "Bilingual Design System"}
                  </span>
                  <h4 className="text-sm sm:text-base md:text-lg font-medium text-[#0d0d0d] mt-0.5">
                    {isAr ? "واجهة مستخدم عصرية (عربي / English)" : "Executive RTL & LTR Interface"}
                  </h4>
                </div>
                <span className="self-start xs:self-auto px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[64px] bg-[#f3f3f3] text-[10px] sm:text-[11px] font-medium text-[#0d0d0d]">
                  Figma + Design Tokens
                </span>
              </div>

              {/* Simulated UI Wireframe Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3">
                <div className="sm:col-span-7 rounded-[12px] bg-[#f3f3f3] p-3 sm:p-3.5 space-y-2.5 border border-[#e8eaed]">
                  <div className="flex items-center justify-between">
                    <span className="w-14 sm:w-16 h-2 rounded-full bg-[#0d0e10]" />
                    <span className="px-2 py-0.5 rounded-[4px] bg-[#ffffff] text-[10px] font-medium text-[#646f79]">
                      RTL / LTR
                    </span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div
                      className={`w-[85%] h-2.5 sm:h-3 rounded-[4px] bg-[#0d0d0d] origin-left rtl:origin-right transition-transform duration-700 ease-out ${
                        activeTab === 0 ? "scale-x-100" : "scale-x-50"
                      }`}
                    />
                    <div
                      className={`w-[65%] h-2.5 sm:h-3 rounded-[4px] bg-[#646f79]/60 origin-left rtl:origin-right transition-transform duration-700 delay-75 ease-out ${
                        activeTab === 0 ? "scale-x-100" : "scale-x-50"
                      }`}
                    />
                  </div>
                  <div className="pt-1.5 sm:pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="px-2.5 py-1 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-[10px] font-medium">
                      {isAr ? "تصفح الخدمات" : "Primary Action"}
                    </span>
                    <span className="px-2.5 py-1 rounded-[64px] bg-[#ffffff] text-[#0d0d0d] text-[10px] font-medium border border-[#e5e7eb]">
                      150 {isAr ? "د.ك" : "KWD"}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-5 flex flex-col justify-between rounded-[12px] border border-[#eceeef] p-3 sm:p-3.5 bg-[#ffffff]">
                  <span className="text-[10px] sm:text-[11px] font-medium text-[#646f79]">
                    {isAr ? "معايير الوصول" : "Accessibility"}
                  </span>
                  <div className="my-1.5 sm:my-2">
                    <div className="text-xl sm:text-2xl font-medium text-[#0d0d0d]">18.5:1</div>
                    <div className="text-[10px] sm:text-[11px] text-emerald-700 font-medium">
                      WCAG AAA Contrast
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0d0e10] border border-black/10" />
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#646f79] border border-black/10" />
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#f3f3f3] border border-black/15" />
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#ffffff] border border-black/15" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 1: Development */}
            <div
              aria-hidden={activeTab !== 1}
              className={`col-start-1 row-start-1 space-y-3 sm:space-y-4 transition-[opacity,transform] duration-300 ease-out ${
                activeTab === 1
                  ? "opacity-100 translate-y-0 relative z-10"
                  : "opacity-0 translate-y-1.5 pointer-events-none select-none"
              }`}
            >
              <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-[#f3f3f3] pb-2.5 sm:pb-3 gap-1">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-[#646f79] uppercase tracking-wider block">
                    {isAr ? "البنية البرمجية والربط المالي" : "Cloud & Payment Architecture"}
                  </span>
                  <h4 className="text-sm sm:text-base md:text-lg font-medium text-[#0d0d0d] mt-0.5">
                    {isAr ? "تطوير Next.js + بوابات الدفع الكويتية" : "Next.js 16 + Kuwait Payment Gateways"}
                  </h4>
                </div>
                <span className="self-start xs:self-auto px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-[10px] sm:text-[11px] font-medium">
                  99.9% Uptime
                </span>
              </div>

              {/* Live Task Execution Rows */}
              <div className="space-y-2">
                {devItems.map((item, idx) => (
                  <div
                    key={item.label}
                    style={{ transitionDelay: activeTab === 1 ? `${idx * 60}ms` : "0ms" }}
                    className={`flex items-center justify-between p-2.5 sm:p-3 rounded-[12px] bg-[#f3f3f3] border border-[#e8eaed] gap-2 transition-[opacity,transform] duration-300 ease-out ${
                      activeTab === 1
                        ? "opacity-100 translate-x-0"
                        : isAr
                        ? "opacity-0 translate-x-2"
                        : "opacity-0 -translate-x-2"
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0d0e10] text-[#ffffff] flex items-center justify-center text-[10px] sm:text-[11px] flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-[11px] sm:text-[13px] font-medium text-[#0d0d0d] leading-snug">
                        {item.label}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-[64px] bg-[#ffffff] text-[10px] sm:text-[11px] font-mono text-[#646f79] flex-shrink-0">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 2: SEO */}
            <div
              aria-hidden={activeTab !== 2}
              className={`col-start-1 row-start-1 space-y-3 sm:space-y-4 transition-[opacity,transform] duration-300 ease-out ${
                activeTab === 2
                  ? "opacity-100 translate-y-0 relative z-10"
                  : "opacity-0 translate-y-1.5 pointer-events-none select-none"
              }`}
            >
              <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-[#f3f3f3] pb-2.5 sm:pb-3 gap-1">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-[#646f79] uppercase tracking-wider block">
                    {isAr ? "النمو وتصدر نتائج البحث" : "Search Visibility & Conversion"}
                  </span>
                  <h4 className="text-sm sm:text-base md:text-lg font-medium text-[#0d0d0d] mt-0.5">
                    {isAr ? "تصدّر نتائج بحث جوجل في الكويت" : "Google Kuwait #1 Ranking Architecture"}
                  </h4>
                </div>
                <span className="self-start xs:self-auto px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[64px] bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] sm:text-[11px] font-medium">
                  +240% ROI
                </span>
              </div>

              {/* Animated Metrics & Bar Graph (GPU-composited scaleY / scaleX) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
                <div className="sm:col-span-7 rounded-[12px] bg-[#f3f3f3] p-3 sm:p-3.5 border border-[#e8eaed] flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#646f79] mb-2">
                    <span>{isAr ? "نمو الزيارات العضوية (الكويت)" : "Organic Traffic Growth (KW)"}</span>
                    <span className="font-mono text-[#0d0d0d] font-semibold">Q1 → Q4</span>
                  </div>
                  <div className="flex items-end gap-1.5 sm:gap-2 h-20 sm:h-24 pt-2 px-1">
                    {[35, 50, 68, 84, 100].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div
                          style={{
                            height: `${height}%`,
                            transitionDelay: activeTab === 2 ? `${i * 55}ms` : "0ms",
                          }}
                          className={`w-full rounded-t-[4px] sm:rounded-t-[6px] origin-bottom transition-transform duration-500 ease-out ${
                            activeTab === 2 ? "scale-y-100" : "scale-y-0"
                          } ${i === 4 ? "bg-[#0d0e10]" : "bg-[#646f79]/40"}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-5 rounded-[12px] bg-[#0d0e10] text-[#ffffff] p-3 sm:p-4 flex flex-col justify-between">
                  <span className="text-[10px] sm:text-[11px] text-[#ffffff]/70">
                    Core Web Vitals
                  </span>
                  <div className="my-1.5 sm:my-2">
                    <div className="text-2xl sm:text-3xl font-light tracking-tight">99/100</div>
                    <div className="text-[10px] sm:text-[11px] text-emerald-400 mt-0.5 sm:mt-1">
                      {isAr ? "أداء فائق السرعة" : "Optimal Speed"}
                    </div>
                  </div>
                  <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`w-[99%] bg-emerald-400 h-full rounded-full origin-left rtl:origin-right transition-transform duration-700 ease-out ${
                        activeTab === 2 ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Workspace Status Footer */}
          <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#f3f3f3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 text-[11px] sm:text-[12px] text-[#646f79]">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#646f79] flex-shrink-0" />
              <span className="truncate">
                {isAr
                  ? "الباقات تبدأ من 150 د.ك • تسليم احترافي سريع"
                  : "Packages from 150 KWD • Rapid Executive Delivery"}
              </span>
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#0d0d0d] font-medium self-end sm:self-auto">
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
            <div className="mb-5 sm:mb-8 space-y-1 sm:space-y-2">
              {titleLines.map((line, idx) => (
                <div key={idx} className="py-0.5">
                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 + idx * 0.06,
                      duration: 0.45,
                      ease: easeAsana,
                    }}
                    className={`${
                      isAr
                        ? "text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-medium leading-[1.2] sm:leading-[1.24]"
                        : "text-3xl xs:text-4xl sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] font-light leading-[1.08] sm:leading-[1.06] tracking-[-0.025em]"
                    } ${idx === 1 ? "text-[#646f79]" : "text-[#0d0d0d]"}`}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Measured Body Lead Copy (16px–18px, 1.6 line-height, #646f79) */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.45, ease: easeAsana }}
              className="text-[15px] sm:text-lg text-[#646f79] leading-[1.65] max-w-xl mb-6 sm:mb-10 font-normal"
            >
              {dict.hero.description}
            </motion.p>

            {/* High-Affordance Pill Buttons (48px height, 64px radius) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.45, ease: easeAsana }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5"
            >
              <a
                href={`/${lang}#pricing`}
                className="group inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 sm:px-8 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-[14px] sm:text-[15px] font-medium hover:bg-[#646f79] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-[background-color,transform] duration-200 active:scale-[0.98]"
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
                className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-7 rounded-[64px] bg-[#f3f3f3] text-[#0d0d0d] border border-[#e5e7eb] hover:bg-[#e8eaed] text-[14px] sm:text-[15px] font-medium transition-[background-color,transform] duration-200 active:scale-[0.98]"
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
        transition={{ delay: 0.4, duration: 0.4 }}
        className="relative z-10 bg-[#f3f3f3] sm:bg-[#f3f3f3]/80 sm:backdrop-blur-sm border-t border-[#e8eaed] py-3.5 sm:py-4"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] sm:text-[13px] text-[#646f79]">
          <div className="grid grid-cols-1 xs:grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-6 md:gap-8 w-full sm:w-auto text-start">
            <span className="flex items-center justify-start gap-2 text-[#0d0d0d] font-medium">
              <span className="px-2 py-0.5 rounded-[4px] bg-[#ffffff] border border-[#e5e7eb] text-[10px] sm:text-[11px] font-mono text-[#646f79]">
                01
              </span>
              <span className="truncate">{dict.hero.pipeline_design}</span>
            </span>
            <span className="flex items-center justify-start gap-2 text-[#0d0d0d] font-medium">
              <span className="px-2 py-0.5 rounded-[4px] bg-[#ffffff] border border-[#e5e7eb] text-[10px] sm:text-[11px] font-mono text-[#646f79]">
                02
              </span>
              <span className="truncate">{dict.hero.pipeline_dev}</span>
            </span>
            <span className="flex items-center justify-start gap-2 text-[#0d0d0d] font-medium">
              <span className="px-2 py-0.5 rounded-[4px] bg-[#ffffff] border border-[#e5e7eb] text-[10px] sm:text-[11px] font-mono text-[#646f79]">
                03
              </span>
              <span className="truncate">{dict.hero.pipeline_seo}</span>
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
