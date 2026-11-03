import { localeString, localeText, seoObject } from "./objects/localized";
import { portableTextBody } from "./objects/portableTextBody";
import { siteSettings } from "./singletons/siteSettings";
import { homePage } from "./singletons/homePage";
import { pricingSection, projectsPage } from "./singletons/sectionHeaders";
import { packageDoc } from "./documents/package";
import { projectCategory, projectDoc, partnerDoc } from "./documents/project";
import { authorDoc, blogCategoryDoc, postDoc, redirectDoc } from "./documents/blog";

export const SINGLETON_TYPES = new Set([
  "siteSettings",
  "homePage",
  "pricingSection",
  "projectsPage",
]);

export const schemaTypes = [
  // Objects
  localeString,
  localeText,
  seoObject,
  portableTextBody,
  // Singletons
  siteSettings,
  homePage,
  pricingSection,
  projectsPage,
  // Documents
  packageDoc,
  projectCategory,
  projectDoc,
  partnerDoc,
  authorDoc,
  blogCategoryDoc,
  postDoc,
  redirectDoc,
];
