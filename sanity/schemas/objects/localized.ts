import { defineType, defineField } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Localized String (AR / EN)",
  type: "object",
  fieldsets: [
    {
      name: "translations",
      title: "Translations",
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: "ar",
      title: "العربية (Arabic)",
      type: "string",
      fieldset: "translations",
      validation: (Rule) => Rule.required().warning("Arabic text is recommended"),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      fieldset: "translations",
      validation: (Rule) => Rule.required().warning("English text is recommended"),
    }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized Paragraph (AR / EN)",
  type: "object",
  fieldsets: [
    {
      name: "translations",
      title: "Translations",
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: "ar",
      title: "العربية (Arabic)",
      type: "text",
      rows: 3,
      fieldset: "translations",
      validation: (Rule) => Rule.required().warning("Arabic text is recommended"),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 3,
      fieldset: "translations",
      validation: (Rule) => Rule.required().warning("English text is recommended"),
    }),
  ],
});

export const seoObject = defineType({
  name: "seo",
  title: "SEO & Social Sharing",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title Override",
      type: "string",
      description: "Recommended under 60 characters. Falls back to document title.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description Override",
      type: "text",
      rows: 3,
      description: "Recommended 120–160 characters.",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      description: "1200×630px recommended for social previews.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL Override",
      type: "url",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from Search Engines (noindex)",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
