"use client";

import Image from "next/image";
import { AnimateInView } from "./AnimateInView";
import type { Locale } from "@/lib/i18n";

interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  url: string;
}

const partners: PartnerItem[] = [
  {
    id: "cloudflare",
    name: "Cloudflare",
    logo: "/partners/cloudflare.svg",
    url: "https://www.cloudflare.com",
  },
  {
    id: "github",
    name: "GitHub",
    logo: "/partners/github.svg",
    url: "https://github.com",
  },
  {
    id: "google_analytics",
    name: "Google Analytics",
    logo: "/partners/google-analytics.svg",
    url: "https://analytics.google.com",
  },
  {
    id: "sanity",
    name: "Sanity",
    logo: "/partners/sanity.svg",
    url: "https://www.sanity.io",
  },
];

interface PartnersProps {
  lang?: Locale;
  dict?: {
    partners?: {
      badge?: string;
      title?: string;
      subtitle?: string;
    };
  };
}

export function Partners({ lang = "ar", dict }: PartnersProps = {}) {
  const isAr = lang === "ar";
  const subtitle =
    dict?.partners?.badge ||
    (isAr ? "شركاء التقنية والحلول السحابية" : "Technology & Cloud Infrastructure Partners");

  return (
    <section className="py-10 sm:py-14 bg-[#ffffff] border-b border-[#f3f3f3] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Subtle Minimalist Subtitle */}
        <AnimateInView className="text-center mb-6 sm:mb-8">
          <p className="text-xs sm:text-[13px] font-mono uppercase tracking-wider text-[#9ca3af] font-medium">
            {subtitle}
          </p>
        </AnimateInView>

        {/* Frameless Logos Row */}
        <AnimateInView delay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 items-center justify-items-center">
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-105"
                title={partner.name}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={40}
                  unoptimized
                  className="h-6 sm:h-7 md:h-8 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[150px] object-contain"
                />
              </a>
            ))}
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
