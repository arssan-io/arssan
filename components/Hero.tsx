"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { trackContactClick, trackEvent } from "@/lib/analytics";

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
      ctaHref?: string;
      pipeline_design: string;
      pipeline_dev: string;
      pipeline_seo: string;
      startingPriceNote?: string;
      backgroundImageUrl?: string;
    };
  };
  whatsappUrl?: string;
}

const easeAsana = [0.22, 1, 0.36, 1] as [number, number, number, number];

function AsanaProjectShowcase({
  lang,
  labels,
  startingPriceNote,
}: {
  lang: Locale;
  labels: { design: string; dev: string; seo: string };
  startingPriceNote?: string;
}) {
  const isAr = lang === "ar";
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered]);

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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: easeAsana }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[580px] mx-auto select-none"
    >
      {/* Outer Asana Surface Container (Quiet Architectural Glass) */}
      <div className="rounded-[20px] bg-black/45 sm:bg-black/35 backdrop-blur-xl p-3 sm:p-4 border border-white/15 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]">
        {/* Top Workspace Bar */}
        <div className="flex items-center justify-between px-2 pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-white/80 flex-shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/30 flex-shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15 flex-shrink-0" />
            <span className="ms-2 text-[12px] font-medium text-white/70 truncate">
              {isAr ? "منصة مشاريع أرسان • الكويت" : "Arssan Studio • Kuwait Workspace"}
            </span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-[64px] bg-white/[0.08] border border-white/15 text-[11px] font-medium text-white/90 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{isAr ? "مباشر" : "Live Sync"}</span>
          </div>
        </div>

        {/* Interactive Stage Switcher Pills */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-[12px] bg-white/[0.06] border border-white/10 mb-3">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-2.5 rounded-[8px] text-[11px] sm:text-[12px] font-medium transition-[background-color,color] duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                  active
                    ? "bg-white text-[#0d0d0d] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                    : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <span className={`text-[11px] font-mono tabular-nums ${active ? "text-[#646f79]" : "text-white/40"}`}>
                  {tab.num}
                </span>
                <span className="truncate">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Inner Canvas Card */}
        <div className="rounded-[14px] bg-white/[0.04] border border-white/10 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="grid grid-cols-1 items-start">
            {/* Stage 0: Design */}
            <div
              aria-hidden={activeTab !== 0}
              className={`col-start-1 row-start-1 space-y-3 sm:space-y-4 transition-[opacity,transform] duration-250 ease-out ${
                activeTab === 0
                  ? "opacity-100 translate-y-0 relative z-10"
                  : "opacity-0 translate-y-1 pointer-events-none select-none"
              }`}
            >
              <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-white/10 pb-3 gap-2">
                <div>
                  <span className="text-[11px] sm:text-[12px] font-medium text-white/60 block">
                    {isAr ? "نظام التصميم الثنائي" : "Bilingual design system"}
                  </span>
                  <div className="text-sm sm:text-base font-medium text-white mt-0.5">
                    {isAr ? "واجهة مستخدم عصرية (عربي / English)" : "Executive RTL & LTR Interface"}
                  </div>
                </div>
                <span className="self-start xs:self-auto px-2.5 py-0.5 rounded-[64px] bg-white/[0.08] border border-white/15 text-[11px] font-medium text-white/80">
                  Figma + Tokens
                </span>
              </div>

              {/* Simulated UI Wireframe Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-7 rounded-[10px] bg-white/[0.04] p-3 space-y-2.5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="w-14 h-2 rounded-full bg-white/70" />
                    <span className="px-2 py-0.5 rounded-[4px] bg-white/10 border border-white/15 text-[10px] font-medium text-white/80 font-mono">
                      RTL / LTR
                    </span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div
                      className={`w-[85%] h-2.5 rounded-[4px] bg-white/80 origin-left rtl:origin-right transition-transform duration-500 ease-out ${
                        activeTab === 0 ? "scale-x-100" : "scale-x-50"
                      }`}
                    />
                    <div
                      className={`w-[65%] h-2.5 rounded-[4px] bg-white/40 origin-left rtl:origin-right transition-transform duration-500 delay-75 ease-out ${
                        activeTab === 0 ? "scale-x-100" : "scale-x-50"
                      }`}
                    />
                  </div>
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-[64px] bg-white text-[#0d0d0d] text-[10px] sm:text-[11px] font-medium">
                      {isAr ? "تصفح الخدمات" : "Primary Action"}
                    </span>
                    <span className="px-3 py-1 rounded-[64px] bg-white/10 text-white text-[10px] sm:text-[11px] font-mono tabular-nums border border-white/15">
                      150 {isAr ? "د.ك" : "KWD"}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-5 flex flex-col justify-between rounded-[10px] border border-white/10 p-3 bg-white/[0.04]">
                  <span className="text-[11px] font-medium text-white/60">
                    {isAr ? "معايير الوصول" : "Accessibility"}
                  </span>
                  <div className="my-2">
                    <div className="text-2xl font-light text-white font-mono tabular-nums">18.5:1</div>
                    <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                      WCAG AAA Contrast
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-white border border-white/20" />
                    <span className="w-4 h-4 rounded-full bg-[#94a3b8] border border-white/20" />
                    <span className="w-4 h-4 rounded-full bg-[#646f79] border border-white/20" />
                    <span className="w-4 h-4 rounded-full bg-white/20 border border-white/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 1: Development */}
            <div
              aria-hidden={activeTab !== 1}
              className={`col-start-1 row-start-1 space-y-3 sm:space-y-4 transition-[opacity,transform] duration-250 ease-out ${
                activeTab === 1
                  ? "opacity-100 translate-y-0 relative z-10"
                  : "opacity-0 translate-y-1 pointer-events-none select-none"
              }`}
            >
              <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-white/10 pb-3 gap-2">
                <div>
                  <span className="text-[11px] sm:text-[12px] font-medium text-white/60 block">
                    {isAr ? "البنية البرمجية والربط المالي" : "Cloud & payment architecture"}
                  </span>
                  <div className="text-sm sm:text-base font-medium text-white mt-0.5">
                    {isAr ? "تطوير Next.js + بوابات الدفع الكويتية" : "Next.js 16 + Kuwait Payment Gateways"}
                  </div>
                </div>
                <span className="self-start xs:self-auto px-2.5 py-0.5 rounded-[64px] bg-white text-[#0d0d0d] text-[11px] font-mono tabular-nums font-medium">
                  99.9% Uptime
                </span>
              </div>

              {/* Task Rows */}
              <div className="space-y-2">
                {devItems.map((item, idx) => (
                  <div
                    key={item.label}
                    style={{ transitionDelay: activeTab === 1 ? `${idx * 40}ms` : "0ms" }}
                    className={`flex items-center justify-between p-2.5 rounded-[10px] bg-white/[0.04] border border-white/10 gap-2 transition-[opacity,transform] duration-200 ease-out ${
                      activeTab === 1
                        ? "opacity-100 translate-x-0"
                        : isAr
                        ? "opacity-0 translate-x-2"
                        : "opacity-0 -translate-x-2"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-4 h-4 rounded-full bg-white text-[#0d0d0d] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-[12px] sm:text-[13px] font-normal text-white/90 leading-snug">
                        {item.label}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-[64px] bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono tabular-nums text-white/80 flex-shrink-0">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 2: SEO */}
            <div
              aria-hidden={activeTab !== 2}
              className={`col-start-1 row-start-1 space-y-3 sm:space-y-4 transition-[opacity,transform] duration-250 ease-out ${
                activeTab === 2
                  ? "opacity-100 translate-y-0 relative z-10"
                  : "opacity-0 translate-y-1 pointer-events-none select-none"
              }`}
            >
              <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-white/10 pb-3 gap-2">
                <div>
                  <span className="text-[11px] sm:text-[12px] font-medium text-white/60 block">
                    {isAr ? "النمو وتصدر نتائج البحث" : "Search visibility & conversion"}
                  </span>
                  <div className="text-sm sm:text-base font-medium text-white mt-0.5">
                    {isAr ? "تصدّر نتائج بحث جوجل في الكويت" : "Google Kuwait #1 Ranking Architecture"}
                  </div>
                </div>
                <span className="self-start xs:self-auto px-2.5 py-0.5 rounded-[64px] bg-emerald-400/15 border border-emerald-400/25 text-emerald-300 text-[11px] font-mono tabular-nums font-medium">
                  +240% ROI
                </span>
              </div>

              {/* Metrics & Bar Graph */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch">
                <div className="sm:col-span-7 rounded-[10px] bg-white/[0.04] p-3 border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] text-white/60 mb-2">
                    <span>{isAr ? "نمو الزيارات العضوية (الكويت)" : "Organic Traffic Growth (KW)"}</span>
                    <span className="font-mono text-white/90">Q1 → Q4</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-20 pt-2 px-1">
                    {[35, 50, 68, 84, 100].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div
                          style={{
                            height: `${height}%`,
                            transitionDelay: activeTab === 2 ? `${i * 40}ms` : "0ms",
                          }}
                          className={`w-full rounded-t-[4px] origin-bottom transition-transform duration-400 ease-out ${
                            activeTab === 2 ? "scale-y-100" : "scale-y-0"
                          } ${i === 4 ? "bg-white" : "bg-white/35"}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-5 rounded-[10px] bg-white/[0.06] border border-white/10 text-white p-3.5 flex flex-col justify-between">
                  <span className="text-[11px] text-white/70">
                    Core Web Vitals
                  </span>
                  <div className="my-1.5">
                    <div className="text-3xl font-light tracking-tight text-white font-mono tabular-nums">99/100</div>
                    <div className="text-[11px] text-emerald-400 mt-0.5 font-medium">
                      {isAr ? "أداء فائق السرعة" : "Optimal Speed"}
                    </div>
                  </div>
                  <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`w-[99%] bg-emerald-400 h-full rounded-full origin-left rtl:origin-right transition-transform duration-500 ease-out ${
                        activeTab === 2 ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Status Footer */}
          <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-[12px] text-white/70">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="truncate">
                {startingPriceNote ||
                  (isAr
                    ? "الباقات تبدأ من 150 د.ك • تسليم احترافي سريع"
                    : "Packages from 150 KWD • Rapid Executive Delivery")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero({ lang, dict, whatsappUrl = "https://wa.me/46700265645" }: HeroProps) {
  const isAr = lang === "ar";
  const titleLines = [
    dict.hero.title_line1,
    dict.hero.title_line2,
    dict.hero.title_line3,
  ];
  const ctaHref = dict.hero.ctaHref?.startsWith("#")
    ? `/${lang}${dict.hero.ctaHref}`
    : dict.hero.ctaHref || `/${lang}#pricing`;

  return (
    <section
      id="hero"
      className="relative min-h-0 lg:min-h-[90svh] bg-[#050505] text-[#ffffff] flex flex-col justify-start lg:justify-between pt-24 sm:pt-28 md:pt-32 overflow-hidden border-b border-white/10"
    >
      {/* Background Cinematic Architectural Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={dict.hero.backgroundImageUrl || "/images/hero-bg.webp"}
          alt="Arssan Architectural 3D Ribbon Background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center lg:object-[60%_center] select-none opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-asana-grid opacity-[0.04] pointer-events-none" />
      </div>

      {/* Main Content Container (8px base grid aligned) */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-5 sm:px-8 flex-1 flex flex-col justify-start lg:justify-center pt-3 pb-8 sm:pt-5 sm:pb-10 lg:pt-4 lg:pb-12 text-start">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Asana Display Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Calm Competence Tagline Pill */}
            <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[64px] bg-white/[0.06] border border-white/12 text-[13px] font-normal text-white/90">
                <span className="w-2 h-2 rounded-full bg-white/80" />
                <span>{dict.hero.tagline}</span>
              </div>
            </div>

            {/* Asana Display Hierarchy */}
            <h1 className="mb-5 sm:mb-8 space-y-1 sm:space-y-2">
              {titleLines.map((line, idx) => (
                <span
                  key={idx}
                  className={`block py-0.5 ${
                    isAr
                      ? "text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-medium leading-[1.2] sm:leading-[1.24]"
                      : "text-3xl xs:text-4xl sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] font-light leading-[1.08] sm:leading-[1.06] tracking-[-0.025em]"
                  } ${idx === 1 ? "text-[#94a3b8]" : "text-[#ffffff]"}`}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Measured Body Lead Copy */}
            <p className="text-[15px] sm:text-lg text-[#94a3b8] leading-[1.65] max-w-xl mb-6 sm:mb-10 font-normal">
              {dict.hero.description}
            </p>

            {/* High-Affordance Pill Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
              <a
                href={ctaHref}
                onClick={() => {
                  trackEvent("hero_cta_click", {
                    cta_target: "pricing",
                    cta_label: dict.hero.cta,
                  });
                }}
                className="group inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 sm:px-8 rounded-[64px] bg-[#ffffff] text-[#0d0d0d] text-[14px] sm:text-[15px] font-medium hover:bg-[#f3f4f6] transition-colors duration-150 active:scale-[0.98]"
              >
                <span>{dict.hero.cta}</span>
                <span className="transition-transform duration-150 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
                  →
                </span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackContactClick({
                    source: "hero_contact",
                    method: "whatsapp",
                  });
                }}
                className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-7 rounded-[64px] bg-white/[0.06] text-[#ffffff] border border-white/15 hover:bg-white/[0.12] hover:border-white/25 text-[14px] sm:text-[15px] font-medium transition-colors duration-150 active:scale-[0.98]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{dict.nav.contact}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Workspace Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <AsanaProjectShowcase
              lang={lang}
              startingPriceNote={dict.hero.startingPriceNote}
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
        transition={{ delay: 0.3, duration: 0.3, ease: easeAsana }}
        className="relative z-10 bg-black/40 border-t border-white/10 py-3.5 sm:py-4"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] sm:text-[13px] text-white/70">
          <div className="grid grid-cols-1 xs:grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-6 md:gap-8 w-full sm:w-auto text-start">
            <span className="flex items-center justify-start gap-2 text-white font-normal">
              <span className="px-2 py-0.5 rounded-[4px] bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono tabular-nums text-white/80">
                01
              </span>
              <span className="truncate">{dict.hero.pipeline_design}</span>
            </span>
            <span className="flex items-center justify-start gap-2 text-white font-normal">
              <span className="px-2 py-0.5 rounded-[4px] bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono tabular-nums text-white/80">
                02
              </span>
              <span className="truncate">{dict.hero.pipeline_dev}</span>
            </span>
            <span className="flex items-center justify-start gap-2 text-white font-normal">
              <span className="px-2 py-0.5 rounded-[4px] bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono tabular-nums text-white/80">
                03
              </span>
              <span className="truncate">{dict.hero.pipeline_seo}</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[12px] text-white/60">
            <span>{isAr ? "مصمّم للسوق الكويتي والخليجي" : "Engineered for Kuwait & GCC"}</span>
            <span className="text-white/40">•</span>
            <span className="font-mono text-white/90">KNET / RTL / SEO</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
