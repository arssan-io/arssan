import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);
  return NextResponse.json(
    {
      name: "arssan-studio-mcp",
      version: "1.0.0",
      protocol: "Model Context Protocol (MCP)",
      transport: "streamable-http",
      serverCard: `${origin}/.well-known/mcp/server-card.json`,
      status: "ok",
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function POST(request: Request) {
  const { origin } = getSiteOrigin(request);
  let body: { id?: string | number | null; method?: string } = {};
  try {
    body = await request.json();
  } catch {
    // Default empty body
  }

  const id = body.id ?? 1;
  const method = body.method || "initialize";

  if (method === "tools/list") {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            {
              name: "get_company_info",
              description:
                "Retrieve official company overview, Scptric parent link, and Kuwait/GCC service scope for Arssan Studio.",
              inputSchema: { type: "object", properties: {} },
            },
            {
              name: "get_services_and_pricing",
              description:
                "Retrieve Arssan Studio's web design, Next.js development, and SEO packages in KWD (150, 300, 750 KWD).",
              inputSchema: { type: "object", properties: {} },
            },
          ],
        },
      },
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }

  return NextResponse.json(
    {
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2025-03-26",
        serverInfo: {
          name: "arssan-studio-mcp",
          version: "1.0.0",
        },
        capabilities: {
          tools: { listChanged: false },
          resources: { subscribe: false, listChanged: false },
          prompts: { listChanged: false },
        },
        endpoint: `${origin}/api/mcp`,
      },
    },
    {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    }
  );
}
