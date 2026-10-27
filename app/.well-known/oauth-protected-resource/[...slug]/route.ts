import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { origin } = getSiteOrigin(request);
  const { slug } = await params;
  const subPath = slug && slug.length > 0 ? `/${slug.join("/")}` : "";

  const prm = {
    resource: `${origin}${subPath}`,
    authorization_servers: [origin],
    scopes_supported: ["openid", "profile", "read", "public"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${origin}/auth.md`,
    note: "Arssan is a public digital engineering catalog. All services, KWD pricing packages, and portfolio case studies are publicly accessible without authentication.",
  };

  return new NextResponse(JSON.stringify(prm, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
