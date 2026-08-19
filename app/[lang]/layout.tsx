import { Space_Grotesk, Readex_Pro, Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import { isRtl, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/Header";
import { CustomCursor } from "@/components/CustomCursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-readex-pro",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: "/images/Icon.svg",
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
      className={`${spaceGrotesk.variable} ${readexPro.variable} ${bebasNeue.variable} ${ibmPlexMono.variable}`}
    >
      <body
        className={`${rtl ? "font-readex-pro" : "font-space"} antialiased bg-[#f8f8f8] text-[#3c3a3e] selection:bg-[#161616] selection:text-[#f8f8f8]`}
      >
        <CustomCursor />
        <Header lang={locale} dict={dict} />
        <main>{children}</main>
        <Footer lang={locale} dict={dict} />
        <WhatsAppButton dict={dict} />
      </body>
    </html>
  );
}
