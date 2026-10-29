import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);
  const now = new Date().toISOString();

  const urls = [
    { loc: `${origin}/ar`, changefreq: "weekly", priority: "1.0" },
    { loc: `${origin}/en`, changefreq: "weekly", priority: "1.0" },
    { loc: `${origin}/ar/projects`, changefreq: "weekly", priority: "0.9" },
    { loc: `${origin}/en/projects`, changefreq: "weekly", priority: "0.9" },
    { loc: `${origin}/ar/pricing/starter`, changefreq: "monthly", priority: "0.8" },
    { loc: `${origin}/ar/pricing/professional`, changefreq: "monthly", priority: "0.8" },
    { loc: `${origin}/ar/pricing/enterprise`, changefreq: "monthly", priority: "0.8" },
    { loc: `${origin}/en/pricing/starter`, changefreq: "monthly", priority: "0.8" },
    { loc: `${origin}/en/pricing/professional`, changefreq: "monthly", priority: "0.8" },
    { loc: `${origin}/en/pricing/enterprise`, changefreq: "monthly", priority: "0.8" },
    { loc: `${origin}/ar/coloring`, changefreq: "monthly", priority: "0.6" },
    { loc: `${origin}/en/coloring`, changefreq: "monthly", priority: "0.6" },
    { loc: `${origin}/auth.md`, changefreq: "monthly", priority: "0.7" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
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
