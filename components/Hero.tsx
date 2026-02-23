"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { FloatingShapes, heroShapes } from "./FloatingShapes";

interface HeroProps {
  lang: Locale;
  dict: {
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

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function HeroArtwork() {
  return (
    <motion.svg
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      {/* Dot grid background */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 2 }}
      >
        {Array.from({ length: 11 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => (
            <circle
              key={`d${r}-${c}`}
              cx={24 + c * 48}
              cy={10 + r * 40}
              r={0.7}
              fill="black"
              opacity={0.07}
            />
          ))
        )}
      </motion.g>

      {/* Large browser window (back layer) */}
      <motion.g
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1.1, ease }}
      >
        <rect x="55" y="15" width="410" height="295" rx="12" stroke="black" strokeWidth="1" opacity="0.18" />
        <line x1="55" y1="50" x2="465" y2="50" stroke="black" strokeWidth="0.6" opacity="0.12" />
        <circle cx="76" cy="33" r="4" stroke="black" strokeWidth="0.7" opacity="0.18" />
        <circle cx="90" cy="33" r="4" stroke="black" strokeWidth="0.7" opacity="0.18" />
        <circle cx="104" cy="33" r="4" stroke="black" strokeWidth="0.7" opacity="0.18" />
        <rect x="135" y="26" width="170" height="14" rx="7" stroke="black" strokeWidth="0.5" opacity="0.1" />

        {/* Heading wireframe */}
        <rect x="80" y="72" width="200" height="14" rx="3" fill="black" opacity="0.06" />
        <rect x="80" y="98" width="320" height="5" rx="2" fill="black" opacity="0.035" />
        <rect x="80" y="110" width="280" height="5" rx="2" fill="black" opacity="0.03" />
        <rect x="80" y="122" width="300" height="5" rx="2" fill="black" opacity="0.025" />

        {/* Three wireframe cards */}
        <rect x="80" y="150" width="115" height="90" rx="8" stroke="black" strokeWidth="0.7" opacity="0.1" />
        <rect x="92" y="170" width="50" height="5" rx="2" fill="black" opacity="0.06" />
        <rect x="92" y="181" width="80" height="4" rx="2" fill="black" opacity="0.03" />
        <rect x="92" y="214" width="45" height="14" rx="7" fill="black" opacity="0.05" />

        <rect x="205" y="150" width="115" height="90" rx="8" stroke="black" strokeWidth="0.7" opacity="0.1" />
        <rect x="217" y="170" width="50" height="5" rx="2" fill="black" opacity="0.06" />
        <rect x="217" y="181" width="80" height="4" rx="2" fill="black" opacity="0.03" />
        <rect x="217" y="214" width="45" height="14" rx="7" fill="black" opacity="0.05" />

        <rect x="330" y="150" width="115" height="90" rx="8" stroke="black" strokeWidth="0.7" opacity="0.1" />
        <rect x="342" y="170" width="50" height="5" rx="2" fill="black" opacity="0.06" />
        <rect x="342" y="181" width="80" height="4" rx="2" fill="black" opacity="0.03" />
        <rect x="342" y="214" width="45" height="14" rx="7" fill="black" opacity="0.05" />

        {/* Footer bar */}
        <rect x="80" y="265" width="360" height="25" rx="5" stroke="black" strokeWidth="0.4" opacity="0.06" />
      </motion.g>

      {/* Small overlapping browser (front-left) */}
      <motion.g
        initial={{ opacity: 0, x: -35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1, ease }}
      >
        <rect x="5" y="105" width="250" height="235" rx="12" fill="white" stroke="black" strokeWidth="1.2" opacity="0.85" />
        <line x1="5" y1="135" x2="255" y2="135" stroke="black" strokeWidth="0.6" opacity="0.12" />
        <circle cx="24" cy="120" r="3.5" stroke="black" strokeWidth="0.7" opacity="0.22" />
        <circle cx="36" cy="120" r="3.5" stroke="black" strokeWidth="0.7" opacity="0.22" />
        <circle cx="48" cy="120" r="3.5" stroke="black" strokeWidth="0.7" opacity="0.22" />

        {/* Page wireframe content */}
        <rect x="26" y="152" width="110" height="10" rx="2" fill="black" opacity="0.08" />
        <rect x="26" y="172" width="200" height="4" rx="2" fill="black" opacity="0.04" />
        <rect x="26" y="182" width="170" height="4" rx="2" fill="black" opacity="0.035" />
        <rect x="26" y="200" width="205" height="55" rx="8" stroke="black" strokeWidth="0.6" opacity="0.08" />
        <rect x="26" y="270" width="85" height="28" rx="14" fill="black" opacity="0.07" />
        <rect x="120" y="270" width="85" height="28" rx="14" stroke="black" strokeWidth="0.6" opacity="0.08" />
        <rect x="26" y="310" width="140" height="4" rx="2" fill="black" opacity="0.03" />
        <rect x="26" y="320" width="100" height="4" rx="2" fill="black" opacity="0.025" />
      </motion.g>

