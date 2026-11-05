export const DEFAULT_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://arssan.arssan.workers.dev";

export const AGENT_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/ai-catalog.json>; rel="ai-catalog"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  '</.well-known/mcp/server-card.json>; rel="service-desc"',
  '</api/openapi.json>; rel="service-desc"',
  '</auth.md>; rel="describedby"',
  '</auth.md>; rel="service-doc"',
  '</.well-known/agent-skills/index.json>; rel="service-doc"',
  '</.well-known/agent-skills/dns-aid/SKILL.md>; rel="service-doc"',
  '</sitemap.xml>; rel="service-desc"',
].join(", ");

const ALLOWED_HOST_PATTERNS = [
  /^localhost(:\d+)?$/i,
  /^127\.0\.0\.1(:\d+)?$/,
  /^([a-z0-9-]+\.)*arssan\.(com|io|workers\.dev)$/i,
  /^([a-z0-9-]+\.)*scptric\.com$/i,
];

function isAllowedHost(host: string): boolean {
  if (!host) return false;
  try {
    const defaultHost = new URL(DEFAULT_SITE_URL).host;
    if (host.toLowerCase() === defaultHost.toLowerCase()) {
      return true;
    }
  } catch {}

  return ALLOWED_HOST_PATTERNS.some((pattern) => pattern.test(host.trim()));
}

export function getSiteOrigin(request?: Request): {
  origin: string;
  hostname: string;
} {
  const getFallback = () => {
    try {
      const fallbackUrl = new URL(DEFAULT_SITE_URL);
      return { origin: fallbackUrl.origin, hostname: fallbackUrl.hostname };
    } catch {
      return {
        origin: "https://arssan.arssan.workers.dev",
        hostname: "arssan.arssan.workers.dev",
      };
    }
  };

  if (request) {
    try {
      const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
      const rawHost = forwardedHost || request.headers.get("host") || "";
      const host = rawHost.trim();

      if (host && isAllowedHost(host)) {
        const proto =
          request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
          (host.includes("localhost") || host.startsWith("127.0.0.1")
            ? "http"
            : "https");

        const origin = `${proto}://${host}`;
        const hostname = host.split(":")[0];
        return { origin, hostname };
      }

      return getFallback();
    } catch {
      return getFallback();
    }
  }

  return getFallback();
}

export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

