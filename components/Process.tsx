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

const easeBrutal = [0.32, 0.72, 0, 1] as [number, number, number, number];

export function Process({ dict }: ProcessProps) {
  return (
    <section id="process" className="relative py-24 md:py-36 bg-[#f8f8f8] text-[#3c3a3e] overflow-hidden border-b border-[#c9c7cc]/50">
      <FloatingShapes shapes={processShapes} color="text-[#3c3a3e]" />

      {/* Ghosted Typographic Background Watermark */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden opacity-60 z-0">
        <span className="font-display text-[140px] sm:text-[180px] md:text-[240px] uppercase font-bold tracking-tight text-white leading-none whitespace-nowrap">
          PROCESS
        </span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <AnimateInView className="mb-12 md:mb-24">
          <div className="flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#3c3a3e]/20 bg-white text-[12px] font-mono tracking-widest text-[#3c3a3e] uppercase mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6436]"></span>
              <span>{dict.process.badge}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4 md:gap-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[#3c3a3e]">
                {dict.process.title}
              </h2>
              <p className="text-sm sm:text-base text-[#7b7a7c] max-w-md leading-relaxed font-normal">
                {dict.process.subtitle}
              </p>
            </div>
          </div>
        </AnimateInView>

        {/* 3-Column Sharp Brutalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#c9c7cc] bg-white divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-[#c9c7cc]">
          {dict.process.steps.map((step, idx) => (
            <AnimateInView
              key={step.num}
              variant="fadeUp"
              delay={idx * 0.12}
              className="group relative p-6 sm:p-10 flex flex-col justify-between hover:bg-[#f1f1f1]/60 transition-colors duration-300 rounded-none text-start"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#c9c7cc]/40 font-mono">
                  <span className="text-2xl font-bold text-[#161616] tracking-tight">
                    {step.num}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-[#a2a2a2]">
                      STAGE
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#ff6436]"></span>
                  </div>
                </div>

                {/* Step Heading */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#3c3a3e] mb-4">
                  {step.title}
                </h3>

                {/* Step Body */}
                <p className="text-sm sm:text-base text-[#7b7a7c] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* Step Bottom Metadata */}
              <div className="mt-8 pt-4 border-t border-dashed border-[#c9c7cc]/60 flex items-center justify-between font-mono text-[11px] text-[#a2a2a2]">
                <span>0{idx + 1} // METHODOLOGY</span>
                <span className="group-hover:text-[#ff6436] transition-colors">→</span>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
