"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
      className="relative py-24 md:py-32 bg-[#f3f3f3] text-[#0d0d0d] overflow-hidden border-b border-[#e6e8eb]"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <AnimateInView className="mb-14 md:mb-20">
          <div className="flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[64px] bg-[#ffffff] border border-[#e5e7eb] text-[13px] font-medium text-[#646f79] mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <span className="w-2 h-2 rounded-full bg-[#0d0e10]" />
              <span>{dict.pricing.badge}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4 md:gap-8">
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-normal tracking-[-0.02em] text-[#0d0d0d] leading-[1.2]">
                {dict.pricing.title}
              </h2>
              <p className="text-base text-[#646f79] max-w-md leading-[1.6] font-normal">
                {dict.pricing.subtitle}
              </p>
            </div>
          </div>
        </AnimateInView>

        {/* 3-Column Asana Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {dict.pricing.packages.map((pkg, idx) => (
            <AnimateInView
              key={pkg.slug}
              variant="fadeUp"
              delay={idx * 0.1}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`relative h-full rounded-[20px] p-7 sm:p-9 flex flex-col justify-between text-start border transition-all duration-200 ${
                  pkg.popular
                    ? "bg-[#0d0e10] text-[#ffffff] border-[#0d0e10] shadow-[0_20px_48px_-12px_rgba(13,14,16,0.28),0_2px_8px_rgba(0,0,0,0.12)]"
                    : "bg-[#ffffff] text-[#0d0d0d] border-[#eceeef] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)]"
                }`}
              >
                <div>
                  {/* Top Row: Tier Name + Popular Pill */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-2xl font-medium tracking-tight">
                      {pkg.name}
                    </h3>
                    {pkg.popular ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[64px] bg-[#ffffff]/12 border border-[#ffffff]/20 text-[12px] font-medium text-[#ffffff]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{isAr ? "الأكثر اختياراً" : "Most Popular"}</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-[64px] bg-[#f3f3f3] text-[12px] font-mono text-[#646f79]">
                        0{idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Package Description */}
                  <p
                    className={`text-[15px] leading-[1.6] mb-7 ${
                      pkg.popular ? "text-[#ffffff]/75" : "text-[#646f79]"
                    }`}
                  >
                    {pkg.description}
                  </p>

                  {/* Price Block (KWD / د.ك) */}
                  <div
                    className={`mb-7 pb-7 border-b ${
                      pkg.popular ? "border-[#ffffff]/12" : "border-[#f3f3f3]"
                    }`}
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-5xl sm:text-[3.5rem] font-light tracking-[-0.03em] leading-none">
                        {pkg.price}
                      </span>
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-semibold ${
                            pkg.popular ? "text-[#ffffff]" : "text-[#0d0d0d]"
                          }`}
                        >
                          {pkg.currency}
                        </span>
                        <span
                          className={`text-xs ${
                            pkg.popular ? "text-[#ffffff]/60" : "text-[#646f79]"
                          }`}
                        >
                          {pkg.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-9 text-[14px] sm:text-[15px]">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
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
                  className={`group flex items-center justify-center gap-2 h-12 px-6 rounded-[64px] text-[14px] sm:text-[15px] font-medium transition-all duration-200 active:scale-[0.98] ${
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
              </motion.div>
            </AnimateInView>
          ))}
        </div>

        {/* Kuwait Market Assurance Strip */}
        <AnimateInView delay={0.25} className="mt-10">
          <div className="rounded-[20px] bg-[#ffffff] border border-[#eceeef] p-5 sm:px-8 sm:py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] sm:text-[14px] text-[#646f79]">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
              <span className="flex items-center gap-2 text-[#0d0d0d] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                {isAr
                  ? "دفعات مرنة وميسّرة على مراحل المشروع"
                  : "Flexible Milestone Payments in KWD"}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#646f79]" />
                {isAr
                  ? "ملكية كاملة للكود البرمجي والنطاق"
                  : "100% Source Code & Domain Ownership"}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#646f79]" />
                {isAr
                  ? "دعم فني مباشر عبر واتساب واجتماعات دورية"
                  : "Direct WhatsApp & Executive Support"}
              </span>
            </div>

            <a
              href="https://wa.me/46700265645"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0d0d0d] font-medium hover:text-[#646f79] underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              {isAr ? "تحتاج باقة مخصصة؟ تواصل معنا ←" : "Need a custom quote? Let's talk →"}
            </a>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