export async function getMarkdownRepresentation(
  origin: string,
  pathname = "/"
): Promise<string> {
  const isProjects = pathname.includes("/projects");
  const isPricing = pathname.includes("/pricing");
  const isBlog = pathname.includes("/blog");

  const { getFullSiteData, getLatestBlogPosts } = await import(
    "@/lib/sanity/loaders"
  );

  const [{ dict, siteConfig }, latestPosts] = await Promise.all([
    getFullSiteData("en"),
    getLatestBlogPosts("en", 6),
  ]);

  if (isBlog) {
    const postsMd =
      latestPosts.length > 0
        ? latestPosts
            .map(
              (p, i) =>
                `${i + 1}. **[${p.title}](${origin}/en/blog/${p.slug})** (${p.readingTimeMinutes} min read)\n   - ${p.excerpt}`
            )
            .join("\n\n")
        : "Articles are managed via Arssan Sanity CMS.";

    return `# Arssan | أرسان — Engineering & Design Blog

> ${dict.blog.subtitle}

- **Official Website**: ${origin}
- **Blog URL**: ${origin}/en/blog
- **RSS Feed**: ${origin}/en/blog/rss.xml
- **WhatsApp Direct**: ${siteConfig.whatsappUrl}
- **Email**: ${siteConfig.email}

---

## Latest Articles

${postsMd}
`;
  }

  if (isProjects) {
    const projectsMd = dict.projects_page.projects
      .map(
        (p, i) =>
          `${i + 1}. **${p.title}** (\`${p.url}\`) — ${p.categoryLabel}\n   - ${p.description}\n   - Metric: ${p.metrics.value} (${p.metrics.label})`
      )
      .join("\n\n");

    return `# Arssan | أرسان — Projects & Portfolio

> ${dict.projects_page.subtitle}

- **Official Website**: ${origin}
- **Portfolio URL**: ${origin}/en/projects
- **Parent Organization**: ${siteConfig.parentOrgName} (${siteConfig.parentOrgUrl})
- **WhatsApp Direct**: ${siteConfig.whatsappUrl}
- **Email**: ${siteConfig.email}

---

## Featured Case Studies

${projectsMd}

---

## Agent Discovery Endpoints
- **API Catalog (RFC 9727)**: ${origin}/.well-known/api-catalog
- **ARD Capability Manifest**: ${origin}/.well-known/ai-catalog.json
- **MCP Server Card**: ${origin}/.well-known/mcp/server-card.json
- **Agent Skills Index**: ${origin}/.well-known/agent-skills/index.json
- **Agent Registration (Auth.md)**: ${origin}/auth.md
- **DNS for AI Discovery (DNS-AID)**: _index._agents.${new URL(origin).host} (HTTPS/SVCB)
`;
  }

  if (isPricing) {
    const pkgsMd = dict.pricing.packages
      .map(
        (pkg, i) =>
          `### ${i + 1}. ${pkg.name}${pkg.popular ? " (Most Popular)" : ""} — ${
            pkg.currency ? `${pkg.price} ${pkg.currency}` : pkg.price
          } (${pkg.period})\n${pkg.description}\n${pkg.features
            .map((f: string) => `- ${f}`)
            .join("\n")}`
      )
      .join("\n\n");

    return `# Arssan | أرسان — Pricing Packages

> ${dict.pricing.subtitle}

- **Official Website**: ${origin}
- **WhatsApp Direct**: ${siteConfig.whatsappUrl}
- **Email**: ${siteConfig.email}

---

## Packages & Investment Tiers

${pkgsMd}
`;
  }

  const pkgsSummaryMd = dict.pricing.packages
    .map(
      (pkg) =>
        `- **${pkg.name}${pkg.popular ? " (Most Popular)" : ""}**: **${
          pkg.currency ? `${pkg.price} ${pkg.currency}` : pkg.price
        }**${pkg.originalPrice ? ` *(was ${pkg.originalPrice} ${pkg.currency})*` : ""} — ${
          pkg.description
        }`
    )
    .join("\n");

  const projectsSummaryMd = dict.projects_page.projects
    .map((p) => `- **${p.title}** (\`${p.url}\`): ${p.description}`)
    .join("\n");

  return `# Arssan | أرسان — Web Design & Digital Engineering

> ${dict.meta.description}

---

## Company Overview
- **Name**: Arssan Studio (أرسان لتصميم وتطوير المواقع)
- **Parent Company**: ${siteConfig.parentOrgName} (${siteConfig.parentOrgUrl})
- **Primary Market**: State of Kuwait & Gulf Cooperation Council (GCC)
- **Supported Languages**: Arabic (العربية - RTL) & English (LTR)
- **Official Website**: ${origin}
- **Blog**: ${origin}/en/blog
- **Direct WhatsApp**: [${siteConfig.whatsappUrl}](${siteConfig.whatsappUrl})
- **Email**: [${siteConfig.email}](mailto:${siteConfig.email})

---

## Core Capabilities & Services

### 01. ${dict.services.design.title}
${dict.services.design.features.map((f: string) => `- ${f}`).join("\n")}

### 02. ${dict.services.development.title}
${dict.services.development.features.map((f: string) => `- ${f}`).join("\n")}

### 03. ${dict.services.seo.title}
${dict.services.seo.features.map((f: string) => `- ${f}`).join("\n")}

---

## Pricing Packages (Kuwaiti Dinar — KWD)
${pkgsSummaryMd}

---

## Featured Portfolio Projects
${projectsSummaryMd}

---

## Machine-Readable Discovery & Agent Endpoints
- **API Catalog (RFC 9727)**: \`${origin}/.well-known/api-catalog\`
- **ARD Capability Manifest**: \`${origin}/.well-known/ai-catalog.json\`
- **OpenAPI 3.1 Specification**: \`${origin}/api/openapi.json\`
- **MCP Server Card (SEP-1649)**: \`${origin}/.well-known/mcp/server-card.json\`
- **MCP Streamable HTTP Endpoint**: \`${origin}/api/mcp\`
- **Agent Skills Discovery Index**: \`${origin}/.well-known/agent-skills/index.json\`
- **Auth.md Agent Registration Guide**: \`${origin}/auth.md\`
- **OAuth Protected Resource Metadata**: \`${origin}/.well-known/oauth-protected-resource\`
- **OAuth Authorization Server Metadata**: \`${origin}/.well-known/oauth-authorization-server\`
- **OpenID Connect Configuration**: \`${origin}/.well-known/openid-configuration\`
- **DNS for AI Discovery (DNS-AID)**:
  - Agent Index: \`_index._agents.${new URL(origin).host}\` (HTTPS / SVCB, \`alpn="h2,h3" port=443\`)
  - Agent-to-Agent (A2A): \`_a2a._agents.${new URL(origin).host}\` (HTTPS / SVCB, \`alpn="a2a" port=443\`)
  - Model Context Protocol (MCP): \`_mcp._agents.${new URL(origin).host}\` (HTTPS / SVCB, \`alpn="mcp" port=443\`)
  - DNS-AID Skill: \`${origin}/.well-known/agent-skills/dns-aid/SKILL.md\`
- **XML Sitemap**: \`${origin}/sitemap.xml\`
- **RSS Feed (EN / AR)**: \`${origin}/en/blog/rss.xml\` · \`${origin}/ar/blog/rss.xml\`
`;
}

