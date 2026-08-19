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
  const dict = await getDictionary(locale);
  const pkg = dict.pricing.packages.find(
    (p: { slug: string }) => p.slug === pkgSlug
  );

  if (!pkg) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center px-5 bg-[#161616] text-white">
        <div className="text-center font-mono">
          <h1 className="text-6xl font-bold mb-4 text-[#ff6436]">404</h1>
          <p className="text-[#a2a2a2] mb-6 uppercase tracking-wider text-xs">PACKAGE NOT FOUND</p>
          <Link
            href={`/${locale}`}
            className="text-xs uppercase tracking-wider rounded-full border border-white/20 px-6 py-3 hover:bg-white hover:text-[#161616] transition-all duration-300"
          >
            {dict.nav.home}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] pt-28 pb-16 md:pt-36 md:pb-24 bg-[#f8f8f8] text-[#3c3a3e]">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <Link
          href={`/${locale}#pricing`}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#7b7a7c] hover:text-[#161616] transition-colors duration-300 mb-8 group"
        >
          <span className="text-[#ff6436] group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform">
            ←
          </span>
          <span>{dict.pricing.badge}</span>
        </Link>

        <div className="border border-[#c9c7cc] bg-white rounded-none p-8 sm:p-10 md:p-12 shadow-sm">
          {pkg.popular && (
            <div className="inline-flex items-center gap-2 bg-[#161616] text-[#ff6436] font-mono text-[11px] font-semibold tracking-widest uppercase rounded-full px-4 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6436] animate-pulse"></span>
              <span>{pkg.cta}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#161616] mb-3">
            {pkg.name}
          </h1>

          <p className="text-[#7b7a7c] text-base sm:text-lg mb-8 leading-relaxed font-normal">
            {pkg.description}
          </p>

          <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-[#c9c7cc]/60 font-mono">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#161616]">
              {pkg.price}
            </span>
            <div className="flex flex-col text-xs uppercase tracking-wider">
              <span className="font-semibold text-[#ff6436]">{pkg.currency}</span>
              <span className="text-[#a2a2a2]">{pkg.period}</span>
            </div>
          </div>

          <h2 className="text-xs font-mono font-semibold tracking-widest uppercase mb-6 text-[#7b7a7c]">
            {locale === "ar" ? "[ المميزات المشمولة ]" : "[ WHAT'S INCLUDED ]"}
          </h2>

          <ul className="space-y-3.5 mb-10 font-mono text-xs sm:text-sm">
            {pkg.features.map((feature: string) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="text-[#ff6436] font-bold mt-0.5">+</span>
                <span className="text-[#3c3a3e] leading-snug">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/46700265645"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase py-4 bg-[#161616] text-white rounded-full hover:bg-[#ff6436] hover:text-[#161616] transition-all duration-300 active:scale-95"
          >
            {dict.nav.contact} →
          </a>
        </div>
      </div>
    </div>
  );
}
