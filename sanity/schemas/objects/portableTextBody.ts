import { defineType, defineField, defineArrayMember } from "sanity";

export const portableTextBody = defineType({
  name: "portableTextBody",
  title: "Article Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Inline Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "External / Custom Link",
            fields: [
              defineField({
                name: "href",
                type: "string",
                title: "URL or Path",
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      name: "figureImage",
      title: "Image with Caption",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text (Required for Accessibility)",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
        }),
        defineField({
          name: "wide",
          type: "boolean",
          title: "Wide / Full Column Bleed",
          initialValue: false,
        }),
      ],
    }),
    defineArrayMember({
      type: "code",
      name: "codeBlock",
      title: "Code Block",
      options: {
        withFilename: true,
        language: "typescript",
        languageAlternatives: [
          { title: "TypeScript", value: "typescript" },
          { title: "TSX / React", value: "tsx" },
          { title: "JavaScript", value: "javascript" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "JSON", value: "json" },
          { title: "Bash / Shell", value: "bash" },
          { title: "SQL", value: "sql" },
          { title: "GROQ", value: "groq" },
          { title: "Python", value: "python" },
        ],
      },
    }),
    defineArrayMember({
      type: "object",
      name: "callout",
      title: "Callout Box",
      fields: [
        defineField({
          name: "tone",
          title: "Tone",
          type: "string",
          options: {
            list: [
              { title: "Note / Insight", value: "info" },
              { title: "Tip / Best Practice", value: "tip" },
              { title: "Warning / Important", value: "warning" },
            ],
            layout: "radio",
          },
          initialValue: "info",
        }),
        defineField({
          name: "title",
          title: "Callout Heading",
          type: "string",
        }),
        defineField({
          name: "text",
          title: "Content",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: { title: "title", subtitle: "text", tone: "tone" },
        prepare({ title, subtitle, tone }) {
          return {
            title: title || `Callout (${tone || "info"})`,
            subtitle,
          };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "ctaCard",
      title: "In-Article Conversion CTA Card",
      fields: [
        defineField({
          name: "badge",
          title: "Small Badge",
          type: "string",
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Supporting Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "buttonText",
          title: "Button Label",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "buttonHref",
          title: "Button Link (e.g. /ar/pricing/professional or WhatsApp URL)",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "packageSlug",
          title: "Related Package Slug (optional, for analytics)",
          type: "string",
        }),
      ],
      preview: {
        select: { title: "heading", subtitle: "buttonText" },
        prepare({ title, subtitle }) {
          return {
            title: `CTA: ${title || "Untitled"}`,
            subtitle: `Button: ${subtitle || ""}`,
          };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "dataTable",
      title: "Comparison / Data Table",
      fields: [
        defineField({
          name: "caption",
          title: "Table Caption",
          type: "string",
        }),
        defineField({
          name: "headers",
          title: "Column Headers",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "row",
              fields: [
                defineField({
                  name: "cells",
                  title: "Cells",
                  type: "array",
                  of: [{ type: "string" }],
                }),
              ],
              preview: {
                select: { cells: "cells" },
                prepare({ cells }) {
                  return {
                    title: Array.isArray(cells) ? cells.join("  |  ") : "Row",
                  };
                },
              },
            }),
          ],
        }),
      ],
      preview: {
        select: { title: "caption", headers: "headers" },
        prepare({ title, headers }) {
          return {
            title: title || "Data Table",
            subtitle: Array.isArray(headers) ? headers.join(" • ") : "",
          };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "embed",
      title: "Video / Interactive Embed",
      fields: [
        defineField({
          name: "url",
          title: "YouTube or Vimeo URL",
          type: "url",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
      preview: {
        select: { title: "caption", subtitle: "url" },
        prepare({ title, subtitle }) {
          return {
            title: title || "Video Embed",
            subtitle,
          };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "dividerBlock",
      title: "Section Divider",
      fields: [
        defineField({
          name: "style",
          title: "Divider Style",
          type: "string",
          options: {
            list: [
              { title: "Subtle Line", value: "line" },
              { title: "Dots", value: "dots" },
            ],
          },
          initialValue: "line",
        }),
      ],
      preview: {
        prepare() {
          return { title: "─── Section Divider ───" };
        },
      },
    }),
  ],
});
