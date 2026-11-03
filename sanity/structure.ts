import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Arssan Studio CMS")
    .items([
      // 1. Site Settings Singleton
      S.listItem()
        .title("⚙️ Site Settings & Contact")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings & Contact Info")
        ),

      // 2. Home Page Singleton
      S.listItem()
        .title("🏠 Home Page Content")
        .id("homePage")
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Home Page (Hero, Partners, Process, Services)")
        ),

      S.divider(),

      // 3. Packages & Pricing Group
      S.listItem()
        .title("💳 Packages & Pricing (KWD)")
        .child(
          S.list()
            .title("Packages & Pricing")
            .items([
              S.listItem()
                .title("Section Header & Assurance Strip")
                .id("pricingSection")
                .child(
                  S.document()
                    .schemaType("pricingSection")
                    .documentId("pricingSection")
                    .title("Pricing Section Header")
                ),
              S.divider(),
              orderableDocumentListDeskItem({
                type: "package",
                title: "Pricing Tiers (Drag to Reorder)",
                S,
                context,
              }),
              S.documentTypeListItem("package").title("All Pricing Packages"),
            ])
        ),

      // 4. Portfolio Projects Group
      S.listItem()
        .title("🗂️ Projects & Portfolio")
        .child(
          S.list()
            .title("Projects & Portfolio")
            .items([
              S.listItem()
                .title("Projects Page Header & Benchmarks")
                .id("projectsPage")
                .child(
                  S.document()
                    .schemaType("projectsPage")
                    .documentId("projectsPage")
                    .title("Projects Page Header & Stats")
                ),
              S.divider(),
              orderableDocumentListDeskItem({
                type: "project",
                title: "Portfolio Projects (Drag to Reorder)",
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: "projectCategory",
                title: "Project Categories (Drag to Reorder)",
                S,
                context,
              }),
            ])
        ),

      // 5. Technology Partners
      orderableDocumentListDeskItem({
        type: "partner",
        title: "🤝 Technology Partners (Drag to Reorder)",
        S,
        context,
      }),

      S.divider(),

      // 6. Blog Editorial Suite
      S.listItem()
        .title("✍️ Blog & Editorial")
        .child(
          S.list()
            .title("Blog & Editorial")
            .items([
              S.documentTypeListItem("post").title("All Articles"),
              S.listItem()
                .title("🇵🇸/🇰🇼 Arabic Articles (العربية)")
                .child(
                  S.documentList()
                    .title("Arabic Articles")
                    .schemaType("post")
                    .filter('_type == "post" && language == "ar"')
                ),
              S.listItem()
                .title("🇬🇧 English Articles")
                .child(
                  S.documentList()
                    .title("English Articles")
                    .schemaType("post")
                    .filter('_type == "post" && language == "en"')
                ),
              S.listItem()
                .title("★ Featured Articles")
                .child(
                  S.documentList()
                    .title("Featured Articles")
                    .schemaType("post")
                    .filter('_type == "post" && featured == true')
                ),
              S.listItem()
                .title("🕒 Scheduled Articles")
                .child(
                  S.documentList()
                    .title("Scheduled Articles")
                    .schemaType("post")
                    .filter('_type == "post" && publishedAt > now()')
                ),
              S.divider(),
              S.documentTypeListItem("blogCategory").title("Blog Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ])
        ),

      S.divider(),

      // 7. Redirects
      S.documentTypeListItem("redirect").title("🔀 URL Redirects"),
    ]);
