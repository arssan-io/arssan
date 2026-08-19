"use client";

import { motion } from "framer-motion";
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

const easeBrutal = [0.32, 0.72, 0, 1] as [number, number, number, number];

function MonumentDisplayMonitor({ lang }: { lang: Locale }) {
  const isAr = lang === "ar";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: easeBrutal }}
      className="relative w-full max-w-[540px] mx-auto select-none mt-4 lg:mt-0"
    >
      {/* Perspective Monitor Stand & Screen */}
      <div className="relative rounded-none border border-white/15 bg-[#121212]/95 backdrop-blur-md shadow-2xl p-3.5 sm:p-5">
        {/* Terminal / Device Header Bar */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-3 sm:mb-4 border-b border-white/10 font-mono text-[10px] sm:text-[11px] text-[#a2a2a2]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff6436]"></span>
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20"></span>
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20"></span>
            <span className="ms-1.5 sm:ms-2 text-white/50 uppercase tracking-widest text-[9px] sm:text-[10px]">
              ARSSAN.SYS // V2.6
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[9px] sm:text-[10px] tracking-wider text-emerald-400 font-semibold">ONLINE</span>
          </div>
        </div>

        {/* Code / Wireframe Screen Content */}
        <div className="space-y-2.5 sm:space-y-3 font-mono text-xs text-white/80">
          {/* Wireframe Hero Preview Box */}
          <div className="border border-white/10 bg-white/[0.02] p-3 sm:p-4 relative overflow-hidden">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative z-10 space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between text-[9px] sm:text-[10px]">
                <span className="text-[#ff6436] tracking-widest uppercase font-medium">
                  [ PIPELINE_OUTPUT ]
                </span>
                <span className="text-[#7b7a7c]">60 FPS // ULTRA</span>
              </div>

              {/* Simulated Typography Layer */}
              <div className="h-9 sm:h-10 bg-white/5 border border-white/10 flex items-center justify-between px-2.5 sm:px-3">
                <span className="font-bold text-white text-[11px] sm:text-xs tracking-tight uppercase truncate pe-2">
                  {isAr ? "استوديو أرسان الرقمي" : "ARSSAN DIGITAL ARCHITECTURE"}
                </span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff6436] flex-shrink-0"></span>
              </div>

              {/* Three Service Columns in Preview */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-0.5">
                <div className="border border-white/10 bg-black/40 p-1.5 sm:p-2 text-center">
                  <span className="text-[8px] sm:text-[9px] text-[#a2a2a2] uppercase block">UI / UX</span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-white">01</span>
                </div>
                <div className="border border-white/10 bg-black/40 p-1.5 sm:p-2 text-center">
                  <span className="text-[8px] sm:text-[9px] text-[#a2a2a2] uppercase block">DEV</span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-white">02</span>
                </div>
                <div className="border border-white/10 bg-black/40 p-1.5 sm:p-2 text-center">
                  <span className="text-[8px] sm:text-[9px] text-[#a2a2a2] uppercase block">SEO</span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-white">03</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Live Metrics Bar */}
          <div className="flex items-center justify-between pt-1.5 sm:pt-2 text-[10px] sm:text-[11px] text-[#a2a2a2] border-t border-white/10">
            <div className="flex items-center gap-2 sm:gap-3">
              <span>LATENCY: <strong className="text-white">12ms</strong></span>
              <span className="hidden sm:inline">RENDER: <strong className="text-white">Next.js 16</strong></span>
            </div>
            <span className="text-[#ff6436] font-semibold">[ READY ]</span>
          </div>
        </div>

        {/* Outer Corner Crosshairs */}
        <div className="absolute -top-1 -left-1 sm:-top-1.5 sm:-left-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-white/40"></div>
        <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-white/40"></div>
        <div className="absolute -bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-white/40"></div>
        <div className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-white/40"></div>
      </div>
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
    <section className="relative min-h-[100svh] bg-[#161616] text-white flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 overflow-hidden">
      {/* Background Floating Subtle Geometry */}
      <FloatingShapes shapes={heroShapes} color="text-white" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-5 sm:px-8 flex-1 flex flex-col justify-center py-6 sm:py-8 md:py-12 text-start">
        {/* Top Metadata Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeBrutal }}
          className="flex items-center gap-3 mb-5 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] text-[11px] font-mono tracking-widest text-[#c9c7cc] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#ff6436]"></span>
            <span>{dict.hero.tagline}</span>
          </div>

          <span className="hidden sm:inline-block text-[11px] font-mono text-[#7b7a7c] tracking-widest uppercase">
            [ 24°42&apos;N 46°40&apos;E ]
          </span>
        </motion.div>

        {/* Grid Split: Typographic Monument + Technical Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Monument Display Headline & CTA (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Monument Headline */}
            <div className="mb-4 sm:mb-6 space-y-1">
              {titleLines.map((line, idx) => (
                <div key={idx} className={isAr ? "py-0.5" : "overflow-hidden pb-1"}>
                  <motion.h1
                    initial={isAr ? { opacity: 0, y: 20 } : { y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.18 + idx * 0.1,
                      duration: 0.85,
                      ease: easeBrutal,
                    }}
                    className={`font-bold tracking-tight text-display-gradient pb-1 ${
                      isAr
                        ? "text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] leading-[1.14] sm:leading-[1.08]"
                        : "text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-display uppercase leading-[0.9] tracking-[-0.01em]"
                    }`}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Editorial Lead Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease: easeBrutal }}
              className="text-sm sm:text-base md:text-lg text-[#a2a2a2] leading-relaxed max-w-xl mb-6 sm:mb-8 font-normal"
            >
              {dict.hero.description}
            </motion.p>

            {/* Interactive Pill CTA Buttons (Mobile Full-Width Responsive) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: easeBrutal }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm uppercase tracking-wider"
            >
              <a
                href={`/${lang}#services`}
                className="group flex items-center justify-center gap-2.5 bg-white text-[#161616] font-semibold px-6 sm:px-8 py-3.5 rounded-full hover:bg-[#ff6436] hover:text-[#161616] transition-all duration-300 active:scale-95 text-center"
              >
                <span className="w-2 h-2 rounded-full bg-[#ff6436] group-hover:bg-[#161616] transition-colors"></span>
                <span>{dict.hero.cta}</span>
              </a>

              <a
                href="https://wa.me/46700265645"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white/80 hover:text-white px-6 py-3.5 rounded-full border border-white/20 hover:border-white/50 transition-all duration-300 text-center"
              >
                <span className="text-[#ff6436]">●</span>
                <span>{dict.nav.contact}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Monitor / Terminal Mockup (5 cols) */}
          <div className="lg:col-span-5">
            <MonumentDisplayMonitor lang={lang} />
          </div>
        </div>
      </div>

      {/* Bottom Structural Bar with Pipeline Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.8 }}
        className="relative z-10 border-t border-white/10 py-3.5 sm:py-5 bg-black/50 backdrop-blur-sm"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-[10px] sm:text-[11px] text-[#7b7a7c]">
          {/* Pipeline badges (Grid on mobile for immaculate alignment) */}
          <div className="grid grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-6 uppercase tracking-wider w-full sm:w-auto text-center sm:text-start">
            <span className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 text-white/70">
              <span className="text-[#ff6436]">01</span> {dict.hero.pipeline_design}
            </span>
            <span className="hidden sm:inline text-white/20">/</span>
            <span className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 text-white/70">
              <span className="text-[#ff6436]">02</span> {dict.hero.pipeline_dev}
            </span>
            <span className="hidden sm:inline text-white/20">/</span>
            <span className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 text-white/70">
              <span className="text-[#ff6436]">03</span> {dict.hero.pipeline_seo}
            </span>
          </div>

          {/* Scroll indicator */}
          <div className="hidden sm:flex items-center gap-2 text-white/40">
            <span className="uppercase tracking-widest text-[10px]">SCROLL</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#ff6436]"
            >
              ↓
            </motion.span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
