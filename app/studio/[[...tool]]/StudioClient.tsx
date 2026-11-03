"use client";

import dynamic from "next/dynamic";

const StudioInner = dynamic(() => import("./StudioInner"), {
  ssr: false,
});

export function StudioClient() {
  return (
    <>
      <script
        src="https://core.sanity-cdn.com/bridge.js"
        async
        type="module"
        data-sanity-core
      />
      <StudioInner />
    </>
  );
}
