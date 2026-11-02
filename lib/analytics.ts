/**
 * Google Analytics (GA4) Tracking Utility for Arssan Studio
 *
 * Provides clear, human-readable custom events and standard GA4 conversion events
 * for measuring project views, package engagements, and high-value lead inquiries.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type ProjectTrackData = {
  id: string;
  title: string;
  category?: string;
  client?: string;
  url?: string;
};

export type PackageTrackData = {
  id: string;
  name: string;
  price?: string | number;
  originalPrice?: string;
  currency?: string;
  popular?: boolean;
};

export type ContactTrackData = {
  source:
    | "floating_whatsapp"
    | "header_contact"
    | "hero_contact"
    | "footer_contact"
    | "pricing_custom_quote"
    | "package_page"
    | "project_card";
  method?: "whatsapp" | "email" | "link";
  packageId?: string;
  packageName?: string;
  projectId?: string;
  projectTitle?: string;
};

// Generic safe event dispatcher
export function trackEvent(
  eventName: string,
  parameters: Record<string, unknown> = {}
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  try {
    window.gtag("event", eventName, parameters);
  } catch (err) {
    console.debug("[Analytics] Failed to send event:", eventName, err);
  }
}

// Helper to extract numeric price for GA4 monetization / lead value metrics
function parsePrice(price?: string | number): number | undefined {
  if (typeof price === "number") return price;
  if (!price) return undefined;
  const match = price.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : undefined;
}

/**
 * 1. PROJECT TRACKING
 */

// Track when a project card enters the user's viewport (impression)
export function trackProjectView(project: ProjectTrackData) {
  trackEvent("view_project", {
    project_id: project.id,
    project_title: project.title,
    project_category: project.category || "general",
    project_client: project.client || "",
    project_url: project.url || "",
  });

  // Standard GA4 content selection event
  trackEvent("select_content", {
    content_type: "project",
    item_id: project.id,
  });
}

// Track when a user clicks to visit or preview a project
export function trackProjectClick(
  project: ProjectTrackData,
  clickTarget: "visit_button" | "preview_image" | "url_pill" = "visit_button"
) {
  trackEvent("select_project", {
    project_id: project.id,
    project_title: project.title,
    project_category: project.category || "general",
    project_url: project.url || "",
    click_target: clickTarget,
  });
}

// Track when a user initiates a WhatsApp inquiry for a specific project
export function trackProjectInquiry(project: ProjectTrackData) {
  trackEvent("project_inquiry", {
    project_id: project.id,
    project_title: project.title,
    project_category: project.category || "general",
    inquiry_channel: "whatsapp",
  });

  trackEvent("generate_lead", {
    lead_type: "project_inquiry",
    project_id: project.id,
    project_title: project.title,
  });
}

// Track when a user filters the projects showcase by category
export function trackCategoryFilter(categoryKey: string, categoryLabel?: string) {
  trackEvent("filter_projects", {
    category_key: categoryKey,
    category_label: categoryLabel || categoryKey,
  });
}

/**
 * 2. SERVICE PACKAGE TRACKING
 */

// Track when user views the pricing section on the homepage
export function trackPricingSectionView(packagesCount?: number) {
  trackEvent("view_pricing_section", {
    total_packages: packagesCount || 3,
  });
}

// Track when a user views a specific package detail page
export function trackPackageView(pkg: PackageTrackData) {
  const numericPrice = parsePrice(pkg.price);

  trackEvent("view_package", {
    package_id: pkg.id,
    package_name: pkg.name,
    package_price: pkg.price || "custom",
    currency: pkg.currency || "KWD",
    is_popular: !!pkg.popular,
  });

  // Standard GA4 view_item event
  trackEvent("view_item", {
    currency: pkg.currency || "KWD",
    value: numericPrice,
    items: [
      {
        item_id: pkg.id,
        item_name: pkg.name,
        item_category: "service_package",
        price: numericPrice,
      },
    ],
  });
}

// Track when a user clicks a package CTA on the pricing cards
export function trackPackageSelect(pkg: PackageTrackData) {
  const numericPrice = parsePrice(pkg.price);

  trackEvent("select_package", {
    package_id: pkg.id,
    package_name: pkg.name,
    package_price: pkg.price || "custom",
    currency: pkg.currency || "KWD",
    is_popular: !!pkg.popular,
  });

  // Standard GA4 select_item
  trackEvent("select_item", {
    item_list_name: "Pricing Grid",
    items: [
      {
        item_id: pkg.id,
        item_name: pkg.name,
        item_category: "service_package",
        price: numericPrice,
      },
    ],
  });
}

// Track when a user clicks WhatsApp/contact for a specific package
export function trackPackageInquiry(pkg: PackageTrackData) {
  const numericPrice = parsePrice(pkg.price);

  trackEvent("package_inquiry", {
    package_id: pkg.id,
    package_name: pkg.name,
    package_price: pkg.price || "custom",
    currency: pkg.currency || "KWD",
    inquiry_channel: "whatsapp",
  });

  trackEvent("generate_lead", {
    currency: pkg.currency || "KWD",
    value: numericPrice,
    lead_type: "package_inquiry",
    package_id: pkg.id,
    package_name: pkg.name,
  });
}

/**
 * 3. HIGH-VALUE CONVERSION & NAVIGATION TRACKING
 */

export function trackContactClick(data: ContactTrackData) {
  trackEvent("contact_click", {
    source_location: data.source,
    contact_method: data.method || "whatsapp",
    package_id: data.packageId,
    project_id: data.projectId,
  });

  trackEvent("generate_lead", {
    lead_type: "contact_click",
    source_location: data.source,
    package_id: data.packageId,
    project_id: data.projectId,
  });
}

export function trackLanguageSwitch(fromLang: string, toLang: string) {
  trackEvent("language_switch", {
    from_language: fromLang,
    to_language: toLang,
  });
}

export function trackSocialClick(platform: string) {
  trackEvent("social_click", {
    platform,
  });
}
