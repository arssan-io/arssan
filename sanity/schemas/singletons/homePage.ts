import { defineType, defineField, defineArrayMember } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section", default: true },
    { name: "partners", title: "Partners Strip" },
    { name: "process", title: "Methodology / Process" },
    { name: "services", title: "Services & Capabilities" },
    { name: "visibility", title: "Section Visibility" },
  ],
  fields: [
    // Visibility Toggles
    defineField({
      name: "sectionsVisibility",
      title: "Section Visibility Toggles",
      type: "object",
      group: "visibility",
      fields: [
        defineField({ name: "showPartners", title: "Show Partners Section", type: "boolean", initialValue: true }),
        defineField({ name: "showProcess", title: "Show Process Section", type: "boolean", initialValue: true }),
        defineField({ name: "showServices", title: "Show Services Section", type: "boolean", initialValue: true }),
        defineField({ name: "showPricing", title: "Show Pricing Section", type: "boolean", initialValue: true }),
        defineField({ name: "showLatestPosts", title: "Show Latest Blog Posts Section on Home", type: "boolean", initialValue: true }),
      ],
    }),

    // Hero
    defineField({
      name: "hero",
      title: "Hero Content",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "tagline", title: "Top Tagline Pill", type: "localeString" }),
        defineField({ name: "titleLine1", title: "Display Title — Line 1", type: "localeString" }),
        defineField({ name: "titleLine2", title: "Display Title — Line 2 (Muted Accent)", type: "localeString" }),
        defineField({ name: "titleLine3", title: "Display Title — Line 3", type: "localeString" }),
        defineField({ name: "description", title: "Lead Description", type: "localeText" }),
        defineField({ name: "cta", title: "Primary CTA Label", type: "localeString" }),
        defineField({ name: "ctaHref", title: "Primary CTA Target (default #pricing)", type: "string", initialValue: "#pricing" }),
        defineField({ name: "pipelineDesign", title: "Pipeline Step 01 Label", type: "localeString" }),
        defineField({ name: "pipelineDev", title: "Pipeline Step 02 Label", type: "localeString" }),
        defineField({ name: "pipelineSeo", title: "Pipeline Step 03 Label", type: "localeString" }),
        defineField({ name: "startingPriceNote", title: "Showcase Starting Price Note", type: "localeString" }),
        defineField({ name: "backgroundImage", title: "Custom Hero Background Image (optional)", type: "image" }),
      ],
    }),

    // Partners
    defineField({
      name: "partnersSection",
      title: "Partners Section Header",
      type: "object",
      group: "partners",
      fields: [
        defineField({ name: "badge", title: "Badge / Subtitle", type: "localeString" }),
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "subtitle", title: "Description", type: "localeText" }),
      ],
    }),

    // Process
    defineField({
      name: "processSection",
      title: "Methodology / Process Section",
      type: "object",
      group: "process",
      fields: [
        defineField({ name: "badge", title: "Section Badge", type: "localeString" }),
        defineField({ name: "title", title: "Section Title", type: "localeString" }),
        defineField({ name: "subtitle", title: "Section Subtitle", type: "localeText" }),
        defineField({
          name: "steps",
          title: "Methodology Steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "processStep",
              fields: [
                defineField({ name: "num", title: "Step Number (e.g. 01)", type: "string" }),
                defineField({ name: "title", title: "Step Title", type: "localeString" }),
                defineField({ name: "description", title: "Step Description", type: "localeText" }),
              ],
              preview: {
                select: { num: "num", en: "title.en", ar: "title.ar" },
                prepare({ num, en, ar }) {
                  return {
                    title: `${num || "•"} — ${en || ar || "Step"}`,
                    subtitle: ar,
                  };
                },
              },
            }),
          ],
        }),
      ],
    }),

    // Services
    defineField({
      name: "servicesSection",
      title: "Services & Capabilities Section",
      type: "object",
      group: "services",
      fields: [
        defineField({ name: "badge", title: "Section Badge", type: "localeString" }),
        defineField({ name: "title", title: "Section Title", type: "localeString" }),
        defineField({ name: "subtitle", title: "Section Subtitle", type: "localeText" }),
        defineField({
          name: "items",
          title: "Service Cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "serviceItem",
              fields: [
                defineField({
                  name: "key",
                  title: "Icon Key",
                  type: "string",
                  options: {
                    list: [
                      { title: "UI/UX Design", value: "design" },
                      { title: "Engineering & Development", value: "development" },
                      { title: "SEO & Growth", value: "seo" },
                    ],
                  },
                }),
                defineField({ name: "title", title: "Service Title", type: "localeString" }),
                defineField({ name: "description", title: "Service Description", type: "localeText" }),
                defineField({
                  name: "features",
                  title: "Deliverable Feature Pills",
                  type: "array",
                  of: [{ type: "localeString" }],
                }),
                defineField({
                  name: "metricValue",
                  title: "Benchmark Metric Value (e.g. WCAG AAA, < 0.4s, 99 / 100)",
                  type: "string",
                }),
                defineField({
                  name: "metricLabel",
                  title: "Benchmark Metric Label",
                  type: "localeString",
                }),
                defineField({
                  name: "metricTag",
                  title: "Benchmark Top Pill Tag (e.g. Figma Systems, Next.js 16)",
                  type: "string",
                }),
              ],
              preview: {
                select: { en: "title.en", ar: "title.ar", metric: "metricValue" },
                prepare({ en, ar, metric }) {
                  return {
                    title: en || ar || "Service",
                    subtitle: `${ar || ""} • ${metric || ""}`,
                  };
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page Content",
        subtitle: "Hero, Partners, Methodology & Services",
      };
    },
  },
});
