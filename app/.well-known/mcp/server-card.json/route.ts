import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);

  const serverCard = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    serverInfo: {
      name: "arssan-studio-mcp",
      version: "1.0.0",
      title: "Arssan Studio — Web Design & Digital Engineering Kuwait",
      description:
        "Model Context Protocol (MCP) server for Arssan Studio (أرسان الكويت), the web engineering arm of Scptric. Exposes tools for querying web design services, KWD pricing packages, portfolio case studies, and direct project inquiries.",
    },
    endpoint: `${origin}/api/mcp`,
    transport: {
      type: "streamable-http",
      endpoint: `${origin}/api/mcp`,
    },
    capabilities: {
      tools: {
        listChanged: false,
      },
      resources: {
        subscribe: false,
        listChanged: false,
      },
      prompts: {
        listChanged: false,
      },
    },
    tools: [
      {
        name: "get_company_info",
        description:
          "Retrieve official company overview, parent organization (Scptric), Kuwait & GCC service scope, and direct contact channels for Arssan Studio.",
        inputSchema: {
          type: "object",
          properties: {
            language: {
              type: "string",
              enum: ["ar", "en"],
              description: "Preferred response language (ar or en)",
            },
          },
        },
      },
      {
        name: "get_services_and_pricing",
        description:
          "Retrieve Arssan Studio's core services (UI/UX Design, Next.js Development, Kuwait/GCC SEO) and transparent KWD pricing packages (Basic 150 KWD, Pro 300 KWD, Custom 750+ KWD).",
        inputSchema: {
          type: "object",
          properties: {
            tier: {
              type: "string",
              enum: ["basic", "pro", "custom", "all"],
              description: "Specific pricing package tier or all tiers",
            },
          },
        },
      },
      {
        name: "get_portfolio_projects",
        description:
          "List featured portfolio case studies built by Arssan Studio across e-commerce, real estate, healthcare, SaaS, corporate, and cultural platforms in Kuwait.",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Optional project category filter",
            },
          },
        },
      },
      {
        name: "get_inquiry_link",
        description:
          "Generate a direct WhatsApp consultation link or contact details for initiating a web project in Kuwait.",
        inputSchema: {
          type: "object",
          properties: {
            package_name: {
              type: "string",
              description: "Selected package or project type",
            },
          },
        },
      },
    ],
    resources: [
      {
        name: "homepage",
        uri: `${origin}/en`,
        description:
          "Arssan Studio homepage with services, methodology, and KWD pricing packages",
      },
      {
        name: "projects",
        uri: `${origin}/en/projects`,
        description:
          "Selected portfolio case studies and live client platforms in Kuwait",
      },
      {
        name: "openapi",
        uri: `${origin}/api/openapi.json`,
        description: "OpenAPI 3.1.0 specification for Arssan Studio APIs",
      },
      {
        name: "sitemap",
        uri: `${origin}/sitemap.xml`,
        description: "XML Sitemap listing all canonical bilingual URLs",
      },
    ],
  };

  return new NextResponse(JSON.stringify(serverCard, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
