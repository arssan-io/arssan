"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

interface HeaderProps {
  lang: Locale;
  dict: {
    nav: {
      home: string;
      projects?: string;
      coloring: string;
      process: string;
      services: string;
      pricing: string;
      contact: string;
    };
    language: { switch: string };
  };
}

export function Header({ lang, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const pathname = usePathname();
  const otherLang = lang === "ar" ? "en" : "ar";
  const isAr = lang === "ar";
  const switchLangHref = pathname
    ? pathname.replace(new RegExp(`^/${lang}`), `/${otherLang}`)
    : `/${otherLang}`;

  useEffect(() => {
    const updateHeaderState = () => {
      setScrolled(window.scrollY > 24);

      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setIsOverHero(rect.bottom > 70);
      } else {
        setIsOverHero(false);
      }
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState, { passive: true });
    window.addEventListener("pageshow", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
      window.removeEventListener("pageshow", updateHeaderState);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navItems = [
    { label: dict.nav.projects || (isAr ? "مشاريعنا" : "Projects"), href: `/${lang}/projects` },
    { label: dict.nav.services, href: `/${lang}#services` },
    { label: dict.nav.process, href: `/${lang}#process` },
    { label: dict.nav.pricing, href: `/${lang}#pricing` },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-[background-color,border-color,box-shadow,padding] duration-200 ${
          isOverHero
            ? scrolled
              ? "py-3 bg-black/45 border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
              : "py-3.5 sm:py-5 bg-black/20 border-b border-white/10"
            : scrolled
              ? "py-3 bg-[#ffffff]/92 border-b border-[#f3f3f3] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
              : "py-3.5 sm:py-5 bg-[#ffffff]/80 border-b border-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href={`/${lang}`}
            className="flex items-center relative z-50 transition-opacity duration-150 hover:opacity-80"
          >
            <img
              src="/images/Logo.svg"
              alt="Arssan"
              className={`h-7 sm:h-8 w-auto transition-[filter] duration-200 ${
                isOverHero && !mobileOpen ? "brightness-0 invert" : "brightness-0"
              }`}
            />
          </Link>

          {/* Desktop Asana Surface Pill Navigation */}
          <nav
            onMouseLeave={() => setHoveredNav(null)}
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-[64px] transition-colors duration-200 ${
              isOverHero
                ? "bg-white/[0.08] border border-white/15 backdrop-blur-md"
                : "bg-[#f3f3f3] border border-[#e8eaed]"
            }`}
          >
            {navItems.map((item) => {
              const isHovered = hoveredNav === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredNav(item.href)}
                  className={`relative px-4 py-1.5 text-[14px] font-medium transition-colors duration-150 rounded-[64px] ${
                    isOverHero
                      ? "text-white/85 hover:text-white"
                      : "text-[#0d0d0d]"
                  }`}
                >
                  {isHovered && (
                    <motion.span
                      layoutId="asana-nav-pill"
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className={`absolute inset-0 rounded-[64px] ${
                        isOverHero
                          ? "bg-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                          : "bg-[#ffffff] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                      }`}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={switchLangHref}
              className={`px-3.5 py-2 rounded-[64px] text-[13px] font-medium transition-all duration-150 ${
                isOverHero
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-[#646f79] hover:text-[#0d0d0d] hover:bg-[#f3f3f3]"
              } ${
                otherLang === "ar" ? "font-readex-pro" : "font-sans"
              }`}
            >
              {dict.language.switch}
            </Link>

            <a
              href="https://wa.me/46700265645"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[64px] text-[14px] font-medium transition-all duration-200 active:scale-[0.98] ${
                isOverHero
                  ? "bg-[#ffffff] text-[#0d0d0d] hover:bg-[#f1f5f9] shadow-[0_2px_12px_rgba(255,255,255,0.18)]"
                  : "bg-[#0d0e10] text-[#ffffff] hover:bg-[#646f79] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
              }`}
            >
              <span>{dict.nav.contact}</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180">
                →
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button (44x44px touch target) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden flex flex-col items-center justify-center w-11 h-11 rounded-[64px] relative z-50 transition-colors ${
              mobileOpen
                ? "bg-[#f3f3f3] text-[#0d0d0d] hover:bg-[#e5e7eb]"
                : isOverHero
                ? "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
                : "bg-[#f3f3f3] text-[#0d0d0d] hover:bg-[#e5e7eb]"
            }`}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`block w-4 h-0.5 origin-center ${
                  mobileOpen ? "bg-[#0d0d0d]" : isOverHero ? "bg-white" : "bg-[#0d0d0d]"
                }`}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className={`block w-4 h-0.5 ${
                  mobileOpen ? "bg-[#0d0d0d]" : isOverHero ? "bg-white" : "bg-[#0d0d0d]"
                }`}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`block w-4 h-0.5 origin-center ${
                  mobileOpen ? "bg-[#0d0d0d]" : isOverHero ? "bg-white" : "bg-[#0d0d0d]"
                }`}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-[#ffffff] text-[#0d0d0d] z-[45] flex flex-col justify-between px-6 pt-24 pb-10"
          >
            <div className="flex flex-col space-y-6">
              <div className="p-4 rounded-[20px] bg-[#f3f3f3] flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#646f79]">
                  {isAr ? "أرسان • الكويت" : "Arssan • Kuwait"}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#0d0d0d] bg-[#ffffff] px-3 py-1 rounded-[64px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  {isAr ? "متاح الآن" : "Available"}
                </span>
              </div>

              <nav className="flex flex-col space-y-2">
                <Link
                  href={`/${lang}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-[20px] hover:bg-[#f3f3f3] text-lg font-medium text-[#0d0d0d] transition-colors"
                >
                  <span>{dict.nav.home}</span>
                  <span className="text-sm text-[#646f79]">01</span>
                </Link>

                {navItems.map((item, idx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-[20px] hover:bg-[#f3f3f3] text-lg font-medium text-[#0d0d0d] transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-sm text-[#646f79]">0{idx + 2}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#f3f3f3] flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={switchLangHref}
                  onClick={() => setMobileOpen(false)}
                  className={`flex-1 h-12 rounded-[64px] bg-[#f3f3f3] flex items-center justify-center text-[#0d0d0d] font-medium ${
                    otherLang === "ar" ? "font-readex-pro text-base" : "font-sans text-sm"
                  }`}
                >
                  {dict.language.switch}
                </Link>
                <a
                  href="https://wa.me/46700265645"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex-[2] h-12 rounded-[64px] bg-[#0d0e10] text-[#ffffff] flex items-center justify-center font-medium text-sm shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                >
                  {dict.nav.contact}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
