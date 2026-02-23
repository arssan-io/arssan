"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface HeaderProps {
  lang: Locale;
  dict: {
    nav: { home: string; process: string; services: string; pricing: string; contact: string };
    language: { switch: string };
  };
}

export function Header({ lang, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const otherLang = lang === "ar" ? "en" : "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navItems = [
    { label: dict.nav.process, href: `/${lang}#process` },
    { label: dict.nav.services, href: `/${lang}#services` },
    { label: dict.nav.pricing, href: `/${lang}#pricing` },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center relative z-50">
          <img
            src="/images/Logo.svg"
            alt="Arsan"
            className="h-8 sm:h-9 w-auto"
          />
        </Link>

        {/* Desktop: pill-grouped nav (center) */}
        <nav className="hidden md:flex items-center gap-0.5 rounded-full border border-black/[0.08] bg-black/[0.02] px-1 py-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium px-4 py-1.5 rounded-full hover:bg-black/[0.05] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop: right actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={`/${otherLang}`}
            className="text-[13px] font-medium text-black/60 hover:text-black transition-colors duration-200"
          >
            {dict.language.switch}
          </Link>
          <Link
            href={`/${lang}#contact`}
            className="text-[13px] font-medium rounded-full border border-black/15 px-4 py-1.5 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
          >
            {dict.nav.contact}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2.5 -me-2.5 relative z-50"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-0.5 bg-black origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="block w-5 h-0.5 bg-black"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-0.5 bg-black origin-center"
          />
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <Link
                  href={`/${lang}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-bold tracking-tight"
                >
                  {dict.nav.home}
                </Link>
              </motion.div>
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-bold tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="flex items-center gap-4 mt-4"
              >
                <Link
                  href={`/${otherLang}`}
                  className="text-base font-medium text-black/50"
                >
                  {dict.language.switch}
                </Link>
                <span className="w-px h-4 bg-black/10" />
                <Link
                  href={`/${lang}#contact`}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium rounded-full border border-black/15 px-5 py-2 hover:bg-black hover:text-white transition-all duration-200"
                >
                  {dict.nav.contact}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
