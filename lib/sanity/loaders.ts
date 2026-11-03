import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "./client";
import { sanityFetch } from "./live";
import {
  SITE_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  PARTNERS_QUERY,
  PRICING_SECTION_QUERY,
  PACKAGES_QUERY,
  PROJECTS_PAGE_QUERY,
  PROJECT_CATEGORIES_QUERY,
  PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  BLOG_CATEGORIES_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  ALL_PUBLISHED_POSTS_SITEMAP_QUERY,
} from "./queries";

type LocalizedField = { ar?: string; en?: string } | null | undefined;

export function pickLocale(
  field: LocalizedField,
  locale: Locale,
  fallback = ""
): string {
  if (!field) return fallback;
  const primary = locale === "ar" ? field.ar : field.en;
  const secondary = locale === "ar" ? field.en : field.ar;
  return (primary && primary.trim()) || (secondary && secondary.trim()) || fallback;
}

import {
  slugifyHeading,
  extractTocHeadings,
  type SiteContactConfig,
  type TocHeading,
  type BlogCategoryItem,
  type BlogAuthorItem,
  type BlogPostSummary,
  type BlogPostDetail,
} from "./types";

export {
  slugifyHeading,
  extractTocHeadings,
  type SiteContactConfig,
  type TocHeading,
  type BlogCategoryItem,
  type BlogAuthorItem,
  type BlogPostSummary,
  type BlogPostDetail,
};

export function estimateReadingTime(
  plainText?: string,
  explicitMinutes?: number | null
): number {
  if (explicitMinutes && explicitMinutes > 0) return Math.round(explicitMinutes);
  if (!plainText) return 4;
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 190));
}

async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    const res = await sanityFetch({
      query,
      params,
    });
    return (res?.data as T) ?? null;
  } catch {
    try {
      return await client.fetch<T>(query, params);
    } catch {
      return null;
    }
  }
}

export interface CmsPackageItem {
  name: string;
  slug: string;
  aliases?: string[];
  price: string;
  originalPrice?: string;
  currency: string;
  period: string;
  popular?: boolean;
  description: string;
  features: string[];
  cta: string;
  inquiryMessage?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
}

