"use client";

import Link from "next/link";
import { AnimateInView } from "./AnimateInView";
import type { Locale } from "@/lib/i18n";

interface PricingPackage {
  name: string;
  slug: string;
  price: string;
  currency: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

interface PricingProps {
  lang: Locale;
  dict: {
    pricing: {
      badge: string;
      title: string;
      subtitle: string;
      packages: PricingPackage[];
    };
  };
}

export function Pricing({ lang, dict }: PricingProps) {
  const isAr = lang === "ar";

  return (
    <section
      id="pricing"
      className="relative py-14 sm:py-20 md:py-32 bg-[#f3f3f3] text-[#0d0d0d] overflow-hidden border-b border-[#e6e8eb]"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <AnimateInView className="mb-10 sm:mb-14 md:mb-20">
          <div className="flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-[64px] bg-[#ffffff] border border-[#e5e7eb] text-[12px] sm:text-[13px] font-medium text-[#646f79] mb-4 sm:mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <span className="w-2 h-2 rounded-full bg-[#0d0e10]" />
              <span>{dict.pricing.badge}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-3 md:gap-8">
              <h2 className="text-2xl sm:text-4xl md:text-[2.75rem] font-normal tracking-[-0.02em] text-[#0d0d0d] leading-[1.2]">
                {dict.pricing.title}
              </h2>
              <p className="text-[15px] sm:text-base text-[#646f79] max-w-md leading-[1.6] font-normal">
                {dict.pricing.subtitle}
              </p>
            </div>
          </div>
        </AnimateInView>

        {/* 3-Column Asana Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {dict.pricing.packages.map((pkg, idx) => (
            <AnimateInView
              key={pkg.slug}
              variant="fadeUp"
              delay={idx * 0.06}
              className="h-full"
            >
              <div
                className={`relative h-full rounded-[20px] p-6 sm:p-7 md:p-9 flex flex-col justify-between text-start border md:hover:-translate-y-1.5 transition-[transform,border-color,box-shadow] duration-200 ${
                  pkg.popular
                    ? "bg-[#0d0e10] text-[#ffffff] border-[#0d0e10] shadow-[0_20px_48px_-12px_rgba(13,14,16,0.28),0_2px_8px_rgba(0,0,0,0.12)]"
                    : "bg-[#ffffff] text-[#0d0d0d] border-[#eceeef] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)]"
                }`}
              >
                <div>
                  {/* Top Row: Tier Name + Popular Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight">
                      {pkg.name}
                    </h3>
                    {pkg.popular ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-[64px] bg-[#ffffff]/12 border border-[#ffffff]/20 text-[11px] sm:text-[12px] font-medium text-[#ffffff]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{isAr ? "الأكثر اختياراً" : "Most Popular"}</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[64px] bg-[#f3f3f3] text-[11px] sm:text-[12px] font-mono text-[#646f79]">
                        0{idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Package Description */}
                  <p
                    className={`text-[14px] sm:text-[15px] leading-[1.6] mb-5 sm:mb-7 ${
                      pkg.popular ? "text-[#ffffff]/75" : "text-[#646f79]"
                    }`}
                  >
                    {pkg.description}
                  </p>

                  {/* Price Block (KWD / د.ك) */}
                  <div
                    className={`mb-5 sm:mb-7 pb-5 sm:pb-7 border-b ${
                      pkg.popular ? "border-[#ffffff]/12" : "border-[#f3f3f3]"
                    }`}
                  >
                    <div className="flex items-baseline gap-2 sm:gap-2.5">
                      <span className="text-4xl sm:text-5xl md:text-[3.5rem] font-light tracking-[-0.03em] leading-none">
                        {pkg.price}
                      </span>
                      <div className="flex flex-col">
                        <span
                          className={`text-xs sm:text-sm font-semibold ${
                            pkg.popular ? "text-[#ffffff]" : "text-[#0d0d0d]"
                          }`}
                        >
                          {pkg.currency}
                        </span>
                        <span
                          className={`text-[11px] sm:text-xs ${
                            pkg.popular ? "text-[#ffffff]/60" : "text-[#646f79]"
                          }`}
                        >
                          {pkg.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 sm:space-y-3.5 mb-7 sm:mb-9 text-[13px] sm:text-[14px] md:text-[15px]">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 sm:gap-3">
                        <span
                          className={`mt-0.5 sm:mt-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                            pkg.popular
                              ? "bg-[#ffffff] text-[#0d0e10]"
                              : "bg-[#f3f3f3] text-[#0d0d0d]"
                          }`}
                        >
                          ✓
                        </span>
                        <span
                          className={`leading-[1.5] ${
                            pkg.popular ? "text-[#ffffff]/90" : "text-[#0d0d0d]"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* High-Affordance Pill CTA (48px height, 64px radius) */}
                <Link
                  href={`/${lang}/pricing/${pkg.slug}`}
                  className={`group flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-[64px] text-[14px] sm:text-[15px] font-medium transition-[background-color,transform] duration-200 active:scale-[0.98] ${
                    pkg.popular
                      ? "bg-[#ffffff] text-[#0d0e10] hover:bg-[#f3f3f3] shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                      : "bg-[#0d0e10] text-[#ffffff] hover:bg-[#646f79]"
                  }`}
                >
                  <span>{pkg.cta}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
                    →
                  </span>
                </Link>
              </div>
            </AnimateInView>
          ))}
        </div>

        {/* Kuwait Market Assurance Strip */}
        <AnimateInView delay={0.25} className="mt-8 sm:mt-10">
          <div className="rounded-[20px] bg-[#ffffff] border border-[#eceeef] p-4 sm:px-8 sm:py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4 text-[12px] sm:text-[14px] text-[#646f79]">
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-start gap-2.5 sm:gap-6 w-full md:w-auto">
              <span className="flex items-center gap-2 text-[#0d0d0d] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />
                <span>{isAr ? "دفعات مرنة وميسّرة على مراحل المشروع" : "Flexible Milestone Payments in KWD"}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#646f79] flex-shrink-0" />
                <span>{isAr ? "ملكية كاملة للكود البرمجي والنطاق" : "100% Source Code & Domain Ownership"}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#646f79] flex-shrink-0" />
                <span>{isAr ? "دعم فني مباشر عبر واتساب واجتماعات دورية" : "Direct WhatsApp & Executive Support"}</span>
              </span>
            </div>

            <a
              href="https://wa.me/46700265645"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0d0d0d] font-medium hover:text-[#646f79] underline underline-offset-4 transition-colors whitespace-nowrap self-start md:self-auto pt-1 md:pt-0"
            >
              {isAr ? "تحتاج باقة مخصصة؟ تواصل معنا ←" : "Need a custom quote? Let's talk →"}
            </a>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
