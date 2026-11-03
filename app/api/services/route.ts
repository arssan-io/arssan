import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";
import { getFullSiteData } from "@/lib/sanity/loaders";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);
  const [enData, arData] = await Promise.all([
    getFullSiteData("en"),
    getFullSiteData("ar"),
  ]);

  const { dict: enDict, siteConfig } = enData;
  const { dict: arDict } = arData;

  const packages = enDict.pricing.packages.map((enPkg, idx) => {
    const arPkg =
      arDict.pricing.packages.find((p) => p.slug === enPkg.slug) ||
      arDict.pricing.packages[idx] ||
      enPkg;
    const numericPrice = !isNaN(Number(enPkg.price)) ? Number(enPkg.price) : null;
    const numericOriginal =
      enPkg.originalPrice && !isNaN(Number(enPkg.originalPrice))
        ? Number(enPkg.originalPrice)
        : undefined;

    return {
      slug: enPkg.slug,
      name_en: enPkg.name,
      name_ar: arPkg.name,
      price: numericPrice,
      ...(numericPrice === null
        ? {
            price_label_en: enPkg.price,
            price_label_ar: arPkg.price,
          }
        : {}),
      ...(numericOriginal ? { originalPrice: numericOriginal } : {}),
      currency: enPkg.currency || "KWD",
      period: enPkg.period,
      popular: Boolean(enPkg.popular),
      url: `${origin}/en/pricing/${enPkg.slug}`,
    };
  });

  return NextResponse.json(
    {
      company: {
        name: "Arssan Studio | أرسان الكويت",
        parent: `${siteConfig.parentOrgName} (${siteConfig.parentOrgUrl})`,
        market: "Kuwait & GCC",
        website: origin,
        email: siteConfig.email,
        whatsapp: siteConfig.whatsappUrl,
      },
      services: [
        {
          id: "design",
          title_en: enDict.services.design.title,
          title_ar: arDict.services.design.title,
          metrics:
            enDict.services.design.metric?.label ||
            "WCAG AAA 18.5:1 Contrast & RTL Precision",
        },
        {
          id: "development",
          title_en: enDict.services.development.title,
          title_ar: arDict.services.development.title,
          metrics:
            enDict.services.development.metric?.label ||
            "< 0.4s Load & KNET / MyFatoorah / Tap Ready",
        },
        {
          id: "seo",
          title_en: enDict.services.seo.title,
          title_ar: arDict.services.seo.title,
          metrics:
            enDict.services.seo.metric?.label ||
            "99/100 Core Web Vitals & Kuwait #1 Search Architecture",
        },
      ],
      packages,
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
