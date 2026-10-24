"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BackToTopProps {
  dict?: {
    back_to_top?: { tooltip: string };
  };
  tooltip?: string;
}

export function BackToTop({ dict, tooltip }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after user scrolls past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const label = tooltip || dict?.back_to_top?.tooltip || "Back to top";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={label}
          className="fixed bottom-5 start-5 sm:bottom-6 sm:start-6 z-40 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#ffffff]/90 hover:bg-[#0d0e10] text-[#0d0d0d] hover:text-[#ffffff] border border-[#e6e8eb] hover:border-[#0d0e10] shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_28px_rgba(13,14,16,0.18)] backdrop-blur-md transition-colors duration-200 group"
          initial={{ scale: 0, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          whileTap={{ scale: 0.92 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>

          {/* Tooltip */}
          <span className="hidden sm:block absolute -top-11 start-0 bg-[#0d0e10] text-[#ffffff] text-[12px] font-medium px-3.5 py-1.5 rounded-[64px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {label}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
