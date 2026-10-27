import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-[100svh] flex items-center justify-center bg-[#ffffff] text-[#0d0d0d] px-5 font-sans antialiased">
        <div className="text-center p-10 rounded-[20px] bg-[#f3f3f3] border border-[#e6e8eb] max-w-md w-full">
          <h1 className="text-5xl font-light mb-3 text-[#0d0d0d]">404</h1>
          <p className="text-[#646f79] mb-6 text-sm">
            Page not found • الصفحة غير موجودة
          </p>
          <Link
            href="/ar"
            className="inline-flex items-center justify-center h-11 px-6 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-sm font-medium hover:bg-[#646f79] transition-colors"
          >
            Back to Home • الرئيسية
          </Link>
        </div>
      </body>
    </html>
  );
}
