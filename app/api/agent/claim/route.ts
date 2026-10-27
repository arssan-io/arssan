import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);
  return NextResponse.json(
    {
      endpoint: `${origin}/api/agent/claim`,
      documentation: `${origin}/auth.md`,
      status: "ready",
    },
    { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
  );
}

export async function POST(request: Request) {
  const { origin } = getSiteOrigin(request);
  return NextResponse.json(
    {
      status: "claimed",
      issuer: origin,
      documentation: `${origin}/auth.md`,
    },
    { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
  );
}
