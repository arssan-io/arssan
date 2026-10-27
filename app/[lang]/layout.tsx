import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Readex_Pro, IBM_Plex_Mono } from "next/font/google";
import { isRtl, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/Header";
import { CustomCursor } from "@/components/CustomCursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-readex-pro",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const isAr = locale === "ar";
  const dict = await getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arssan.com";

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: isAr ? "أرسان" : "Arssan",
      locale: isAr ? "ar_KW" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1201,
          height: 630,
          alt: dict.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/images/og-image.png"],
    },
    icons: {
      icon: [
        {
          url: "/images/Icon.svg",
          type: "image/svg+xml",
        },
        {
          url: "/images/Icon.svg",
          media: "(prefers-color-scheme: light)",
          type: "image/svg+xml",
        },
        {
          url: "/images/Icon-dark.svg",
          media: "(prefers-color-scheme: dark)",
          type: "image/svg+xml",
        },
      ],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const rtl = isRtl(locale);
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={rtl ? "rtl" : "ltr"}
      className={`${plusJakarta.variable} ${readexPro.variable} ${ibmPlexMono.variable}`}
    >
      <body
        className={`${
          rtl ? "font-readex-pro" : "font-sans"
        } antialiased bg-[#ffffff] text-[#0d0d0d] selection:bg-[#0d0e10] selection:text-[#ffffff]`}
      >
        <CustomCursor />
        <Header lang={locale} dict={dict} />
        <main>{children}</main>
        <Footer lang={locale} dict={dict} />
        <WhatsAppButton dict={dict} />
        <BackToTop dict={dict} />
      </body>
    </html>
  );
}
