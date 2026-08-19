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

export function Services({ dict }: ServicesProps) {
  const services = [
    { key: "design" as const, icon: icons.design, ...dict.services.design },
    { key: "development" as const, icon: icons.development, ...dict.services.development },
    { key: "seo" as const, icon: icons.seo, ...dict.services.seo },
  ];

  return (
    <section id="services" className="relative py-24 md:py-36 bg-[#161616] text-white overflow-hidden border-b border-white/10">
      <FloatingShapes shapes={servicesShapes} color="text-white" />

      {/* Ghosted Typographic Background Watermark */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden opacity-[0.03] z-0">
        <span className="font-display text-[160px] sm:text-[220px] md:text-[320px] uppercase font-bold tracking-tight text-white leading-none whitespace-nowrap">
          SERVICES
        </span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <AnimateInView className="mb-12 md:mb-24">
          <div className="flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.04] text-[12px] font-mono tracking-widest text-white uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6436]"></span>
              <span>{dict.services.badge}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4 md:gap-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-white">
                {dict.services.title}
              </h2>
              <p className="text-sm sm:text-base text-[#a2a2a2] max-w-md leading-relaxed font-normal">
                {dict.services.subtitle}
              </p>
            </div>
          </div>
        </AnimateInView>

        {/* Sharp Brutalist Service Blocks */}
        <div className="space-y-4">
          {services.map((service, idx) => (
            <AnimateInView key={service.key} variant="fadeUp" delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="group relative rounded-none border border-white/10 bg-white/[0.02] p-6 sm:p-10 md:p-12 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 text-start"
              >
                <div className="md:flex md:items-start md:gap-12">
                  {/* Left Column: Number & Icon */}
                  <div className="flex items-center gap-4 mb-6 md:mb-0 md:flex-col md:items-start md:gap-4 md:w-28 md:flex-shrink-0 font-mono">
                    <span className="text-3xl font-bold text-white/30 group-hover:text-[#ff6436] transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="w-10 h-10 rounded-none border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-[#ff6436] transition-all duration-300">
                      {service.icon}
                    </div>
                  </div>

                  {/* Right Column: Title, Description, and Ghost Glass Tags */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#a2a2a2] leading-relaxed mb-8 font-normal max-w-3xl">
                      {service.description}
                    </p>

                    {/* Metadata Ghost Glass Tags (0px radius) */}
                    <div className="flex flex-wrap gap-2.5 font-mono text-[11px] sm:text-xs">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-none border border-white/15 bg-white/[0.04] text-white/80 px-3 py-1.5 uppercase tracking-wider group-hover:border-white/30 transition-colors"
                        >
                          + {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Corner hairline crosshair */}
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-[#ff6436]">
                  [ ACTIVE ]
                </div>
              </motion.div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
