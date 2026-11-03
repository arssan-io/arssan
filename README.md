# Arssan | أرسان

A modern, bilingual (Arabic/English) corporate landing page for **Arssan** — a specialized web design and development agency.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Language:** TypeScript
- **CMS:** Sanity (Embedded Studio at `/studio`)
- **DNS & Deployment:** Cloudflare (`arssan.com`)

## Features

- Bilingual support (Arabic RTL / English LTR)
- Modern Neo-Brutalism design (Black & White)
- Custom cursor with smooth tracking
- Apple-style scroll reveal animations
- Responsive across all devices
- SEO optimized & AI Agent Ready (RFC 9727, WebMCP, ARD, MCP, Auth.md, DNS-AID)
- Floating WhatsApp contact button
- 3 pricing tiers with standalone pages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/ar` (Arabic) by default.

## Project Structure

```
├── app/
│   ├── globals.css           # Global styles & font faces
│   ├── layout.tsx            # Root layout
│   └── [lang]/               # i18n dynamic segment (ar/en)
│       ├── layout.tsx        # Language-specific layout
│       ├── page.tsx          # Landing page
│       └── pricing/
│           └── [package]/    # Individual pricing pages
│               └── page.tsx
├── components/               # UI components
│   ├── AnimateInView.tsx     # Scroll animation wrapper
│   ├── CustomCursor.tsx      # Custom mouse cursor
│   ├── Divider.tsx           # Section divider
│   ├── Footer.tsx            # Footer
│   ├── Header.tsx            # Navigation header
│   ├── Hero.tsx              # Hero section
│   ├── Pricing.tsx           # Pricing cards
│   ├── Services.tsx          # Services section
│   └── WhatsAppButton.tsx    # Floating WhatsApp CTA
├── lib/
│   ├── dictionaries.ts       # Dictionary loader
│   ├── dictionaries/         # Translation files
│   │   ├── ar.json
│   │   └── en.json
│   └── i18n.ts              # i18n config
├── public/
│   ├── fonts/                # Local fonts
│   │   └── 29LTZaridSans-Medium.ttf
│   └── images/               # SVG assets
│       ├── Icon.svg
│       └── Logo.svg
├── proxy.ts                  # i18n routing proxy
├── sanity/                   # Sanity CMS schemas & structure
├── sanity.config.ts          # Embedded Sanity Studio config
├── dns/                      # DNS for AI Discovery (DNS-AID) records & zones
│   ├── arssan.com-dns-aid.zone
│   ├── arssan.com (DNS Records).csv
│   └── README.md
└── scripts/
    └── publish-dns-aid.mjs   # DNS-AID verifier & Cloudflare API publisher
```

## AI Agent Discovery & DNS-AID

Arssan publishes machine-readable discovery interfaces for autonomous agents and tools:
- **API Catalog (RFC 9727):** `/.well-known/api-catalog`
- **Agent Card (A2A):** `/.well-known/agent-card.json`
- **MCP Server Card:** `/.well-known/mcp/server-card.json`
- **Agent Skills:** `/.well-known/agent-skills/index.json`
- **DNS for AI Discovery (DNS-AID):** `_index._agents.arssan.com`, `_a2a._agents.arssan.com`, `_mcp._agents.arssan.com`

Verify DNS-AID records via DNS-over-HTTPS:
```bash
npm run dns:verify
```

Publish to Cloudflare:
```bash
CLOUDFLARE_API_TOKEN="..." npm run dns:publish
```

## Deployment

Hosted with **Cloudflare** on `arssan.com`. Configure the Sanity environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`) in your Cloudflare deployment environment.
