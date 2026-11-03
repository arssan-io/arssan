import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { BlogPostSummary } from "@/lib/sanity/loaders";

export function formatBlogDate(isoDate: string, lang: Locale): string {
  try {
    const d = new Date(isoDate);
    return new Intl.DateTimeFormat(lang === "ar" ? "ar-KW" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  } catch {
    return isoDate.slice(0, 10);
  }
}

interface FeaturedPostCardProps {
  post: BlogPostSummary;
  lang: Locale;
  labels: {
    featured_badge: string;
    min_read: string;
    read_article: string;
  };
}

export function FeaturedPostCard({
  post,
  lang,
  labels,
}: FeaturedPostCardProps) {
  const primaryCategory = post.categories[0];
  const href = `/${lang}/blog/${post.slug}`;

  return (
    <article className="group relative rounded-[20px] bg-[#ffffff] border border-[#e6e8eb] p-4 sm:p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#646f79]/40 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-300 text-start">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Image Column (7 cols) */}
        <div className="lg:col-span-7">
          <Link
            href={href}
            className="block relative aspect-[16/10] w-full rounded-[16px] overflow-hidden bg-[#f3f3f3] border border-[#eceeef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d0e10]"
          >
            {post.coverImage?.url ? (
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 680px"
                placeholder={post.coverImage.lqip ? "blur" : "empty"}
                blurDataURL={post.coverImage.lqip}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            ) : (
              <div className="absolute inset-0 bg-asana-grid flex flex-col justify-between p-6 sm:p-8 bg-[#0d0e10] text-[#ffffff]">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-[64px] bg-white/10 border border-white/15 text-xs font-mono text-white/80">
                    ARSSAN JOURNAL
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-light text-white/90 line-clamp-2">
                  {post.title}
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* Content Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-5">
          <div className="space-y-3 sm:space-y-4">
            {/* Top Pills: Featured + Category + Reading Time */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{labels.featured_badge}</span>
              </span>

              {primaryCategory && (
                <Link
                  href={`/${lang}/blog/category/${primaryCategory.slug}`}
                  className="px-3 py-1 rounded-[64px] bg-[#f3f3f3] hover:bg-[#e8eaed] border border-[#e5e7eb] text-xs font-medium text-[#0d0d0d] transition-colors"
                >
                  {primaryCategory.title}
                </Link>
              )}

              <span className="text-xs font-mono text-[#646f79] ms-auto">
                {post.readingTimeMinutes} {labels.min_read}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-[#0d0d0d] leading-[1.25]">
              <Link
                href={href}
                className="hover:text-[#646f79] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d0e10]"
              >
                {post.title}
              </Link>
            </h2>

            {/* Excerpt */}
            <p className="text-[15px] sm:text-base text-[#646f79] leading-[1.65] line-clamp-3 font-normal">
              {post.excerpt}
            </p>
          </div>

          {/* Author & CTA Row */}
          <div className="pt-4 border-t border-[#f3f3f3] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#f3f3f3] border border-[#e5e7eb] flex items-center justify-center text-xs font-semibold text-[#0d0d0d] overflow-hidden flex-shrink-0">
                {post.author.avatarUrl ? (
                  <Image
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{post.author.name.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-[13px] font-medium text-[#0d0d0d] truncate">
                  {post.author.name}
                </div>
                <time
                  dateTime={post.publishedAt}
                  className="text-[11px] sm:text-xs text-[#646f79] block"
                >
                  {formatBlogDate(post.publishedAt, lang)}
                </time>
              </div>
            </div>

            <Link
              href={href}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-xs sm:text-[13px] font-medium hover:bg-[#646f79] transition-colors flex-shrink-0"
            >
              <span>{labels.read_article}</span>
              <span className="rtl:rotate-180">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

interface PostCardProps {
  post: BlogPostSummary;
  lang: Locale;
  index?: number;
  labels: {
    min_read: string;
    read_article: string;
  };
}

export function PostCard({ post, lang, index = 0, labels }: PostCardProps) {
  const primaryCategory = post.categories[0];
  const href = `/${lang}/blog/${post.slug}`;

  return (
    <article className="group h-full rounded-[20px] bg-[#ffffff] border border-[#e6e8eb] p-4 sm:p-5 flex flex-col justify-between text-start transition-all duration-300 md:hover:-translate-y-1 hover:border-[#646f79]/40 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.02)]">
      <div>
        {/* 16:9 Cover Image */}
        <Link
          href={href}
          className="block relative aspect-[16/10] w-full rounded-[14px] overflow-hidden bg-[#f3f3f3] border border-[#eceeef] mb-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d0e10]"
        >
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px"
              placeholder={post.coverImage.lqip ? "blur" : "empty"}
              blurDataURL={post.coverImage.lqip}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-[#0d0e10] text-[#ffffff] p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                <span>0{index + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-base font-light text-white/90 line-clamp-2">
                {post.title}
              </div>
            </div>
          )}
        </Link>

        {/* Category + Reading Time */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {primaryCategory ? (
            <Link
              href={`/${lang}/blog/category/${primaryCategory.slug}`}
              className="inline-flex items-center px-2.5 py-0.5 rounded-[64px] bg-[#f3f3f3] hover:bg-[#e8eaed] border border-[#e5e7eb] text-[11px] sm:text-xs font-medium text-[#0d0d0d] transition-colors"
            >
              {primaryCategory.title}
            </Link>
          ) : (
            <span className="text-xs font-mono text-[#646f79]">
              0{index + 1}
            </span>
          )}

          <span className="text-xs font-mono text-[#646f79]">
            {post.readingTimeMinutes} {labels.min_read}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[#0d0d0d] mb-2 leading-[1.35] line-clamp-2">
          <Link
            href={href}
            className="hover:text-[#646f79] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d0e10]"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-[14px] text-[#646f79] leading-[1.65] mb-4 line-clamp-3 font-normal">
          {post.excerpt}
        </p>
      </div>

      {/* Bottom Footer: Date + Read Arrow */}
      <div className="pt-3.5 border-t border-[#f3f3f3] flex items-center justify-between gap-2 text-xs text-[#646f79]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-medium text-[#0d0d0d] truncate">
            {post.author.name}
          </span>
          <span>•</span>
          <time dateTime={post.publishedAt} className="flex-shrink-0">
            {formatBlogDate(post.publishedAt, lang)}
          </time>
        </div>

        <Link
          href={href}
          aria-label={`${labels.read_article}: ${post.title}`}
          className="inline-flex items-center gap-1 font-medium text-[#0d0d0d] group-hover:text-[#646f79] transition-colors flex-shrink-0"
        >
          <span>{labels.read_article}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
