import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_SITE_URL } from "@/lib/agent-discovery";
import {
  getFullSiteData,
  getBlogPostBySlug,
  getAllPublishedPostsForSitemap,
} from "@/lib/sanity/loaders";
import { formatBlogDate, PostCard } from "@/components/blog/PostCard";
import { PortableTextBody } from "@/components/blog/PortableTextBody";
import { TableOfContents } from "@/components/blog/TableOfContents";
import {
  ReadingProgress,
  ArticleViewTracker,
  ShareBar,
} from "@/components/blog/ArticleChrome";

export async function generateStaticParams() {
  const posts = await getAllPublishedPostsForSitemap();
  if (!posts || posts.length === 0) return [];
  return posts
    .filter((p) => p?.slug && p?.language)
    .map((p) => ({
      lang: p.language as string,
      slug: p.slug as string,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const isAr = locale === "ar";
  const [post, { dict }] = await Promise.all([
    getBlogPostBySlug(locale, slug),
    getFullSiteData(locale),
  ]);

  if (!post) {
    return {
      title: dict.meta.title,
      description: dict.meta.description,
    };
  }

  const title =
    post.seo?.metaTitle ||
    `${post.title} | ${isAr ? "مدونة أرسان" : "Arssan Blog"}`;
  const description = post.seo?.metaDescription || post.excerpt;
  const ogImage =
    post.seo?.ogImageUrl ||
    post.coverImage?.url ||
    dict.meta.ogImageUrl ||
    "/images/og-image.png";

  const languages: Record<string, string> = {
    [locale]: `/${locale}/blog/${post.slug}`,
  };
  if (post.translation) {
    languages[post.translation.language] =
      `/${post.translation.language}/blog/${post.translation.slug}`;
  }

  return {
    title,
    description,
    robots: post.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: post.seo?.canonicalUrl || `/${locale}/blog/${post.slug}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.coverImage?.alt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;

  const [post, { dict }] = await Promise.all([
    getBlogPostBySlug(locale, slug),
    getFullSiteData(locale),
  ]);

  if (!post) {
    notFound();
  }

  const t = dict.blog;
  const primaryCategory = post.categories[0];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      inLanguage: locale,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      image: post.coverImage?.url
        ? [post.coverImage.url]
        : [`${DEFAULT_SITE_URL}/images/og-image.png`],
      author: {
        "@type": "Person",
        name: post.author.name,
        url: post.author.url || DEFAULT_SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "Arssan Studio | أرسان",
        url: DEFAULT_SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${DEFAULT_SITE_URL}/images/Logo.svg`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${DEFAULT_SITE_URL}/${locale}/blog/${post.slug}`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: dict.nav.home,
          item: `${DEFAULT_SITE_URL}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: dict.nav.blog || "Blog",
          item: `${DEFAULT_SITE_URL}/${locale}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `${DEFAULT_SITE_URL}/${locale}/blog/${post.slug}`,
        },
      ],
    },
  ];

  return (
    <article className="min-h-[100svh] pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-20 bg-[#ffffff] text-[#0d0d0d] border-b border-[#f3f3f3]">
      <ReadingProgress />
      <ArticleViewTracker
        slug={post.slug}
        title={post.title}
        language={locale}
        category={primaryCategory?.slug}
        readingTime={post.readingTimeMinutes}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Top Navigation Row: Back to Blog + Category Pill + Translation Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[64px] bg-[#f3f3f3] border border-[#e5e7eb] text-xs font-medium text-[#646f79] hover:text-[#0d0d0d] hover:bg-[#e8eaed] transition-all duration-200 group"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180">
                ←
              </span>
              <span>{t.back_to_blog}</span>
            </Link>

            {post.categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${locale}/blog/category/${cat.slug}`}
                className="px-3.5 py-1.5 rounded-[64px] bg-[#ffffff] border border-[#e5e7eb] text-xs font-medium text-[#0d0d0d] hover:bg-[#f3f3f3] transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>

          {post.translation && (
            <Link
              href={`/${post.translation.language}/blog/${post.translation.slug}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-xs font-medium hover:bg-[#646f79] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{t.switch_language_prompt}</span>
            </Link>
          )}
        </div>

        {/* Article Header (Asana Display Scale) */}
        <header className="max-w-4xl mb-8 sm:mb-10 text-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] text-[#0d0d0d] leading-[1.2] mb-4 sm:mb-5">
            {post.title}
          </h1>

          <p className="text-[16px] sm:text-lg md:text-xl text-[#646f79] leading-[1.65] mb-6 sm:mb-8 font-normal">
            {post.excerpt}
          </p>

          {/* Author & Reading Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 rounded-[20px] bg-[#f3f3f3] border border-[#e6e8eb]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffffff] border border-[#e5e7eb] flex items-center justify-center text-sm font-semibold text-[#0d0d0d] overflow-hidden flex-shrink-0">
                {post.author.avatarUrl ? (
                  <Image
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{post.author.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-[#0d0d0d]">
                  {post.author.name}
                </div>
                <div className="text-xs text-[#646f79]">{post.author.role}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#646f79] font-mono">
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt, locale)}
              </time>
              <span>•</span>
              <span className="px-2.5 py-1 rounded-[64px] bg-[#ffffff] border border-[#e5e7eb] text-[#0d0d0d] font-medium">
                {post.readingTimeMinutes} {t.min_read}
              </span>
            </div>
          </div>
        </header>

        {/* Cover Image (16:9, 20px radius) */}
        {post.coverImage?.url && (
          <figure className="mb-10 sm:mb-14">
            <div className="relative aspect-[16/9] max-h-[540px] w-full rounded-[20px] overflow-hidden bg-[#f3f3f3] border border-[#e6e8eb] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.06)]">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                placeholder={post.coverImage.lqip ? "blur" : "empty"}
                blurDataURL={post.coverImage.lqip}
                className="object-cover"
              />
            </div>
            {post.coverImage.caption && (
              <figcaption className="mt-2.5 text-center text-xs text-[#646f79]">
                {post.coverImage.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Main 2-Column Editorial Layout: Sticky TOC + 68ch Reading Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sidebar TOC (4 cols on desktop) */}
          <aside className="lg:col-span-4 lg:order-2 w-full">
            <TableOfContents
              headings={post.headings}
              label={t.on_this_page}
            />
          </aside>

          {/* Article Body Column (8 cols on desktop) */}
          <div className="lg:col-span-8 lg:order-1 min-w-0 text-start">
            <PortableTextBody
              value={post.body}
              lang={locale}
              articleSlug={post.slug}
            />

            {/* Topic Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-[#f3f3f3] flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-[64px] bg-[#f3f3f3] border border-[#e5e7eb] text-xs font-medium text-[#646f79]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share Bar */}
            <div className="mt-8">
              <ShareBar
                slug={post.slug}
                title={post.title}
                labels={{
                  share_article: t.share_article,
                  copy_link: t.copy_link,
                  link_copied: t.link_copied,
                }}
              />
            </div>

            {/* Author Bio Card */}
            {post.author.bio && (
              <div className="mt-8 rounded-[20px] bg-[#f3f3f3] border border-[#e6e8eb] p-6 sm:p-7 flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ffffff] border border-[#e5e7eb] flex items-center justify-center text-base font-semibold text-[#0d0d0d] overflow-hidden flex-shrink-0">
                  {post.author.avatarUrl ? (
                    <Image
                      src={post.author.avatarUrl}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{post.author.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#646f79] mb-1">
                    {t.written_by}
                  </div>
                  <div className="text-base font-medium text-[#0d0d0d] mb-1">
                    {post.author.name}
                  </div>
                  <p className="text-sm text-[#646f79] leading-[1.6]">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Articles Section */}
        {post.relatedPosts.length > 0 && (
          <section className="mt-16 sm:mt-20 pt-12 border-t border-[#f3f3f3] text-start">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#0d0d0d]">
                  {t.related_title}
                </h2>
                <p className="text-sm text-[#646f79] mt-1">
                  {t.related_subtitle}
                </p>
              </div>
              <Link
                href={`/${locale}/blog`}
                className="text-sm font-medium text-[#0d0d0d] hover:text-[#646f79] inline-flex items-center gap-1.5"
              >
                <span>{t.all_filter}</span>
                <span className="rtl:rotate-180">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {post.relatedPosts.map((rel, idx) => (
                <PostCard
                  key={rel.id}
                  post={rel}
                  lang={locale}
                  index={idx}
                  labels={{
                    min_read: t.min_read,
                    read_article: t.read_article,
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
