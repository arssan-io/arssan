"use client";

import { motion } from "framer-motion";
import { AnimateInView } from "./AnimateInView";
import { FloatingShapes, servicesShapes } from "./FloatingShapes";

interface ServicesProps {
  dict: {
    services: {
      badge: string;
      title: string;
      subtitle: string;
      design: { title: string; description: string; features: string[] };
      development: { title: string; description: string; features: string[] };
      seo: { title: string; description: string; features: string[] };
    };
  };
}

const icons = {
  design: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
    </svg>
  ),
  development: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  ),
  seo: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
    </svg>
  ),
};

const serviceMetrics = {
  design: { value: "WCAG AAA", label: "18.5:1 Contrast & RTL Precision", tag: "Figma Systems" },
  development: { value: "< 0.4s", label: "Instant Load & KNET Gateway Ready", tag: "Next.js 16" },
  seo: { value: "99 / 100", label: "Core Web Vitals & Kuwait Search Rank", tag: "Local & GCC SEO" },
};

export function Services({ dict }: ServicesProps) {
  const services = [
    { key: "design" as const, icon: icons.design, metric: serviceMetrics.design, ...dict.services.design },
    { key: "development" as const, icon: icons.development, metric: serviceMetrics.development, ...dict.services.development },
    { key: "seo" as const, icon: icons.seo, metric: serviceMetrics.seo, ...dict.services.seo },
  ];

  return (
    <section
      id="services"
      className="relative py-14 sm:py-18 md:py-24 bg-[#ffffff] text-[#0d0d0d] overflow-hidden border-b border-[#f3f3f3]"
    >
      <FloatingShapes shapes={servicesShapes} color="text-[#646f79]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <AnimateInView className="mb-8 sm:mb-10 md:mb-14">
          <div className="flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-[64px] bg-[#f3f3f3] border border-[#e6e8eb] text-[12px] sm:text-[13px] font-medium text-[#646f79] mb-4 sm:mb-5">
              <span className="w-2 h-2 rounded-full bg-[#0d0e10]" />
              <span>{dict.services.badge}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-3 md:gap-8">
              <h2 className="text-2xl sm:text-4xl md:text-[2.75rem] font-normal tracking-[-0.02em] text-[#0d0d0d] leading-[1.2]">
                {dict.services.title}
              </h2>
              <p className="text-[15px] sm:text-base text-[#646f79] max-w-md leading-[1.6] font-normal">
                {dict.services.subtitle}
              </p>
            </div>
          </div>
        </AnimateInView>

        {/* Asana Minimal-Maximalist Service Cards */}
        <div className="space-y-4 sm:space-y-6">
          {services.map((service, idx) => (
            <AnimateInView key={service.key} variant="fadeUp" delay={idx * 0.06}>
              <div className="group relative rounded-[20px] bg-[#f3f3f3] border border-[#e6e8eb] p-5 sm:p-7 md:p-10 md:hover:-translate-y-0.5 hover:border-[#646f79]/40 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] transition-[transform,border-color,box-shadow] duration-200 text-start">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                  {/* Left / Main Content (8 cols) */}
                  <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                    {/* Number & Icon Column */}
                    <div className="flex sm:flex-col items-center sm:items-start gap-3 flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] bg-[#ffffff] border border-[#e5e7eb] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#0d0d0d] group-hover:bg-[#0d0e10] group-hover:text-[#ffffff] transition-colors duration-200">
                        {service.icon}
                      </div>
                      <span className="font-mono text-xs font-medium text-[#646f79] px-2.5 py-0.5 rounded-[64px] bg-[#ffffff] border border-[#e5e7eb]">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Title, Copy, and Deliverable Pills */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl md:text-[1.75rem] font-medium text-[#0d0d0d] mb-2.5 sm:mb-3 leading-[1.25]">
                        {service.title}
                      </h3>
                      <p className="text-[14px] sm:text-base text-[#646f79] leading-[1.65] mb-5 sm:mb-6 max-w-2xl font-normal">
                        {service.description}
                      </p>

                      {/* Deliverable Pills on Crisp White Surface */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-[64px] bg-[#ffffff] border border-[#e5e7eb] text-[#0d0d0d] px-3 py-1 sm:px-4 sm:py-1.5 text-[12px] sm:text-[13px] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.03)] group-hover:border-[#646f79]/30 transition-colors duration-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#646f79] group-hover:bg-[#0d0e10] transition-colors" />
                            <span>{feature}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Elevated White Benchmark Card (4 cols) */}
                  <div className="lg:col-span-4">
                    <div className="rounded-[16px] bg-[#ffffff] border border-[#eceeef] p-4 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between min-h-auto sm:min-h-[160px] group-hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.10)] transition-shadow duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#646f79] px-2.5 py-1 rounded-[64px] bg-[#f3f3f3]">
                          {service.metric.tag}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      </div>

                      <div className="my-4">
                        <div className="text-3xl sm:text-4xl font-light tracking-tight text-[#0d0d0d]">
                          {service.metric.value}
                        </div>
                        <div className="text-[13px] text-[#646f79] mt-1 font-normal">
                          {service.metric.label}
                        </div>
                      </div>

                      <div className="w-full h-1.5 rounded-full bg-[#f3f3f3] overflow-hidden">
                        <motion.div
                          initial={{ scaleX: 0.35 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.65, delay: 0.15 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full h-full rounded-full bg-[#0d0e10] origin-left rtl:origin-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
