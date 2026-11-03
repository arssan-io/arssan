import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { CreditCardIcon } from "@sanity/icons/CreditCard";
import { CaseIcon } from "@sanity/icons/Case";
import { UsersIcon } from "@sanity/icons/Users";
import { EditIcon } from "@sanity/icons/Edit";
import { TranslateIcon } from "@sanity/icons/Translate";
import { StarIcon } from "@sanity/icons/Star";
import { ClockIcon } from "@sanity/icons/Clock";
import { TransferIcon } from "@sanity/icons/Transfer";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { TagIcon } from "@sanity/icons/Tag";
import { UserIcon } from "@sanity/icons/User";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Arssan Studio CMS")
    .items([
      // 1. Site Settings Singleton
      S.listItem()
        .title("Site settings & contact")
        .id("siteSettings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site settings & contact info")
        ),

      // 2. Home Page Singleton
      S.listItem()
        .title("Home page content")
        .id("homePage")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Home page content")
        ),

      S.divider(),

      // 3. Packages & Pricing Group
      S.listItem()
        .title("Packages & pricing (KWD)")
        .icon(CreditCardIcon)
        .child(
          S.list()
            .title("Packages & pricing")
            .items([
              S.listItem()
                .title("Pricing section header")
                .id("pricingSection")
                .icon(DocumentTextIcon)
                .child(
                  S.document()
                    .schemaType("pricingSection")
                    .documentId("pricingSection")
                    .title("Pricing section header")
                ),
              S.divider(),
              orderableDocumentListDeskItem({
                type: "package",
                title: "Pricing tiers (reorderable)",
                icon: CreditCardIcon,
                S,
                context,
              }),
              S.documentTypeListItem("package")
                .title("All pricing packages")
                .icon(CreditCardIcon),
            ])
        ),

      // 4. Portfolio Projects Group
      S.listItem()
        .title("Projects & portfolio")
        .icon(CaseIcon)
        .child(
          S.list()
            .title("Projects & portfolio")
            .items([
              S.listItem()
                .title("Projects page header & stats")
                .id("projectsPage")
                .icon(DocumentTextIcon)
                .child(
                  S.document()
                    .schemaType("projectsPage")
                    .documentId("projectsPage")
                    .title("Projects page header & stats")
                ),
              S.divider(),
              orderableDocumentListDeskItem({
                type: "project",
                title: "Portfolio projects (reorderable)",
                icon: CaseIcon,
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: "projectCategory",
                title: "Project categories (reorderable)",
                icon: TagIcon,
                S,
                context,
              }),
            ])
        ),

      // 5. Technology Partners
      orderableDocumentListDeskItem({
        type: "partner",
        title: "Technology partners (reorderable)",
        icon: UsersIcon,
        S,
        context,
      }),

      S.divider(),

      // 6. Blog Editorial Suite
      S.listItem()
        .title("Editorial suite")
        .icon(EditIcon)
        .child(
          S.list()
            .title("Editorial suite")
            .items([
              S.documentTypeListItem("post")
                .title("All articles")
                .icon(DocumentTextIcon),
              S.listItem()
                .title("Arabic articles")
                .icon(TranslateIcon)
                .child(
                  S.documentList()
                    .title("Arabic articles")
                    .schemaType("post")
                    .filter('_type == "post" && language == "ar"')
                ),
              S.listItem()
                .title("English articles")
                .icon(TranslateIcon)
                .child(
                  S.documentList()
                    .title("English articles")
                    .schemaType("post")
                    .filter('_type == "post" && language == "en"')
                ),
              S.listItem()
                .title("Featured articles")
                .icon(StarIcon)
                .child(
                  S.documentList()
                    .title("Featured articles")
                    .schemaType("post")
                    .filter('_type == "post" && featured == true')
                ),
              S.listItem()
                .title("Scheduled articles")
                .icon(ClockIcon)
                .child(
                  S.documentList()
                    .title("Scheduled articles")
                    .schemaType("post")
                    .filter('_type == "post" && publishedAt > now()')
                ),
              S.divider(),
              S.documentTypeListItem("blogCategory")
                .title("Blog categories")
                .icon(TagIcon),
              S.documentTypeListItem("author")
                .title("Authors")
                .icon(UserIcon),
            ])
        ),

      S.divider(),

      // 7. Redirects
      S.documentTypeListItem("redirect")
        .title("URL redirects")
        .icon(TransferIcon),
    ]);
