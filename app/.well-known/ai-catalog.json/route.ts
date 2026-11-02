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
        identifier: `urn:air:${hostname}:agent:agent-card`,
        displayName: "Arssan Studio A2A Agent Card",
        type: "application/a2a-agent-card+json",
        url: `${origin}/.well-known/agent-card.json`,
        representativeQueries: [
          "Arssan Studio autonomous agent capabilities and interfaces",
          "query Arssan Studio A2A agent card",
          "connect to Arssan Studio agent in Kuwait",
        ],
      },
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
        identifier: `urn:air:${hostname}:skills:arssan-studio`,
        displayName: "Arssan Studio Agent Skill",
        type: 'text/markdown; profile="urn:air:agent-skills"',
        url: `${origin}/.well-known/agent-skills/arssan-studio/SKILL.md`,
        representativeQueries: [
          "how AI agents interact with Arssan Studio Kuwait",
          "compare Starter 150 KWD, Professional 299 KWD, and Custom Enterprise packages",
          "request a website or e-commerce quote in Kuwait",
        ],
      },
      {
        identifier: `urn:air:${hostname}:skills:dns-aid`,
        displayName: "Arssan Studio DNS-AID Protocol Specification",
        type: 'text/markdown; profile="urn:air:agent-skills"',
        url: `${origin}/.well-known/agent-skills/dns-aid/SKILL.md`,
        representativeQueries: [
          "DNS for AI Discovery (DNS-AID) entrypoint records",
          "_index._agents DNS discovery for Arssan Studio",
          "RFC 9460 SVCB and HTTPS records for AI agents",
        ],
      },
      {
        identifier: `urn:air:${hostname}:auth:auth-md`,
        displayName: "Arssan Studio Agent Registration Guide (Auth.md)",
        type: 'text/markdown; profile="urn:air:agent-skills"',
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
