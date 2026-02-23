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
    <section id="pricing" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <AnimateInView className="text-center mb-14 md:mb-20">
          <span className="inline-block text-xs sm:text-sm font-medium tracking-[0.2em] uppercase border border-black/15 rounded-full px-5 py-2 sm:px-6 sm:py-2.5 mb-5 text-black/60">
            {dict.pricing.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-5">
            {dict.pricing.title}
          </h2>
          <p className="text-base sm:text-lg text-black/60 max-w-xl mx-auto leading-relaxed">
            {dict.pricing.subtitle}
          </p>
        </AnimateInView>

        {/* items-stretch (default) forces equal row height */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {dict.pricing.packages.map((pkg, idx) => (
            <AnimateInView
              key={pkg.slug}
              variant="fadeUp"
              delay={idx * 0.12}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`relative h-full flex flex-col rounded-2xl bg-white transition-[border-color,box-shadow] duration-500 ${
                  pkg.popular
                    ? "border-2 border-black shadow-2xl md:-translate-y-3"
                    : "border border-black/12 hover:border-black/25 hover:shadow-lg"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-semibold tracking-widest uppercase rounded-full px-5 py-1.5 whitespace-nowrap">
                    {pkg.cta}
                  </div>
                )}

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  {/* Header: name + description — fixed height zone */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold tracking-tight mb-1.5">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-black/50 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price — fixed height zone */}
                  <div className="mb-6 pb-6 border-b border-black/10">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                        {pkg.price}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-black/70">
                          {pkg.currency}
                        </span>
                        <span className="text-xs text-black/40">
                          {pkg.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features — flex-1 absorbs height differences */}
                  <ul className="space-y-3 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <svg
                          className="flex-shrink-0 w-4 h-4 mt-0.5 text-black/40"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        <span className="text-sm text-black/65 leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA — pinned to bottom via mt-auto */}
                  <Link
                    href={`/${lang}/pricing/${pkg.slug}`}
                    className={`block text-center text-sm font-semibold tracking-wider uppercase py-3.5 rounded-full transition-all duration-300 active:scale-95 mt-8 ${
                      pkg.popular
                        ? "bg-black text-white hover:opacity-80"
                        : "border border-black/15 text-black hover:bg-black hover:text-white hover:border-black"
                    }`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              </motion.div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
