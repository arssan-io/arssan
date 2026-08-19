"use client";

import { AnimateInView } from "./AnimateInView";

export function Divider() {
  return (
    <AnimateInView variant="fadeIn">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="h-px w-full bg-[#c9c7cc]/60" />
      </div>
    </AnimateInView>
  );
}
