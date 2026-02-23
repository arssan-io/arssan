"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface ShapeConfig {
  left: string;
  top: string;
  size: number;
  depth: number;
  opacity: number;
  type: "ring" | "dot" | "cross" | "dashed-ring";
  drift?: number;
  rotate?: number;
}

function Shape({
  config,
  smoothX,
  smoothY,
}: {
  config: ShapeConfig;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}) {
  const px = useTransform(smoothX, (v) => v * config.depth);
  const py = useTransform(smoothY, (v) => v * config.depth);

  const shapeEl = (() => {
    switch (config.type) {
      case "ring":
        return (
          <div
            className="rounded-full border border-current"
            style={{ width: config.size, height: config.size }}
          />
        );
      case "dot":
        return (
          <div
            className="rounded-full bg-current"
            style={{ width: config.size, height: config.size }}
          />
        );
      case "cross":
        return (
          <div
            className="relative"
            style={{ width: config.size, height: config.size }}
          >
            <div className="absolute top-1/2 left-0 w-full h-px bg-current -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-current -translate-x-1/2" />
          </div>
        );
      case "dashed-ring":
        return (
          <svg
            width={config.size}
            height={config.size}
            viewBox={`0 0 ${config.size} ${config.size}`}
            className="text-current"
          >
            <circle
              cx={config.size / 2}
              cy={config.size / 2}
              r={config.size / 2 - 1}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="4 4"
            />
          </svg>
        );
    }
  })();

  const driftDuration = 5 + config.size * 0.06;
  const rotateDuration = 18 + config.size * 0.15;

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{ left: config.left, top: config.top, x: px, y: py }}
    >
      <motion.div
        style={{ opacity: config.opacity }}
        animate={{
          ...(config.drift !== undefined && {
            y: [0, config.drift, 0],
          }),
          ...(config.rotate !== undefined && {
            rotate: [0, config.rotate],
          }),
        }}
        transition={{
          y: config.drift !== undefined
            ? { duration: driftDuration, repeat: Infinity, ease: "easeInOut" }
            : undefined,
          rotate: config.rotate !== undefined
            ? { duration: rotateDuration, repeat: Infinity, ease: "linear" }
            : undefined,
        }}
      >
        {shapeEl}
      </motion.div>
    </motion.div>
  );
}

export function FloatingShapes({
  shapes,
  className = "",
  color = "text-black",
}: {
  shapes: ShapeConfig[];
  className?: string;
  color?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 80 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 80 });

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${color} ${className}`}
    >
      {shapes.map((config, i) => (
        <Shape key={i} config={config} smoothX={smoothX} smoothY={smoothY} />
      ))}
    </div>
  );
}

export const heroShapes: ShapeConfig[] = [
  { left: "7%", top: "14%", size: 70, depth: 20, opacity: 0.04, type: "ring", drift: 12 },
  { left: "88%", top: "8%", size: 45, depth: 30, opacity: 0.035, type: "ring", drift: -8 },
  { left: "78%", top: "68%", size: 90, depth: 12, opacity: 0.03, type: "dashed-ring", rotate: 360 },
  { left: "14%", top: "72%", size: 6, depth: 35, opacity: 0.06, type: "dot", drift: 10 },
  { left: "52%", top: "18%", size: 5, depth: 25, opacity: 0.05, type: "dot", drift: -6 },
  { left: "28%", top: "88%", size: 20, depth: 18, opacity: 0.04, type: "cross", rotate: 180 },
  { left: "93%", top: "42%", size: 4, depth: 40, opacity: 0.05, type: "dot", drift: 8 },
  { left: "4%", top: "48%", size: 55, depth: 15, opacity: 0.025, type: "dashed-ring", rotate: -360 },
  { left: "62%", top: "4%", size: 3, depth: 28, opacity: 0.04, type: "dot", drift: -10 },
  { left: "42%", top: "58%", size: 16, depth: 22, opacity: 0.035, type: "cross", drift: 6 },
];

export const processShapes: ShapeConfig[] = [
  { left: "5%", top: "20%", size: 50, depth: 15, opacity: 0.03, type: "ring", drift: 8 },
  { left: "90%", top: "30%", size: 35, depth: 22, opacity: 0.025, type: "dashed-ring", rotate: 360 },
  { left: "50%", top: "80%", size: 4, depth: 30, opacity: 0.04, type: "dot", drift: -6 },
  { left: "80%", top: "75%", size: 14, depth: 18, opacity: 0.03, type: "cross", drift: 5 },
  { left: "20%", top: "10%", size: 3, depth: 35, opacity: 0.04, type: "dot", drift: 10 },
];

export const servicesShapes: ShapeConfig[] = [
  { left: "6%", top: "12%", size: 65, depth: 18, opacity: 0.06, type: "ring", drift: 10 },
  { left: "92%", top: "25%", size: 40, depth: 25, opacity: 0.04, type: "dashed-ring", rotate: -360 },
  { left: "75%", top: "80%", size: 5, depth: 32, opacity: 0.07, type: "dot", drift: -8 },
  { left: "15%", top: "65%", size: 18, depth: 20, opacity: 0.05, type: "cross", rotate: 180 },
  { left: "45%", top: "5%", size: 4, depth: 28, opacity: 0.05, type: "dot", drift: 7 },
  { left: "30%", top: "90%", size: 50, depth: 14, opacity: 0.035, type: "ring", drift: -6 },
];
