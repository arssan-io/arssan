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
      <div className="min-h-[100svh] flex items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">404</h1>
          <Link
            href={`/${locale}`}
            className="text-sm rounded-full border border-black/15 px-6 py-3 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
          >
            {dict.nav.home}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <Link
          href={`/${locale}#pricing`}
          className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors duration-300 mb-10 group"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 ${locale === "ar" ? "rotate-180" : ""
              }`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          {dict.pricing.badge}
        </Link>

        <div className="border border-black/10 rounded-2xl p-6 sm:p-8 md:p-12">
          {pkg.popular && (
            <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-black text-white rounded-full px-5 py-1.5 mb-6">
              {pkg.cta}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            {pkg.name}
          </h1>

          <p className="text-black/55 text-base sm:text-lg mb-8 leading-relaxed">
            {pkg.description}
          </p>

          <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-black/10">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              {pkg.price}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-black/70">
                {pkg.currency}
              </span>
              <span className="text-xs text-black/40">{pkg.period}</span>
            </div>
          </div>

          <h2 className="text-xs font-semibold tracking-[0.15em] uppercase mb-6 text-black/40">
            {locale === "ar" ? "المميزات المشمولة" : "What's Included"}
          </h2>

          <ul className="space-y-3.5 mb-10">
            {pkg.features.map((feature: string) => (
              <li key={feature} className="flex items-start gap-3">
                <svg
                  className="flex-shrink-0 w-4 h-4 mt-0.5 text-black/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                <span className="text-sm text-black/65 leading-snug">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/46700265645"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm font-semibold tracking-wider uppercase py-3.5 bg-black text-white rounded-full hover:opacity-80 transition-opacity duration-300 active:scale-95"
          >
            {dict.nav.contact}
          </a>
        </div>
      </div>
    </div>
  );
}
