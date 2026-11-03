import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const packageDoc = defineType({
  name: "package",
  title: "Pricing Package",
  type: "document",
  orderings: [orderRankOrdering],
  groups: [
    { name: "main", title: "Package Details & Pricing", default: true },
    { name: "features", title: "Included Deliverables" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    orderRankField({ type: "package" }),
    defineField({
      name: "name",
      title: "Package Name",
      type: "localeString",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug (e.g. starter, professional, enterprise)",
      type: "slug",
      group: "main",
      options: {
        source: "name.en",
        maxLength: 64,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aliases",
      title: "URL Aliases (e.g. basic, pro, custom)",
      description: "Alternative slugs that resolve to this package.",
      type: "array",
      group: "main",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "visible",
      title: "Show on Website",
      type: "boolean",
      group: "main",
      initialValue: true,
    }),
    defineField({
      name: "popular",
      title: "Highlight as 'Most Popular' Tier (Dark Card)",
      type: "boolean",
      group: "main",
      initialValue: false,
    }),
    defineField({
      name: "isCustomQuote",
      title: "Custom Quote Tier (No fixed numeric price)",
      type: "boolean",
      group: "main",
      initialValue: false,
    }),
    defineField({
      name: "price",
      title: "Numeric Price (e.g. 150, 299) — or leave blank if Custom Quote",
      type: "string",
      group: "main",
      hidden: ({ document }) => Boolean(document?.isCustomQuote),
    }),
    defineField({
      name: "customPriceLabel",
      title: "Custom Price Label (when Custom Quote is enabled)",
      type: "localeString",
      group: "main",
      hidden: ({ document }) => !document?.isCustomQuote,
    }),
    defineField({
      name: "originalPrice",
      title: "Original Strike-through Price (optional, e.g. 450)",
      type: "string",
      group: "main",
      hidden: ({ document }) => Boolean(document?.isCustomQuote),
    }),
    defineField({
      name: "currency",
      title: "Currency Label (AR / EN, e.g. د.ك / KWD)",
      type: "localeString",
      group: "main",
      hidden: ({ document }) => Boolean(document?.isCustomQuote),
    }),
    defineField({
      name: "period",
      title: "Billing Period Label (e.g. per project / للمشروع)",
      type: "localeString",
      group: "main",
    }),
    defineField({
      name: "description",
      title: "Short Tier Description",
      type: "localeText",
      group: "main",
    }),
    defineField({
      name: "cta",
      title: "Card CTA Button Text",
      type: "localeString",
      group: "main",
    }),
    defineField({
      name: "inquiryMessage",
      title: "Prefilled WhatsApp Inquiry Message",
      type: "localeText",
      group: "main",
    }),
    defineField({
      name: "features",
      title: "Included Deliverables (Checklist)",
      type: "array",
      group: "features",
      of: [{ type: "localeString" }],
    }),
    defineField({
      name: "seo",
      title: "SEO Overrides",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      en: "name.en",
      ar: "name.ar",
      price: "price",
      isCustom: "isCustomQuote",
      popular: "popular",
      visible: "visible",
    },
    prepare({ en, ar, price, isCustom, popular, visible }) {
      const priceLabel = isCustom ? "Custom Quote" : `${price || "0"} KWD`;
      return {
        title: `${en || ar || "Package"}${popular ? " ★" : ""}${visible === false ? " (Hidden)" : ""}`,
        subtitle: `${ar || ""} — ${priceLabel}`,
      };
    },
  },
});
