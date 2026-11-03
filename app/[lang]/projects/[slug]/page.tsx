import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getFullSiteData, getProjectBySlug } from "@/lib/sanity/loaders";
import { PortableTextBody } from "@/components/blog/PortableTextBody";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const project = await getProjectBySlug(locale, slug);
  if (!project) return {};

  return {
    title: `${project.title} | Arssan`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const [project, { dict, siteConfig }] = await Promise.all([
    getProjectBySlug(locale, slug),
    getFullSiteData(locale),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-[100svh] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 bg-[#ffffff] text-[#0d0d0d] border-b border-[#f3f3f3]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-start">
        <div className="mb-6">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[64px] bg-[#f3f3f3] border border-[#e5e7eb] text-xs font-medium text-[#646f79] hover:text-[#0d0d0d] transition-colors"
          >
            <span className="rtl:rotate-180">←</span>
            <span>{dict.nav.projects}</span>
          </Link>
        </div>

        <header className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-[64px] bg-[#f3f3f3] border border-[#e5e7eb] text-xs font-medium text-[#0d0d0d]">
              {project.categoryLabel}
            </span>
            <span className="text-xs font-mono text-[#646f79]">
              {project.client} • {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] text-[#0d0d0d] leading-[1.2] mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#646f79] leading-[1.65] mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-[64px] bg-[#0d0e10] text-[#ffffff] text-sm font-medium hover:bg-[#646f79] transition-colors"
              >
                <span>{dict.projects_page.cta.visit_btn}</span>
                <span>↗</span>
              </a>
            )}
            <a
              href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(
                project.inquiryMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-[64px] bg-[#f3f3f3] text-[#0d0d0d] border border-[#e5e7eb] text-sm font-medium hover:bg-[#e5e7eb] transition-colors"
            >
              <span>{dict.projects_page.cta.inquire_btn}</span>
              <span className="rtl:rotate-180">→</span>
            </a>
          </div>
        </header>

        {project.image && (
          <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-[#f3f3f3] border border-[#e6e8eb] mb-10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover object-top"
            />
          </div>
        )}

        {project.body.length > 0 && (
          <PortableTextBody
            value={project.body}
            lang={locale}
            articleSlug={project.slug}
          />
        )}
      </div>
    </article>
  );
}
