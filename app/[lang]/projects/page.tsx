import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { ProjectsView } from "@/components/ProjectsView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const isAr = locale === "ar";
  const dict = await getDictionary(locale);

  const title = isAr
    ? "مشاريعنا | أرسان"
    : "Projects | Arssan";
  const description = dict.projects_page?.subtitle || dict.meta.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/projects`,
      images: [
        {
          url: "/images/og-image.png",
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
      images: ["/images/og-image.png"],
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <ProjectsView lang={locale} dict={dict} />;
}
