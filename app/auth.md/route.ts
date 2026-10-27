import { NextResponse } from "next/server";
import {
  getSiteOrigin,
  getAuthMdDocument,
  estimateTokens,
  AGENT_LINK_HEADER,
} from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);
  const content = getAuthMdDocument(origin);

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(estimateTokens(content)),
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
      Link: AGENT_LINK_HEADER,
    },
  });
}
