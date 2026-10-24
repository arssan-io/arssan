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

  return {
    title: isAr
      ? "أعمالنا ومشاريعنا السابقة | أرسان الكويت"
      : "Selected Projects & Portfolio | Arssan Kuwait",
    description: dict.projects_page?.subtitle || dict.meta.description,
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
