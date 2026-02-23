"use client";

import { AnimateInView } from "./AnimateInView";

export function Divider() {
  return (
    <AnimateInView variant="fadeIn">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px w-full bg-black/15" />
      </div>
    </AnimateInView>
  );
}
