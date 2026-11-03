import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteName,
    parentOrgName,
    parentOrgUrl,
    parentOrgBadge,
    "logoUrl": logo.asset->url,
    whatsappNumber,
    whatsappDisplay,
    defaultWhatsappMessage,
    whatsappTooltip,
    email,
    socialLinks[]{
      platform,
      label,
      url
    },
    navLabels,
    headerNavItems[]{
      label,
      href,
      visible
    },
    footerBio,
    footerDescription,
    footerRights,
    footerLinksTitle,
    footerServicesTitle,
    footerStatusText,
    preFooterCta,
    announcementBar,
    metaTitle,
    metaDescription,
    "ogImageUrl": ogImage.asset->url
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    sectionsVisibility,
    hero{
      ...,
      "backgroundImageUrl": backgroundImage.asset->url
    },
    partnersSection,
    processSection,
    servicesSection
  }
`);

export const PARTNERS_QUERY = defineQuery(`
  *[_type == "partner" && coalesce(visible, true) == true] | order(orderRank asc){
    _id,
    name,
    role,
    "logoUrl": logo.asset->url,
    fallbackLogoPath,
    url
  }
`);

export const PRICING_SECTION_QUERY = defineQuery(`
  *[_type == "pricingSection"][0]{
    badge,
    title,
    subtitle,
    includedDeliverablesLabel,
    specialOfferBadge,
    mostPopularBadge,
    assuranceBullets,
    customQuoteCta
  }
`);

export const PACKAGES_QUERY = defineQuery(`
  *[_type == "package" && coalesce(visible, true) == true] | order(orderRank asc){
    _id,
    name,
    "slug": slug.current,
    aliases,
    popular,
    isCustomQuote,
    price,
    customPriceLabel,
    originalPrice,
    currency,
    period,
    description,
    cta,
    inquiryMessage,
    features,
    seo{
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url,
      canonicalUrl,
      noIndex
    }
  }
`);

export const PROJECTS_PAGE_QUERY = defineQuery(`
  *[_type == "projectsPage"][0]{
    badge,
    title,
    subtitle,
    allFilterLabel,
    stats[]{
      value,
      label
    },
    cta
  }
`);

export const PROJECT_CATEGORIES_QUERY = defineQuery(`
  *[_type == "projectCategory"] | order(orderRank asc){
    _id,
    "key": key.current,
    title
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && coalesce(visible, true) == true] | order(orderRank asc){
    _id,
    "slug": slug.current,
    title,
    "categoryKey": category->key.current,
    "categoryTitle": category->title,
    client,
    year,
    displayUrl,
    liveUrl,
    description,
    coverImage{
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions }
      },
      hotspot,
      crop
    },
    fallbackImagePath,
    metricValue,
    metricLabel,
    tags,
    inquiryMessage,
    featured,
    "hasCaseStudyAr": count(caseStudyAr) > 0,
    "hasCaseStudyEn": count(caseStudyEn) > 0
  }
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    "slug": slug.current,
    title,
    "categoryKey": category->key.current,
    "categoryTitle": category->title,
    client,
    year,
    displayUrl,
    liveUrl,
    description,
    coverImage{
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions }
      },
      hotspot,
      crop
    },
    fallbackImagePath,
    metricValue,
    metricLabel,
    tags,
    inquiryMessage,
    caseStudyAr,
    caseStudyEn
  }
`);

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "blogCategory"] | order(title.en asc){
    _id,
    "slug": slug.current,
    title,
    description,
    "postCount": count(*[_type == "post" && language == $lang && publishedAt <= now() && references(^._id)])
  }
`);

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "post" && language == $lang && publishedAt <= now() && ($category == "" || $category in categories[]->slug.current)] | order(featured desc, publishedAt desc){
    _id,
    language,
    translationKey,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    updatedAt,
    readingTimeMinutes,
    featured,
    "plainBody": pt::text(body),
    coverImage{
      alt,
      caption,
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions }
      },
      hotspot,
      crop
    },
    categories[]->{
      _id,
      "slug": slug.current,
      title
    },
    tags,
    author->{
      _id,
      "slug": slug.current,
      name,
      role,
      "avatarUrl": avatar.asset->url
    }
  }
`);

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && language == $lang && slug.current == $slug][0]{
    _id,
    language,
    translationKey,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    updatedAt,
    readingTimeMinutes,
    featured,
    "plainBody": pt::text(body),
    body[]{
      ...,
      _type == "figureImage" => {
        ...,
        asset->{
          _id,
          url,
          metadata{ lqip, dimensions }
        }
      }
    },
    coverImage{
      alt,
      caption,
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions }
      },
      hotspot,
      crop
    },
    categories[]->{
      _id,
      "slug": slug.current,
      title
    },
    tags,
    author->{
      _id,
      "slug": slug.current,
      name,
      role,
      bio,
      url,
      "avatarUrl": avatar.asset->url
    },
    "translation": *[_type == "post" && defined(^.translationKey) && translationKey == ^.translationKey && language != ^.language && publishedAt <= now()][0]{
      language,
      title,
      "slug": slug.current
    },
    "manualRelated": relatedPosts[]->{
      _id,
      language,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readingTimeMinutes,
      "plainBody": pt::text(body),
      coverImage{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions } }
      },
      categories[]->{ _id, "slug": slug.current, title },
      author->{ name, role, "avatarUrl": avatar.asset->url }
    },
    seo{
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url,
      canonicalUrl,
      noIndex
    }
  }
`);

export const ALL_PUBLISHED_POSTS_SITEMAP_QUERY = defineQuery(`
  *[_type == "post" && publishedAt <= now()] | order(publishedAt desc){
    _id,
    language,
    translationKey,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    updatedAt
  }
`);
