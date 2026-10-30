import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/lib/i18n";
import {
  AGENT_LINK_HEADER,
  getSiteOrigin,
  getMarkdownRepresentation,
  estimateTokens,
} from "@/lib/agent-discovery";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through static assets, API routes, well-known discovery endpoints, and root metadata files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/.well-known") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/partners") ||
    pathname.startsWith("/fonts") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/auth.md" ||
    pathname === "/llms.txt" ||
    pathname.includes(".")
  ) {
    const res = NextResponse.next();
    res.headers.set("Link", AGENT_LINK_HEADER);
    return res;
  }

  // Markdown Content Negotiation for AI Agents (Accept: text/markdown)
  const acceptHeader = request.headers.get("accept") || "";
  if (acceptHeader.toLowerCase().includes("text/markdown")) {
    const { origin } = getSiteOrigin(request);
    const markdown = getMarkdownRepresentation(origin, pathname);

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": String(estimateTokens(markdown)),
        Vary: "Accept, Host",
        Link: AGENT_LINK_HEADER,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const res = NextResponse.next();
    res.headers.set("Link", AGENT_LINK_HEADER);
    res.headers.set("Vary", "Accept");
    return res;
  }

  const locale = i18n.defaultLocale;
  const redirectRes = NextResponse.redirect(
    new URL(
      `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url
    )
  );
  redirectRes.headers.set("Link", AGENT_LINK_HEADER);
  redirectRes.headers.set("Vary", "Accept");
  return redirectRes;
}

export const config = {
  matcher: ["/((?!_next|images|partners|fonts|favicon.ico).*)"],
};
