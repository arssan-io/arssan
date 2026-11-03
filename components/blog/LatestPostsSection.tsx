import Link from "next/link";
import { AnimateInView } from "@/components/AnimateInView";
import type { Locale } from "@/lib/i18n";
import type { BlogPostSummary } from "@/lib/sanity/loaders";
import { PostCard } from "./PostCard";

interface LatestPostsSectionProps {
  lang: Locale;
  posts: BlogPostSummary[];
  labels: {
    latest_home_badge: string;
    latest_home_title: string;
    latest_home_cta: string;
    min_read: string;
    read_article: string;
  };
}

export function LatestPostsSection({
  lang,
  posts,
  labels,
}: LatestPostsSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section
      id="blog-preview"
      className="relative py-14 sm:py-18 md:py-24 bg-[#ffffff] text-[#0d0d0d] overflow-hidden border-b border-[#f3f3f3]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <AnimateInView className="mb-8 sm:mb-10 md:mb-14">
          <div className="flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-[64px] bg-[#f3f3f3] border border-[#e5e7eb] text-[12px] sm:text-[13px] font-medium text-[#646f79] mb-4 sm:mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>{labels.latest_home_badge}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4 md:gap-8">
              <h2 className="text-2xl sm:text-4xl md:text-[2.75rem] font-normal tracking-[-0.02em] text-[#0d0d0d] leading-[1.2]">
                {labels.latest_home_title}
              </h2>

              <Link
                href={`/${lang}/blog`}
                className="group inline-flex items-center gap-2 h-11 px-5 rounded-[64px] bg-[#f3f3f3] hover:bg-[#0d0e10] text-[#0d0d0d] hover:text-[#ffffff] border border-[#e5e7eb] text-sm font-medium transition-all duration-200 self-start md:self-auto"
              >
                <span>{labels.latest_home_cta}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180">
                  →
                </span>
              </Link>
            </div>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {posts.slice(0, 3).map((post, idx) => (
            <AnimateInView key={post.id} variant="fadeUp" delay={idx * 0.06} className="h-full">
              <PostCard
                post={post}
                lang={lang}
                index={idx}
                labels={{
                  min_read: labels.min_read,
                  read_article: labels.read_article,
                }}
              />
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