      {/* Phone frame (right) */}
      <motion.g
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, ease }}
      >
        <rect x="345" y="125" width="130" height="268" rx="20" fill="white" stroke="black" strokeWidth="1.3" />
        <rect x="390" y="135" width="40" height="5" rx="2.5" fill="black" opacity="0.06" />

        {/* Phone content */}
        <rect x="362" y="160" width="96" height="10" rx="2" fill="black" opacity="0.07" />
        <rect x="362" y="178" width="72" height="4" rx="2" fill="black" opacity="0.04" />
        <rect x="362" y="200" width="96" height="65" rx="8" stroke="black" strokeWidth="0.6" opacity="0.08" />
        <rect x="374" y="220" width="40" height="4" rx="2" fill="black" opacity="0.04" />
        <rect x="374" y="230" width="60" height="4" rx="2" fill="black" opacity="0.03" />
        <rect x="374" y="246" width="30" height="10" rx="5" fill="black" opacity="0.05" />
        <rect x="362" y="280" width="96" height="65" rx="8" stroke="black" strokeWidth="0.6" opacity="0.08" />
        <rect x="374" y="300" width="40" height="4" rx="2" fill="black" opacity="0.04" />
        <rect x="374" y="310" width="60" height="4" rx="2" fill="black" opacity="0.03" />
        <rect x="374" y="326" width="30" height="10" rx="5" fill="black" opacity="0.05" />

        {/* Home indicator */}
        <rect x="387" y="380" width="46" height="4" rx="2" fill="black" opacity="0.08" />
      </motion.g>

      {/* Cursor pointer */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease }}
        style={{ transformOrigin: "285px 82px" }}
      >
        <path
          d="M282 78 L282 108 L291 100 L300 114 L306 110 L297 97 L308 97 Z"
          fill="black"
          opacity="0.55"
        />
      </motion.g>

      {/* Decorative dashed rings */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1.5 }}
      >
        <circle cx="35" cy="55" r="28" stroke="black" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.06" />
        <circle cx="460" cy="400" r="40" stroke="black" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.05" />
      </motion.g>
    </motion.svg>
  );
}

export function Hero({ lang, dict }: HeroProps) {
  const titleLines = [
    dict.hero.title_line1,
    dict.hero.title_line2,
    dict.hero.title_line3,
  ];

  return (
    <section className="relative min-h-[100svh] flex flex-col pt-24 md:pt-28">
      <FloatingShapes shapes={heroShapes} />
      <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-5 sm:px-8 flex flex-col">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="py-4 md:py-5"
        >
          <span className="text-xs sm:text-sm font-medium tracking-[0.15em] uppercase text-black/45">
            {dict.hero.tagline}
          </span>
        </motion.div>

        {/* Two-column split */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
          {/* LEFT: headline + CTA */}
          <div className="flex flex-col justify-center md:pe-12 lg:pe-16 md:border-e md:border-black/10">
            <div className="mb-8 md:mb-10">
              {titleLines.map((line, idx) => (
                <div key={idx} className="overflow-hidden">
                  <motion.h1
                    className="text-[clamp(2.75rem,9vw,6rem)] font-bold leading-[1.08] tracking-tight"
                    initial={{ y: "120%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      delay: 0.25 + idx * 0.1,
                      duration: 1.1,
                      ease,
                    }}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease }}
              className="flex items-center gap-5"
            >
              <a
                href={`/${lang}#services`}
                className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-wider uppercase bg-black text-white rounded-full px-7 py-3.5 active:scale-95 hover:scale-[1.03] hover:shadow-lg transition-all duration-300"
              >
                {dict.hero.cta}
                <svg
                  className="w-4 h-4 rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* RIGHT: artwork illustration */}
          <div className="hidden md:flex items-center justify-center md:ps-8 lg:ps-12">
            <HeroArtwork />
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="border-t border-black/10 py-5 flex items-center justify-between"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7, ease }}
            className="text-xs sm:text-sm text-black/35 leading-relaxed max-w-sm"
          >
            {dict.hero.description}
          </motion.p>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-5 h-5 text-black/25 flex-shrink-0 ms-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