export async function getFullSiteData(locale: Locale) {
  const baseDict = await getDictionary(locale);
  const isAr = locale === "ar";

  const [
    settingsDoc,
    homeDoc,
    partnersDocs,
    pricingSecDoc,
    packageDocs,
    projectsPageDoc,
    projectCatDocs,
    projectDocs,
  ] = await Promise.all([
    safeFetch<Record<string, unknown>>(SITE_SETTINGS_QUERY),
    safeFetch<Record<string, unknown>>(HOME_PAGE_QUERY),
    safeFetch<Array<Record<string, unknown>>>(PARTNERS_QUERY),
    safeFetch<Record<string, unknown>>(PRICING_SECTION_QUERY),
    safeFetch<Array<Record<string, unknown>>>(PACKAGES_QUERY),
    safeFetch<Record<string, unknown>>(PROJECTS_PAGE_QUERY),
    safeFetch<Array<Record<string, unknown>>>(PROJECT_CATEGORIES_QUERY),
    safeFetch<Array<Record<string, unknown>>>(PROJECTS_QUERY),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = (settingsDoc || {}) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const h = (homeDoc || {}) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ps = (pricingSecDoc || {}) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pp = (projectsPageDoc || {}) as any;

  const whatsappNumber = (s.whatsappNumber || "46700265645").replace(/[^\d]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const whatsappDisplay = s.whatsappDisplay || "+46 70 026 56 45";
  const email = s.email || "info@arssan.com";

  const nav = {
    home: pickLocale(s.navLabels?.home, locale, baseDict.nav.home),
    projects: pickLocale(
      s.navLabels?.projects,
      locale,
      baseDict.nav.projects || (isAr ? "مشاريعنا" : "Projects")
    ),
    blog: pickLocale(
      s.navLabels?.blog,
      locale,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (baseDict.nav as any).blog || (isAr ? "المدونة" : "Blog")
    ),
    process: pickLocale(s.navLabels?.process, locale, baseDict.nav.process),
    services: pickLocale(s.navLabels?.services, locale, baseDict.nav.services),
    pricing: pickLocale(s.navLabels?.pricing, locale, baseDict.nav.pricing),
    contact: pickLocale(s.navLabels?.contact, locale, baseDict.nav.contact),
  };

  // Custom or default header navigation items
  const defaultHeaderNav = [
    { label: nav.projects, href: `/${locale}/projects` },
    { label: nav.blog, href: `/${locale}/blog` },
    { label: nav.services, href: `/${locale}#services` },
    { label: nav.process, href: `/${locale}#process` },
    { label: nav.pricing, href: `/${locale}#pricing` },
  ];

  const headerNavItems =
    Array.isArray(s.headerNavItems) && s.headerNavItems.length > 0
      ? s.headerNavItems
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((item: any) => item?.visible !== false)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((item: any) => {
            const rawHref: string = item.href || "";
            const resolvedHref = rawHref.startsWith("#")
              ? `/${locale}${rawHref}`
              : rawHref.startsWith("/") && !rawHref.startsWith(`/${locale}`)
              ? `/${locale}${rawHref}`
              : rawHref;
            return {
              label: pickLocale(item.label, locale, rawHref),
              href: resolvedHref,
            };
          })
      : defaultHeaderNav;

  // Packages
  const cmsPackages: CmsPackageItem[] =
    Array.isArray(packageDocs) && packageDocs.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        packageDocs.map((p: any) => ({
          name: pickLocale(p.name, locale),
          slug: p.slug as string,
          aliases: Array.isArray(p.aliases) ? (p.aliases as string[]) : [],
          price: p.isCustomQuote
            ? pickLocale(
                p.customPriceLabel,
                locale,
                isAr ? "حسب المتطلبات" : "Custom"
              )
            : (p.price as string) || "0",
          originalPrice: p.isCustomQuote ? undefined : (p.originalPrice as string | undefined),
          currency: p.isCustomQuote
            ? ""
            : pickLocale(p.currency, locale, isAr ? "د.ك" : "KWD"),
          period: pickLocale(p.period, locale),
          popular: Boolean(p.popular),
          description: pickLocale(p.description, locale),
          features: Array.isArray(p.features)
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              p.features.map((f: any) => pickLocale(f, locale)).filter(Boolean)
            : [],
          cta: pickLocale(p.cta, locale),
          inquiryMessage: pickLocale(p.inquiryMessage, locale),
          seo: p.seo || undefined,
        }))
      : (baseDict.pricing.packages as CmsPackageItem[]);

  // Categories map for projects
  const categoriesMap: Record<string, string> =
    Array.isArray(projectCatDocs) && projectCatDocs.length > 0
      ? Object.fromEntries(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          projectCatDocs.map((c: any) => [
            c.key,
            pickLocale(c.title, locale, c.key),
          ])
        )
      : baseDict.projects_page.categories;

  // Projects list
  const cmsProjects =
    Array.isArray(projectDocs) && projectDocs.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        projectDocs.map((proj: any) => ({
          id: (proj.slug || proj._id) as string,
          slug: proj.slug as string,
          title: pickLocale(proj.title, locale),
          categoryKey: (proj.categoryKey as string) || "general",
          categoryLabel: pickLocale(
            proj.categoryTitle,
            locale,
            categoriesMap[proj.categoryKey] || ""
          ),
          client: pickLocale(proj.client, locale),
          year: (proj.year as string) || "2026",
          url: (proj.displayUrl as string) || "",
          liveUrl:
            (proj.liveUrl as string) ||
            (proj.displayUrl ? `https://${proj.displayUrl}` : undefined),
          image:
            (proj.coverImage?.asset?.url as string) ||
            (proj.fallbackImagePath as string) ||
            undefined,
          description: pickLocale(proj.description, locale),
          metrics: {
            value: pickLocale(proj.metricValue, locale),
            label: pickLocale(proj.metricLabel, locale),
          },
          tags: Array.isArray(proj.tags)
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              proj.tags.map((t: any) => pickLocale(t, locale)).filter(Boolean)
            : [],
          inquiryMessage: pickLocale(proj.inquiryMessage, locale),
          hasCaseStudy: Boolean(
            isAr ? proj.hasCaseStudyAr : proj.hasCaseStudyEn
          ),
        }))
      : baseDict.projects_page.projects;

  // Services
  const serviceItems = Array.isArray(h.servicesSection?.items) ? h.servicesSection.items : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findService = (key: string, fallback: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found = serviceItems.find((it: any) => it.key === key);
    if (!found) return fallback;
    return {
      title: pickLocale(found.title, locale, fallback.title),
      description: pickLocale(found.description, locale, fallback.description),
      features:
        Array.isArray(found.features) && found.features.length > 0
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            found.features.map((f: any) => pickLocale(f, locale)).filter(Boolean)
          : fallback.features,
      metric: found.metricValue
        ? {
            value: found.metricValue as string,
            label: pickLocale(found.metricLabel, locale),
            tag: (found.metricTag as string) || "",
          }
        : undefined,
    };
  };

  // Partners list
  const partnersList =
    Array.isArray(partnersDocs) && partnersDocs.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        partnersDocs.map((pt: any) => ({
          id: pt._id as string,
          name: pt.name as string,
          role: pickLocale(pt.role, locale),
          logo: (pt.logoUrl as string) || (pt.fallbackLogoPath as string) || "",
          url: (pt.url as string) || "#",
        }))
      : undefined;

  const dict = {
    ...baseDict,
    meta: {
      title: pickLocale(s.metaTitle, locale, baseDict.meta.title),
      description: pickLocale(s.metaDescription, locale, baseDict.meta.description),
      ogImageUrl: (s.ogImageUrl as string) || "/images/og-image.png",
    },
    nav,
    hero: {
      tagline: pickLocale(h.hero?.tagline, locale, baseDict.hero.tagline),
      title_line1: pickLocale(h.hero?.titleLine1, locale, baseDict.hero.title_line1),
      title_line2: pickLocale(h.hero?.titleLine2, locale, baseDict.hero.title_line2),
      title_line3: pickLocale(h.hero?.titleLine3, locale, baseDict.hero.title_line3),
      description: pickLocale(h.hero?.description, locale, baseDict.hero.description),
      cta: pickLocale(h.hero?.cta, locale, baseDict.hero.cta),
      ctaHref: (h.hero?.ctaHref as string) || "#pricing",
      pipeline_design: pickLocale(h.hero?.pipelineDesign, locale, baseDict.hero.pipeline_design),
      pipeline_dev: pickLocale(h.hero?.pipelineDev, locale, baseDict.hero.pipeline_dev),
      pipeline_seo: pickLocale(h.hero?.pipelineSeo, locale, baseDict.hero.pipeline_seo),
      startingPriceNote: pickLocale(
        h.hero?.startingPriceNote,
        locale,
        isAr
          ? "الباقات تبدأ من 150 د.ك • تسليم احترافي سريع"
          : "Packages from 150 KWD • Rapid Executive Delivery"
      ),
      backgroundImageUrl: (h.hero?.backgroundImageUrl as string) || "/images/hero-bg.webp",
    },
    partners: {
      ...baseDict.partners,
      badge: pickLocale(h.partnersSection?.badge, locale, baseDict.partners.badge),
      title: pickLocale(h.partnersSection?.title, locale, baseDict.partners.title),
      subtitle: pickLocale(h.partnersSection?.subtitle, locale, baseDict.partners.subtitle),
      list: partnersList,
    },
    process: {
      badge: pickLocale(h.processSection?.badge, locale, baseDict.process.badge),
      title: pickLocale(h.processSection?.title, locale, baseDict.process.title),
      subtitle: pickLocale(h.processSection?.subtitle, locale, baseDict.process.subtitle),
      steps:
        Array.isArray(h.processSection?.steps) && h.processSection.steps.length > 0
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            h.processSection.steps.map((st: any, idx: number) => ({
              num: (st.num as string) || `0${idx + 1}`,
              title: pickLocale(st.title, locale),
              description: pickLocale(st.description, locale),
            }))
          : baseDict.process.steps,
    },
    services: {
      badge: pickLocale(h.servicesSection?.badge, locale, baseDict.services.badge),
      title: pickLocale(h.servicesSection?.title, locale, baseDict.services.title),
      subtitle: pickLocale(h.servicesSection?.subtitle, locale, baseDict.services.subtitle),
      design: findService("design", baseDict.services.design),
      development: findService("development", baseDict.services.development),
      seo: findService("seo", baseDict.services.seo),
    },
    pricing: {
      badge: pickLocale(ps.badge, locale, baseDict.pricing.badge),
      title: pickLocale(ps.title, locale, baseDict.pricing.title),
      subtitle: pickLocale(ps.subtitle, locale, baseDict.pricing.subtitle),
      includedDeliverablesLabel: pickLocale(
        ps.includedDeliverablesLabel,
        locale,
        isAr ? "المميزات المشمولة في الباقة" : "Included Deliverables"
      ),
      specialOfferBadge: pickLocale(
        ps.specialOfferBadge,
        locale,
        isAr ? "خصم خاص" : "Special Offer"
      ),
      mostPopularBadge: pickLocale(
        ps.mostPopularBadge,
        locale,
        isAr ? "الأكثر اختياراً" : "Most Popular"
      ),
      assuranceBullets:
        Array.isArray(ps.assuranceBullets) && ps.assuranceBullets.length > 0
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ps.assuranceBullets.map((b: any) => pickLocale(b, locale)).filter(Boolean)
          : [
              isAr
                ? "دفعات مرنة وميسّرة على مراحل المشروع"
                : "Flexible Milestone Payments in KWD",
              isAr
                ? "ملكية كاملة للكود البرمجي والنطاق"
                : "100% Source Code & Domain Ownership",
              isAr
                ? "دعم فني مباشر عبر واتساب واجتماعات دورية"
                : "Direct WhatsApp & Executive Support",
            ],
      customQuoteCta: pickLocale(
        ps.customQuoteCta,
        locale,
        isAr ? "تحتاج باقة مخصصة؟ تواصل معنا ←" : "Need a custom quote? Let's talk →"
      ),
      packages: cmsPackages,
    },
    footer: {
      bio: pickLocale(s.footerBio, locale, baseDict.footer.bio),
      description: pickLocale(s.footerDescription, locale, baseDict.footer.description),
      rights: pickLocale(s.footerRights, locale, baseDict.footer.rights),
      links: {
        title: pickLocale(s.footerLinksTitle, locale, baseDict.footer.links.title),
      },
      services_title: pickLocale(
        s.footerServicesTitle,
        locale,
        baseDict.footer.services_title
      ),
      statusText: pickLocale(
        s.footerStatusText,
        locale,
        isAr ? "جميع الأنظمة تعمل بكفاءة" : "All Systems Operational"
      ),
      preFooterCta: {
        badge: pickLocale(
          s.preFooterCta?.badge,
          locale,
          isAr ? "استشارة مجانية لمشروعك في الكويت" : "Free Executive Discovery Call"
        ),
        title: pickLocale(
          s.preFooterCta?.title,
          locale,
          isAr
            ? "هل أنت مستعد لبناء حضور رقمي يليق بعلامتك التجارية؟"
            : "Ready to build a calm, high-performing digital platform?"
        ),
        description: pickLocale(
          s.preFooterCta?.description,
          locale,
          isAr
            ? "تواصل مع فريقنا مباشرة عبر واتساب لمناقشة تفاصيل مشروعك واختيار الباقة الأنسب لأهدافك."
            : "Connect directly with our team to scope your project, timeline, and KWD package."
        ),
      },
    },
    projects_page: {
      badge: pickLocale(pp.badge, locale, baseDict.projects_page.badge),
      title: pickLocale(pp.title, locale, baseDict.projects_page.title),
      subtitle: pickLocale(pp.subtitle, locale, baseDict.projects_page.subtitle),
      all_filter: pickLocale(
        pp.allFilterLabel,
        locale,
        baseDict.projects_page.all_filter
      ),
      categories: categoriesMap,
      stats:
        Array.isArray(pp.stats) && pp.stats.length > 0
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            pp.stats.map((st: any) => ({
              value: st.value as string,
              label: pickLocale(st.label, locale),
            }))
          : baseDict.projects_page.stats,
      projects: cmsProjects,
      cta: {
        badge: pickLocale(pp.cta?.badge, locale, baseDict.projects_page.cta.badge),
        title: pickLocale(pp.cta?.title, locale, baseDict.projects_page.cta.title),
        description: pickLocale(
          pp.cta?.description,
          locale,
          baseDict.projects_page.cta.description
        ),
        button: pickLocale(pp.cta?.button, locale, baseDict.projects_page.cta.button),
        back_home: baseDict.projects_page.cta.back_home,
        inquire_btn: pickLocale(
          pp.cta?.inquireBtn,
          locale,
          baseDict.projects_page.cta.inquire_btn
        ),
        visit_btn: pickLocale(
          pp.cta?.visitBtn,
          locale,
          baseDict.projects_page.cta.visit_btn
        ),
      },
    },
    whatsapp: {
      tooltip: pickLocale(s.whatsappTooltip, locale, baseDict.whatsapp.tooltip),
    },
  };

  const siteConfig: SiteContactConfig = {
    siteName: pickLocale(s.siteName, locale, isAr ? "أرسان" : "Arssan"),
    parentOrgName: (s.parentOrgName as string) || "Scptric",
    parentOrgUrl: (s.parentOrgUrl as string) || "https://scptric.com",
    parentOrgBadge: pickLocale(
      s.parentOrgBadge,
      locale,
      isAr ? "ذراع سكبترك للويب • Scptric" : "Scptric Web Arm"
    ),
    logoUrl: (s.logoUrl as string) || undefined,
    whatsappNumber,
    whatsappUrl,
    whatsappDisplay,
    defaultWhatsappMessage: pickLocale(
      s.defaultWhatsappMessage,
      locale,
      isAr
        ? "مرحباً أرسان، أود الاستفسار عن تصميم وتطوير موقع إلكتروني في الكويت."
        : "Hello Arssan Studio, I would like to inquire about a web project in Kuwait."
    ),
    email,
    socialLinks:
      Array.isArray(s.socialLinks) && s.socialLinks.length > 0
        ? s.socialLinks
        : [
            {
              platform: "instagram",
              label: "Instagram",
              url: "https://instagram.com/arssan.io",
            },
            {
              platform: "x",
              label: "X",
              url: "https://x.com/arssan_co",
            },
            {
              platform: "facebook",
              label: "Facebook",
              url: "https://facebook.com/arssan.co",
            },
          ],
    headerNavItems,
    announcementBar: s.announcementBar?.enabled
      ? {
          enabled: true,
          text: pickLocale(s.announcementBar.text, locale),
          linkText: pickLocale(s.announcementBar.linkText, locale),
          linkHref: s.announcementBar.linkHref as string | undefined,
        }
      : undefined,
    sectionsVisibility: {
      showPartners: h.sectionsVisibility?.showPartners !== false,
      showProcess: h.sectionsVisibility?.showProcess !== false,
      showServices: h.sectionsVisibility?.showServices !== false,
      showPricing: h.sectionsVisibility?.showPricing !== false,
      showLatestPosts: h.sectionsVisibility?.showLatestPosts !== false,
    },
  };

  return { dict, siteConfig };
}

export async function getPackageBySlug(locale: Locale, slugOrAlias: string) {
  const { dict, siteConfig } = await getFullSiteData(locale);
  const normalized =
    slugOrAlias === "basic"
      ? "starter"
      : slugOrAlias === "pro"
      ? "professional"
      : slugOrAlias === "custom"
      ? "enterprise"
      : slugOrAlias;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pkg = dict.pricing.packages.find((p: any) => {
    if (p.slug === slugOrAlias || p.slug === normalized) return true;
    if (Array.isArray(p.aliases) && p.aliases.includes(slugOrAlias)) return true;
    return false;
  });

  return { pkg: pkg || null, dict, siteConfig };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPostSummary(raw: any, locale: Locale): BlogPostSummary {
  const categories: BlogCategoryItem[] = Array.isArray(raw.categories)
    ? raw.categories
        .filter(Boolean)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((c: any) => ({
          id: (c._id || c.slug) as string,
          slug: c.slug as string,
          title: pickLocale(c.title, locale, c.slug),
        }))
    : [];

  const author: BlogAuthorItem = raw.author
    ? {
        name: pickLocale(
          raw.author.name,
          locale,
          locale === "ar" ? "فريق أرسان الهندسي" : "Arssan Engineering Team"
        ),
        slug: raw.author.slug as string | undefined,
        role: pickLocale(
          raw.author.role,
          locale,
          locale === "ar" ? "تطوير المواقع والمنصات الرقمية" : "Web & Platform Engineering"
        ),
        bio: pickLocale(raw.author.bio, locale),
        avatarUrl: raw.author.avatarUrl as string | undefined,
        url: raw.author.url as string | undefined,
      }
    : {
        name: locale === "ar" ? "فريق أرسان الهندسي" : "Arssan Engineering Team",
        role:
          locale === "ar" ? "تطوير المواقع والمنصات الرقمية" : "Web & Platform Engineering",
      };

  const coverUrl = raw.coverImage?.asset?.url || raw.fallbackCoverUrl;

  return {
    id: (raw._id || raw.slug) as string,
    language: (raw.language as Locale) || locale,
    translationKey: raw.translationKey as string | undefined,
    title: raw.title as string,
    slug: raw.slug as string,
    excerpt: raw.excerpt as string,
    publishedAt: (raw.publishedAt as string) || new Date().toISOString(),
    updatedAt: raw.updatedAt as string | undefined,
    readingTimeMinutes: estimateReadingTime(
      raw.plainBody as string | undefined,
      raw.readingTimeMinutes as number | undefined
    ),
    featured: Boolean(raw.featured),
    coverImage: coverUrl
      ? {
          url: coverUrl as string,
          alt: (raw.coverImage?.alt || raw.title) as string,
          caption: raw.coverImage?.caption as string | undefined,
          lqip: raw.coverImage?.asset?.metadata?.lqip as string | undefined,
        }
      : undefined,
    categories,
    tags: Array.isArray(raw.tags) ? (raw.tags as string[]) : [],
    author,
  };
}

export async function getBlogIndexData(
  locale: Locale,
  options: { categorySlug?: string; page?: number; pageSize?: number } = {}
) {
  const categorySlug = options.categorySlug || "";
  const page = Math.max(1, options.page || 1);
  const pageSize = options.pageSize || 9;

  const [rawCategories, rawPosts] = await Promise.all([
    safeFetch<Array<Record<string, unknown>>>(BLOG_CATEGORIES_QUERY, {
      lang: locale,
    }),
    safeFetch<Array<Record<string, unknown>>>(BLOG_POSTS_QUERY, {
      lang: locale,
      category: categorySlug,
    }),
  ]);

  const categories: BlogCategoryItem[] = Array.isArray(rawCategories)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rawCategories.map((c: any) => ({
        id: c._id as string,
        slug: c.slug as string,
        title: pickLocale(c.title, locale, c.slug),
        description: pickLocale(c.description, locale),
        postCount: Number(c.postCount || 0),
      }))
    : [];

  const allPosts: BlogPostSummary[] = Array.isArray(rawPosts)
    ? rawPosts.map((p) => mapPostSummary(p, locale))
    : [];

  const featuredPost =
    !categorySlug && page === 1 && allPosts.length > 0
      ? allPosts.find((p) => p.featured) || allPosts[0]
      : null;

  const remainingPosts = featuredPost
    ? allPosts.filter((p) => p.slug !== featuredPost.slug)
    : allPosts;

  const totalPosts = remainingPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / pageSize));
  const startIdx = (page - 1) * pageSize;
  const paginatedPosts = remainingPosts.slice(startIdx, startIdx + pageSize);

  return {
    categories,
    featuredPost,
    posts: paginatedPosts,
    allPostsCount: allPosts.length,
    currentPage: page,
    totalPages,
    activeCategory:
      categories.find((c) => c.slug === categorySlug) || null,
  };
}

export async function getBlogPostBySlug(
  locale: Locale,
  slug: string
): Promise<BlogPostDetail | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await safeFetch<any>(BLOG_POST_BY_SLUG_QUERY, {
    lang: locale,
    slug,
  });

  if (!raw) return null;

  const summary = mapPostSummary(raw, locale);
  const body = Array.isArray(raw.body) ? raw.body : [];
  const headings = extractTocHeadings(body);

  const relatedPosts: BlogPostSummary[] = Array.isArray(raw.manualRelated)
    ? raw.manualRelated.filter(Boolean).map((p: unknown) => mapPostSummary(p, locale))
    : [];

  if (relatedPosts.length < 3) {
    const allInLang = await safeFetch<Array<Record<string, unknown>>>(
      BLOG_POSTS_QUERY,
      { lang: locale, category: "" }
    );
    if (Array.isArray(allInLang)) {
      const existingSlugs = new Set([
        slug,
        ...relatedPosts.map((r) => r.slug),
      ]);
      for (const candidate of allInLang) {
        const mapped = mapPostSummary(candidate, locale);
        if (!existingSlugs.has(mapped.slug)) {
          relatedPosts.push(mapped);
          existingSlugs.add(mapped.slug);
        }
        if (relatedPosts.length >= 3) break;
      }
    }
  }

  return {
    ...summary,
    body,
    headings,
    translation: raw.translation
      ? {
          language: raw.translation.language as Locale,
          title: raw.translation.title as string,
          slug: raw.translation.slug as string,
        }
      : null,
    relatedPosts: relatedPosts.slice(0, 3),
    seo: raw.seo || undefined,
  };
}

export async function getLatestBlogPosts(
  locale: Locale,
  limit = 3
): Promise<BlogPostSummary[]> {
  const rawPosts = await safeFetch<Array<Record<string, unknown>>>(
    BLOG_POSTS_QUERY,
    { lang: locale, category: "" }
  );
  if (!Array.isArray(rawPosts)) return [];
  return rawPosts.slice(0, limit).map((p) => mapPostSummary(p, locale));
}

export async function getAllPublishedPostsForSitemap() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await safeFetch<any[]>(ALL_PUBLISHED_POSTS_SITEMAP_QUERY);
  return Array.isArray(raw) ? raw : [];
}

