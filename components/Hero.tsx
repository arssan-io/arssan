"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
      {/* Ambient soft backdrop glow */}
      <div className="hidden sm:block absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-white/10 via-white/[0.04] to-transparent blur-2xl -z-10" />

      {/* Outer Asana Surface Container (Pro Glassmorphism) */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="rounded-[20px] bg-black/40 sm:bg-black/30 backdrop-blur-2xl p-2.5 sm:p-4 border border-white/20 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.25)]"
      >
        {/* Top Workspace Bar */}
        <div className="flex items-center justify-between px-1.5 sm:px-2 pb-2.5 sm:pb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)] flex-shrink-0" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/40 flex-shrink-0" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20 flex-shrink-0" />
            <span className="ms-1.5 sm:ms-2 text-[11px] sm:text-[12px] font-medium text-white/70 truncate">
              {isAr ? "منصة مشاريع أرسان • الكويت" : "Arssan Studio • Kuwait Workspace"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 rounded-[64px] bg-white/[0.1] border border-white/20 text-[10px] sm:text-[11px] font-medium text-white shadow-2xs flex-shrink-0 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>{isAr ? "مباشر" : "Live Sync"}</span>
          </div>
        </div>

        {/* Interactive Stage Switcher Pills */}
        <div className="grid grid-cols-3 gap-1 sm:gap-1.5 p-1 rounded-[14px] bg-white/[0.08] border border-white/10 backdrop-blur-md mb-2.5 sm:mb-3">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-[10px] text-[10px] xs:text-[11px] sm:text-[12px] font-medium transition-[background-color,color,box-shadow] duration-200 flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                  active
                    ? "bg-white text-[#0d0d0d] shadow-[0_4px_16px_rgba(0,0,0,0.3)] font-semibold"
                    : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <span className={`text-[10px] sm:text-[11px] font-mono ${active ? "text-[#646f79]" : "text-white/40"}`}>
                  {tab.num}
                </span>
                <span className="truncate">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Inner Glass Canvas Card */}
        <div className="rounded-[16px] bg-white/[0.06] backdrop-blur-xl border border-white/15 p-3.5 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)]">
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
              <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 gap-1">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-white/60 uppercase tracking-wider block">
                    {isAr ? "نظام التصميم الثنائي" : "Bilingual Design System"}
                  </span>
                  <h4 className="text-sm sm:text-base md:text-lg font-medium text-white mt-0.5">
                    {isAr ? "واجهة مستخدم عصرية (عربي / English)" : "Executive RTL & LTR Interface"}
                  </h4>
                </div>
                <span className="self-start xs:self-auto px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[64px] bg-white/[0.1] border border-white/15 text-[10px] sm:text-[11px] font-medium text-white/90">
                  Figma + Design Tokens
                </span>
              </div>

              {/* Simulated UI Wireframe Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3">
                <div className="sm:col-span-7 rounded-[12px] bg-white/[0.05] p-3 sm:p-3.5 space-y-2.5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="w-14 sm:w-16 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                    <span className="px-2 py-0.5 rounded-[4px] bg-white/15 border border-white/15 text-[10px] font-medium text-white/90">
                      RTL / LTR
                    </span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div
                      className={`w-[85%] h-2.5 sm:h-3 rounded-[4px] bg-white origin-left rtl:origin-right transition-transform duration-700 ease-out ${
                        activeTab === 0 ? "scale-x-100" : "scale-x-50"
                      }`}
                    />
                    <div
                      className={`w-[65%] h-2.5 sm:h-3 rounded-[4px] bg-white/50 origin-left rtl:origin-right transition-transform duration-700 delay-75 ease-out ${
                        activeTab === 0 ? "scale-x-100" : "scale-x-50"
                      }`}
                    />
                  </div>
                  <div className="pt-1.5 sm:pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="px-2.5 py-1 rounded-[64px] bg-white text-[#0d0d0d] text-[10px] font-semibold shadow-[0_2px_8px_rgba(255,255,255,0.2)]">
                      {isAr ? "تصفح الخدمات" : "Primary Action"}
                    </span>
                    <span className="px-2.5 py-1 rounded-[64px] bg-white/10 text-white text-[10px] font-medium border border-white/20">
                      150 {isAr ? "د.ك" : "KWD"}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-5 flex flex-col justify-between rounded-[12px] border border-white/10 p-3 sm:p-3.5 bg-white/[0.05]">
                  <span className="text-[10px] sm:text-[11px] font-medium text-white/60">
                    {isAr ? "معايير الوصول" : "Accessibility"}
                  </span>
                  <div className="my-1.5 sm:my-2">
                    <div className="text-xl sm:text-2xl font-medium text-white">18.5:1</div>
                    <div className="text-[10px] sm:text-[11px] text-emerald-400 font-medium">
                      WCAG AAA Contrast
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border border-white/20" />
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#94a3b8] border border-white/20" />
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#646f79] border border-white/20" />
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 border border-white/20" />
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
              <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 gap-1">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-white/60 uppercase tracking-wider block">
                    {isAr ? "البنية البرمجية والربط المالي" : "Cloud & Payment Architecture"}
                  </span>
                  <h4 className="text-sm sm:text-base md:text-lg font-medium text-white mt-0.5">
                    {isAr ? "تطوير Next.js + بوابات الدفع الكويتية" : "Next.js 16 + Kuwait Payment Gateways"}
                  </h4>
                </div>
                <span className="self-start xs:self-auto px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[64px] bg-white text-[#0d0d0d] text-[10px] sm:text-[11px] font-semibold">
                  99.9% Uptime
                </span>
              </div>

              {/* Live Task Execution Rows */}
              <div className="space-y-2">
                {devItems.map((item, idx) => (
                  <div
                    key={item.label}
                    style={{ transitionDelay: activeTab === 1 ? `${idx * 60}ms` : "0ms" }}
                    className={`flex items-center justify-between p-2.5 sm:p-3 rounded-[12px] bg-white/[0.05] border border-white/10 gap-2 transition-[opacity,transform] duration-300 ease-out ${
                      activeTab === 1
                        ? "opacity-100 translate-x-0"
                        : isAr
                        ? "opacity-0 translate-x-2"
                        : "opacity-0 -translate-x-2"
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-[#0d0d0d] flex items-center justify-center text-[10px] sm:text-[11px] font-bold flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-[11px] sm:text-[13px] font-medium text-white leading-snug">
                        {item.label}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-[64px] bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono text-white/80 flex-shrink-0">
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
              <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 gap-1">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-white/60 uppercase tracking-wider block">
                    {isAr ? "النمو وتصدر نتائج البحث" : "Search Visibility & Conversion"}
                  </span>
                  <h4 className="text-sm sm:text-base md:text-lg font-medium text-white mt-0.5">
                    {isAr ? "تصدّر نتائج بحث جوجل في الكويت" : "Google Kuwait #1 Ranking Architecture"}
                  </h4>
                </div>
                <span className="self-start xs:self-auto px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[64px] bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-[10px] sm:text-[11px] font-medium">
                  +240% ROI
                </span>
              </div>

              {/* Animated Metrics & Bar Graph */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
                <div className="sm:col-span-7 rounded-[12px] bg-white/[0.05] p-3 sm:p-3.5 border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-white/60 mb-2">
                    <span>{isAr ? "نمو الزيارات العضوية (الكويت)" : "Organic Traffic Growth (KW)"}</span>
                    <span className="font-mono text-white font-semibold">Q1 → Q4</span>
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
                          } ${i === 4 ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]" : "bg-white/30"}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-5 rounded-[12px] bg-white/[0.08] border border-white/15 text-white p-3 sm:p-4 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                  <span className="text-[10px] sm:text-[11px] text-white/70">
                    Core Web Vitals
                  </span>
                  <div className="my-1.5 sm:my-2">
                    <div className="text-2xl sm:text-3xl font-light tracking-tight text-white">99/100</div>
                    <div className="text-[10px] sm:text-[11px] text-emerald-400 mt-0.5 sm:mt-1 font-medium">
                      {isAr ? "أداء فائق السرعة" : "Optimal Speed"}
                    </div>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`w-[99%] bg-emerald-400 h-full rounded-full origin-left rtl:origin-right transition-transform duration-700 ease-out shadow-[0_0_8px_rgba(52,211,153,0.8)] ${
                        activeTab === 2 ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Workspace Status Footer */}
          <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 text-[11px] sm:text-[12px] text-white/70">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="truncate">
                {isAr
                  ? "الباقات تبدأ من 150 د.ك • تسليم احترافي سريع"
                  : "Packages from 150 KWD • Rapid Executive Delivery"}
              </span>
            </div>
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
    <section
      id="hero"
      className="relative min-h-0 lg:min-h-[92svh] bg-[#050505] text-[#ffffff] flex flex-col justify-start lg:justify-between pt-24 sm:pt-28 md:pt-32 overflow-hidden border-b border-white/10"
    >
      {/* Background Cinematic Ribbon Image with Next.js Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/hero-bg.png"
          alt="Arssan Architectural 3D Ribbon Background"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center lg:object-[60%_center] select-none"
        />
        {/* Optical depth vignettes for crystal-clear readability */}
        <div className="absolute inset-0 bg-radial-[circle_at_30%_35%] from-transparent via-black/40 to-black/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none rtl:bg-gradient-to-l" />
        {/* Subtle Architectural Grid Pattern */}
        <div className="absolute inset-0 bg-asana-grid opacity-[0.06] pointer-events-none" />
      </div>

      <FloatingShapes shapes={heroShapes} color="text-white/10" />

      {/* Main Content Container (8px base grid aligned) */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-5 sm:px-8 flex-1 flex flex-col justify-start lg:justify-center pt-3 pb-8 sm:pt-5 sm:pb-10 lg:pt-4 lg:pb-12 text-start">
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
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-[64px] bg-white/[0.08] backdrop-blur-md border border-white/15 text-[13px] font-medium text-[#ffffff] shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span>{dict.hero.tagline}</span>
              </div>
            </motion.div>

            {/* Asana Display Hierarchy */}
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
                    } ${idx === 1 ? "text-[#94a3b8]" : "text-[#ffffff]"}`}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Measured Body Lead Copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.45, ease: easeAsana }}
              className="text-[15px] sm:text-lg text-[#94a3b8] leading-[1.65] max-w-xl mb-6 sm:mb-10 font-normal drop-shadow-sm"
            >
              {dict.hero.description}
            </motion.p>

            {/* High-Affordance Pill Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.45, ease: easeAsana }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5"
            >
              <a
                href={`/${lang}#pricing`}
                className="group inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 sm:px-8 rounded-[64px] bg-[#ffffff] text-[#0d0d0d] text-[14px] sm:text-[15px] font-medium hover:bg-[#f1f5f9] shadow-[0_4px_24px_rgba(255,255,255,0.18)] transition-[background-color,transform,box-shadow] duration-200 active:scale-[0.98]"
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
                className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-7 rounded-[64px] bg-white/[0.08] text-[#ffffff] border border-white/20 hover:bg-white/[0.14] hover:border-white/30 backdrop-blur-md text-[14px] sm:text-[15px] font-medium shadow-[0_2px_12px_rgba(0,0,0,0.2)] transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
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

      {/* Bottom Calm Surface Metrics & Workflow Strip (Glassmorphic) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="relative z-10 bg-black/40 sm:bg-black/30 backdrop-blur-md border-t border-white/10 py-3.5 sm:py-4"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] sm:text-[13px] text-white/70">
          <div className="grid grid-cols-1 xs:grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-6 md:gap-8 w-full sm:w-auto text-start">
            <span className="flex items-center justify-start gap-2 text-white font-medium">
              <span className="px-2 py-0.5 rounded-[4px] bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono text-white/80">
                01
              </span>
              <span className="truncate">{dict.hero.pipeline_design}</span>
            </span>
            <span className="flex items-center justify-start gap-2 text-white font-medium">
              <span className="px-2 py-0.5 rounded-[4px] bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono text-white/80">
                02
              </span>
              <span className="truncate">{dict.hero.pipeline_dev}</span>
            </span>
            <span className="flex items-center justify-start gap-2 text-white font-medium">
              <span className="px-2 py-0.5 rounded-[4px] bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono text-white/80">
                03
              </span>
              <span className="truncate">{dict.hero.pipeline_seo}</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[12px] text-white/60">
            <span>{isAr ? "مصمّم للسوق الكويتي والخليجي" : "Engineered for Kuwait & GCC"}</span>
            <span className="text-white/40">•</span>
            <span className="font-mono text-white/90 font-medium">KNET / RTL / SEO</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
