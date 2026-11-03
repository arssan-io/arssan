import { defineType, defineField } from "sanity";

export const authorDoc = defineType({
  name: "author",
  title: "Blog Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name (AR / EN)",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.en", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title (AR / EN)",
      type: "localeString",
    }),
    defineField({
      name: "bio",
      title: "Short Author Bio (AR / EN)",
      type: "localeText",
    }),
    defineField({
      name: "avatar",
      title: "Avatar Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "url",
      title: "Website / Social Profile URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      en: "name.en",
      ar: "name.ar",
      role: "role.en",
      media: "avatar",
    },
    prepare({ en, ar, role, media }) {
      return {
        title: en || ar || "Author",
        subtitle: `${ar || ""} • ${role || ""}`,
        media,
      };
    },
  },
});

export const blogCategoryDoc = defineType({
  name: "blogCategory",
  title: "Blog Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title (AR / EN)",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug (e.g. engineering, ui-ux, seo-growth)",
      type: "slug",
      options: { source: "title.en", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Category Description (AR / EN)",
      type: "localeText",
    }),
  ],
  preview: {
    select: { en: "title.en", ar: "title.ar", slug: "slug.current" },
    prepare({ en, ar, slug }) {
      return {
        title: `${en || ""} / ${ar || ""}`,
        subtitle: `/${slug || ""}`,
      };
    },
  },
});

export const postDoc = defineType({
  name: "post",
  title: "Blog Article",
  type: "document",
  groups: [
    { name: "content", title: "Article Content", default: true },
    { name: "meta", title: "Metadata, Author & Translations" },
    { name: "seo", title: "SEO & Social" },
  ],
  fields: [
    defineField({
      name: "language",
      title: "Article Language",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "العربية (Arabic — RTL)", value: "ar" },
          { title: "English (LTR)", value: "en" },
        ],
        layout: "radio",
      },
      initialValue: "ar",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "translationKey",
      title: "Translation Group Key",
      description:
        "Give an Arabic post and its English counterpart the same key (e.g. 'nextjs-kuwait-guide') so readers can switch languages on the article.",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "title",
      title: "Article Headline",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().min(10).max(140),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2025-05-01" });
          const id = document?._id.replace(/^drafts\./, "");
          const lang = document?.language || "ar";
          const query = `!defined(*[_type == "post" && !(_id in [$draft, $published]) && language == $lang && slug.current == $slug][0]._id)`;
          return client.fetch(query, {
            draft: `drafts.${id}`,
            published: id,
            lang,
            slug,
          });
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Executive Summary / Excerpt",
      description: "Shown on blog index cards, meta description, and article lead (120–240 chars).",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().min(40).max(320),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image (16:9 recommended)",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
        defineField({
          name: "caption",
          title: "Caption (optional)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Article Body",
      type: "portableTextBody",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "blogCategory" }] }],
      validation: (Rule) => Rule.min(1).warning("Assign at least one category"),
    }),
    defineField({
      name: "tags",
      title: "Topic Tags",
      type: "array",
      group: "meta",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "meta",
    }),
    defineField({
      name: "publishedAt",
      title: "Publish Date & Time",
      description: "Set a future date to schedule publication.",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Last Updated Date (optional)",
      type: "datetime",
      group: "meta",
    }),
    defineField({
      name: "readingTimeMinutes",
      title: "Reading Time Override (minutes — auto-calculated if blank)",
      type: "number",
      group: "meta",
    }),
    defineField({
      name: "featured",
      title: "Pin as Featured Article on Blog Index",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
    defineField({
      name: "relatedPosts",
      title: "Manual Related Posts (optional — auto-fills from category if empty)",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    }),
    defineField({
      name: "seo",
      title: "SEO & OpenGraph Overrides",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Publish Date (Newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      lang: "language",
      date: "publishedAt",
      featured: "featured",
      media: "coverImage",
    },
    prepare({ title, lang, date, featured, media }) {
      const badge = lang === "ar" ? "AR" : "EN";
      const d = date ? new Date(date).toLocaleDateString("en-GB") : "Draft";
      return {
        title: `${featured ? "★ " : ""}[${badge}] ${title || "Untitled Post"}`,
        subtitle: d,
        media,
      };
    },
  },
});

export const redirectDoc = defineType({
  name: "redirect",
  title: "URL Redirect",
  type: "document",
  fields: [
    defineField({
      name: "source",
      title: "From Path (e.g. /old-path)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "destination",
      title: "To Path or URL (e.g. /ar/blog/new-slug)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "permanent",
      title: "Permanent (308)",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { source: "source", destination: "destination" },
    prepare({ source, destination }) {
      return {
        title: `${source || ""} → ${destination || ""}`,
      };
    },
  },
});
