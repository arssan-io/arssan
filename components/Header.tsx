"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface HeaderProps {
  lang: Locale;
  dict: {
    nav: { home: string; coloring: string; process: string; services: string; pricing: string; contact: string };
    language: { switch: string };
  };
}

export function Header({ lang, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const otherLang = lang === "ar" ? "en" : "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navItems = [
    { label: dict.nav.services, href: `/${lang}#services`, glyph: "+" },
    { label: dict.nav.process, href: `/${lang}#process`, glyph: "•" },
    { label: dict.nav.pricing, href: `/${lang}#pricing`, glyph: "+" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#161616]/90 backdrop-blur-md border-b border-white/10 py-3 text-white"
            : "bg-transparent py-4 sm:py-5 text-white"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo with Live Pulse */}
          <div className="flex items-center gap-3.5">
            <Link href={`/${lang}`} className="flex items-center relative z-50">
              <img
                src="/images/Logo.svg"
                alt="Arssan"
                className="h-8 sm:h-9 w-auto brightness-0 invert"
              />
            </Link>

            {/* Ember Live Signal Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono tracking-wider text-[#a2a2a2]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6436] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6436]"></span>
              </span>
              <span className="uppercase text-[10px]">ACTIVE</span>
            </div>
          </div>

          {/* Desktop Pill Nav */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-1.5 text-[12px] font-mono tracking-wider uppercase px-3.5 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <span className="text-[#ff6436] text-[11px] opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.glyph}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 font-mono text-[12px]">
            <Link
              href={`/${otherLang}`}
              className="text-[#a2a2a2] hover:text-white px-2.5 py-1 transition-colors uppercase tracking-wider"
            >
              {dict.language.switch}
            </Link>

            <a
              href="https://wa.me/46700265645"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-white hover:bg-[#ff6436] hover:border-[#ff6436] hover:text-[#161616] font-medium transition-all duration-200 uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6436] group-hover:bg-[#161616]"></span>
              {dict.nav.contact}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 -me-2 relative z-50 text-white"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-0.5 bg-white origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block w-5 h-0.5 bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-0.5 bg-white origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden fixed inset-0 bg-[#161616] text-white z-[45] flex flex-col justify-between px-6 pt-28 pb-12"
          >
            <div className="flex flex-col space-y-6">
              <div className="pb-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-[12px] font-mono uppercase tracking-widest text-[#a2a2a2]">
                  [ NAVIGATION ]
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#ff6436]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6436]"></span>
                  ONLINE
                </span>
              </div>

              <nav className="flex flex-col space-y-4">
                <Link
                  href={`/${lang}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-white/5 font-mono text-xl font-bold uppercase tracking-tight"
                >
                  <span>{dict.nav.home}</span>
                  <span className="text-xs text-[#7b7a7c]">00</span>
                </Link>

                {navItems.map((item, idx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-2 border-b border-white/5 font-mono text-xl font-bold uppercase tracking-tight"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[#ff6436] text-sm">{item.glyph}</span>
                      {item.label}
                    </span>
                    <span className="text-xs text-[#7b7a7c]">0{idx + 1}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-sm">
              <Link
                href={`/${otherLang}`}
                className="text-[#a2a2a2] hover:text-white uppercase tracking-wider"
              >
                {dict.language.switch}
              </Link>
              <a
                href="https://wa.me/46700265645"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="rounded-full border border-white/20 px-5 py-2 hover:bg-[#ff6436] hover:text-[#161616] uppercase tracking-wider"
              >
                {dict.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
