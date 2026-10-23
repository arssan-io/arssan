import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "أرسان | Arssan",
  description: "وكالة متخصصة في تصميم وتطوير المواقع والمنصات الرقمية الاحترافية في الكويت",
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
