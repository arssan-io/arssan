import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);

  const card = {
    name: "Arssan Agent",
    version: "1.0.0",
    description:
      "Arssan Web Design, Next.js Engineering & Digital Architecture Agent for Kuwait and the GCC.",
    url: `${origin}/api/mcp`,
    provider: {
      organization: "Arssan (Scptric)",
      url: origin,
    },
    supportedInterfaces: [
      {
        url: `${origin}/api/mcp`,
        protocolBinding: "JSONRPC",
        transport: "https",
      },
    ],
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    defaultInputModes: ["text/plain", "application/json"],
    defaultOutputModes: ["text/plain", "application/json"],
    skills: [
      {
        id: "get-services-and-pricing",
        name: "Get Services & KWD Pricing Packages",
        description:
          "Retrieve Arssan's web design, Next.js engineering, and SEO packages in Kuwaiti Dinars (150 KWD Starter, 299 KWD Professional, 950 KWD Enterprise).",
        tags: ["pricing", "services", "kuwait", "web-design", "nextjs"],
      },
      {
        id: "list-portfolio-projects",
        name: "List Portfolio & Case Studies",
        description:
          "Browse featured corporate, e-commerce, healthcare, and SaaS platforms engineered by Arssan.",
        tags: ["portfolio", "projects", "case-studies"],
      },
    ],
  };

  return new NextResponse(JSON.stringify(card, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
