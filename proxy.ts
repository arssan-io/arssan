import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.includes(".")
  ) {
    return;
  }

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = i18n.defaultLocale;
  return NextResponse.redirect(
    new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next|api|images|fonts|favicon.ico).*)"],
};
