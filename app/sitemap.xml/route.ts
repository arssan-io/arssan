import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";
import {
  getFullSiteData,
  getAllPublishedPostsForSitemap,
} from "@/lib/sanity/loaders";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);
  const now = new Date().toISOString();

  const [{ dict }, posts] = await Promise.all([
    getFullSiteData("en"),
    getAllPublishedPostsForSitemap(),
  ]);

  const packageSlugs = Array.from(
    new Set([
      "starter",
      "professional",
      "enterprise",
      ...dict.pricing.packages.map((p) => p.slug),
    ])
  );

  const urls: Array<{
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
  }> = [
    { loc: `${origin}/ar`, lastmod: now, changefreq: "weekly", priority: "1.0" },
    { loc: `${origin}/en`, lastmod: now, changefreq: "weekly", priority: "1.0" },
    { loc: `${origin}/ar/projects`, lastmod: now, changefreq: "weekly", priority: "0.9" },
    { loc: `${origin}/en/projects`, lastmod: now, changefreq: "weekly", priority: "0.9" },
    { loc: `${origin}/ar/blog`, lastmod: now, changefreq: "daily", priority: "0.9" },
    { loc: `${origin}/en/blog`, lastmod: now, changefreq: "daily", priority: "0.9" },
    ...packageSlugs.flatMap((slug) => [
      {
        loc: `${origin}/ar/pricing/${slug}`,
        lastmod: now,
        changefreq: "monthly",
        priority: "0.8",
      },
      {
        loc: `${origin}/en/pricing/${slug}`,
        lastmod: now,
        changefreq: "monthly",
        priority: "0.8",
      },
    ]),
    ...posts
      .filter((p) => p?.slug && p?.language)
      .map((p) => ({
        loc: `${origin}/${p.language}/blog/${p.slug}`,
        lastmod: (p.updatedAt || p.publishedAt || now) as string,
        changefreq: "weekly",
        priority: "0.85",
      })),
    { loc: `${origin}/auth.md`, lastmod: now, changefreq: "monthly", priority: "0.7" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
