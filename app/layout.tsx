import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://arssan.com"),
  title: "أرسان | Arssan",
  description: "وكالة متخصصة في تصميم وتطوير المواقع والمنصات الرقمية الاحترافية في الكويت",
  openGraph: {
    title: "أرسان | Arssan",
    description: "وكالة متخصصة في تصميم وتطوير المواقع والمنصات الرقمية الاحترافية في الكويت",
    url: "/",
    siteName: "Arssan",
    locale: "ar_KW",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "أرسان | Arssan — Web Design & Digital Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أرسان | Arssan",
    description: "وكالة متخصصة في تصميم وتطوير المواقع والمنصات الرقمية الاحترافية في الكويت",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
