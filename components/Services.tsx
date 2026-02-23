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
    <section id="services" className="relative py-20 md:py-32 bg-black text-white">
      <FloatingShapes shapes={servicesShapes} color="text-white" />
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        <AnimateInView className="text-center mb-14 md:mb-20">
          <span className="inline-block text-xs sm:text-sm font-medium tracking-[0.2em] uppercase border border-white/20 rounded-full px-5 py-2 sm:px-6 sm:py-2.5 mb-5 text-white/50">
            {dict.services.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-5">
            {dict.services.title}
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            {dict.services.subtitle}
          </p>
        </AnimateInView>

        <div className="space-y-4 md:space-y-5">
          {services.map((service, idx) => (
            <AnimateInView key={service.key} variant="fadeUp" delay={idx * 0.08}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 md:p-10 hover:bg-white/[0.06] hover:border-white/[0.14] transition-colors duration-500"
              >
                <div className="md:flex md:items-start md:gap-10">
                  <div className="flex items-center gap-4 mb-5 md:mb-0 md:flex-col md:items-start md:gap-3 md:w-24 md:flex-shrink-0">
                    <span className="text-sm font-mono text-white/20">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-white/[0.07] flex items-center justify-center text-white/50 group-hover:bg-white/[0.12] group-hover:text-white/70 transition-all duration-500">
                      {service.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/45 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs sm:text-sm text-white/55 bg-white/[0.05] rounded-full px-3 py-1.5 group-hover:bg-white/[0.08] transition-colors duration-500"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
