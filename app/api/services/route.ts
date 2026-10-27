import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);

  return NextResponse.json(
    {
      company: {
        name: "Arssan Studio | أرسان الكويت",
        parent: "Scptric (https://scptric.com)",
        market: "Kuwait & GCC",
        website: origin,
        email: "info@arssan.com",
        whatsapp: "https://wa.me/46700265645",
      },
      services: [
        {
          id: "design",
          title_en: "UI/UX Design & Brand Systems",
          title_ar: "تصميم واجهات وتجربة المستخدم (UI/UX)",
          metrics: "WCAG AAA 18.5:1 Contrast & RTL Precision",
        },
        {
          id: "development",
          title_en: "Web & Platform Development",
          title_ar: "تطوير المواقع والمنصات الرقمية",
          metrics: "< 0.4s Load & KNET / MyFatoorah / Tap Ready",
        },
        {
          id: "seo",
          title_en: "SEO & Digital Growth",
          title_ar: "تحسين محركات البحث والنمو الرقمي (SEO)",
          metrics: "99/100 Core Web Vitals & Kuwait #1 Search Architecture",
        },
      ],
      packages: [
        {
          slug: "basic",
          name_en: "Basic Package",
          name_ar: "الباقة الأساسية",
          price: 150,
          currency: "KWD",
          period: "One-time payment",
          url: `${origin}/en/pricing/basic`,
        },
        {
          slug: "pro",
          name_en: "Pro Package",
          name_ar: "الباقة الاحترافية",
          price: 300,
          originalPrice: 450,
          currency: "KWD",
          period: "One-time payment",
          popular: true,
          url: `${origin}/en/pricing/pro`,
        },
        {
          slug: "custom",
          name_en: "Custom Enterprise",
          name_ar: "باقة الأعمال المخصصة",
          price: 750,
          currency: "KWD",
          period: "Starting from (Project-based)",
          url: `${origin}/en/pricing/custom`,
        },
      ],
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
