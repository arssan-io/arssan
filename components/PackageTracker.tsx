"use client";

import { useEffect } from "react";
import { trackPackageView, trackPackageInquiry } from "@/lib/analytics";

interface PackageData {
  slug: string;
  name: string;
  price: string;
  originalPrice?: string;
  currency: string;
  popular?: boolean;
  inquiryMessage?: string;
}

interface PackageInquiryButtonProps {
  pkg: PackageData;
  contactText: string;
  whatsappUrl?: string;
}

export function PackageInquiryButton({
  pkg,
  contactText,
  whatsappUrl = "https://wa.me/46700265645",
}: PackageInquiryButtonProps) {
  const href = pkg.inquiryMessage
    ? `${whatsappUrl}?text=${encodeURIComponent(pkg.inquiryMessage)}`
    : whatsappUrl;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackPackageInquiry({
          id: pkg.slug,
          name: pkg.name,
          price: pkg.price,
          originalPrice: pkg.originalPrice,
          currency: pkg.currency,
          popular: pkg.popular,
        });
      }}
      className="flex items-center justify-center gap-2 h-11 sm:h-12 px-6 sm:px-8 bg-[#0d0e10] text-[#ffffff] rounded-[64px] text-sm sm:text-base font-medium hover:bg-[#646f79] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-200 active:scale-[0.98]"
    >
      <span>{contactText}</span>
      <span className="rtl:rotate-180">→</span>
    </a>
  );
}

export function PackageViewTracker({ pkg }: { pkg: PackageData }) {
  useEffect(() => {
    trackPackageView({
      id: pkg.slug,
      name: pkg.name,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      currency: pkg.currency,
      popular: pkg.popular,
    });
  }, [pkg]);

  return null;
}
