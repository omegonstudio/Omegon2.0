/**
 * SEO Configuration and Metadata for OMEGON
 * Centralized metadata configuration for consistent SEO across all pages
 */

export const SITE_CONFIG = {
  // Domain and Base URL
  domain: "omegon.com.ar",
  siteUrl: "https://omegon.com.ar",
  siteName: "OMEGON",

  // Core Information
  title: "OMEGON | Diseño Web, Desarrollo Software y Transformación Digital",
  description:
    "OMEGON diseña soluciones digitales con propósito y desarrolla con precisión. Transformamos negocios mediante tecnología UX/UI, desarrollo web y software personalizado.",
  shortDescription: "Diseñamos con propósito, desarrollamos con precisión.",

  // Language and Region
  locale: "es_AR",
  language: "es",

  // Keywords - Primary and Secondary
  keywords: [
    "Desarrollo web",
    "Diseño UX/UI",
    "Software personalizado",
    "Transformación digital",
    "Inteligencia Artificial",
    "Agencia digital Argentina",
    "Soluciones tecnológicas",
    "Aplicaciones web",
    "Diseño de interfaces",
    "Consultoría digital",
  ],

  // Author and Creator Information
  author: {
    name: "OMEGON",
    email: "info@omegon.com.ar",
    url: "https://omegon.com.ar",
  },

  // Organization Information
  organization: {
    name: "OMEGON",
    url: "https://omegon.com.ar",
    logo: "https://omegon.com.ar/assets/logos/logo_omegon.jpg",
    email: "info@omegon.com.ar",
    foundingDate: "2020",
    address: {
      streetAddress: "Argentina",
      addressLocality: "Buenos Aires",
      addressCountry: "AR",
    },
    sameAs: [
      // Add your social media URLs here
      "https://linkedin.com/company/omegon",
      "https://instagram.com/omegon",
      "https://facebook.com/omegon",
    ],
  },

  // OpenGraph Images
  ogImage: {
    url: "https://omegon.com.ar/assets/logos/logo_omegon.jpg",
    width: 1200,
    height: 630,
    alt: "OMEGON - Diseño y Desarrollo Digital",
    type: "image/jpeg",
  },

  // Twitter Card
  twitterHandle: "@omegon_tech",

  // SEO Configuration
  robots: {
    index: true,
    follow: true,
    maxImagePreview: "large",
    maxSnippet: -1,
    maxVideoPreview: -1,
  },

  // Verification codes (add your actual codes)
  verification: {
    googleSiteVerification: "", // Add Google Search Console verification code
    yandexVerification: "", // Add Yandex Webmaster verification code
  },

  // Page Routes for Sitemap
  routes: {
    homepage: "/",
    services: "/services",
    portfolio: "/portfolio",
    about: "/about",
    contact: "/contact",
    blog: "/blog",
  },
};

/**
 * Generate optimized metadata for any page
 */
export function generateMetadata(overrides?: {
  title?: string;
  description?: string;
  keywords?: string[];
  url?: string;
  image?: string;
  type?: string;
}) {
  const title = overrides?.title
    ? `${overrides.title} | ${SITE_CONFIG.siteName}`
    : SITE_CONFIG.title;

  const description = overrides?.description || SITE_CONFIG.description;
  const url = overrides?.url || SITE_CONFIG.siteUrl;
  const image = overrides?.image || SITE_CONFIG.ogImage.url;

  return {
    title,
    description,
    keywords: overrides?.keywords || SITE_CONFIG.keywords,
    canonical: url,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.siteName,
      locale: SITE_CONFIG.locale,
      type: overrides?.type || "website",
      images: [
        {
          url: image,
          width: SITE_CONFIG.ogImage.width,
          height: SITE_CONFIG.ogImage.height,
          alt: overrides?.title || SITE_CONFIG.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: SITE_CONFIG.twitterHandle,
    },
  };
}

/**
 * Organization Schema (JSON-LD)
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.organization.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.siteUrl,
    logo: SITE_CONFIG.organization.logo,
    email: SITE_CONFIG.organization.email,
    foundingDate: SITE_CONFIG.organization.foundingDate,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.organization.address.addressLocality,
      addressCountry: SITE_CONFIG.organization.address.addressCountry,
    },
    sameAs: SITE_CONFIG.organization.sameAs,
  };
}

/**
 * Website Schema (JSON-LD)
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.organization.name,
    url: SITE_CONFIG.siteUrl,
    description: SITE_CONFIG.description,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.organization.name,
      logo: {
        "@type": "ImageObject",
        url: SITE_CONFIG.organization.logo,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.siteUrl}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * WebPage Schema (JSON-LD)
 */
export function getWebPageSchema(pageData?: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageData?.title || SITE_CONFIG.title,
    description: pageData?.description || SITE_CONFIG.description,
    url: pageData?.url || SITE_CONFIG.siteUrl,
    image: pageData?.image || SITE_CONFIG.ogImage.url,
    publishedDate: pageData?.datePublished || new Date().toISOString(),
    lastModified: pageData?.dateModified || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: pageData?.author || SITE_CONFIG.organization.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.organization.name,
      logo: {
        "@type": "ImageObject",
        url: SITE_CONFIG.organization.logo,
      },
    },
  };
}

/**
 * Service Schema (JSON-LD) - for service pages
 */
export function getServiceSchema(service: {
  name: string;
  description: string;
  url?: string;
  image?: string;
  provider?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url || SITE_CONFIG.siteUrl,
    image: service.image || SITE_CONFIG.ogImage.url,
    provider: {
      "@type": "Organization",
      name: service.provider || SITE_CONFIG.organization.name,
      url: SITE_CONFIG.siteUrl,
    },
    areaServed: "AR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios OMEGON",
      itemListElement: [],
    },
  };
}

/**
 * BreadcrumbList Schema (JSON-LD)
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQ Schema (JSON-LD)
 */
export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * AI Crawler User Agents
 */
export const AI_CRAWLERS = [
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "CCBot",
  "anthropic-ai",
  "cohere-ai",
];
