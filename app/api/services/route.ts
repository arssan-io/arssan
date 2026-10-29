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
          slug: "starter",
          name_en: "Starter Package",
          name_ar: "باقة الانطلاق",
          price: 150,
          currency: "KWD",
          period: "One-time payment",
          url: `${origin}/en/pricing/starter`,
        },
        {
          slug: "professional",
          name_en: "Professional Package",
          name_ar: "الباقة الاحترافية",
          price: 299,
          originalPrice: 450,
          currency: "KWD",
          period: "One-time payment",
          popular: true,
          url: `${origin}/en/pricing/professional`,
        },
        {
          slug: "enterprise",
          name_en: "Enterprise Package",
          name_ar: "باقة المؤسسات",
          price: null,
          price_label_en: "Custom (Decided based on requirements)",
          price_label_ar: "مخصص (حسب متطلبات المشروع)",
          currency: "KWD",
          period: "Project-based / Decided based on requirements",
          url: `${origin}/en/pricing/enterprise`,
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
