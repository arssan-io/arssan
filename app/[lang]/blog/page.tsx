import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getFullSiteData, getBlogIndexData } from "@/lib/sanity/loaders";
import { BlogIndexView } from "@/components/blog/BlogIndexView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const isAr = locale === "ar";
  const { dict } = await getFullSiteData(locale);

  const title = isAr
    ? "المدونة والمعرفة الرقمية | أرسان الكويت"
    : "Engineering & Design Blog | Arssan Kuwait";
  const description = dict.blog.subtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        ar: "/ar/blog",
        en: "/en/blog",
      },
      types: {
        "application/rss+xml": `/${locale}/blog/rss.xml`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/blog`,
      type: "website",
      images: [
        {
          url: dict.meta.ogImageUrl || "/images/og-image.png",
          width: 1201,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [dict.meta.ogImageUrl || "/images/og-image.png"],
    },
  };
}

export default async function BlogIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang } = await params;
  const sp = await searchParams;
  const locale = lang as Locale;
  const page = Number(sp?.page) > 1 ? Number(sp.page) : 1;

  const [{ dict, siteConfig }, blogData] = await Promise.all([
    getFullSiteData(locale),
    getBlogIndexData(locale, { page }),
  ]);

  return (
    <BlogIndexView
      lang={locale}
      categories={blogData.categories}
      activeCategory={null}
      featuredPost={blogData.featuredPost}
      posts={blogData.posts}
      currentPage={blogData.currentPage}
      totalPages={blogData.totalPages}
      whatsappUrl={siteConfig.whatsappUrl}
      dict={dict}
    />
  );
}
