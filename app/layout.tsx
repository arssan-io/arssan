import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "أرسان | Arsan",
  description: "وكالة متخصصة في تصميم وتطوير المواقع الإلكترونية الاحترافية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
