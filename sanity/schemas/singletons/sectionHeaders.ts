import { defineType, defineField } from "sanity";

export const pricingSection = defineType({
  name: "pricingSection",
  title: "Pricing Section Header",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Section Badge",
      type: "localeString",
    }),
    defineField({
      name: "title",
      title: "Section Heading",
      type: "localeString",
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "localeText",
    }),
    defineField({
      name: "includedDeliverablesLabel",
      title: "Package Detail Page — 'Included Deliverables' Heading",
      type: "localeString",
    }),
    defineField({
      name: "specialOfferBadge",
      title: "'Special Offer' Discount Pill Text",
      type: "localeString",
    }),
    defineField({
      name: "mostPopularBadge",
      title: "'Most Popular' Card Pill Text",
      type: "localeString",
    }),
    defineField({
      name: "assuranceBullets",
      title: "Bottom Market Assurance Strip Bullets",
      type: "array",
      of: [{ type: "localeString" }],
    }),
    defineField({
      name: "customQuoteCta",
      title: "Bottom 'Need a custom quote?' Link Text",
      type: "localeString",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Pricing Section Header & Labels",
        subtitle: "Headings, badges, and market assurance strip",
      };
    },
  },
});

export const projectsPage = defineType({
  name: "projectsPage",
  title: "Projects Page Header & Stats",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Page Hero Badge",
      type: "localeString",
    }),
    defineField({
      name: "title",
      title: "Page Hero Title",
      type: "localeString",
    }),
    defineField({
      name: "subtitle",
      title: "Page Hero Subtitle",
      type: "localeText",
    }),
    defineField({
      name: "allFilterLabel",
      title: "'All Projects' Filter Button Label",
      type: "localeString",
    }),
    defineField({
      name: "stats",
      title: "4 Engineering Benchmark Stats",
      type: "array",
      of: [
        {
          type: "object",
          name: "statItem",
          fields: [
            defineField({ name: "value", title: "Stat Value (e.g. 100%, 98+)", type: "string" }),
            defineField({ name: "label", title: "Stat Label", type: "localeString" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label.en" },
          },
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "Project Card & Bottom CTA Labels",
      type: "object",
      fields: [
        defineField({ name: "badge", title: "CTA Badge", type: "localeString" }),
        defineField({ name: "title", title: "CTA Title", type: "localeString" }),
        defineField({ name: "description", title: "CTA Description", type: "localeText" }),
        defineField({ name: "button", title: "CTA Primary Button", type: "localeString" }),
        defineField({ name: "inquireBtn", title: "Card 'Request Similar Build' Button", type: "localeString" }),
        defineField({ name: "visitBtn", title: "Card 'Visit Site' Button", type: "localeString" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Projects Page Header & Benchmarks",
        subtitle: "Portfolio page hero, stats strip, and CTA buttons",
      };
    },
  },
});
