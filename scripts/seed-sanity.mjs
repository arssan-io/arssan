import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const isDryRun = process.argv.includes("--dry-run");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "62fsr01f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!token && !isDryRun) {
  console.error("Missing SANITY_API_WRITE_TOKEN in environment.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-05-01",
  token,
  useCdn: false,
});

const rootDir = process.cwd();
const arDict = JSON.parse(
  fs.readFileSync(path.join(rootDir, "lib/dictionaries/ar.json"), "utf8")
);
const enDict = JSON.parse(
  fs.readFileSync(path.join(rootDir, "lib/dictionaries/en.json"), "utf8")
);

const loc = (ar, en) => ({ _type: "localeString", ar, en });
const locText = (ar, en) => ({ _type: "localeText", ar, en });

async function uploadImageIfExists(relPath, label) {
  if (isDryRun) return null;
  const fullPath = path.join(rootDir, "public", relPath.replace(/^\//, ""));
  if (!fs.existsSync(fullPath)) {
    console.warn(`Image not found at ${fullPath}, skipping upload.`);
    return null;
  }
  try {
    console.log(`Uploading asset: ${relPath} (${label})...`);
    const asset = await client.assets.upload(
      "image",
      fs.createReadStream(fullPath),
      {
        filename: path.basename(fullPath),
      }
    );
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.warn(`Could not upload ${relPath}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log(
    `Seeding Sanity project "${projectId}" (${dataset})${isDryRun ? " [DRY RUN]" : ""}...`
  );

  // Upload project screenshots
  const projectImages = {};
  for (const p of enDict.projects_page.projects) {
    if (p.image) {
      projectImages[p.id] = await uploadImageIfExists(p.image, p.title);
    }
  }

  // 1. Site Settings Singleton
  const siteSettingsDoc = {
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: loc("أرسان", "Arssan"),
    parentOrgName: "Scptric",
    parentOrgUrl: "https://scptric.com",
    parentOrgBadge: loc("ذراع سكبترك للويب • Scptric", "Scptric Web Arm"),
    whatsappNumber: "46700265645",
    whatsappDisplay: "+46 70 026 56 45",
    defaultWhatsappMessage: loc(
      "مرحباً أرسان، أود الاستفسار عن تصميم وتطوير موقع إلكتروني في الكويت.",
      "Hello Arssan Studio, I would like to inquire about a web project in Kuwait."
    ),
    whatsappTooltip: loc(arDict.whatsapp.tooltip, enDict.whatsapp.tooltip),
    email: "info@arssan.com",
    socialLinks: [
      {
        _key: "ig",
        platform: "instagram",
        label: "Instagram",
        url: "https://instagram.com/arssan.io",
      },
      {
        _key: "x",
        platform: "x",
        label: "X",
        url: "https://x.com/arssan_co",
      },
      {
        _key: "fb",
        platform: "facebook",
        label: "Facebook",
        url: "https://facebook.com/arssan.co",
      },
    ],
    navLabels: {
      home: loc(arDict.nav.home, enDict.nav.home),
      projects: loc(arDict.nav.projects, enDict.nav.projects),
      blog: loc(arDict.nav.blog, enDict.nav.blog),
      services: loc(arDict.nav.services, enDict.nav.services),
      process: loc(arDict.nav.process, enDict.nav.process),
      pricing: loc(arDict.nav.pricing, enDict.nav.pricing),
      contact: loc(arDict.nav.contact, enDict.nav.contact),
    },
    headerNavItems: [
      {
        _key: "nav-projects",
        label: loc(arDict.nav.projects, enDict.nav.projects),
        href: "/projects",
        visible: true,
      },
      {
        _key: "nav-blog",
        label: loc(arDict.nav.blog, enDict.nav.blog),
        href: "/blog",
        visible: true,
      },
      {
        _key: "nav-services",
        label: loc(arDict.nav.services, enDict.nav.services),
        href: "#services",
        visible: true,
      },
      {
        _key: "nav-process",
        label: loc(arDict.nav.process, enDict.nav.process),
        href: "#process",
        visible: true,
      },
      {
        _key: "nav-pricing",
        label: loc(arDict.nav.pricing, enDict.nav.pricing),
        href: "#pricing",
        visible: true,
      },
    ],
    footerBio: locText(arDict.footer.bio, enDict.footer.bio),
    footerDescription: loc(arDict.footer.description, enDict.footer.description),
    footerRights: loc(arDict.footer.rights, enDict.footer.rights),
    footerLinksTitle: loc(arDict.footer.links.title, enDict.footer.links.title),
    footerServicesTitle: loc(
      arDict.footer.services_title,
      enDict.footer.services_title
    ),
    footerStatusText: loc(
      "جميع الأنظمة تعمل بكفاءة",
      "All Systems Operational"
    ),
    preFooterCta: {
      badge: loc(
        "استشارة مجانية لمشروعك في الكويت",
        "Free Executive Discovery Call"
      ),
      title: loc(
        "هل أنت مستعد لبناء حضور رقمي يليق بعلامتك التجارية؟",
        "Ready to build a calm, high-performing digital platform?"
      ),
      description: locText(
        "تواصل مع فريقنا مباشرة عبر واتساب لمناقشة تفاصيل مشروعك واختيار الباقة الأنسب لأهدافك.",
        "Connect directly with our team to scope your project, timeline, and KWD package."
      ),
    },
    announcementBar: {
      enabled: false,
      text: loc(
        "خصم خاص لفترة محدودة على الباقة الاحترافية — 299 د.ك بدلاً من 450 د.ك",
        "Limited-time offer on our Professional Package — 299 KWD instead of 450 KWD"
      ),
      linkText: loc("استكشف الباقة", "Explore Package"),
      linkHref: "/pricing/professional",
    },
    metaTitle: loc(arDict.meta.title, enDict.meta.title),
    metaDescription: locText(arDict.meta.description, enDict.meta.description),
  };

  // 2. Home Page Singleton
  const homePageDoc = {
    _id: "homePage",
    _type: "homePage",
    sectionsVisibility: {
      showPartners: true,
      showProcess: true,
      showServices: true,
      showPricing: true,
      showLatestPosts: true,
    },
    hero: {
      tagline: loc(arDict.hero.tagline, enDict.hero.tagline),
      titleLine1: loc(arDict.hero.title_line1, enDict.hero.title_line1),
      titleLine2: loc(arDict.hero.title_line2, enDict.hero.title_line2),
      titleLine3: loc(arDict.hero.title_line3, enDict.hero.title_line3),
      description: locText(arDict.hero.description, enDict.hero.description),
      cta: loc(arDict.hero.cta, enDict.hero.cta),
      ctaHref: "#pricing",
      pipelineDesign: loc(
        arDict.hero.pipeline_design,
        enDict.hero.pipeline_design
      ),
      pipelineDev: loc(arDict.hero.pipeline_dev, enDict.hero.pipeline_dev),
      pipelineSeo: loc(arDict.hero.pipeline_seo, enDict.hero.pipeline_seo),
      startingPriceNote: loc(
        "الباقات تبدأ من 150 د.ك • تسليم احترافي سريع",
        "Packages from 150 KWD • Rapid Executive Delivery"
      ),
    },
    partnersSection: {
      badge: loc(arDict.partners.badge, enDict.partners.badge),
      title: loc(arDict.partners.title, enDict.partners.title),
      subtitle: locText(arDict.partners.subtitle, enDict.partners.subtitle),
    },
    processSection: {
      badge: loc(arDict.process.badge, enDict.process.badge),
      title: loc(arDict.process.title, enDict.process.title),
      subtitle: locText(arDict.process.subtitle, enDict.process.subtitle),
      steps: enDict.process.steps.map((enStep, idx) => {
        const arStep = arDict.process.steps[idx];
        return {
          _key: `step-${idx + 1}`,
          num: enStep.num,
          title: loc(arStep.title, enStep.title),
          description: locText(arStep.description, enStep.description),
        };
      }),
    },
    servicesSection: {
      badge: loc(arDict.services.badge, enDict.services.badge),
      title: loc(arDict.services.title, enDict.services.title),
      subtitle: locText(arDict.services.subtitle, enDict.services.subtitle),
      items: [
        {
          _key: "svc-design",
          key: "design",
          title: loc(arDict.services.design.title, enDict.services.design.title),
          description: locText(
            arDict.services.design.description,
            enDict.services.design.description
          ),
          features: enDict.services.design.features.map((f, i) => ({
            _key: `df-${i}`,
            ...loc(arDict.services.design.features[i], f),
          })),
          metricValue: "WCAG AAA",
          metricLabel: loc(
            "تباين 18.5:1 ودقة ثنائية اللغة RTL/LTR",
            "18.5:1 Contrast & RTL Precision"
          ),
          metricTag: "Figma Systems",
        },
        {
          _key: "svc-dev",
          key: "development",
          title: loc(
            arDict.services.development.title,
            enDict.services.development.title
          ),
          description: locText(
            arDict.services.development.description,
            enDict.services.development.description
          ),
          features: enDict.services.development.features.map((f, i) => ({
            _key: `dvf-${i}`,
            ...loc(arDict.services.development.features[i], f),
          })),
          metricValue: "< 0.4s",
          metricLabel: loc(
            "تحميل فوري وجاهزية لبوابات الدفع KNET",
            "Instant Load & KNET Gateway Ready"
          ),
          metricTag: "Next.js 16",
        },
        {
          _key: "svc-seo",
          key: "seo",
          title: loc(arDict.services.seo.title, enDict.services.seo.title),
          description: locText(
            arDict.services.seo.description,
            enDict.services.seo.description
          ),
          features: enDict.services.seo.features.map((f, i) => ({
            _key: `sf-${i}`,
            ...loc(arDict.services.seo.features[i], f),
          })),
          metricValue: "99 / 100",
          metricLabel: loc(
            "مؤشرات Core Web Vitals وتصدّر البحث في الكويت",
            "Core Web Vitals & Kuwait Search Rank"
          ),
          metricTag: "Local & GCC SEO",
        },
      ],
    },
  };

  // 3. Pricing Section Header Singleton
  const pricingSectionDoc = {
    _id: "pricingSection",
    _type: "pricingSection",
    badge: loc(arDict.pricing.badge, enDict.pricing.badge),
    title: loc(arDict.pricing.title, enDict.pricing.title),
    subtitle: locText(arDict.pricing.subtitle, enDict.pricing.subtitle),
    includedDeliverablesLabel: loc(
      "المميزات المشمولة في الباقة",
      "Included Deliverables"
    ),
    specialOfferBadge: loc("خصم خاص", "Special Offer"),
    mostPopularBadge: loc("الأكثر اختياراً", "Most Popular"),
    assuranceBullets: [
      {
        _key: "ab-1",
        ...loc(
          "دفعات مرنة وميسّرة على مراحل المشروع",
          "Flexible Milestone Payments in KWD"
        ),
      },
      {
        _key: "ab-2",
        ...loc(
          "ملكية كاملة للكود البرمجي والنطاق",
          "100% Source Code & Domain Ownership"
        ),
      },
      {
        _key: "ab-3",
        ...loc(
          "دعم فني مباشر عبر واتساب واجتماعات دورية",
          "Direct WhatsApp & Executive Support"
        ),
      },
    ],
    customQuoteCta: loc(
      "تحتاج باقة مخصصة؟ تواصل معنا ←",
      "Need a custom quote? Let's talk →"
    ),
  };

  // 4. Packages Documents
  const aliasMap = {
    starter: ["basic"],
    professional: ["pro"],
    enterprise: ["custom"],
  };
  const packageDocs = enDict.pricing.packages.map((enPkg, idx) => {
    const arPkg = arDict.pricing.packages[idx];
    const isCustom = isNaN(Number(enPkg.price));
    return {
      _id: `package-${enPkg.slug}`,
      _type: "package",
      orderRank: `0|i0000${idx + 1}:`,
      name: loc(arPkg.name, enPkg.name),
      slug: { _type: "slug", current: enPkg.slug },
      aliases: aliasMap[enPkg.slug] || [],
      visible: true,
      popular: Boolean(enPkg.popular),
      isCustomQuote: isCustom,
      price: isCustom ? "" : enPkg.price,
      customPriceLabel: isCustom ? loc(arPkg.price, enPkg.price) : undefined,
      originalPrice: enPkg.originalPrice || undefined,
      currency: isCustom ? undefined : loc(arPkg.currency, enPkg.currency),
      period: loc(arPkg.period, enPkg.period),
      description: locText(arPkg.description, enPkg.description),
      cta: loc(arPkg.cta, enPkg.cta),
      inquiryMessage: locText(
        `مرحباً أرسان، أود الاستفسار عن ${arPkg.name} (${arPkg.price} ${arPkg.currency || ""}).`,
        `Hello Arssan Studio, I would like to inquire about the ${enPkg.name} package (${enPkg.price} ${enPkg.currency || ""}).`
      ),
      features: enPkg.features.map((f, fIdx) => ({
        _key: `feat-${fIdx}`,
        ...loc(arPkg.features[fIdx] || f, f),
      })),
    };
  });

  // 5. Projects Page Singleton & Categories & Projects
  const projectsPageDoc = {
    _id: "projectsPage",
    _type: "projectsPage",
    badge: loc(arDict.projects_page.badge, enDict.projects_page.badge),
    title: loc(arDict.projects_page.title, enDict.projects_page.title),
    subtitle: locText(
      arDict.projects_page.subtitle,
      enDict.projects_page.subtitle
    ),
    allFilterLabel: loc(
      arDict.projects_page.all_filter,
      enDict.projects_page.all_filter
    ),
    stats: enDict.projects_page.stats.map((st, idx) => ({
      _key: `stat-${idx}`,
      value: st.value,
      label: loc(arDict.projects_page.stats[idx].label, st.label),
    })),
    cta: {
      badge: loc(
        arDict.projects_page.cta.badge,
        enDict.projects_page.cta.badge
      ),
      title: loc(
        arDict.projects_page.cta.title,
        enDict.projects_page.cta.title
      ),
      description: locText(
        arDict.projects_page.cta.description,
        enDict.projects_page.cta.description
      ),
      button: loc(
        arDict.projects_page.cta.button,
        enDict.projects_page.cta.button
      ),
      inquireBtn: loc(
        arDict.projects_page.cta.inquire_btn,
        enDict.projects_page.cta.inquire_btn
      ),
      visitBtn: loc(
        arDict.projects_page.cta.visit_btn,
        enDict.projects_page.cta.visit_btn
      ),
    },
  };

  const categoryKeys = Object.keys(enDict.projects_page.categories);
  const projectCategoryDocs = categoryKeys.map((key, idx) => ({
    _id: `projectCategory-${key}`,
    _type: "projectCategory",
    orderRank: `0|i0000${idx + 1}:`,
    key: { _type: "slug", current: key },
    title: loc(
      arDict.projects_page.categories[key],
      enDict.projects_page.categories[key]
    ),
  }));

  const projectDocs = enDict.projects_page.projects.map((enProj, idx) => {
    const arProj = arDict.projects_page.projects[idx];
    const uploadedImg = projectImages[enProj.id];
    return {
      _id: `project-${enProj.id}`,
      _type: "project",
      orderRank: `0|i0000${idx + 1}:`,
      title: loc(arProj.title, enProj.title),
      slug: { _type: "slug", current: enProj.slug },
      visible: true,
      featured: true,
      category: {
        _type: "reference",
        _ref: `projectCategory-${enProj.categoryKey}`,
      },
      client: loc(arProj.client, enProj.client),
      year: enProj.year,
      displayUrl: enProj.url,
      liveUrl: enProj.liveUrl,
      description: locText(arProj.description, enProj.description),
      ...(uploadedImg ? { coverImage: uploadedImg } : {}),
      fallbackImagePath: enProj.image,
      metricValue: loc(arProj.metrics.value, enProj.metrics.value),
      metricLabel: loc(arProj.metrics.label, enProj.metrics.label),
      tags: enProj.tags.map((t, tIdx) => ({
        _key: `tag-${tIdx}`,
        ...loc(arProj.tags[tIdx] || t, t),
      })),
      inquiryMessage: locText(arProj.inquiryMessage, enProj.inquiryMessage),
    };
  });

  // 6. Partners
  const partnerList = [
    {
      id: "cloudflare",
      name: "Cloudflare",
      logo: "/partners/cloudflare.svg",
      url: "https://www.cloudflare.com",
    },
    {
      id: "github",
      name: "GitHub",
      logo: "/partners/github.svg",
      url: "https://github.com",
    },
    {
      id: "google_analytics",
      name: "Google Analytics",
      logo: "/partners/google-analytics.svg",
      url: "https://analytics.google.com",
    },
    {
      id: "sanity",
      name: "Sanity",
      logo: "/partners/sanity.svg",
      url: "https://www.sanity.io",
    },
  ];
  const partnerDocs = partnerList.map((pt, idx) => ({
    _id: `partner-${pt.id}`,
    _type: "partner",
    orderRank: `0|i0000${idx + 1}:`,
    name: pt.name,
    role: loc(
      arDict.partners.items[pt.id].role,
      enDict.partners.items[pt.id].role
    ),
    fallbackLogoPath: pt.logo,
    url: pt.url,
    visible: true,
  }));

  // 7. Blog Author, Categories & Sample Bilingual Posts
  const authorDoc = {
    _id: "author-arssan-team",
    _type: "author",
    name: loc("فريق أرسان الهندسي", "Arssan Engineering Studio"),
    slug: { _type: "slug", current: "arssan-engineering" },
    role: loc(
      "هندسة المنصات الرقمية وتجربة المستخدم • الكويت",
      "Digital Architecture & Web Engineering • Kuwait"
    ),
    bio: locText(
      "فريق متخصص في تصميم أنظمة واجهات المستخدم ثنائية اللغة (RTL/LTR) وتطوير المنصات الرقمية فائقة السرعة بتقنيات Next.js 16 و Sanity CMS للسوق الكويتي والخليجي.",
      "Specialized engineering team crafting calm bilingual UI/UX systems, high-speed Next.js 16 web platforms, and headless Sanity CMS workflows for ambitious brands in Kuwait and the GCC."
    ),
    url: "https://arssan.com",
  };

  const blogCategories = [
    {
      _id: "blogCategory-engineering",
      _type: "blogCategory",
      title: loc("هندسة الويب و Next.js", "Web Engineering & Next.js"),
      slug: { _type: "slug", current: "web-engineering" },
      description: locText(
        "بنية المواقع الحديثة، الأداء الفائق، وأنظمة إدارة المحتوى المرنة.",
        "Modern cloud architectures, sub-second Core Web Vitals, and headless CMS workflows."
      ),
    },
    {
      _id: "blogCategory-ui-ux",
      _type: "blogCategory",
      title: loc("أنظمة التصميم وتجربة المستخدم", "UI/UX & Design Systems"),
      slug: { _type: "slug", current: "ui-ux-systems" },
      description: locText(
        "قواعد التصميم الهادئ، التباين العالي WCAG AAA، وتجربة المستخدم ثنائية اللغة.",
        "Calm visual competence, WCAG AAA accessibility, and seamless Arabic RTL / English LTR interfaces."
      ),
    },
    {
      _id: "blogCategory-seo",
      _type: "blogCategory",
      title: loc("تحسين محركات البحث والنمو في الكويت", "Kuwait SEO & Growth"),
      slug: { _type: "slug", current: "kuwait-seo-growth" },
      description: locText(
        "استراتيجيات تصدر نتائج البحث في الكويت والخليج وجاهزية المواقع لوكلاء الذكاء الاصطناعي.",
        "Search engine dominance in Kuwait & the GCC and AI agent readiness standards."
      ),
    },
  ];

  const ptBlock = (key, style, text) => ({
    _key: key,
    _type: "block",
    style,
    markDefs: [],
    children: [{ _key: `${key}-span`, _type: "span", marks: [], text }],
  });

  const samplePosts = [
    // Post 1 — Arabic
    {
      _id: "post-ar-nextjs-sanity-kuwait",
      _type: "post",
      language: "ar",
      translationKey: "nextjs-sanity-kuwait-architecture",
      title:
        "لماذا نبني منصات الشركات في الكويت بتقنية Next.js 16 ونظام Sanity CMS؟",
      slug: {
        _type: "slug",
        current: "why-nextjs-16-and-sanity-cms-for-kuwait-platforms",
      },
      excerpt:
        "دليل هندسي يوضح كيف تجمع البنية الحديثة بين سرعة استجابة أقل من 0.4 ثانية، وتحكم فوري بالمحتوى والأسعار بالدينار الكويتي، وتصدّر نتائج بحث جوجل في الكويت.",
      publishedAt: "2026-11-01T10:00:00.000Z",
      readingTimeMinutes: 5,
      featured: true,
       ...(projectImages["blackbird"]
        ? {
            coverImage: {
              ...projectImages["blackbird"],
              alt: "لوحة تحكم Sanity CMS مع منصة Next.js 16",
              caption:
                "بنية إدارة المحتوى الفورية لربط الأسعار والصفحات في الوقت الفعلي",
            },
          }
        : {}),
      categories: [
        { _type: "reference", _ref: "blogCategory-engineering" },
        { _type: "reference", _ref: "blogCategory-seo" },
      ],
      tags: ["Next.js 16", "Sanity CMS", "الكويت", "تطوير مواقع", "KWD"],
      author: { _type: "reference", _ref: "author-arssan-team" },
      body: [
        ptBlock(
          "b1",
          "normal",
          "عندما تطلق شركة أو علامة تجارية في الكويت منصتها الرقمية، فإن الانطباع الأول يتشكّل خلال أجزاء من الثانية. المواقع التقليدية المبنية على قوالب قديمة تعاني من بطء التحميل على شبكات الهاتف، وصعوبة تحديث المحتوى أو الأسعار باللغتين العربية والإنجليزية."
        ),
        ptBlock(
          "b2",
          "h2",
          "1. السرعة الفائقة ومؤشرات Core Web Vitals"
        ),
        ptBlock(
          "b3",
          "normal",
          "تعتمد تقنية Next.js 16 على التوليد الهجين وتخزين الصفحات على حافة الشبكة (Edge Caching)، ما يمنح الزائر انتقالاً لحظياً بين الصفحات ويضمن تحقيق تقييم 99+ في اختبارات Google Lighthouse."
        ),
        {
          _key: "callout-1",
          _type: "callout",
          tone: "tip",
          title: "قاعدة هندسية في أرسان",
          text: "كل 100 ملي ثانية إضافية في وقت التحميل تقلل من معدل التحويل والتواصل. لذلك نصمّم جميع منصاتنا لتعمل بسرعة استجابة أقل من 0.4 ثانية.",
        },
        ptBlock(
          "b4",
          "h2",
          "2. تحكم كامل وفوري عبر Sanity Studio"
        ),
        ptBlock(
          "b5",
          "normal",
          "بدلاً من الاعتماد على المطورين في كل تعديل بسيط، تمنحك لوحة تحكم Sanity المدمجة داخل موقعك (/studio) القدرة على تعديل الباقات، الأسعار بالدينار الكويتي، المشاريع، والمقالات باللغتين العربية والإنجليزية مع معاينة حية قبل النشر."
        ),
        {
          _key: "table-1",
          _type: "dataTable",
          caption: "مقارنة بين المنصات التقليدية وبنية أرسان الحديثة",
          headers: ["المعيار", "القوالب التقليدية", "بنية Next.js 16 + Sanity"],
          rows: [
            {
              _key: "r1",
              cells: ["سرعة التحميل (LCP)", "3.2 – 5.5 ثانية", "أقل من 0.4 ثانية"],
            },
            {
              _key: "r2",
              cells: [
                "تحديث الأسعار والمحتوى",
                "معقد ويؤثر على التصميم",
                "فوري ومنظم عبر حقول ثنائية اللغة",
              ],
            },
            {
              _key: "r3",
              cells: [
                "الأمان والحماية",
                "يتطلب تحديث إضافات مستمر",
                "فصل كامل بين الواجهة وقاعدة البيانات",
              ],
            },
          ],
        },
        ptBlock(
          "b6",
          "h2",
          "3. جاهزية كاملة لوكلاء الذكاء الاصطناعي ومحركات البحث"
        ),
        ptBlock(
          "b7",
          "normal",
          "ندمج في كل منصة معايير البيانات المنظمة JSON-LD وبروتوكولات اكتشاف الوكلاء (WebMCP و llms.txt) بحيث يظهر موقعك في صدارة نتائج بحث جوجل وإجابات محركات الذكاء الاصطناعي."
        ),
        {
          _key: "cta-1",
          _type: "ctaCard",
          badge: "الباقة الاحترافية • 299 د.ك",
          heading: "املك موقعاً ثنائي اللغة مع لوحة تحكم حية",
          description:
            "تشمل الباقة الاحترافية تصميم UI/UX مخصص، تطوير Next.js 16، لوحة تحكم سهلة، وتهيئة SEO متكاملة للسوق الكويتي.",
          buttonText: "استكشف الباقة الاحترافية",
          buttonHref: "/ar/pricing/professional",
          packageSlug: "professional",
        },
      ],
    },

    // Post 1 — English Counterpart
    {
      _id: "post-en-nextjs-sanity-kuwait",
      _type: "post",
      language: "en",
      translationKey: "nextjs-sanity-kuwait-architecture",
      title:
        "Why We Engineer Kuwait Corporate Platforms with Next.js 16 & Sanity CMS",
      slug: {
        _type: "slug",
        current: "why-nextjs-16-and-sanity-cms-for-kuwait-platforms",
      },
      excerpt:
        "An architectural breakdown of how sub-0.4s edge rendering and an embedded Sanity Studio give teams in Kuwait full control over bilingual content, KWD pricing, and search visibility.",
      publishedAt: "2026-11-01T10:00:00.000Z",
      readingTimeMinutes: 5,
      featured: true,
      ...(projectImages["blackbird"]
        ? {
            coverImage: {
              ...projectImages["blackbird"],
              alt: "Sanity CMS Studio embedded in Next.js 16",
              caption:
                "Real-time bilingual content and KWD pricing infrastructure",
            },
          }
        : {}),
      categories: [
        { _type: "reference", _ref: "blogCategory-engineering" },
        { _type: "reference", _ref: "blogCategory-seo" },
      ],
      tags: ["Next.js 16", "Sanity CMS", "Kuwait", "Headless CMS", "Performance"],
      author: { _type: "reference", _ref: "author-arssan-team" },
      body: [
        ptBlock(
          "en-b1",
          "normal",
          "When an ambitious company in Kuwait launches a digital platform, brand trust is decided in milliseconds. Legacy template-driven websites suffer from sluggish mobile response, fragile plugins, and clumsy bilingual editing."
        ),
        ptBlock(
          "en-b2",
          "h2",
          "1. Sub-Second Speed & Core Web Vitals"
        ),
        ptBlock(
          "en-b3",
          "normal",
          "Next.js 16 combines React Server Components with fine-grained tag caching on the edge. Pages render nearly instantaneously on mobile networks across Kuwait and the GCC, consistently scoring 99+ on Google Lighthouse."
        ),
        {
          _key: "en-callout-1",
          _type: "callout",
          tone: "tip",
          title: "Arssan Engineering Standard",
          text: "Every 100ms of latency erodes conversion trust. We engineer all client platforms for sub-0.4s response times and zero layout shift.",
        },
        ptBlock(
          "en-b4",
          "h2",
          "2. Total Content & KWD Pricing Control via Sanity Studio"
        ),
        ptBlock(
          "en-b5",
          "normal",
          "Instead of waiting on developers for copy or pricing updates, an embedded Sanity Studio at /studio lets your team edit packages, KWD prices, portfolio projects, and bilingual articles with instant live preview."
        ),
        {
          _key: "en-table-1",
          _type: "dataTable",
          caption: "Legacy Monolithic Templates vs. Arssan Next.js + Sanity Architecture",
          headers: ["Benchmark", "Legacy Templates", "Next.js 16 + Sanity CMS"],
          rows: [
            {
              _key: "r1",
              cells: ["Mobile Load (LCP)", "3.2s – 5.5s", "< 0.4s"],
            },
            {
              _key: "r2",
              cells: [
                "Bilingual AR/EN Editing",
                "Fragile plugin overrides",
                "Structured side-by-side RTL/LTR fields",
              ],
            },
            {
              _key: "r3",
              cells: [
                "Security Posture",
                "Exposed database & plugin surface",
                "Decoupled API & immutable edge delivery",
              ],
            },
          ],
        },
        ptBlock(
          "en-b6",
          "h2",
          "3. Built for Search Engines & AI Agents"
        ),
        ptBlock(
          "en-b7",
          "normal",
          "Every page ships with structured JSON-LD schema, bilingual hreflang alternates, and native WebMCP / llms.txt agent discovery endpoints so both human buyers and AI search assistants find accurate data."
        ),
        {
          _key: "en-cta-1",
          _type: "ctaCard",
          badge: "Professional Package • 299 KWD",
          heading: "Launch your bilingual platform with an embedded CMS",
          description:
            "Our Professional tier includes bespoke UI/UX design, Next.js 16 development, Sanity CMS dashboard, and Kuwait SEO optimization.",
          buttonText: "Explore Professional Tier",
          buttonHref: "/en/pricing/professional",
          packageSlug: "professional",
        },
      ],
    },

    // Post 2 — Arabic
    {
      _id: "post-ar-bilingual-rtl-design-systems",
      _type: "post",
      language: "ar",
      translationKey: "bilingual-rtl-ltr-design-systems",
      title:
        "قواعد تصميم واجهات المستخدم ثنائية اللغة (عربي RTL / إنجليزي LTR) بمعايير عالمية",
      slug: {
        _type: "slug",
        current: "bilingual-rtl-ltr-ui-ux-design-rules",
      },
      excerpt:
        "كيف نبني أنظمة تصميم هادئة وعالية الوضوح تحترم التيبوغرافيا العربية واتجاه القراءة دون التضحية بالدقة الهندسية.",
      publishedAt: "2026-10-28T10:00:00.000Z",
      readingTimeMinutes: 4,
      featured: false,
      ...(projectImages["kuwait-showcase"]
        ? {
            coverImage: {
              ...projectImages["kuwait-showcase"],
              alt: "نظام تصميم ثنائي اللغة عربي وإنجليزي",
            },
          }
        : {}),
      categories: [{ _type: "reference", _ref: "blogCategory-ui-ux" }],
      tags: ["UI/UX", "RTL", "التيبوغرافيا العربية", "أنظمة التصميم"],
      author: { _type: "reference", _ref: "author-arssan-team" },
      body: [
        ptBlock(
          "p2-b1",
          "normal",
          "لا يقتصر التصميم ثنائي اللغة الناجح على عكس اتجاه الصفحة من اليسار إلى اليمين. الحروف العربية تمتلك نسب ارتفاع واتصال تختلف جذرياً عن الحروف اللاتينية، ما يتطلب نظاماً تيبوغرافياً مدروساً."
        ),
        ptBlock(
          "p2-b2",
          "h2",
          "1. ارتفاع الأسطر والمسافات الحرفية في العربية"
        ),
        ptBlock(
          "p2-b3",
          "normal",
          "بينما تستفيد العناوين الإنجليزية من تقليص المسافات الحرفية (Tight Letter-Spacing)، فإن تطبيق ذلك على الخط العربي يؤدي إلى تفكك الحروف. لذلك نفرض قيمة letter-spacing: 0 تلقائياً عند تفعيل اتجاه RTL مع رفع ارتفاع السطر في المقالات إلى 1.78 لراحة العين."
        ),
        {
          _key: "p2-code",
          _type: "codeBlock",
          language: "css",
          filename: "globals.css",
          code: `html[dir="rtl"],\nhtml[dir="rtl"] * {\n  font-family: var(--font-readex-pro), sans-serif !important;\n  letter-spacing: 0 !important;\n}`,
        },
        ptBlock(
          "p2-b4",
          "h2",
          "2. التباين العالي WCAG AAA والهدوء البصري"
        ),
        ptBlock(
          "p2-b5",
          "normal",
          "نعتمد في أرسان فلسفة التصميم الهادئ: خلفية نقية (#ffffff) مع نصوص داكنة عالية التباين (#0d0d0d بنسبة 18.5:1) وأسطح ثانوية ناعمة (#f3f3f3) تبرز المحتوى وتسهّل اتخاذ القرار."
        ),
      ],
    },

    // Post 2 — English
    {
      _id: "post-en-bilingual-rtl-design-systems",
      _type: "post",
      language: "en",
      translationKey: "bilingual-rtl-ltr-design-systems",
      title:
        "Designing Calm Bilingual UI/UX Systems: Arabic RTL & English LTR Rules",
      slug: {
        _type: "slug",
        current: "bilingual-rtl-ltr-ui-ux-design-rules",
      },
      excerpt:
        "How we craft Swiss-inspired design systems that feel native in both Arabic and English—balancing typographic scale, logical spacing tokens, and 18.5:1 WCAG AAA contrast.",
      publishedAt: "2026-10-28T10:00:00.000Z",
      readingTimeMinutes: 4,
      featured: false,
      ...(projectImages["kuwait-showcase"]
        ? {
            coverImage: {
              ...projectImages["kuwait-showcase"],
              alt: "Bilingual RTL and LTR UI Design System",
            },
          }
        : {}),
      categories: [{ _type: "reference", _ref: "blogCategory-ui-ux" }],
      tags: ["UI/UX", "RTL", "Design Systems", "Accessibility"],
      author: { _type: "reference", _ref: "author-arssan-team" },
      body: [
        ptBlock(
          "en-p2-b1",
          "normal",
          "True bilingual design goes far beyond flipping dir='rtl'. Arabic script has distinct vertical metrics, cursive connections, and reading cadence that must be honored alongside geometric Latin typography."
        ),
        ptBlock(
          "en-p2-b2",
          "h2",
          "1. Typographic Pairing & Zero Letter-Spacing in RTL"
        ),
        ptBlock(
          "en-p2-b3",
          "normal",
          "While Latin display headings benefit from tight negative tracking (-0.03em), negative or positive letter-spacing breaks connected Arabic glyphs. Our CSS architecture enforces zero letter-spacing across all RTL contexts and pairs Plus Jakarta Sans with Readex Pro."
        ),
        {
          _key: "en-p2-code",
          _type: "codeBlock",
          language: "css",
          filename: "globals.css",
          code: `html[dir="rtl"],\nhtml[dir="rtl"] * {\n  font-family: var(--font-readex-pro), sans-serif !important;\n  letter-spacing: 0 !important;\n}`,
        },
        ptBlock(
          "en-p2-b4",
          "h2",
          "2. Calm Competence & 18.5:1 Contrast"
        ),
        ptBlock(
          "en-p2-b5",
          "normal",
          "By reserving #0d0d0d on pure #ffffff canvas (18.5:1 WCAG AAA contrast) and using #f3f3f3 surfaces for secondary containers, long-form reading and high-intent commercial flows remain effortless across devices."
        ),
      ],
    },
  ];

  const allDocs = [
    siteSettingsDoc,
    homePageDoc,
    pricingSectionDoc,
    ...packageDocs,
    projectsPageDoc,
    ...projectCategoryDocs,
    ...projectDocs,
    ...partnerDocs,
    authorDoc,
    ...blogCategories,
    ...samplePosts,
  ];

  if (isDryRun) {
    console.log(`Dry run complete. Prepared ${allDocs.length} documents:`);
    for (const d of allDocs) {
      console.log(` - [${d._type}] ${d._id}`);
    }
    return;
  }

  let tx = client.transaction();
  for (const doc of allDocs) {
    tx = tx.createOrReplace(doc);
  }
  await tx.commit();
  console.log(`Successfully seeded ${allDocs.length} documents into Sanity!`);
}

main().catch((err) => {
  console.error("Seed script failed:", err);
  process.exit(1);
});
