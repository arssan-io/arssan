import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin, hostname } = getSiteOrigin(request);

  const manifest = {
    specVersion: "1.0",
    host: {
      displayName: "Arssan Studio Kuwait",
      identifier: `did:web:${hostname}`,
    },
    entries: [
      {
        identifier: `urn:air:${hostname}:mcp:server-card`,
        displayName: "Arssan Studio MCP Server",
        type: "application/mcp-server-card+json",
        url: `${origin}/.well-known/mcp/server-card.json`,
        representativeQueries: [
          "find web design and Next.js development agency in Kuwait",
          "get KWD website pricing packages from Arssan Studio",
          "query Arssan Studio MCP tools and portfolio",
        ],
      },
      {
        identifier: `urn:air:${hostname}:api:catalog`,
        displayName: "Arssan Studio RFC 9727 API Catalog",
        type: "application/linkset+json",
        url: `${origin}/.well-known/api-catalog`,
        representativeQueries: [
          "discover Arssan Studio API endpoints and services",
          "RFC 9727 API catalog for Arssan Kuwait",
          "list machine-readable documentation and health endpoints",
        ],
      },
      {
        identifier: `urn:air:${hostname}:api:openapi`,
        displayName: "Arssan Studio OpenAPI 3.1 Specification",
        type: "application/vnd.oai.openapi+json",
        url: `${origin}/api/openapi.json`,
        representativeQueries: [
          "OpenAPI specification for Arssan Studio services",
          "REST API schema for KWD web development packages",
          "query Arssan Studio health and services endpoints",
        ],
      },
      {
        identifier: `urn:air:${hostname}:skills:arssan-studio`,
        displayName: "Arssan Studio Agent Skill",
        type: "text/markdown",
        url: `${origin}/.well-known/agent-skills/arssan-studio/SKILL.md`,
        representativeQueries: [
          "how AI agents interact with Arssan Studio Kuwait",
          "compare Starter 150 KWD, Professional 299 KWD, and Custom Enterprise packages",
          "request a website or e-commerce quote in Kuwait",
        ],
      },
      {
        identifier: `urn:air:${hostname}:auth:auth-md`,
        displayName: "Arssan Studio Agent Registration Guide (Auth.md)",
        type: "text/markdown",
        url: `${origin}/auth.md`,
        representativeQueries: [
          "how to register an AI agent with Arssan Studio",
          "OAuth protected resource and authorization server metadata",
          "auth.md instructions for Arssan Kuwait",
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(manifest, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
