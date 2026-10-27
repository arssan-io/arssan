import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);

  const catalog = {
    linkset: [
      {
        anchor: `${origin}/`,
        "service-doc": [
          {
            href: `${origin}/en`,
            type: "text/html",
            title: "Arssan Studio Kuwait — Web Design & Digital Engineering",
          },
          {
            href: `${origin}/auth.md`,
            type: "text/markdown",
            title: "Arssan Studio Agent Registration & Access Guide (Auth.md)",
          },
        ],
        "service-desc": [
          {
            href: `${origin}/api/openapi.json`,
            type: "application/vnd.oai.openapi+json",
            title: "Arssan Studio OpenAPI 3.1 Specification",
          },
          {
            href: `${origin}/.well-known/ai-catalog.json`,
            type: "application/json",
            title: "ARD Capability Manifest",
          },
          {
            href: `${origin}/.well-known/mcp/server-card.json`,
            type: "application/mcp-server-card+json",
            title: "Arssan Studio MCP Server Card",
          },
          {
            href: `${origin}/sitemap.xml`,
            type: "application/xml",
            title: "XML Sitemap",
          },
        ],
        status: [
          {
            href: `${origin}/api/health`,
            type: "application/json",
            title: "Service Health Check Endpoint",
          },
        ],
      },
      {
        anchor: `${origin}/api/services`,
        "service-desc": [
          {
            href: `${origin}/api/openapi.json`,
            type: "application/vnd.oai.openapi+json",
            title: "Arssan Studio Services & Pricing OpenAPI Schema",
          },
        ],
        "service-doc": [
          {
            href: `${origin}/auth.md`,
            type: "text/markdown",
            title: "API & Agent Documentation",
          },
        ],
        status: [
          {
            href: `${origin}/api/health`,
            type: "application/json",
            title: "Service Health Check Endpoint",
          },
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