export async function getProjectBySlug(locale: Locale, slug: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await safeFetch<any>(PROJECT_BY_SLUG_QUERY, { slug });
  if (!raw) return null;
  const isAr = locale === "ar";
  const body = isAr ? raw.caseStudyAr : raw.caseStudyEn;
  return {
    id: (raw.slug || raw._id) as string,
    slug: raw.slug as string,
    title: pickLocale(raw.title, locale),
    categoryKey: (raw.categoryKey as string) || "general",
    categoryLabel: pickLocale(raw.categoryTitle, locale),
    client: pickLocale(raw.client, locale),
    year: (raw.year as string) || "2026",
    url: (raw.displayUrl as string) || "",
    liveUrl:
      (raw.liveUrl as string) ||
      (raw.displayUrl ? `https://${raw.displayUrl}` : undefined),
    image:
      (raw.coverImage?.asset?.url as string) ||
      (raw.fallbackImagePath as string) ||
      undefined,
    description: pickLocale(raw.description, locale),
    metrics: {
      value: pickLocale(raw.metricValue, locale),
      label: pickLocale(raw.metricLabel, locale),
    },
    tags: Array.isArray(raw.tags)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        raw.tags.map((t: any) => pickLocale(t, locale)).filter(Boolean)
      : [],
    inquiryMessage: pickLocale(raw.inquiryMessage, locale),
    body: Array.isArray(body) ? body : [],
    headings: extractTocHeadings(body),
  };
}