export function getAuthMdDocument(origin: string): string {
  return `# Arssan Studio auth.md — AI Agent Registration & Access Guide

Welcome to **Arssan Studio (أرسان الكويت)** (\`${origin}\`), the specialized web design and digital engineering arm of **Scptric**. This \`auth.md\` document defines how autonomous AI agents, crawlers, and LLM-driven assistants can discover, register, authenticate, and interact with Arssan Studio's digital resources and APIs.

---

## 1. Agent Audience & Access Policy

Arssan Studio provides web design (UI/UX), Next.js full-stack development, KNET/GCC e-commerce integration, and SEO engineering in Kuwait and the Gulf region.

- **Public Read Access**: All service catalogs, KWD pricing tiers, portfolio case studies, OpenAPI schemas, MCP server cards, and agent skills on \`${origin}\` are **publicly accessible without mandatory authentication**.
- **Optional Agent Registration**: Agents that support standardized registration protocols (Auth.md, RFC 9728 OAuth Protected Resource Metadata, and RFC 8414 OAuth Authorization Server Metadata) may register to obtain an optional agent API key or bearer token for higher rate limits and structured inquiry submission.

---

## 2. Discovery Endpoints

- **Auth.md Document**: ${origin}/auth.md
- **OAuth Protected Resource Metadata (RFC 9728)**: ${origin}/.well-known/oauth-protected-resource
- **OAuth Authorization Server Metadata (RFC 8414)**: ${origin}/.well-known/oauth-authorization-server
- **OpenID Connect Discovery**: ${origin}/.well-known/openid-configuration
- **JWKS Endpoint**: ${origin}/.well-known/jwks.json
- **Agent Auth Skill**: ${origin}/.well-known/agent-skills/auth-md/SKILL.md
- **DNS for AI Discovery (DNS-AID) Skill**: ${origin}/.well-known/agent-skills/dns-aid/SKILL.md
- **DNS-AID Well-Known Records**: \`_index._agents.${new URL(origin).host}\`, \`_a2a._agents.${new URL(origin).host}\`, \`_mcp._agents.${new URL(origin).host}\`
- **API Catalog (RFC 9727)**: ${origin}/.well-known/api-catalog
- **ARD Capability Manifest**: ${origin}/.well-known/ai-catalog.json
- **MCP Server Card**: ${origin}/.well-known/mcp/server-card.json

---

## 3. Agent Registration & Provisioning

### Registration Endpoint
- **URL**: POST ${origin}/api/agent/register
- **Claim URI**: POST ${origin}/api/agent/claim
- **Revocation URI**: POST ${origin}/api/agent/revoke

### Supported Identity & Credential Types
- **Identity Types Supported**: \`anonymous\`, \`identity_assertion\`
- **Assertion Types Supported**: \`urn:ietf:params:oauth:token-type:id-jag\`, \`verified_email\`
- **Credential Types Supported**: \`api_key\`, \`bearer_token\`
- **Bearer Methods Supported**: \`header\` (\`Authorization: Bearer <token>\`)
- **Scopes Supported**: \`openid\`, \`profile\`, \`read\`, \`public\`

### Example Registration Request
\`\`\`http
POST /api/agent/register HTTP/1.1
Host: ${ new URL(origin).host }
Content-Type: application/json

{
  "agent_name": "example-procurement-agent",
  "identity_type": "anonymous",
  "credential_type": "bearer_token",
  "scopes": ["read", "public"]
}
\`\`\`

---

## 4. Direct Contact
- **Email**: [info@arssan.com](mailto:info@arssan.com)
- **WhatsApp**: [https://wa.me/46700265645](https://wa.me/46700265645)
- **Parent Organization**: [https://scptric.com](https://scptric.com)
`;
}

