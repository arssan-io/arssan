import type { Locale } from "@/lib/i18n";
import { getFullSiteData, getLatestBlogPosts } from "@/lib/sanity/loaders";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { LatestPostsSection } from "@/components/blog/LatestPostsSection";

export function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "en" }];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [{ dict, siteConfig }, latestPosts] = await Promise.all([
    getFullSiteData(locale),
    getLatestBlogPosts(locale, 3),
  ]);

  const v = siteConfig.sectionsVisibility;

  return (
    <>
      <Hero lang={locale} dict={dict} whatsappUrl={siteConfig.whatsappUrl} />
      {v.showPartners && <Partners lang={locale} dict={dict} />}
      {v.showProcess && <Process dict={dict} />}
      {v.showServices && <Services dict={dict} />}
      {v.showPricing && (
        <Pricing lang={locale} dict={dict} whatsappUrl={siteConfig.whatsappUrl} />
      )}
      {v.showLatestPosts && (
        <LatestPostsSection
          lang={locale}
          posts={latestPosts}
          labels={{
            latest_home_badge: dict.blog.latest_home_badge,
            latest_home_title: dict.blog.latest_home_title,
            latest_home_cta: dict.blog.latest_home_cta,
            min_read: dict.blog.min_read,
            read_article: dict.blog.read_article,
          }}
        />
      )}
    </>
  );
}
