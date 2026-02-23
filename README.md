# Arssan | أرسان

A modern, bilingual (Arabic/English) corporate landing page for **Arssan** — a specialized web design and development agency.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Deployment:** Netlify

## Features

- Bilingual support (Arabic RTL / English LTR)
- Modern Neo-Brutalism design (Black & White)
- Custom cursor with smooth tracking
- Apple-style scroll reveal animations
- Responsive across all devices
- SEO optimized
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
└── netlify.toml              # Netlify deployment config
```

## Deployment

Pre-configured for Netlify. Push to GitHub and connect the repo to Netlify — it will auto-detect the Next.js setup via `@netlify/plugin-nextjs`.
