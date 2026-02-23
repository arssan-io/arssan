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

/* --- Social icons (inline SVGs for zero dependencies) --- */
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
    { label: dict.nav.process, href: `/${lang}#process` },
    { label: dict.nav.services, href: `/${lang}#services` },
    { label: dict.nav.pricing, href: `/${lang}#pricing` },
  ];

  const serviceLinks = [
    { label: dict.services.design.title, href: `/${lang}#services` },
    { label: dict.services.development.title, href: `/${lang}#services` },
    { label: dict.services.seo.title, href: `/${lang}#services` },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com/arssan", icon: IconInstagram },
    { label: "X", href: "https://x.com/arssan", icon: IconX },
    { label: "Facebook", href: "https://facebook.com/arssan", icon: IconFacebook },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <AnimateInView>
          {/* ===== MOBILE / TABLET layout (below lg) ===== */}
          <div className="lg:hidden space-y-8">
            {/* Brand */}
            <div className="flex flex-col items-center text-center pb-8 border-b border-white/[0.08]">
              <img
                src="/images/Logo.svg"
                alt="Arssan"
                className="h-9 w-auto mb-5 invert"
              />
              <p className="text-sm text-white/45 leading-relaxed max-w-xs mb-6">
                {dict.footer.bio}
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links — two columns side by side */}
            <div className="grid grid-cols-2 gap-8 pb-8 border-b border-white/[0.08] justify-items-center">
              <div>
                <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-white/30">
                  {dict.footer.links.title}
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/45 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-white/30">
                  {dict.footer.services_title}
                </h4>
                <ul className="space-y-3">
                  {serviceLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/45 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact — centered */}
            <div className="text-center">
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-white/30">
                {dict.nav.contact}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@arssan.com"
                    className="text-sm text-white/45 hover:text-white transition-colors duration-300"
                  >
                    info@arssan.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/46700265645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/45 hover:text-white transition-colors duration-300"
                  >
                    <span dir="ltr" className="inline-block">+46 70 026 56 45</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ===== DESKTOP layout (lg and above) ===== */}
          <div className="hidden lg:grid grid-cols-4 gap-12 justify-items-center">
            {/* Brand */}
            <div>
              <img
                src="/images/Logo.svg"
                alt="Arssan"
                className="h-9 w-auto mb-5 invert"
              />
              <p className="text-sm text-white/45 leading-relaxed max-w-xs mb-6">
                {dict.footer.bio}
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-5 text-white/30">
                {dict.footer.links.title}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-5 text-white/30">
                {dict.footer.services_title}
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-5 text-white/30">
                {dict.nav.contact}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@arssan.com"
                    className="text-sm text-white/45 hover:text-white transition-colors duration-300"
                  >
                    info@arssan.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/46700265645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/45 hover:text-white transition-colors duration-300"
                  >
                    <span dir="ltr" className="inline-block">+46 70 026 56 45</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </AnimateInView>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-center">
          <p className="text-xs text-white/25">
            &copy; {year} Arssan. {dict.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
