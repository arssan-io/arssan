import type { Locale } from "@/lib/i18n";

export interface SiteContactConfig {
  siteName: string;
  parentOrgName: string;
  parentOrgUrl: string;
  parentOrgBadge: string;
  logoUrl?: string;
  whatsappNumber: string;
  whatsappUrl: string;
  whatsappDisplay: string;
  defaultWhatsappMessage: string;
  email: string;
  socialLinks: Array<{
    platform: string;
    label: string;
    url: string;
  }>;
  headerNavItems: Array<{
    label: string;
    href: string;
  }>;
  announcementBar?: {
    enabled: boolean;
    text: string;
    linkText?: string;
    linkHref?: string;
  };
  sectionsVisibility: {
    showPartners: boolean;
    showProcess: boolean;
    showServices: boolean;
    showPricing: boolean;
    showLatestPosts: boolean;
  };
}

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogCategoryItem {
  id: string;
  slug: string;
  title: string;
  description?: string;
  postCount?: number;
}

export interface BlogAuthorItem {
  name: string;
  slug?: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
  url?: string;
}

export interface BlogPostSummary {
  id: string;
  language: Locale;
  translationKey?: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  featured?: boolean;
  coverImage?: {
    url: string;
    alt: string;
    caption?: string;
    lqip?: string;
    width?: number;
    height?: number;
    aspectRatio?: number;
  };
  categories: BlogCategoryItem[];
  tags: string[];
  author: BlogAuthorItem;
}

export interface BlogPostDetail extends BlogPostSummary {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  headings: TocHeading[];
  translation?: {
    language: Locale;
    title: string;
    slug: string;
  } | null;
  relatedPosts: BlogPostSummary[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
}

export function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-")
      .slice(0, 64) || "section"
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractTocHeadings(body: any[] | undefined): TocHeading[] {
  if (!Array.isArray(body)) return [];
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();

  for (const block of body) {
    if (
      block?._type === "block" &&
      (block.style === "h2" || block.style === "h3") &&
      Array.isArray(block.children)
    ) {
      const text = block.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((c: any) => c?.text || "")
        .join("")
        .trim();
      if (!text) continue;
      const baseId = slugifyHeading(text);
      const count = seen.get(baseId) || 0;
      seen.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
      headings.push({
        id,
        text,
        level: block.style === "h2" ? 2 : 3,
      });
    }
  }
  return headings;
}