export function getArssanSkillMd(origin: string): string {
  return `---
name: arssan-studio
description: Guides AI agents on querying Arssan Studio's web design, Next.js development, SEO services, KWD pricing packages, and portfolio in Kuwait and the GCC.
version: 1.0.0
author: Arssan Studio (Scptric)
---

# Arssan Studio Agent Skill

This skill instructs AI agents on how to query **Arssan Studio (أرسان الكويت)** for web design, full-stack Next.js engineering, KNET/MyFatoorah e-commerce integration, and Kuwait/GCC SEO services.

## When to Use This Skill
- A user or organization is looking for a web design and development agency in Kuwait or the GCC.
- An agent needs accurate KWD pricing for corporate websites, e-commerce platforms, or custom web applications.
- An agent wants to inspect Arssan Studio's portfolio case studies or initiate a project consultation via WhatsApp or email.

## Key Endpoints
- **Markdown Homepage**: \`GET ${origin}/\` with \`Accept: text/markdown\`
- **Services & Pricing API**: \`GET ${origin}/api/services\`
- **OpenAPI 3.1 Schema**: \`GET ${origin}/api/openapi.json\`
- **MCP Endpoint**: \`POST ${origin}/api/mcp\`
- **Health Check**: \`GET ${origin}/api/health\`

## Pricing Summary (KWD)
1. **Basic Package (150 KWD)**: Up to 3 pages, bilingual AR/EN, responsive UI/UX, WhatsApp integration, SSL, basic local SEO, 1 month support.
2. **Pro Package (300 KWD, discounted from 450 KWD)**: Up to 10 pages, CMS, KNET/MyFatoorah/Tap payment integration, advanced Kuwait SEO, GA4, 3 months support.
3. **Custom Enterprise (Custom Quote / Based on Requirements)**: Unlimited bespoke pages/workflows, custom full-stack Next.js & API architecture, ERP/CRM integration, 6 months SLA support.

## Direct Contact
- **WhatsApp**: https://wa.me/46700265645
- **Email**: info@arssan.com
`;
}

