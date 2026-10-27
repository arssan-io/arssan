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
  '</sitemap.xml>; rel="service-desc"',
].join(", ");

export function getSiteOrigin(request?: Request): {
  origin: string;
  hostname: string;
} {
  if (request) {
    try {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const host = forwardedHost || request.headers.get("host");
      const proto =
        request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
        (host?.includes("localhost") || host?.startsWith("127.0.0.1")
          ? "http"
          : "https");

      if (host) {
        const origin = `${proto}://${host}`;
        const hostname = host.split(":")[0];
        return { origin, hostname };
      }

      const url = new URL(request.url);
      return { origin: url.origin, hostname: url.hostname };
    } catch {
      // Fall back to default site URL
    }
  }

  try {
    const fallbackUrl = new URL(DEFAULT_SITE_URL);
    return { origin: fallbackUrl.origin, hostname: fallbackUrl.hostname };
  } catch {
    return {
      origin: "https://arssan.arssan.workers.dev",
      hostname: "arssan.arssan.workers.dev",
    };
  }
}

export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

export function getMarkdownRepresentation(
  origin: string,
  pathname = "/"
): string {
  const isProjects = pathname.includes("/projects");
  const isPricing = pathname.includes("/pricing");

  if (isProjects) {
    return `# Arssan Studio | أرسان الكويت — Selected Projects & Portfolio

> High-performing websites, e-commerce platforms, and digital experiences engineered for leading brands in Kuwait and the GCC.

- **Official Website**: ${origin}
- **Portfolio URL**: ${origin}/en/projects
- **Parent Organization**: Scptric (https://scptric.com)
- **WhatsApp Direct**: https://wa.me/46700265645
- **Email**: info@arssan.com

---

## Featured Case Studies

1. **Al-Dar Luxury Real Estate Portal** (\`aldar-kw.com\`) — Corporate & Real Estate
   - Interactive bilingual property portal with 3D virtual tours and high-speed search filtering.
   - Metric: +185% Qualified Leads Growth

2. **Maison Oud — Luxury Perfumery Store** (\`maisonoud.kw\`) — E-Commerce
   - Full-scale luxury e-commerce store integrated with KNET, Apple Pay, MyFatoorah, and automatedGCC shipping.
   - Metric: 0.4s Page Load Speed

3. **Elite Medical Group & Clinics** (\`elitemedical.com.kw\`) — Healthcare & Clinics
   - Patient portal and instant appointment booking platform connected with WhatsApp notifications.
   - Metric: AAA WCAG Accessibility Standard

4. **Muzn Cloud — B2B Cloud Infrastructure & AI Suite** (\`muzncloud.io\`) — SaaS & Tech
   - High-converting SaaS marketing site structured and verified to meet isitagentready.com web agent standards.
   - Metric: Agent Ready (Verified on isitagentready.com)

5. **Babtain Engineering & Contracting Corporation** (\`babtain-eng.com\`) — Corporate & Platforms
   - Flagship corporate platform showcasing mega infrastructure projects in Kuwait, ranking #1 on Google Kuwait.
   - Metric: #1 Google Search Kuwait Rank

6. **Namaa Coffee Roasters — Artisan Lifestyle Brand** (\`namaacoffee.com\`) — E-Commerce
   - Tactile brand web experience with interactive brew guides and subscription club.
   - Metric: 2.4x Average Session Duration

7. **Ahmed Abdelwahed — Personal Brand & Engineering Bio** (\`ahmedabdelwahed.me\`) — Personal & Bio Sites
   - Production-grade personal portfolio and technical blog featuring RFC 9727 & WebMCP AI agent discovery.
   - Metric: 100/100 Google Lighthouse Score

8. **State of Kuwait — Editorial Cultural Showcase** (\`https://kuwait.arssan.workers.dev/\`) — Editorial & Culture
   - Editorial and cultural digital platform celebrating 65 years of Kuwaiti maritime legacy and modern independence.
   - Metric: 60 FPS Kinetic Motion & Scrollytelling

---

## Agent Discovery Endpoints
- **API Catalog (RFC 9727)**: ${origin}/.well-known/api-catalog
- **ARD Capability Manifest**: ${origin}/.well-known/ai-catalog.json
- **MCP Server Card**: ${origin}/.well-known/mcp/server-card.json
- **Agent Skills Index**: ${origin}/.well-known/agent-skills/index.json
- **Agent Registration (Auth.md)**: ${origin}/auth.md
`;
  }

  if (isPricing) {
    return `# Arssan Studio | أرسان الكويت — KWD Pricing Packages

> Transparent, structured investment tiers in Kuwaiti Dinars (KWD) for startups, growing enterprises, and custom digital platforms.

- **Official Website**: ${origin}
- **WhatsApp Direct**: https://wa.me/46700265645
- **Email**: info@arssan.com

---

## Packages & Investment Tiers

### 1. Basic Package — 150 KWD (One-time payment)
Ideal for startups, personal brands, and professional company profiles in Kuwait.
- Custom responsive UI/UX design (up to 3 pages)
- Full Arabic (RTL) & English (LTR) support
- Direct WhatsApp & social media integration
- Mobile-first speed optimization & SSL security
- Basic local Google SEO setup for Kuwait
- 1 month of complimentary technical support

### 2. Pro Package (Most Popular) — 300 KWD (Discounted from 450 KWD, One-time payment)
Comprehensive solution for growing businesses and e-commerce stores requiring payment gateways and CMS control.
- Bespoke UI/UX design system (up to 10 pages)
- Easy-to-use Content Management System (CMS)
- Payment gateway integration (KNET, MyFatoorah, Tap, Apple Pay)
- Advanced technical & local SEO for Kuwait & GCC rankings
- Google Analytics 4 & conversion tracking setup
- High-speed cloud hosting configuration & CDN
- 3 months of priority support & maintenance

### 3. Custom Package — Starting from 750 KWD (Project-based)
Tailored digital architecture for large enterprises, custom web applications, and complex platforms.
- Unlimited custom pages & bespoke interactive workflows
- Full-stack custom Next.js & API development
- ERP, CRM, and third-party system integrations
- Dedicated cloud infrastructure & enterprise security
- Comprehensive UI/UX research, prototyping & testing
- 6 months of dedicated SLA technical support & consulting
`;
  }

  return `# Arssan Studio | أرسان الكويت — Professional Web Design & Digital Engineering

> Arssan is the specialized web design and digital engineering arm of Scptric (https://scptric.com), architecting high-performance websites, e-commerce platforms, and agent-ready digital experiences for ambitious teams in Kuwait and the GCC.

---

## Company Overview
- **Name**: Arssan Studio (أرسان لتصميم وتطوير المواقع)
- **Parent Company**: Scptric (سكبترك — https://scptric.com)
- **Primary Market**: State of Kuwait & Gulf Cooperation Council (GCC)
- **Supported Languages**: Arabic (العربية - RTL) & English (LTR)
- **Official Website**: ${origin}
- **Direct WhatsApp**: [https://wa.me/46700265645](https://wa.me/46700265645)
- **Email**: [info@arssan.com](mailto:info@arssan.com)

---

## Core Capabilities & Services

### 01. UI/UX Design & Brand Systems (تصميم واجهات وتجربة المستخدم)
- Bilingual RTL (Arabic) & LTR (English) executive design systems
- Interactive Figma prototypes & design tokens
- Conversion-focused landing pages and WCAG AAA (18.5:1) contrast compliance
- Mobile-first responsive layouts across all breakpoints

### 02. Web & Platform Development (تطوير المواقع والمنصات الرقمية)
- Modern Next.js 16 App Router & TypeScript cloud architecture (< 0.4s load times, 99.9% uptime)
- Kuwaiti & GCC payment gateway integrations (KNET, Tap Payments, MyFatoorah, Apple Pay)
- Headless CMS & Sanity content management dashboards
- Enterprise SSL security, Cloudflare CDN, and edge caching

### 03. SEO & Digital Growth (تحسين محركات البحث والنمو الرقمي)
- Local SEO tailored for Kuwait & GCC search intent
- 99/100 Core Web Vitals optimization
- Technical schema markup, OpenGraph, and full AI Agent Readiness (RFC 9727, WebMCP, ARD, MCP)
- Google Analytics 4 & conversion funnel tracking

---

## Pricing Packages (Kuwaiti Dinar — KWD)
- **Basic Package**: **150 KWD** (One-time) — Up to 3 pages, bilingual AR/EN, WhatsApp integration, SSL, local SEO, 1 month support.
- **Pro Package (Most Popular)**: **300 KWD** *(was 450 KWD)* — Up to 10 pages, CMS dashboard, KNET / Tap / MyFatoorah payment gateways, advanced Kuwait SEO, GA4, 3 months priority support.
- **Custom Enterprise**: **From 750 KWD** — Unlimited bespoke workflows, full-stack Next.js & custom API engineering, ERP/CRM integrations, 6 months SLA support.

---

## Methodology & Execution Pipeline
1. **Discovery & Strategy**: Analyzing business objectives, target audience in Kuwait, and competitors.
2. **UI/UX Architecture**: Crafting interactive wireframes and bilingual visual systems in Figma.
3. **Engineering & Integration**: Building fast, secure codebases and integrating KNET/payment gateways.
4. **Launch & Growth**: Rigorous QA testing, deployment, and continuous SEO & performance monitoring.

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
- **XML Sitemap**: \`${origin}/sitemap.xml\`
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

- **Auth.md Document**: \`${origin}/auth.md\`
- **OAuth Protected Resource Metadata (RFC 9728)**: \`${origin}/.well-known/oauth-protected-resource\`
- **OAuth Authorization Server Metadata (RFC 8414)**: \`${origin}/.well-known/oauth-authorization-server\`
- **OpenID Connect Discovery**: \`${origin}/.well-known/openid-configuration\`
- **JWKS Endpoint**: \`${origin}/.well-known/jwks.json\`
- **Agent Auth Skill**: \`${origin}/.well-known/agent-skills/auth-md/SKILL.md\`
- **API Catalog (RFC 9727)**: \`${origin}/.well-known/api-catalog\`
- **ARD Capability Manifest**: \`${origin}/.well-known/ai-catalog.json\`
- **MCP Server Card**: \`${origin}/.well-known/mcp/server-card.json\`

---

## 3. Agent Registration & Provisioning

### Registration Endpoint
- **URL**: \`POST ${origin}/api/agent/register\`
- **Claim URI**: \`POST ${origin}/api/agent/claim\`
- **Revocation URI**: \`POST ${origin}/api/agent/revoke\`

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
3. **Custom Enterprise (From 750 KWD)**: Unlimited bespoke pages/workflows, custom full-stack Next.js & API architecture, ERP/CRM integration, 6 months SLA support.

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
- **API Catalog**: \`${origin}/.well-known/api-catalog\`
`;
}
