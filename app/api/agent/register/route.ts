import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);
  return NextResponse.json(
    {
      endpoint: `${origin}/api/agent/register`,
      documentation: `${origin}/auth.md`,
      supported_methods: ["POST"],
      identity_types_supported: ["anonymous", "identity_assertion"],
      credential_types_supported: ["api_key", "bearer_token"],
      public_access: true,
    },
    { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
  );
}

export async function POST(request: Request) {
  const { origin } = getSiteOrigin(request);
  return NextResponse.json(
    {
      status: "registered",
      issuer: origin,
      token_type: "Bearer",
      access_token: "arssan_public_agent_token",
      expires_in: 86400,
      scope: "openid profile read public",
      documentation: `${origin}/auth.md`,
      note: "All Arssan Studio catalogs and resources are publicly accessible.",
    },
    { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
  );
}
