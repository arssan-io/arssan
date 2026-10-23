"use client";

import Link from "next/link";
import { AnimateInView } from "./AnimateInView";
import type { Locale } from "@/lib/i18n";

interface FooterProps {
  lang: Locale;
  dict: {
    nav: { home: string; process: string; services: string; pricing: string; contact: string };
    footer: {
      bio: string;
      description: string;
      rights: string;
      links: { title: string };
      services_title: string;
    };
    services: {
      design: { title: string };
      development: { title: string };
      seo: { title: string };
    };
  };
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export function Footer({ lang, dict }: FooterProps) {
  const year = new Date().getFullYear();
  const isAr = lang === "ar";

  const quickLinks = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.services, href: `/${lang}#services` },
    { label: dict.nav.process, href: `/${lang}#process` },
    { label: dict.nav.pricing, href: `/${lang}#pricing` },
  ];

  const serviceLinks = [
    { label: dict.services.design.title, href: `/${lang}#services` },
    { label: dict.services.development.title, href: `/${lang}#services` },
    { label: dict.services.seo.title, href: `/${lang}#services` },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com/arssan.co", icon: IconInstagram },
    { label: "X", href: "https://x.com/arssan_co", icon: IconX },
    { label: "Facebook", href: "https://facebook.com/arssan.co", icon: IconFacebook },
  ];

  return (
    <footer className="relative bg-[#ffffff] text-[#0d0d0d] overflow-hidden pt-16 md:pt-24">
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Executive Pre-Footer CTA Card (#0d0e10 Asana Dark Surface) */}
        <AnimateInView className="mb-16 md:mb-24">
          <div className="rounded-[20px] bg-[#0d0e10] text-[#ffffff] p-8 sm:p-12 md:p-16 shadow-[0_20px_48px_-12px_rgba(13,14,16,0.22)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-start relative overflow-hidden">
            <div className="max-w-2xl space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[64px] bg-[#ffffff]/10 border border-[#ffffff]/15 text-[12px] font-medium text-[#ffffff]/90">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isAr ? "استشارة مجانية لمشروعك في الكويت" : "Free Executive Discovery Call"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[-0.02em] leading-[1.25]">
                {isAr
                  ? "هل أنت مستعد لبناء حضور رقمي يليق بعلامتك التجارية؟"
                  : "Ready to build a calm, high-performing digital platform?"}
              </h3>
              <p className="text-sm sm:text-base text-[#ffffff]/70 leading-[1.6]">
                {isAr
                  ? "تواصل مع فريقنا مباشرة عبر واتساب لمناقشة تفاصيل مشروعك واختيار الباقة الأنسب لأهدافك."
                  : "Connect directly with our team to scope your project, timeline, and KWD package."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto relative z-10">
              <a
                href="https://wa.me/46700265645"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-[64px] bg-[#ffffff] text-[#0d0e10] font-medium text-[15px] hover:bg-[#f3f3f3] transition-all duration-200 active:scale-[0.98]"
              >
                <span>{dict.nav.contact}</span>
                <span className="rtl:rotate-180">→</span>
              </a>
              <a
                href={`/${lang}#pricing`}
                className="inline-flex items-center justify-center h-12 px-7 rounded-[64px] bg-[#ffffff]/10 text-[#ffffff] border border-[#ffffff]/15 hover:bg-[#ffffff]/20 font-medium text-[15px] transition-all duration-200"
              >
                {dict.nav.pricing}
              </a>
            </div>
          </div>
        </AnimateInView>

        {/* Main Footer Columns */}
        <AnimateInView>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#f3f3f3] text-start">
            {/* Brand Column (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src="/images/Logo.svg"
                  alt="Arssan"
                  className="h-7 sm:h-8 w-auto brightness-0"
                />
                <span className="text-[11px] font-medium px-3 py-1 rounded-[64px] bg-[#f3f3f3] border border-[#e6e8eb] text-[#646f79]">
                  {isAr ? "الكويت • الخليج" : "Kuwait • GCC"}
                </span>
              </div>

              <p className="text-[15px] text-[#646f79] leading-[1.65] max-w-sm font-normal">
                {dict.footer.bio}
              </p>

              {/* Social Pill Buttons */}
              <div className="flex items-center gap-2.5 pt-1">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-[64px] bg-[#f3f3f3] border border-[#e6e8eb] flex items-center justify-center text-[#646f79] hover:text-[#ffffff] hover:bg-[#0d0e10] hover:border-[#0d0e10] transition-all duration-200"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-5 text-[#0d0d0d]">
                {dict.footer.links.title}
              </h4>
              <ul className="space-y-3 text-[14px]">
                {quickLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[#646f79] hover:text-[#0d0d0d] transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-5 text-[#0d0d0d]">
                {dict.footer.services_title}
              </h4>
              <ul className="space-y-3 text-[14px]">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#646f79] hover:text-[#0d0d0d] transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-5 text-[#0d0d0d]">
                {dict.nav.contact}
              </h4>
              <ul className="space-y-3 text-[14px] text-[#646f79]">
                <li>
                  <a
                    href="mailto:info@arssan.com"
                    className="hover:text-[#0d0d0d] transition-colors"
                  >
                    info@arssan.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/46700265645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0d0d0d] transition-colors"
                  >
                    <span dir="ltr" className="inline-block font-mono text-[13px]">
                      +46 70 026 56 45
                    </span>
                  </a>
                </li>
                <li className="pt-1 text-[12px] font-mono text-[#646f79]">
                  29°22&apos;N 47°58&apos;E
                  <span className="block text-[12px] font-sans mt-0.5">
                    {isAr ? "مدينة الكويت • الشرق الأوسط" : "Kuwait City • GCC"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </AnimateInView>

        {/* Bottom Sub-bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#646f79]">
          <p>
            &copy; {year} Arssan. {dict.footer.rights}.
          </p>

          <div className="flex items-center gap-3 text-[12px]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[64px] bg-[#f3f3f3] text-[#0d0d0d] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              {isAr ? "جميع الأنظمة تعمل بكفاءة" : "All Systems Operational"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
