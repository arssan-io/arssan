import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const projectCategory = defineType({
  name: "projectCategory",
  title: "Project Category",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "projectCategory" }),
    defineField({
      name: "key",
      title: "Category Key (e.g. automotive, hospitality, editorial, personal)",
      type: "slug",
      options: { source: "title.en", maxLength: 48 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Category Label (AR / EN)",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { en: "title.en", ar: "title.ar", key: "key.current" },
    prepare({ en, ar, key }) {
      return {
        title: en || ar || "Category",
        subtitle: `${ar || ""} (${key || ""})`,
      };
    },
  },
});

export const projectDoc = defineType({
  name: "project",
  title: "Portfolio Project",
  type: "document",
  orderings: [orderRankOrdering],
  groups: [
    { name: "main", title: "Project Overview", default: true },
    { name: "media", title: "Media & Metrics" },
    { name: "caseStudy", title: "Optional Case Study Page" },
  ],
  fields: [
    orderRankField({ type: "project" }),
    defineField({
      name: "title",
      title: "Project Title (AR / EN)",
      type: "localeString",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "main",
      options: { source: "title.en", maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visible",
      title: "Visible in Portfolio",
      type: "boolean",
      group: "main",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      group: "main",
      initialValue: true,
    }),
    defineField({
      name: "category",
      title: "Project Category",
      type: "reference",
      to: [{ type: "projectCategory" }],
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client Name & Location (AR / EN)",
      type: "localeString",
      group: "main",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "main",
      initialValue: "2026",
    }),
    defineField({
      name: "displayUrl",
      title: "Display Domain (without https://, e.g. motorati.arssan.com)",
      type: "string",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "liveUrl",
      title: "Full Live URL (e.g. https://motorati.arssan.com)",
      type: "url",
      group: "main",
    }),
    defineField({
      name: "description",
      title: "Project Summary (AR / EN)",
      type: "localeText",
      group: "main",
    }),
    defineField({
      name: "coverImage",
      title: "Screenshot / Cover Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
    }),
    defineField({
      name: "fallbackImagePath",
      title: "Local Fallback Image Path (e.g. /images/projects/motorati.webp)",
      type: "string",
      group: "media",
    }),
    defineField({
      name: "metricValue",
      title: "Key Highlight Metric Value (e.g. 100%, Live CMS, 60 FPS, 100/100)",
      type: "localeString",
      group: "media",
    }),
    defineField({
      name: "metricLabel",
      title: "Key Highlight Metric Label",
      type: "localeString",
      group: "media",
    }),
    defineField({
      name: "tags",
      title: "Technology & Deliverable Tags",
      type: "array",
      group: "media",
      of: [{ type: "localeString" }],
    }),
    defineField({
      name: "inquiryMessage",
      title: "Prefilled WhatsApp Inquiry Message for 'Request Similar Build'",
      type: "localeText",
      group: "main",
    }),
    defineField({
      name: "caseStudyAr",
      title: "Case Study Body (Arabic — Optional)",
      type: "portableTextBody",
      group: "caseStudy",
    }),
    defineField({
      name: "caseStudyEn",
      title: "Case Study Body (English — Optional)",
      type: "portableTextBody",
      group: "caseStudy",
    }),
  ],
  preview: {
    select: {
      en: "title.en",
      ar: "title.ar",
      url: "displayUrl",
      media: "coverImage",
      visible: "visible",
    },
    prepare({ en, ar, url, media, visible }) {
      return {
        title: `${en || ar || "Project"}${visible === false ? " (Hidden)" : ""}`,
        subtitle: `${url || ""} • ${ar || ""}`,
        media,
      };
    },
  },
});

export const partnerDoc = defineType({
  name: "partner",
  title: "Technology Partner",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "partner" }),
    defineField({
      name: "name",
      title: "Partner Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Description (AR / EN)",
      type: "localeString",
    }),
    defineField({
      name: "logo",
      title: "Logo Image (SVG/PNG)",
      type: "image",
    }),
    defineField({
      name: "fallbackLogoPath",
      title: "Local Logo Path (e.g. /partners/cloudflare.svg)",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "visible",
      title: "Visible",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role.en", media: "logo" },
  },
});
