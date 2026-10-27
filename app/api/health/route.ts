import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "Arssan Studio Web Services",
      parent: "Scptric (https://scptric.com)",
      region: "Kuwait (KWT)",
      version: "1.0.0",
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
