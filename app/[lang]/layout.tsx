import type { Metadata } from "next";
import Script from "next/script";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Plus_Jakarta_Sans, Readex_Pro, IBM_Plex_Mono } from "next/font/google";
import { isRtl, type Locale } from "@/lib/i18n";
import { getFullSiteData } from "@/lib/sanity/loaders";
import { SanityLive } from "@/lib/sanity/live";
import { DEFAULT_SITE_URL } from "@/lib/agent-discovery";
import { Header } from "@/components/Header";
import { CustomCursor } from "@/components/CustomCursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleTagManager } from "@/components/GoogleTagManager";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-readex-pro",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

function buildWebMcpScript(config: {
  company: string;
  parent: string;
  email: string;
  whatsapp: string;
  packages: Array<{
    slug: string;
    name: string;
    price: string;
    period: string;
    summary: string;
  }>;
}): string {
  const safeData = JSON.stringify(config).replace(/</g, "\\u003c");
  return `
(function() {
  try {
    var cmsData = ${safeData};
    var controller = typeof AbortController !== "undefined" ? new AbortController() : { signal: undefined };
    var mc = (typeof document !== "undefined" && document.modelContext) ||
             (typeof navigator !== "undefined" && navigator.modelContext);

    if (!mc || typeof mc.registerTool !== "function") {
      var fallbackContext = {
        tools: new Map(),
        registerTool: function(tool, options) {
          this.tools.set(tool.name, { tool: tool, options: options });
          if (options && options.signal && typeof options.signal.addEventListener === "function") {
            var self = this;
            options.signal.addEventListener("abort", function() {
              self.tools.delete(tool.name);
            });
          }
          return Promise.resolve(tool);
        }
      };
      if (typeof document !== "undefined") {
        document.modelContext = document.modelContext || fallbackContext;
        mc = document.modelContext;
      }
      if (typeof navigator !== "undefined" && !navigator.modelContext) {
        try {
          navigator.modelContext = mc || fallbackContext;
        } catch (err) {}
      }
    }

    var toolsToRegister = [
      {
        name: "get-company-info",
        description: "Get official company overview, parent organization (Scptric), Kuwait & GCC service scope, and direct contact details for Arssan Studio.",
        inputSchema: {
          type: "object",
          properties: {
            language: {
              type: "string",
              enum: ["ar", "en"],
              description: "Preferred response language (ar or en)"
            }
          },
          required: []
        },
        execute: function() {
          return Promise.resolve({
            company: cmsData.company,
            parent: cmsData.parent,
            market: "State of Kuwait & GCC",
            email: cmsData.email,
            whatsapp: cmsData.whatsapp,
            website: window.location.origin
          });
        }
      },
      {
        name: "list-pricing-packages",
        description: "List Arssan Studio website & platform investment packages in Kuwaiti Dinars (KWD).",
        inputSchema: {
          type: "object",
          properties: {
            tier: {
              type: "string",
              enum: ["starter", "professional", "enterprise", "basic", "pro", "custom", "all"],
              description: "Package tier to inspect"
            }
          },
          required: []
        },
        execute: function(input) {
          var packages = cmsData.packages || [];
          if (input && input.tier && input.tier !== "all") {
            packages = packages.filter(function(p) {
              return p.slug === input.tier ||
                (input.tier === "custom" && p.slug === "enterprise") ||
                (input.tier === "basic" && p.slug === "starter") ||
                (input.tier === "pro" && p.slug === "professional");
            });
          }
          return Promise.resolve({ packages: packages });
        }
      },
      {
        name: "navigate-to-section",
        description: "Scroll smoothly to a section on the Arssan Studio page (hero, services, process, pricing) or navigate to the projects showcase or blog.",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: ["hero", "services", "process", "pricing", "projects", "blog"],
              description: "Section identifier to navigate to"
            }
          },
          required: ["section"]
        },
        execute: function(input) {
          var isAr = window.location.pathname.startsWith("/ar");
          if (input && input.section === "projects") {
            var target = isAr ? "/ar/projects" : "/en/projects";
            window.location.href = target;
            return Promise.resolve({ navigated: target });
          }
          if (input && input.section === "blog") {
            var blogTarget = isAr ? "/ar/blog" : "/en/blog";
            window.location.href = blogTarget;
            return Promise.resolve({ navigated: blogTarget });
          }
          var el = document.getElementById(input.section);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            return Promise.resolve({ scrolledTo: input.section });
          }
          return Promise.resolve({ error: "Section not found on current page" });
        }
      }
    ];

    if (mc && typeof mc.registerTool === "function") {
      toolsToRegister.forEach(function(tool) {
        mc.registerTool(tool, { signal: controller.signal });
      });
    }
    if (typeof navigator !== "undefined" && navigator.modelContext && navigator.modelContext !== mc && typeof navigator.modelContext.registerTool === "function") {
      toolsToRegister.forEach(function(tool) {
        navigator.modelContext.registerTool(tool, { signal: controller.signal });
      });
    }
  } catch (e) {
    console.error("WebMCP initialization error:", e);
  }
})();
`;
}

