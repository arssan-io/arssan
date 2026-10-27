"use client";

import Image from "next/image";
import { AnimateInView } from "./AnimateInView";
import type { Locale } from "@/lib/i18n";

interface PartnerItem {
  id: string;
  name: string;
  role: string;
  logo: string;
  url: string;
}

interface PartnersProps {
  lang: Locale;
  dict: {
    partners?: {
      badge: string;
      title: string;
      subtitle: string;
      items: {
        cloudflare: { name: string; role: string };
        github: { name: string; role: string };
        google_analytics: { name: string; role: string };
        sanity: { name: string; role: string };
      };
    };
  };
}

export function Partners({ lang, dict }: PartnersProps) {
  const isAr = lang === "ar";
  const t = dict.partners;

  if (!t) return null;

  const partnerList: PartnerItem[] = [
    {
      id: "cloudflare",
      name: t.items.cloudflare.name,
      role: t.items.cloudflare.role,
      logo: "/partners/cloudflare.svg",
      url: "https://www.cloudflare.com",
    },
    {
      id: "github",
      name: t.items.github.name,
      role: t.items.github.role,
      logo: "/partners/github.svg",
      url: "https://github.com",
    },
    {
      id: "google_analytics",
      name: t.items.google_analytics.name,
      role: t.items.google_analytics.role,
      logo: "/partners/google-analytics.svg",
      url: "https://analytics.google.com",
    },
    {
      id: "sanity",
      name: t.items.sanity.name,
      role: t.items.sanity.role,
      logo: "/partners/sanity.svg",
      url: "https://www.sanity.io",
    },
  ];

  return (
    <section className="relative py-14 sm:py-18 md:py-20 bg-[#ffffff] text-[#0d0d0d] overflow-hidden border-b border-[#f3f3f3]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <AnimateInView className="mb-8 sm:mb-12">
          <div className="flex flex-col items-start text-start max-w-3xl">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-[64px] bg-[#f3f3f3] border border-[#e6e8eb] text-[12px] sm:text-[13px] font-medium text-[#646f79] mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[-0.02em] text-[#0d0d0d] leading-[1.2] mb-3">
              {t.title}
            </h2>

            <p className="text-[14px] sm:text-base text-[#646f79] leading-[1.65] font-normal">
              {t.subtitle}
            </p>
          </div>
        </AnimateInView>

        {/* 4 Partners Grid */}
        <AnimateInView delay={0.06}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {partnerList.map((partner) => (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-[20px] bg-[#fafafa] border border-[#e6e8eb] p-5 sm:p-6 md:p-7 flex flex-col justify-between items-center text-center transition-all duration-300 md:hover:-translate-y-1 hover:bg-[#ffffff] hover:border-[#646f79]/40 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.02)] min-h-[140px] sm:min-h-[160px]"
                title={isAr ? `زيارة موقع ${partner.name}` : `Visit ${partner.name}`}
              >
                {/* Top Label */}
                <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#9ca3af]">
                  <span className="uppercase tracking-wider">{partner.name}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#0d0d0d]">
                    ↗
                  </span>
                </div>

                {/* Logo Display */}
                <div className="my-auto py-3 sm:py-4 flex items-center justify-center w-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={40}
                    unoptimized
                    className="h-7 sm:h-8 w-auto max-w-[120px] sm:max-w-[145px] object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Bottom Role / Capability */}
                <div className="text-[11px] sm:text-xs font-mono text-[#646f79] group-hover:text-[#0d0d0d] transition-colors leading-tight">
                  {partner.role}
                </div>
              </a>
            ))}
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
