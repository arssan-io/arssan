import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { hostname } = getSiteOrigin(request);

  const poppy = {
    protocol_version: "0.1",
    organization: {
      name: "Arssan",
      domain: hostname.replace(/^www\./i, ""),
    },
    web: {},
  };

  return new NextResponse(JSON.stringify(poppy, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
