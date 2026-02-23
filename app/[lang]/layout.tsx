import { Space_Grotesk } from "next/font/google";
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
    <html lang={locale} dir={rtl ? "rtl" : "ltr"} className={spaceGrotesk.variable}>
      <body
        className={`${rtl ? "font-zarid" : "font-space"} antialiased bg-white text-black`}
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
