"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { slugifyHeading } from "@/lib/sanity/types";
import { trackBlogCtaClick } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

function CodeBlockRenderer({
  value,
  isAr,
}: {
  value: { code?: string; language?: string; filename?: string };
  isAr: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const code = value?.code || "";
  const lang = value?.language || "code";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div
      dir="ltr"
      className="my-7 rounded-[16px] bg-[#0d0e10] text-[#ffffff] border border-[#22252a] overflow-hidden shadow-[0_8px_24px_-6px_rgba(0,0,0,0.16)] text-left"
    >
      <div className="px-4 py-2.5 bg-[#16181c] border-b border-white/10 flex items-center justify-between gap-3 text-xs font-mono text-white/70">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="truncate font-medium text-white/90">
            {value.filename || lang.toUpperCase()}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="px-2.5 py-1 rounded-[64px] bg-white/10 hover:bg-white/20 text-[11px] font-medium text-white transition-colors cursor-pointer"
        >
          {copied
            ? isAr
              ? "تم النسخ ✓"
              : "Copied ✓"
            : isAr
            ? "نسخ الكود"
            : "Copy"}
        </button>
      </div>

      <pre className="p-4 sm:p-5 overflow-x-auto text-[13px] sm:text-sm font-mono leading-[1.65] text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

interface PortableTextBodyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[];
  lang: Locale;
  articleSlug: string;
}

export function PortableTextBody({
  value,
  lang,
  articleSlug,
}: PortableTextBodyProps) {
  const isAr = lang === "ar";
  const seenHeadings = new Map<string, number>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getHeadingId = (children: any) => {
    const rawText = Array.isArray(children)
      ? children.map((c) => (typeof c === "string" ? c : c?.props?.text || "")).join("")
      : String(children || "");
    const base = slugifyHeading(rawText);
    const count = seenHeadings.get(base) || 0;
    seenHeadings.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-[17px] sm:text-[18px] text-[#0d0d0d] leading-[1.78] mb-5 font-normal">
          {children}
        </p>
      ),
      h2: ({ children, value: blockValue }) => {
        const plain =
          blockValue?.children
            ?.map((c) => ("text" in c && typeof c.text === "string" ? c.text : ""))
            .join("") || "";
        const id = getHeadingId([plain]);
        return (
          <h2
            id={id}
            className="scroll-mt-28 text-2xl sm:text-[1.75rem] font-normal tracking-[-0.02em] text-[#0d0d0d] mt-11 mb-4 leading-[1.28] pt-2 border-t border-[#f3f3f3]"
          >
            {children}
          </h2>
        );
      },
      h3: ({ children, value: blockValue }) => {
        const plain =
          blockValue?.children
            ?.map((c) => ("text" in c && typeof c.text === "string" ? c.text : ""))
            .join("") || "";
        const id = getHeadingId([plain]);
        return (
          <h3
            id={id}
            className="scroll-mt-28 text-xl sm:text-[1.35rem] font-medium tracking-[-0.01em] text-[#0d0d0d] mt-8 mb-3 leading-[1.35]"
          >
            {children}
          </h3>
        );
      },
      h4: ({ children }) => (
        <h4 className="text-lg font-medium text-[#0d0d0d] mt-6 mb-2.5 leading-[1.4]">
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-7 p-5 sm:p-6 rounded-[16px] bg-[#f3f3f3] border-s-4 border-[#0d0e10] text-[16px] sm:text-[17px] text-[#0d0d0d] leading-[1.7] font-normal">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-5 space-y-2.5 ps-5 list-disc marker:text-[#646f79] text-[16.5px] sm:text-[17.5px] text-[#0d0d0d] leading-[1.72]">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="my-5 space-y-2.5 ps-5 list-decimal marker:font-mono marker:text-[#0d0d0d] text-[16.5px] sm:text-[17.5px] text-[#0d0d0d] leading-[1.72]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="ps-1.5">{children}</li>,
      number: ({ children }) => <li className="ps-1.5">{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-[#0d0d0d]">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code
          dir="ltr"
          className="px-1.5 py-0.5 rounded-[6px] bg-[#f3f3f3] border border-[#e5e7eb] font-mono text-[0.88em] text-[#0d0e10]"
        >
          {children}
        </code>
      ),
      link: ({ children, value: markValue }) => {
        const href = markValue?.href || "#";
        const isExternal = href.startsWith("http");
        if (isExternal) {
          return (
            <a
              href={href}
              target={markValue?.blank !== false ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-[#0d0d0d] font-medium underline decoration-[#646f79] underline-offset-4 hover:text-[#646f79] transition-colors"
            >
              {children}
            </a>
          );
        }
        return (
          <Link
            href={href}
            className="text-[#0d0d0d] font-medium underline decoration-[#646f79] underline-offset-4 hover:text-[#646f79] transition-colors"
          >
            {children}
          </Link>
        );
      },
    },
    types: {
      figureImage: ({ value: imgVal }) => {
        const url = imgVal?.asset?.url || imgVal?.url;
        if (!url) return null;
        return (
          <figure className="my-8">
            <div className="relative aspect-[16/10] w-full rounded-[16px] overflow-hidden bg-[#f3f3f3] border border-[#e6e8eb]">
              <Image
                src={url}
                alt={imgVal.alt || ""}
                fill
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover"
              />
            </div>
            {imgVal.caption && (
              <figcaption className="mt-2.5 text-center text-xs sm:text-[13px] text-[#646f79]">
                {imgVal.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      codeBlock: ({ value: codeVal }) => (
        <CodeBlockRenderer value={codeVal} isAr={isAr} />
      ),
      callout: ({ value: calloutVal }) => {
        const tone = calloutVal?.tone || "info";
        const toneBadge =
          tone === "tip"
            ? isAr
              ? "نصيحة هندسية"
              : "Best Practice"
            : tone === "warning"
            ? isAr
              ? "تنبيه مهم"
              : "Important"
            : isAr
            ? "ملاحظة"
            : "Insight";

        const dotClass =
          tone === "tip"
            ? "bg-emerald-600"
            : tone === "warning"
            ? "bg-amber-500"
            : "bg-[#0d0e10]";

        return (
          <aside className="my-7 rounded-[16px] bg-[#f3f3f3] border border-[#e5e7eb] p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${dotClass}`} />
              <span className="text-xs font-mono uppercase tracking-wider text-[#646f79] font-medium">
                {calloutVal?.title || toneBadge}
              </span>
            </div>
            <p className="text-[15px] sm:text-base text-[#0d0d0d] leading-[1.68] font-normal">
              {calloutVal?.text}
            </p>
          </aside>
        );
      },
      ctaCard: ({ value: ctaVal }) => {
        if (!ctaVal?.heading) return null;
        const href: string = ctaVal.buttonHref || `/${lang}#pricing`;
        const isExternal = href.startsWith("http");

        return (
          <div className="my-8 rounded-[20px] bg-[#0d0e10] text-[#ffffff] p-6 sm:p-8 shadow-[0_16px_36px_-10px_rgba(13,14,16,0.22)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-2 max-w-xl">
              {ctaVal.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[64px] bg-white/10 border border-white/15 text-[11px] font-medium text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{ctaVal.badge}</span>
                </span>
              )}
              <h4 className="text-xl sm:text-2xl font-normal tracking-tight text-white leading-[1.3]">
                {ctaVal.heading}
              </h4>
              {ctaVal.description && (
                <p className="text-sm sm:text-[15px] text-white/75 leading-[1.6]">
                  {ctaVal.description}
                </p>
              )}
            </div>

            {isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackBlogCtaClick({
                    articleSlug,
                    ctaHeading: ctaVal.heading,
                    targetHref: href,
                    packageSlug: ctaVal.packageSlug,
                  })
                }
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[64px] bg-[#ffffff] text-[#0d0e10] text-sm font-medium hover:bg-[#f3f3f3] transition-colors flex-shrink-0"
              >
                <span>{ctaVal.buttonText}</span>
                <span className="rtl:rotate-180">→</span>
              </a>
            ) : (
              <Link
                href={href}
                onClick={() =>
                  trackBlogCtaClick({
                    articleSlug,
                    ctaHeading: ctaVal.heading,
                    targetHref: href,
                    packageSlug: ctaVal.packageSlug,
                  })
                }
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[64px] bg-[#ffffff] text-[#0d0e10] text-sm font-medium hover:bg-[#f3f3f3] transition-colors flex-shrink-0"
              >
                <span>{ctaVal.buttonText}</span>
                <span className="rtl:rotate-180">→</span>
              </Link>
            )}
          </div>
        );
      },
      dataTable: ({ value: tblVal }) => {
        const headers: string[] = Array.isArray(tblVal?.headers)
          ? tblVal.headers
          : [];
        const rows: Array<{ cells?: string[] }> = Array.isArray(tblVal?.rows)
          ? tblVal.rows
          : [];
        if (headers.length === 0 && rows.length === 0) return null;

        return (
          <div className="my-7 overflow-x-auto rounded-[16px] border border-[#e6e8eb] bg-[#ffffff]">
            {tblVal?.caption && (
              <div className="px-4 py-2.5 bg-[#f3f3f3] border-b border-[#e6e8eb] text-xs font-medium text-[#646f79]">
                {tblVal.caption}
              </div>
            )}
            <table className="w-full text-start border-collapse text-sm">
              {headers.length > 0 && (
                <thead>
                  <tr className="bg-[#f3f3f3]/70 border-b border-[#e6e8eb]">
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 font-semibold text-[#0d0d0d] text-start"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-[#f3f3f3]">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#fafafa]">
                    {(row.cells || []).map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-[#0d0d0d]">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },
      dividerBlock: () => (
        <hr className="my-9 border-0 border-t border-[#e6e8eb]" />
      ),
    },
  };

  return (
    <div className="max-w-[68ch]">
      <PortableText value={value} components={components} />
    </div>
  );
}
