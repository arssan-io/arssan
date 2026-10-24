"use client";

import { useState } from "react";
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

function StepVisual({ index, isActive }: { index: number; isActive: boolean }) {
  if (index === 0) {
    // UX Architecture & Wireframe Nodes Visual
    return (
      <div className="h-28 rounded-[12px] bg-[#f3f3f3] border border-[#e8eaed] p-3.5 flex flex-col justify-between overflow-hidden relative">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#646f79]">
          <span>UX.FLOW</span>
          <span className="px-2 py-0.5 rounded-[4px] bg-[#ffffff] text-[#0d0d0d] font-medium">
            RTL + LTR
          </span>
        </div>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((node) => (
            <div
              key={node}
              className={`flex-1 h-11 rounded-[8px] bg-[#ffffff] border p-2 flex flex-col justify-between shadow-2xs transition-[transform,border-color] duration-300 ${
                isActive && node === 1
                  ? "border-[#0d0e10] scale-[1.03]"
                  : "border-[#e5e7eb] scale-100"
              }`}
            >
              <span className="w-6 h-1.5 rounded-full bg-[#0d0e10]" />
              <span className="w-full h-1.5 rounded-full bg-[#646f79]/30" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (index === 1) {
    // Full-Stack & Payment Gateway Engineering Visual
    return (
      <div className="h-28 rounded-[12px] bg-[#f3f3f3] border border-[#e8eaed] p-3.5 flex flex-col justify-between overflow-hidden relative">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#646f79]">
          <span>NEXT.JS 16</span>
          <span className="px-2 py-0.5 rounded-[4px] bg-[#0d0e10] text-[#ffffff] font-medium">
            KNET / API
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#0d0d0d] font-mono bg-[#ffffff] px-2.5 py-1.5 rounded-[8px] border border-[#e5e7eb]">
            <span>✓ build.compile()</span>
            <span className="text-emerald-700 font-semibold">12ms</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#ffffff] border border-[#e5e7eb] overflow-hidden p-0.5">
            <div
              className={`w-full h-full rounded-full bg-[#0d0e10] origin-left rtl:origin-right transition-transform duration-300 ease-out ${
                isActive ? "scale-x-100" : "scale-x-[0.78]"
              }`}
            />
          </div>
        </div>
      </div>
    );
  }

  // Optimization, Core Web Vitals & Kuwait SEO Launch Visual
  return (
    <div className="h-28 rounded-[12px] bg-[#f3f3f3] border border-[#e8eaed] p-3.5 flex flex-col justify-between overflow-hidden relative">
      <div className="flex items-center justify-between text-[11px] font-mono text-[#646f79]">
        <span>SEO.KW</span>
        <span className="px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
          99/100 CWV
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-12 pt-1">
        {[40, 55, 70, 85, 100].map((bar, i) => (
          <div
            key={i}
            style={{
              height: `${bar}%`,
              transitionDelay: `${i * 30}ms`,
            }}
            className={`flex-1 rounded-t-[4px] origin-bottom transition-transform duration-300 ease-out ${
              isActive ? "scale-y-100" : "scale-y-[0.82]"
            } ${i === 4 ? "bg-[#0d0e10]" : "bg-[#646f79]/45"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function Process({ dict }: ProcessProps) {
  const [activeIdx, setActiveIdx] = useState<number>(1);

  return (
    <section
      id="process"
      className="relative py-14 sm:py-18 md:py-24 bg-[#f3f3f3] text-[#0d0d0d] overflow-hidden border-b border-[#e6e8eb]"
    >
      <FloatingShapes shapes={processShapes} color="text-[#646f79]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <AnimateInView className="mb-8 sm:mb-10 md:mb-14">
          <div className="flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-[64px] bg-[#ffffff] border border-[#e5e7eb] text-[12px] sm:text-[13px] font-medium text-[#646f79] mb-4 sm:mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <span className="w-2 h-2 rounded-full bg-[#0d0e10]" />
              <span>{dict.process.badge}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-3 md:gap-8">
              <h2 className="text-2xl sm:text-4xl md:text-[2.75rem] font-normal tracking-[-0.02em] text-[#0d0d0d] leading-[1.2]">
                {dict.process.title}
              </h2>
              <p className="text-[15px] sm:text-base text-[#646f79] max-w-md leading-[1.6] font-normal">
                {dict.process.subtitle}
              </p>
            </div>
          </div>
        </AnimateInView>

        {/* 3-Column Asana Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {dict.process.steps.map((step, idx) => {
            const isActive = activeIdx === idx;
            return (
              <AnimateInView
                key={step.num}
                variant="fadeUp"
                delay={idx * 0.06}
                className="h-full"
              >
                <div
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group h-full rounded-[20px] bg-[#ffffff] p-5 sm:p-7 md:p-8 flex flex-col justify-between text-start border md:hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-200 ${
                    isActive
                      ? "border-[#0d0e10]/25 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]"
                      : "border-[#eceeef] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <div>
                    {/* Top Step Indicator */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-[12px] font-mono text-sm font-semibold transition-colors duration-200 ${
                          isActive
                            ? "bg-[#0d0e10] text-[#ffffff]"
                            : "bg-[#f3f3f3] text-[#0d0d0d]"
                        }`}
                      >
                        {step.num}
                      </span>
                      <span className="text-[12px] font-mono text-[#646f79] px-3 py-1 rounded-[64px] bg-[#f3f3f3]">
                        0{idx + 1} / 03
                      </span>
                    </div>

                    {/* Interactive Micro-Diagram */}
                    <div className="mb-6">
                      <StepVisual index={idx} isActive={isActive} />
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xl sm:text-2xl font-medium text-[#0d0d0d] mb-3 leading-[1.25]">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-[15px] sm:text-base text-[#646f79] leading-[1.65] font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Step Progress Bar */}
                  <div className="mt-8 pt-4 border-t border-[#f3f3f3] flex items-center justify-between text-[12px] text-[#646f79]">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className={`h-1.5 rounded-full transition-all duration-200 ${
                            dot === idx
                              ? "w-6 bg-[#0d0e10]"
                              : "w-1.5 bg-[#646f79]/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[#0d0d0d] transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </AnimateInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
