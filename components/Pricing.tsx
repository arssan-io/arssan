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
  return (
    <section id="pricing" className="relative py-24 md:py-36 bg-[#f8f8f8] text-[#3c3a3e] overflow-hidden border-b border-[#c9c7cc]/50">
      {/* Ghosted Typographic Background Watermark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden opacity-60 z-0">
        <span className="font-display text-[140px] sm:text-[180px] md:text-[240px] uppercase font-bold tracking-tight text-white leading-none whitespace-nowrap">
          PRICING
        </span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <AnimateInView className="mb-12 md:mb-24">
          <div className="flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#3c3a3e]/20 bg-white text-[12px] font-mono tracking-widest text-[#3c3a3e] uppercase mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6436]"></span>
              <span>{dict.pricing.badge}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4 md:gap-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[#3c3a3e]">
                {dict.pricing.title}
              </h2>
              <p className="text-sm sm:text-base text-[#7b7a7c] max-w-md leading-relaxed font-normal">
                {dict.pricing.subtitle}
              </p>
            </div>
          </div>
        </AnimateInView>

        {/* 3-Column Sharp Cards Grid */}
        <div className="grid md:grid-cols-3 gap-0 border border-[#c9c7cc] bg-white divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-[#c9c7cc]">
          {dict.pricing.packages.map((pkg, idx) => (
            <AnimateInView
              key={pkg.slug}
              variant="fadeUp"
              delay={idx * 0.1}
              className="h-full"
            >
              <div
                className={`relative h-full flex flex-col justify-between p-6 sm:p-10 transition-colors duration-300 text-start ${
                  pkg.popular
                    ? "bg-[#161616] text-white"
                    : "bg-white text-[#3c3a3e] hover:bg-[#f1f1f1]/50"
                }`}
              >
                {/* Popular Status Pill */}
                {pkg.popular && (
                  <div className="inline-flex items-center gap-2 self-start bg-white/[0.08] border border-white/20 text-[#ff6436] font-mono text-[11px] font-semibold tracking-widest uppercase rounded-full px-3.5 py-1 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6436] animate-pulse"></span>
                    <span>{pkg.cta}</span>
                  </div>
                )}

                <div>
                  {/* Header: Name + Description */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold tracking-tight mb-2">
                      {pkg.name}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        pkg.popular ? "text-[#a2a2a2]" : "text-[#7b7a7c]"
                      }`}
                    >
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div
                    className={`mb-8 pb-6 border-b ${
                      pkg.popular ? "border-white/10" : "border-[#c9c7cc]/50"
                    }`}
                  >
                    <div className="flex items-baseline gap-2 font-mono">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                        {pkg.price}
                      </span>
                      <div className="flex flex-col text-[11px] uppercase tracking-wider">
                        <span className="font-semibold text-[#ff6436]">
                          {pkg.currency}
                        </span>
                        <span className={pkg.popular ? "text-white/40" : "text-[#a2a2a2]"}>
                          {pkg.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-10 font-mono text-xs sm:text-[13px]">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span className="text-[#ff6436] font-bold mt-0.5">+</span>
                        <span
                          className={`leading-snug ${
                            pkg.popular ? "text-white/80" : "text-[#3c3a3e]"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/${lang}/pricing/${pkg.slug}`}
                  className={`block text-center font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase py-3.5 rounded-full transition-all duration-300 active:scale-95 ${
                    pkg.popular
                      ? "bg-[#ff6436] text-[#161616] hover:bg-white hover:text-[#161616]"
                      : "border border-[#3c3a3e]/30 text-[#3c3a3e] hover:bg-[#161616] hover:text-white hover:border-[#161616]"
                  }`}
                >
                  {pkg.cta} →
                </Link>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
