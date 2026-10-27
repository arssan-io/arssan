import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(JSON.stringify({ keys: [] }, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
