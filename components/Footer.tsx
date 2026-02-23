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

  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <AnimateInView>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <img
                src="/images/Logo.svg"
                alt="Arsan"
                className="h-9 w-auto mb-5 invert"
              />
              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                {dict.footer.bio}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-5 text-white/35">
                {dict.footer.links.title}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-5 text-white/35">
                {dict.footer.services_title}
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-5 text-white/35">
                {dict.nav.contact}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@arssan.com"
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    info@arssan.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/966500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    +966 50 000 0000
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </AnimateInView>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {year} Arsan. {dict.footer.rights}.
          </p>
          <p className="text-xs text-white/30">
            Built with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
