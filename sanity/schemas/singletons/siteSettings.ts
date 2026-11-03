import { defineType, defineField, defineArrayMember } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand & Identity", default: true },
    { name: "contact", title: "Contact & Socials" },
    { name: "navigation", title: "Header & Navigation" },
    { name: "footer", title: "Footer & Pre-Footer CTA" },
    { name: "announcement", title: "Announcement Bar" },
    { name: "seo", title: "Global SEO & Analytics" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name (AR / EN)",
      type: "localeString",
      group: "brand",
    }),
    defineField({
      name: "parentOrgName",
      title: "Parent Organization Name",
      type: "string",
      group: "brand",
      initialValue: "Scptric",
    }),
    defineField({
      name: "parentOrgUrl",
      title: "Parent Organization URL",
      type: "url",
      group: "brand",
      initialValue: "https://scptric.com",
    }),
    defineField({
      name: "parentOrgBadge",
      title: "Parent Organization Badge Text",
      type: "localeString",
      group: "brand",
    }),
    defineField({
      name: "logo",
      title: "Custom Logo Override (SVG/PNG)",
      type: "image",
      group: "brand",
    }),

    // Contact & Socials
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number (digits only, e.g. 46700265645)",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsappDisplay",
      title: "WhatsApp Formatted Display (e.g. +46 70 026 56 45)",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "defaultWhatsappMessage",
      title: "Default WhatsApp Prefilled Message",
      type: "localeString",
      group: "contact",
    }),
    defineField({
      name: "whatsappTooltip",
      title: "Floating WhatsApp Button Tooltip",
      type: "localeString",
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "Official Contact Email",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Profiles",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "X (Twitter)", value: "x" },
                  { title: "Facebook", value: "facebook" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                ],
              },
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "Profile URL",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        }),
      ],
    }),

    // Navigation
    defineField({
      name: "navLabels",
      title: "Core Navigation Labels",
      type: "object",
      group: "navigation",
      fields: [
        defineField({ name: "home", title: "Home", type: "localeString" }),
        defineField({ name: "projects", title: "Projects", type: "localeString" }),
        defineField({ name: "blog", title: "Blog", type: "localeString" }),
        defineField({ name: "services", title: "Services", type: "localeString" }),
        defineField({ name: "process", title: "Process / Methodology", type: "localeString" }),
        defineField({ name: "pricing", title: "Pricing", type: "localeString" }),
        defineField({ name: "contact", title: "Contact CTA Button", type: "localeString" }),
      ],
    }),
    defineField({
      name: "headerNavItems",
      title: "Custom Header Navigation Items (Ordered)",
      description: "Reorder, hide, or add navigation links in the header.",
      type: "array",
      group: "navigation",
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          fields: [
            defineField({ name: "label", title: "Label", type: "localeString" }),
            defineField({
              name: "href",
              title: "Link Path (use /projects, /blog, #services, #process, #pricing)",
              type: "string",
            }),
            defineField({
              name: "visible",
              title: "Visible",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              ar: "label.ar",
              en: "label.en",
              href: "href",
              visible: "visible",
            },
            prepare({ ar, en, href, visible }) {
              return {
                title: `${en || ""} / ${ar || ""}`,
                subtitle: `${href || ""} ${visible === false ? "(Hidden)" : ""}`,
              };
            },
          },
        }),
      ],
    }),

    // Footer
    defineField({
      name: "footerBio",
      title: "Footer Brand Bio",
      type: "localeText",
      group: "footer",
    }),
    defineField({
      name: "footerDescription",
      title: "Footer Short Description",
      type: "localeString",
      group: "footer",
    }),
    defineField({
      name: "footerRights",
      title: "Copyright Rights Label",
      type: "localeString",
      group: "footer",
    }),
    defineField({
      name: "footerLinksTitle",
      title: "Quick Links Column Title",
      type: "localeString",
      group: "footer",
    }),
    defineField({
      name: "footerServicesTitle",
      title: "Services Column Title",
      type: "localeString",
      group: "footer",
    }),
    defineField({
      name: "footerStatusText",
      title: "System Status Pill Text",
      type: "localeString",
      group: "footer",
    }),
    defineField({
      name: "preFooterCta",
      title: "Executive Pre-Footer CTA Card",
      type: "object",
      group: "footer",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "localeString" }),
        defineField({ name: "title", title: "Heading", type: "localeString" }),
        defineField({ name: "description", title: "Description", type: "localeText" }),
      ],
    }),

    // Announcement Bar
    defineField({
      name: "announcementBar",
      title: "Top Announcement Bar",
      type: "object",
      group: "announcement",
      fields: [
        defineField({
          name: "enabled",
          title: "Show Announcement Bar",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "text",
          title: "Announcement Text",
          type: "localeString",
        }),
        defineField({
          name: "linkText",
          title: "Action Link Label (optional)",
          type: "localeString",
        }),
        defineField({
          name: "linkHref",
          title: "Action Link URL / Path (optional)",
          type: "string",
        }),
      ],
    }),

    // Global SEO
    defineField({
      name: "metaTitle",
      title: "Default Site Meta Title",
      type: "localeString",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Default Site Meta Description",
      type: "localeText",
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Default Open Graph Image",
      type: "image",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings & Contact Info",
        subtitle: "Global configuration, WhatsApp, navigation, footer & SEO",
      };
    },
  },
});
