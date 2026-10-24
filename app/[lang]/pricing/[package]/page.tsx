import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Link from "next/link";

export default async function PricingPackagePage({
  params,
}: {
  params: Promise<{ lang: string; package: string }>;
}) {
  const { lang, package: pkgSlug } = await params;
  const locale = lang as Locale;
  const isAr = locale === "ar";
  const dict = await getDictionary(locale);
  const pkg = dict.pricing.packages.find(
    (p: { slug: string }) => p.slug === pkgSlug
  );

  if (!pkg) {
    return (
      <div className="min-h-[90svh] flex items-center justify-center px-5 bg-[#ffffff] text-[#0d0d0d]">
        <div className="text-center p-10 rounded-[20px] bg-[#f3f3f3] border border-[#e6e8eb] max-w-md w-full">
          <h1 className="text-5xl font-light mb-3 text-[#0d0d0d]">404</h1>
          <p className="text-[#646f79] mb-6 text-sm">
            {isAr ? "الباقة المطلوبة غير موجودة" : "Package not found"}
          </p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center h-11 px-6 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-sm font-medium hover:bg-[#646f79] transition-colors"
          >
            {dict.nav.home}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] pt-24 pb-14 sm:pt-28 sm:pb-20 md:pt-36 md:pb-28 bg-[#f3f3f3] text-[#0d0d0d]">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <Link
          href={`/${locale}#pricing`}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[64px] bg-[#ffffff] border border-[#e5e7eb] text-xs font-medium text-[#646f79] hover:text-[#0d0d0d] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 mb-6 sm:mb-8 group"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180">
            ←
          </span>
          <span>{dict.pricing.badge}</span>
        </Link>

        <div className="rounded-[20px] border border-[#eceeef] bg-[#ffffff] p-6 sm:p-10 md:p-12 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] text-start">
          {pkg.popular && (
            <div className="inline-flex items-center gap-2 bg-[#f3f3f3] text-[#0d0d0d] text-xs font-medium rounded-[64px] px-3.5 py-1 sm:px-4 sm:py-1.5 mb-5 sm:mb-6 border border-[#e5e7eb]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{pkg.cta}</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl font-normal tracking-tight text-[#0d0d0d] mb-2.5 sm:mb-3">
            {pkg.name}
          </h1>

          <p className="text-[#646f79] text-[15px] sm:text-lg mb-6 sm:mb-8 leading-[1.6] font-normal">
            {pkg.description}
          </p>

          <div className="flex items-baseline gap-2.5 sm:gap-3 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-[#f3f3f3] flex-wrap">
            <span className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-[#0d0d0d]">
              {pkg.price}
            </span>
            {pkg.originalPrice && (
              <span className="text-2xl sm:text-3xl font-light line-through text-[#646f79]/60">
                {pkg.originalPrice}
              </span>
            )}
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-xs sm:text-sm text-[#0d0d0d]">{pkg.currency}</span>
              <span className="text-[#646f79] text-[11px] sm:text-xs">{pkg.period}</span>
            </div>
            {pkg.originalPrice && (
              <span className="ms-auto text-xs font-medium px-2.5 py-1 rounded-[64px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                {isAr ? "خصم خاص" : "Special Offer"}
              </span>
            )}
          </div>

          <h2 className="text-xs font-medium uppercase tracking-wider mb-4 sm:mb-5 text-[#646f79]">
            {isAr ? "المميزات المشمولة في الباقة" : "Included Deliverables"}
          </h2>

          <ul className="space-y-3 sm:space-y-3.5 mb-8 sm:mb-10 text-[13px] sm:text-base">
            {pkg.features.map((feature: string) => (
              <li key={feature} className="flex items-start gap-2.5 sm:gap-3">
                <span className="mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#f3f3f3] text-[#0d0d0d] flex items-center justify-center text-[10px] sm:text-xs flex-shrink-0">
                  ✓
                </span>
                <span className="text-[#0d0d0d] leading-[1.5]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/46700265645"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-11 sm:h-12 px-6 sm:px-8 bg-[#0d0e10] text-[#ffffff] rounded-[64px] text-sm sm:text-base font-medium hover:bg-[#646f79] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-200 active:scale-[0.98]"
          >
            <span>{dict.nav.contact}</span>
            <span className="rtl:rotate-180">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
