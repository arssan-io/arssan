import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Readex_Pro, IBM_Plex_Mono } from "next/font/google";
import { isRtl, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { DEFAULT_SITE_URL } from "@/lib/agent-discovery";
import { Header } from "@/components/Header";
import { CustomCursor } from "@/components/CustomCursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";

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

const WEBMCP_SCRIPT = `
(function() {
  try {
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
            company: "Arssan | أرسان",
            parent: "Scptric (https://scptric.com)",
            market: "State of Kuwait & GCC",
            email: "info@arssan.com",
            whatsapp: "https://wa.me/46700265645",
            website: window.location.origin
          });
        }
      },
      {
        name: "list-pricing-packages",
        description: "List Arssan Studio website & platform investment packages in Kuwaiti Dinars (KWD): Basic (150 KWD), Pro (300 KWD), and Custom Enterprise (750+ KWD).",
        inputSchema: {
          type: "object",
          properties: {
            tier: {
              type: "string",
              enum: ["basic", "pro", "custom", "all"],
              description: "Package tier to inspect"
            }
          },
          required: []
        },
        execute: function(input) {
          var packages = [
            { slug: "basic", name: "Basic Package / الباقة الأساسية", price: "150 KWD", period: "One-time", summary: "Up to 3 pages, bilingual AR/EN, WhatsApp integration, SSL, local SEO, 1 month support." },
            { slug: "pro", name: "Pro Package / الباقة الاحترافية", price: "300 KWD (was 450 KWD)", period: "One-time", summary: "Up to 10 pages, CMS, KNET/MyFatoorah/Tap payment gateways, advanced Kuwait SEO, GA4, 3 months support." },
            { slug: "custom", name: "Custom Enterprise / باقة الأعمال المخصصة", price: "From 750 KWD", period: "Project-based", summary: "Unlimited bespoke pages & workflows, custom Next.js & API development, ERP/CRM integrations, 6 months SLA." }
          ];
          if (input && input.tier && input.tier !== "all") {
            packages = packages.filter(function(p) { return p.slug === input.tier; });
          }
          return Promise.resolve({ packages: packages });
        }
      },
      {
        name: "navigate-to-section",
        description: "Scroll smoothly to a section on the Arssan Studio page (hero, services, process, pricing) or navigate to the projects showcase.",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: ["hero", "services", "process", "pricing", "projects"],
              description: "Section identifier to navigate to"
            }
          },
          required: ["section"]
        },
        execute: function(input) {
          if (input && input.section === "projects") {
            window.location.href = "/en/projects";
            return Promise.resolve({ navigated: "/en/projects" });
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
    metadataBase: new URL(DEFAULT_SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: isAr ? "أرسان" : "Arssan",
      locale: isAr ? "ar_KW" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
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
      images: ["/images/og-image.png"],
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
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={rtl ? "rtl" : "ltr"}
      className={`${plusJakarta.variable} ${readexPro.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link rel="api-catalog" href="/.well-known/api-catalog" />
        <link rel="ai-catalog" href="/.well-known/ai-catalog.json" />
        <link rel="describedby" href="/auth.md" />
        <link rel="service-desc" href="/.well-known/mcp/server-card.json" />
        <link rel="service-doc" href="/.well-known/agent-skills/index.json" />
        <script
          id="webmcp-inline"
          dangerouslySetInnerHTML={{ __html: WEBMCP_SCRIPT }}
        />
      </head>
      <body
        className={`${
          rtl ? "font-readex-pro" : "font-sans"
        } antialiased bg-[#ffffff] text-[#0d0d0d] selection:bg-[#0d0e10] selection:text-[#ffffff]`}
      >
        <Script id="webmcp-tools" strategy="beforeInteractive">
          {WEBMCP_SCRIPT}
        </Script>
        <CustomCursor />
        <Header lang={locale} dict={dict} />
        <main>{children}</main>
        {/* Declarative WebMCP Tool Form for Agent Discovery */}
        <form
          action="https://wa.me/46700265645"
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
          <input
            type="text"
            name="text"
            defaultValue="Hello Arssan Studio, I would like to inquire about a web project in Kuwait."
            {...({
              toolparamdescription:
                "Project inquiry message specifying desired package (Basic 150 KWD, Pro 300 KWD, or Custom 750 KWD) and business goals",
            } as Record<string, string>)}
          />
          <button type="submit">Send Inquiry</button>
        </form>
        <Footer lang={locale} dict={dict} />
        <WhatsAppButton dict={dict} />
        <BackToTop dict={dict} />
      </body>
    </html>
  );
}
