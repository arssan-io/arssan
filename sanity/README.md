# Arssan Sanity CMS Guide

Welcome to the Arssan CMS Studio (`arssan.com/studio` or `http://localhost:3000/studio`).

## What You Control From the Studio

1. **⚙️ Site Settings & Contact (`siteSettings`)**
   - Site name (AR/EN), logo override, parent company badge & link (`Scptric`).
   - **WhatsApp number**, formatted display number, default inquiry message, floating button tooltip, and official email.
   - Social links (Instagram, X, Facebook, LinkedIn, GitHub).
   - Header navigation links (reorder, rename, or hide any item).
   - Footer bio, copyright text, system status indicator, and the dark Pre-Footer CTA card.
   - Optional top **Announcement Bar** (toggle on/off with bilingual text + link).
   - Default site Meta Title, Meta Description, and OpenGraph image.

2. **🏠 Home Page Content (`homePage`)**
   - **Section Visibility Toggles**: show/hide Partners, Process, Services, Pricing, or Latest Blog Posts on the homepage.
   - **Hero**: tagline pill, 3 display title lines, lead description, primary CTA label & target, and the 3 pipeline showcase tabs.
   - **Partners**: section badge, heading, and description.
   - **Process / Methodology**: badge, heading, subtitle, and steps.
   - **Services**: badge, heading, subtitle, service cards, deliverable pills, and benchmark metric cards (`WCAG AAA`, `< 0.4s`, `99 / 100`).

3. **💳 Packages & Pricing (`pricingSection` + `package`)**
   - Drag-and-drop to reorder packages.
   - Edit package names, prices in KWD, strike-through original prices (`450 → 299`), or toggle **Custom Quote** for Enterprise tiers.
   - Edit included deliverables checklist, popular highlight badge, and prefilled WhatsApp message per package.
   - Changes update the homepage pricing cards, `/[lang]/pricing/[package]`, `/api/services`, `llms.txt`, and the WebMCP agent tool automatically.

4. **🗂️ Projects & Portfolio (`projectsPage`, `projectCategory`, `project`)**
   - Drag-and-drop to reorder portfolio projects and categories.
   - Upload high-res project screenshots, set live URLs, highlight metrics, technology tags, and optional full Case Study articles.

5. **✍️ Blog & Editorial (`post`, `blogCategory`, `author`)**
   - Each post is written in either **Arabic (`ar`)** or **English (`en`)** independently.
   - To link an Arabic post with its English counterpart so readers see the **"Read in English / اقرأ بالعربية"** switcher button on the article, give both posts the same **Translation Group Key** (e.g., `nextjs-sanity-kuwait-architecture`).
   - Rich Portable Text blocks: Headings (`H2`, `H3`, `H4` — automatically added to the sticky Table of Contents), Callout boxes (`Insight`, `Best Practice`, `Important`), Code blocks with copy button, Data tables, Images with captions, and in-article **Conversion CTA Cards**.
   - **Scheduled Publishing**: set `Publish Date & Time` in the future to schedule an article.

## Useful Commands

```bash
# Seed or reset CMS content from lib/dictionaries + sample articles
npm run sanity:seed

# Dry-run seed without writing to Sanity
node --env-file=.env.local scripts/seed-sanity.mjs --dry-run

# Export a full backup of the production dataset
npm run sanity:backup
```
