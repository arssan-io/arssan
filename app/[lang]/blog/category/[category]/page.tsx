import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getFullSiteData, getBlogIndexData } from "@/lib/sanity/loaders";
import { BlogIndexView } from "@/components/blog/BlogIndexView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}): Promise<Metadata> {
  const { lang, category } = await params;
  const locale = lang as Locale;
  const isAr = locale === "ar";
  const [{ dict }, blogData] = await Promise.all([
    getFullSiteData(locale),
    getBlogIndexData(locale, { categorySlug: category }),
  ]);

  const cat = blogData.activeCategory;
  const title = cat
    ? `${cat.title} | ${isAr ? "مدونة أرسان" : "Arssan Blog"}`
    : dict.meta.title;
  const description = cat?.description || dict.blog.subtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog/category/${category}`,
      languages: {
        ar: `/ar/blog/category/${category}`,
        en: `/en/blog/category/${category}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/blog/category/${category}`,
      type: "website",
    },
  };
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang, category } = await params;
  const sp = await searchParams;
  const locale = lang as Locale;
  const page = Number(sp?.page) > 1 ? Number(sp.page) : 1;

  const [{ dict, siteConfig }, blogData] = await Promise.all([
    getFullSiteData(locale),
    getBlogIndexData(locale, { categorySlug: category, page }),
  ]);

  if (!blogData.activeCategory && blogData.allPostsCount === 0) {
    notFound();
  }

  return (
    <BlogIndexView
      lang={locale}
      categories={blogData.categories}
      activeCategory={
        blogData.activeCategory || {
          id: category,
          slug: category,
          title: category,
        }
      }
      featuredPost={null}
      posts={blogData.posts}
      currentPage={blogData.currentPage}
      totalPages={blogData.totalPages}
      whatsappUrl={siteConfig.whatsappUrl}
      dict={dict}
    />
  );
}