export function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const isAr = locale === "ar";
  const { dict, siteConfig } = await getFullSiteData(locale);

  return {
    metadataBase: new URL(DEFAULT_SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: siteConfig.siteName || (isAr ? "أرسان" : "Arssan"),
      locale: isAr ? "ar_KW" : "en_US",
      type: "website",
      images: [
        {
          url: dict.meta.ogImageUrl || "/images/og-image.png",
          width: 1201,
          height: 630,
          alt: dict.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [dict.meta.ogImageUrl || "/images/og-image.png"],
    },
    icons: {
      icon: [
        {
          url: "/images/Icon.svg",
          type: "image/svg+xml",
        },
        {
          url: "/images/Icon.svg",
          media: "(prefers-color-scheme: light)",
          type: "image/svg+xml",
        },
        {
          url: "/images/Icon-dark.svg",
          media: "(prefers-color-scheme: dark)",
          type: "image/svg+xml",
        },
      ],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const rtl = isRtl(locale);
  const { dict, siteConfig } = await getFullSiteData(locale);
  const { isEnabled: isDraftMode } = await draftMode();

  const webMcpScript = buildWebMcpScript({
    company: "Arssan | أرسان",
    parent: `${siteConfig.parentOrgName} (${siteConfig.parentOrgUrl})`,
    email: siteConfig.email,
    whatsapp: siteConfig.whatsappUrl,
    packages: dict.pricing.packages.map((p) => ({
      slug: p.slug,
      name: p.name,
      price: p.currency ? `${p.price} ${p.currency}` : p.price,
      period: p.period,
      summary: p.description,
    })),
  });

  return (
    <html
      lang={locale}
      dir={rtl ? "rtl" : "ltr"}
      className={`${plusJakarta.variable} ${readexPro.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href={dict.hero.backgroundImageUrl || "/images/hero-bg.webp"}
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="api-catalog" href="/.well-known/api-catalog" />
        <link rel="ai-catalog" href="/.well-known/ai-catalog.json" />
        <link rel="describedby" href="/auth.md" />
        <link rel="service-desc" href="/.well-known/mcp/server-card.json" />
        <link rel="service-doc" href="/.well-known/agent-skills/index.json" />
        <link rel="service-doc" href="/.well-known/agent-skills/dns-aid/SKILL.md" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.siteName} RSS Feed`}
          href={`/${locale}/blog/rss.xml`}
        />
      </head>
      <body
        className={`${
          rtl ? "font-readex-pro" : "font-sans"
        } antialiased bg-[#ffffff] text-[#0d0d0d] selection:bg-[#0d0e10] selection:text-[#ffffff]`}
      >
        <GoogleAnalytics />
        <GoogleTagManager />
        <Script id="webmcp-tools" strategy="beforeInteractive">
          {webMcpScript}
        </Script>
        <CustomCursor />
        <Header lang={locale} dict={dict} siteConfig={siteConfig} />
        <main>{children}</main>
        {/* Declarative WebMCP Tool Form for Agent Discovery */}
        <form
          action={siteConfig.whatsappUrl}
          method="get"
          target="_blank"
          className="sr-only"
          aria-label="Project Inquiry Form for AI Agents"
          {...({
            toolname: "inquire-project",
            tooldescription:
              "Initiate a web design, Next.js development, or SEO project inquiry with Arssan Studio in Kuwait via WhatsApp",
          } as Record<string, string>)}
        >
          <label htmlFor="inquiry-message" className="sr-only">
            Project inquiry message
          </label>
          <input
            id="inquiry-message"
            type="text"
            name="text"
            aria-label="Project inquiry message specifying desired package and business goals"
            defaultValue={siteConfig.defaultWhatsappMessage}
            {...({
              toolparamdescription:
                "Project inquiry message specifying desired package and business goals",
            } as Record<string, string>)}
          />
          <button type="submit">Send Inquiry</button>
        </form>
        <Footer lang={locale} dict={dict} siteConfig={siteConfig} />
        <WhatsAppButton dict={dict} whatsappUrl={siteConfig.whatsappUrl} />
        <BackToTop dict={dict} />
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
