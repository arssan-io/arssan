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
    <footer className="relative bg-[#161616] text-white overflow-hidden border-t border-white/10">
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 py-16 md:py-24">
        <AnimateInView>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            {/* Brand Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src="/images/Logo.svg"
                  alt="Arssan"
                  className="h-8 w-auto brightness-0 invert"
                />
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-white/20 bg-white/[0.04] text-[#ff6436]">
                  ● ACTIVE
                </span>
              </div>

              <p className="text-sm text-[#a2a2a2] leading-relaxed max-w-sm font-normal">
                {dict.footer.bio}
              </p>

              {/* Pill Social Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-white/60 hover:text-[#161616] hover:bg-[#ff6436] hover:border-[#ff6436] transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links (2 cols) */}
            <div className="lg:col-span-2 font-mono">
              <h4 className="text-xs font-semibold tracking-widest uppercase mb-6 text-[#7b7a7c]">
                [ {dict.footer.links.title} ]
              </h4>
              <ul className="space-y-3 text-xs sm:text-[13px] uppercase tracking-wider">
                {quickLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="text-[#ff6436] opacity-0 group-hover:opacity-100 transition-opacity">
                        +
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links (2 cols) */}
            <div className="lg:col-span-2 font-mono">
              <h4 className="text-xs font-semibold tracking-widest uppercase mb-6 text-[#7b7a7c]">
                [ {dict.footer.services_title} ]
              </h4>
              <ul className="space-y-3 text-xs sm:text-[13px] uppercase tracking-wider">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="text-[#ff6436] opacity-0 group-hover:opacity-100 transition-opacity">
                        +
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information (3 cols) */}
            <div className="lg:col-span-3 font-mono">
              <h4 className="text-xs font-semibold tracking-widest uppercase mb-6 text-[#7b7a7c]">
                [ {dict.nav.contact} ]
              </h4>
              <ul className="space-y-3.5 text-xs sm:text-[13px]">
                <li>
                  <a
                    href="mailto:info@arssan.com"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    info@arssan.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/46700265645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#ff6436] transition-colors"
                  >
                    <span dir="ltr" className="inline-block">+46 70 026 56 45</span>
                  </a>
                </li>
                <li className="pt-2 text-[11px] text-[#7b7a7c]">
                  24°42&apos;N 46°40&apos;E // RIYADH & GLOBAL
                </li>
              </ul>
            </div>
          </div>
        </AnimateInView>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#7b7a7c]">
          <p className="uppercase tracking-wider">
            &copy; {year} ARSSAN. {dict.footer.rights}.
          </p>

          <div className="flex items-center gap-4 uppercase tracking-widest text-[10px]">
            <span className="flex items-center gap-1.5 text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6436]"></span>
              SYSTEM OK
            </span>
          </div>
        </div>
      </div>

      {/* Ghosted Giant Background Display Wordmark */}
      <div className="w-full select-none pointer-events-none text-center overflow-hidden opacity-[0.04] pb-2">
        <span className="font-display text-[160px] sm:text-[240px] md:text-[340px] uppercase font-bold tracking-tighter text-white leading-none">
          ARSSAN
        </span>
      </div>
    </footer>
  );
}