export function getAuthSkillMd(origin: string): string {
  return `---
name: auth-md
description: Agent authentication and registration instructions for Arssan Studio web services and discovery endpoints.
version: 1.0.0
author: Arssan Studio (Scptric)
---

# Auth.md Agent Skill — Arssan Studio

## What This Skill Does
Guides automated AI agents on registering their identity with Arssan Studio (\`${origin}\`) and discovering OAuth 2.0 / OIDC protected resource metadata.

## Registration Protocol
- **Service Root Documentation**: \`${origin}/auth.md\`
- **Registration Endpoint**: \`POST ${origin}/api/agent/register\`
- **Claim Endpoint**: \`POST ${origin}/api/agent/claim\`
- **Revocation Endpoint**: \`POST ${origin}/api/agent/revoke\`
- **Supported Identity Types**: \`anonymous\`, \`identity_assertion\`
- **Supported Assertion Types**: \`urn:ietf:params:oauth:token-type:id-jag\`, \`verified_email\`
- **Credential Types**: \`api_key\`, \`bearer_token\`

## Discovery Endpoints
- **OAuth Protected Resource Metadata**: \`${origin}/.well-known/oauth-protected-resource\`
- **OAuth Authorization Server Metadata**: \`${origin}/.well-known/oauth-authorization-server\`
- **OpenID Connect Discovery**: \`${origin}/.well-known/openid-configuration\`
- **DNS for AI Discovery (DNS-AID)**: \`_index._agents.${new URL(origin).host}\`
- **DNS-AID Skill**: \`${origin}/.well-known/agent-skills/dns-aid/SKILL.md\`
- **API Catalog**: \`${origin}/.well-known/api-catalog\`
`;
}

export function getDnsAidSkillMd(origin: string): string {
  let host = "arssan.com";
  try {
    host = new URL(origin).host;
  } catch {}

  return `---
name: dns-aid
description: DNS for AI Discovery (DNS-AID) protocol specification and well-known entrypoint records for autonomous agent discovery.
version: 1.0.0
author: Arssan Studio (Scptric)
---

# Implement DNS for AI Discovery (DNS-AID)

Publish DNS for AI Discovery (DNS-AID) records so agents can discover your agent endpoints through DNS.

## Requirements

- Publish DNS for AI Discovery (DNS-AID) records under your domain's \`_agents\` namespace, such as \`_index._agents.${host}\` or \`_a2a._agents.${host}\`
- Use ServiceMode \`SVCB\` records, or \`HTTPS\` records for HTTPS endpoints, with \`alpn\` and endpoint connection parameters
- Use numeric \`keyNNNNN\` SvcParamKey names for experimental DNS for AI Discovery (DNS-AID) custom parameters until they are registered
- Sign public DNS for AI Discovery (DNS-AID) discovery zones with DNSSEC so validating resolvers return authenticated data

## Arssan Studio Discovery Records

\`\`\`dns
# HTTPS ServiceMode records
_index._agents.${host}. 3600 IN HTTPS 1 ${host}. alpn="h2,h3" port=443
_a2a._agents.${host}.   3600 IN HTTPS 1 ${host}. alpn="a2a" port=443
_mcp._agents.${host}.   3600 IN HTTPS 1 ${host}. alpn="mcp" port=443

# SVCB ServiceMode records (RFC 9460)
_index._agents.${host}. 3600 IN SVCB 1 ${host}. alpn="h2,h3" port=443
_a2a._agents.${host}.   3600 IN SVCB 1 ${host}. alpn="a2a" port=443
_mcp._agents.${host}.   3600 IN SVCB 1 ${host}. alpn="mcp" port=443

# Fallback TXT index record
_index._agents.${host}. 3600 IN TXT "v=DNS-AID1; uri=${origin}/.well-known/ai-catalog.json"
\`\`\`

## Validate

The scanner validates DNS for AI Discovery (DNS-AID) via DNS-over-HTTPS. By default, the scanner uses Cloudflare's \`https://cloudflare-dns.com/dns-query\` with automatic fallback to \`https://dns.google/resolve\` on resolver-level failures. Library callers can override the resolver with \`ScanOptions.dohResolverUrl\` (disables fallback).

\`\`\`http
POST https://isitagentready.com/api/scan
Content-Type: application/json

{"url": "${origin}"}
\`\`\`

Check that \`checks.discoverability.dnsAid.status\` is \`"pass"\`.
`;
}
