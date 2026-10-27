import { NextResponse } from "next/server";
import {
  getSiteOrigin,
  getArssanSkillMd,
  getAuthSkillMd,
} from "@/lib/agent-discovery";

async function sha256Digest(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `sha256:${hex}`;
}

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);

  const arssanSkillMd = getArssanSkillMd(origin);
  const authSkillMd = getAuthSkillMd(origin);

  const [arssanDigest, authDigest] = await Promise.all([
    sha256Digest(arssanSkillMd),
    sha256Digest(authSkillMd),
  ]);

  const index = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "arssan-studio",
        type: "skill-md",
        description:
          "Guides AI agents on querying Arssan Studio's web design, Next.js development, SEO services, KWD pricing packages, and portfolio in Kuwait and the GCC.",
        url: `${origin}/.well-known/agent-skills/arssan-studio/SKILL.md`,
        digest: arssanDigest,
      },
      {
        name: "auth-md",
        type: "skill-md",
        description:
          "Agent authentication and registration instructions for Arssan Studio web services and discovery endpoints.",
        url: `${origin}/.well-known/agent-skills/auth-md/SKILL.md`,
        digest: authDigest,
      },
    ],
  };

  return new NextResponse(JSON.stringify(index, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
