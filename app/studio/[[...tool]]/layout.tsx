import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arssan CMS Studio | لوحة تحكم أرسان",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" style={{ colorScheme: "dark" }}>
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          backgroundColor: "#0d0d0d",
          color: "#ffffff",
        }}
      >
        {children}
      </body>
    </html>
  );
}
