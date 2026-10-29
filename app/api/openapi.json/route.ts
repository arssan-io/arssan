import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);

  const openapi = {
    openapi: "3.1.0",
    info: {
      title: "Arssan Studio API",
      description:
        "API for Arssan Studio (أرسان الكويت) — Web design, Next.js digital engineering, KWD pricing catalog, portfolio discovery, and AI agent registration.",
      version: "1.0.0",
      contact: {
        name: "Arssan Studio (Scptric Web Arm)",
        email: "info@arssan.com",
        url: origin,
      },
    },
    servers: [
      {
        url: origin,
        description: "Production Server",
      },
    ],
    paths: {
      "/api/health": {
        get: {
          operationId: "getHealthStatus",
          summary: "Service Health Check",
          description:
            "Returns operational status and metadata for Arssan Studio web services.",
          responses: {
            "200": {
              description: "Service is healthy",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "ok" },
                      timestamp: { type: "string", format: "date-time" },
                      service: { type: "string" },
                      region: { type: "string" },
                      version: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/services": {
        get: {
          operationId: "getServicesAndPricing",
          summary: "List Web Engineering Services, KWD Packages, and Portfolio",
          description:
            "Retrieves Arssan Studio's core capabilities (UI/UX, Next.js, SEO), KWD pricing packages (Starter 150 KWD, Professional 299 KWD, and Custom Enterprise based on requirements), and featured Kuwait portfolio projects.",
          responses: {
            "200": {
              description: "Catalog of services, packages, and projects",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                  },
                },
              },
            },
          },
        },
      },
      "/api/mcp": {
        post: {
          operationId: "handleMcpRequest",
          summary: "Model Context Protocol (MCP) Streamable HTTP Endpoint",
          description:
            "JSON-RPC 2.0 endpoint for MCP tools and resources discovery.",
          responses: {
            "200": {
              description: "JSON-RPC 2.0 response",
            },
          },
        },
      },
      "/api/agent/register": {
        post: {
          operationId: "registerAgent",
          summary: "Register an Autonomous AI Agent (Auth.md)",
          description:
            "Provisions an optional agent credential for interacting with Arssan Studio APIs.",
          responses: {
            "200": {
              description: "Agent registration confirmation",
            },
          },
        },
      },
    },
  };

  return new NextResponse(JSON.stringify(openapi, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.oai.openapi+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
