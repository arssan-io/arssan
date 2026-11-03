import Link from "next/link";
import { AnimateInView } from "@/components/AnimateInView";
import type { Locale } from "@/lib/i18n";
import type {
  BlogCategoryItem,
  BlogPostSummary,
} from "@/lib/sanity/loaders";
import { FeaturedPostCard, PostCard } from "./PostCard";

interface BlogIndexViewProps {
  lang: Locale;
  categories: BlogCategoryItem[];
  activeCategory: BlogCategoryItem | null;
  featuredPost: BlogPostSummary | null;
  posts: BlogPostSummary[];
  currentPage: number;
  totalPages: number;
  whatsappUrl: string;
  dict: {
    nav: {
      home: string;
      pricing: string;
    };
    blog: {
      badge: string;
      title: string;
      subtitle: string;
      all_filter: string;
      featured_badge: string;
      min_read: string;
      read_article: string;
      empty_title: string;
      empty_subtitle: string;
      prev_page: string;
      next_page: string;
      cta: {
        badge: string;
        title: string;
        description: string;
        button: string;
        packages_button: string;
      };
    };
  };
}

export function BlogIndexView({
  lang,
  categories,
  activeCategory,
  featuredPost,
  posts,
  currentPage,
  totalPages,
  whatsappUrl,
  dict,
}: BlogIndexViewProps) {
  const t = dict.blog;
  const basePath = activeCategory
    ? `/${lang}/blog/category/${activeCategory.slug}`
    : `/${lang}/blog`;

  return (
    <div className="min-h-[100svh] pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-[#ffffff] text-[#0d0d0d] overflow-hidden border-b border-[#f3f3f3]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Back Breadcrumb */}
        <AnimateInView className="mb-4 sm:mb-6">
          <Link
            href={activeCategory ? `/${lang}/blog` : `/${lang}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[64px] bg-[#f3f3f3] border border-[#e5e7eb] text-xs font-medium text-[#646f79] hover:text-[#0d0d0d] hover:bg-[#e8eaed] transition-all duration-200 group"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180">
              ←
            </span>
            <span>{activeCategory ? t.all_filter : dict.nav.home}</span>
          </Link>
        </AnimateInView>

        {/* Page Hero Header */}
        <AnimateInView className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col items-start text-start max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-[64px] bg-[#f3f3f3] border border-[#e5e7eb] text-[12px] sm:text-[13px] font-medium text-[#646f79] mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] text-[#0d0d0d] leading-[1.2] mb-3 sm:mb-4">
              {activeCategory ? activeCategory.title : t.title}
            </h1>

            <p className="text-[14px] sm:text-base text-[#646f79] leading-[1.65] font-normal">
              {activeCategory?.description || t.subtitle}
            </p>
          </div>
        </AnimateInView>

        {/* Crawlable Category Filter Pills */}
        {categories.length > 0 && (
          <AnimateInView delay={0.05} className="mb-8 sm:mb-10">
            <nav
              aria-label="Blog Categories"
              className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none text-start"
            >
              <Link
                href={`/${lang}/blog`}
                className={`flex-shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[64px] text-xs sm:text-[13px] font-medium transition-all duration-200 ${
                  !activeCategory
                    ? "bg-[#0d0e10] text-[#ffffff] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                    : "bg-[#f3f3f3] text-[#646f79] hover:text-[#0d0d0d] hover:bg-[#e8eaed]"
                }`}
              >
                {t.all_filter}
              </Link>

              {categories.map((cat) => {
                const isActive = activeCategory?.slug === cat.slug;
                return (
                  <Link
                    key={cat.slug}
                    href={`/${lang}/blog/category/${cat.slug}`}
                    className={`flex-shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[64px] text-xs sm:text-[13px] font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#0d0e10] text-[#ffffff] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                        : "bg-[#f3f3f3] text-[#646f79] hover:text-[#0d0d0d] hover:bg-[#e8eaed]"
                    }`}
                  >
                    <span>{cat.title}</span>
                  </Link>
                );
              })}
            </nav>
          </AnimateInView>
        )}

        {/* Featured Article Hero Card */}
        {featuredPost && (
          <AnimateInView delay={0.08} className="mb-8 sm:mb-12">
            <FeaturedPostCard
              post={featuredPost}
              lang={lang}
              labels={{
                featured_badge: t.featured_badge,
                min_read: t.min_read,
                read_article: t.read_article,
              }}
            />
          </AnimateInView>
        )}

        {/* Articles Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {posts.map((post, idx) => (
              <AnimateInView
                key={post.id}
                variant="fadeUp"
                delay={idx * 0.05}
                className="h-full"
              >
                <PostCard
                  post={post}
                  lang={lang}
                  index={idx}
                  labels={{
                    min_read: t.min_read,
                    read_article: t.read_article,
                  }}
                />
              </AnimateInView>
            ))}
          </div>
        ) : (
          !featuredPost && (
            <div className="rounded-[20px] bg-[#f3f3f3] border border-[#e5e7eb] p-10 sm:p-14 text-center max-w-xl mx-auto my-8">
              <div className="w-10 h-10 rounded-full bg-[#ffffff] border border-[#e5e7eb] mx-auto mb-4 flex items-center justify-center font-mono text-sm text-[#0d0d0d]">
                00
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-[#0d0d0d] mb-2">
                {t.empty_title}
              </h2>
              <p className="text-sm sm:text-[15px] text-[#646f79] mb-6 leading-[1.6]">
                {t.empty_subtitle}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-sm font-medium hover:bg-[#646f79] transition-colors"
              >
                <span>{t.cta.button}</span>
                <span className="rtl:rotate-180">→</span>
              </a>
            </div>
          )
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-10 sm:mt-14 flex items-center justify-center gap-2"
          >
            {currentPage > 1 && (
              <Link
                href={
                  currentPage === 2
                    ? basePath
                    : `${basePath}?page=${currentPage - 1}`
                }
                className="h-10 px-4 rounded-[64px] bg-[#f3f3f3] hover:bg-[#e5e7eb] text-xs font-medium text-[#0d0d0d] inline-flex items-center"
              >
                {t.prev_page}
              </Link>
            )}

            <span className="px-4 py-2 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-xs font-mono">
              {currentPage} / {totalPages}
            </span>

            {currentPage < totalPages && (
              <Link
                href={`${basePath}?page=${currentPage + 1}`}
                className="h-10 px-4 rounded-[64px] bg-[#f3f3f3] hover:bg-[#e5e7eb] text-xs font-medium text-[#0d0d0d] inline-flex items-center"
              >
                {t.next_page}
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
