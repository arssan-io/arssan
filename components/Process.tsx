"use client";

import { motion } from "framer-motion";
import { AnimateInView } from "./AnimateInView";
import { FloatingShapes, processShapes } from "./FloatingShapes";

interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

interface ProcessProps {
  dict: {
    process: {
      badge: string;
      title: string;
      subtitle: string;
      steps: ProcessStep[];
    };
  };
}

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export function Process({ dict }: ProcessProps) {
  return (
    <section id="process" className="relative py-20 md:py-32 bg-neutral-50">
      <FloatingShapes shapes={processShapes} />
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        <AnimateInView className="text-center mb-16 md:mb-20">
          <span className="inline-block text-xs sm:text-sm font-medium tracking-[0.2em] uppercase border border-black/15 rounded-full px-5 py-2 sm:px-6 sm:py-2.5 mb-5 text-black/60">
            {dict.process.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-5">
            {dict.process.title}
          </h2>
          <p className="text-base sm:text-lg text-black/60 max-w-xl mx-auto leading-relaxed">
            {dict.process.subtitle}
          </p>
        </AnimateInView>

        {/* Desktop: horizontal */}
        <div className="hidden md:block relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="absolute top-[60px] left-[16%] right-[16%] h-px bg-black/10 origin-left"
          />
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {dict.process.steps.map((step, idx) => (
              <AnimateInView key={step.num} variant="fadeUp" delay={0.15 + idx * 0.18}>
                <div className="text-center group">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="inline-flex items-center justify-center w-[120px] h-[120px] rounded-full border border-black/10 bg-white mb-8 relative"
                  >
                    <span className="text-3xl font-black text-black/75">
                      {step.num}
                    </span>
                  </motion.div>
                  <h3 className="text-xl lg:text-2xl font-bold tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-black/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative">
          <div className="absolute top-0 bottom-0 start-6 w-px bg-black/10" />
          <div className="space-y-10">
            {dict.process.steps.map((step, idx) => (
              <AnimateInView key={step.num} variant="fadeUp" delay={idx * 0.1}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-black/10 bg-white flex items-center justify-center relative z-10">
                    <span className="text-lg font-bold text-black/75">
                      {step.num}
                    </span>
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-bold tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-black/50 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
