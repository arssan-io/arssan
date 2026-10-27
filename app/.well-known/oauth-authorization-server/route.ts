import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/agent-discovery";

export async function GET(request: Request) {
  const { origin } = getSiteOrigin(request);

  const metadata = {
    issuer: origin,
    authorization_endpoint: `${origin}/.well-known/oauth-authorization-server`,
    token_endpoint: `${origin}/api/agent/register`,
    registration_endpoint: `${origin}/api/agent/register`,
    revocation_endpoint: `${origin}/api/agent/revoke`,
    jwks_uri: `${origin}/.well-known/jwks.json`,
    response_types_supported: ["code", "token"],
    grant_types_supported: [
      "authorization_code",
      "client_credentials",
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
    ],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: ["openid", "profile", "read", "public"],
    token_endpoint_auth_methods_supported: ["none", "client_secret_post"],
    agent_auth: {
      skill: `${origin}/auth.md`,
      register_uri: `${origin}/api/agent/register`,
      claim_uri: `${origin}/api/agent/claim`,
      revocation_uri: `${origin}/api/agent/revoke`,
      events_supported: [
        "https://schemas.openid.net/secevent/oauth/event-type/token-revoked",
      ],
      identity_types_supported: ["anonymous", "identity_assertion"],
      anonymous: {
        credential_types_supported: ["api_key", "bearer_token"],
        claim_uri: `${origin}/api/agent/claim`,
      },
      identity_assertion: {
        assertion_types_supported: [
          "urn:ietf:params:oauth:token-type:id-jag",
          "verified_email",
        ],
        credential_types_supported: ["api_key", "bearer_token"],
        claim_uri: `${origin}/api/agent/claim`,
      },
    },
    note: "Arssan Studio provides public digital engineering, web design, and KWD package information. No authorization is required for public endpoints.",
  };

  return new NextResponse(JSON.stringify(metadata, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
