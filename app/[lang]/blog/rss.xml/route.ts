import { NextResponse } from "next/server";
import type { Locale } from "@/lib/i18n";
import { getSiteOrigin } from "@/lib/agent-discovery";
import { getFullSiteData, getBlogIndexData } from "@/lib/sanity/loaders";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "ar") as Locale;
  const { origin } = getSiteOrigin(request);

  const [{ dict }, blogData] = await Promise.all([
    getFullSiteData(locale),
    getBlogIndexData(locale, { pageSize: 50 }),
  ]);

  const allPosts = [
    ...(blogData.featuredPost ? [blogData.featuredPost] : []),
    ...blogData.posts,
  ];

  const itemsXml = allPosts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${origin}/${locale}/blog/${escapeXml(post.slug)}</link>
      <guid isPermaLink="true">${origin}/${locale}/blog/${escapeXml(post.slug)}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(dict.meta.title)} — ${escapeXml(dict.blog.badge)}</title>
    <link>${origin}/${locale}/blog</link>
    <description>${escapeXml(dict.blog.subtitle)}</description>
    <language>${locale}</language>
    <atom:link href="${origin}/${locale}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
