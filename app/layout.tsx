import "./globals.css";
import { Exo } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Providers from "./providers";
import {
  SITE_CONFIG,
  getOrganizationSchema,
  getWebsiteSchema,
} from "@/lib/seo-config";

const exo = Exo({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
});

export const metadata: Metadata = {
  // Character set and language
  charset: "utf-8",

  // Title and Description
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.siteName}`,
  },
  description: SITE_CONFIG.description,

  // Keywords
  keywords: SITE_CONFIG.keywords,

  // Author and Creator
  authors: [
    {
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    },
  ],
  creator: SITE_CONFIG.author.name,
  publisher: SITE_CONFIG.organization.name,

  // Metadata
  metadataBase: new URL(SITE_CONFIG.siteUrl),

  // Canonical URL
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
    languages: {
      "es-AR": SITE_CONFIG.siteUrl,
      es: SITE_CONFIG.siteUrl,
    },
  },

  // SEO Configuration
  robots: {
    index: SITE_CONFIG.robots.index,
    follow: SITE_CONFIG.robots.follow,
    "max-image-preview": SITE_CONFIG.robots.maxImagePreview,
    "max-snippet": SITE_CONFIG.robots.maxSnippet,
    "max-video-preview": SITE_CONFIG.robots.maxVideoPreview,
  },

  // OpenGraph Protocol
  openGraph: {
    type: "website",
    url: SITE_CONFIG.siteUrl,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.siteName,
    locale: SITE_CONFIG.locale,
    images: [
      {
        url: SITE_CONFIG.ogImage.url,
        width: SITE_CONFIG.ogImage.width,
        height: SITE_CONFIG.ogImage.height,
        alt: SITE_CONFIG.ogImage.alt,
        type: SITE_CONFIG.ogImage.type,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage.url],
    creator: SITE_CONFIG.twitterHandle,
    site: SITE_CONFIG.twitterHandle,
  },

  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_CONFIG.siteName,
  },

  // Additional meta tags for AI/LLM crawlers
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Structured Data
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <html lang={SITE_CONFIG.language} className={exo.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Favicon and icons */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />

        {/* Canonical URL */}
        <link rel="canonical" href={SITE_CONFIG.siteUrl} />

        {/* Alternative language links */}
        <link rel="alternate" hrefLang="es-AR" href={SITE_CONFIG.siteUrl} />
        <link rel="alternate" hrefLang="es" href={SITE_CONFIG.siteUrl} />

        {/* Color scheme */}
        <meta name="color-scheme" content="dark light" />

        {/* Additional SEO meta tags */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="revisit-after" content="7 days" />

        {/* AI/LLM Crawler Support */}
        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="bingbot"
          content="index, follow, max-image-preview:large, max-snippet:-1"
        />

        {/* Google Site Verification (add your code) */}
        {SITE_CONFIG.verification.googleSiteVerification && (
          <meta
            name="google-site-verification"
            content={SITE_CONFIG.verification.googleSiteVerification}
          />
        )}

        {/* Yandex Site Verification (add your code) */}
        {SITE_CONFIG.verification.yandexVerification && (
          <meta
            name="yandex-verification"
            content={SITE_CONFIG.verification.yandexVerification}
          />
        )}

        {/* Organization Schema (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          suppressHydrationWarning
        />

        {/* Website Schema (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          suppressHydrationWarning
        />
      </head>
      <body className="min-h-screen bg-black text-white font-sans antialiased">
        <Providers>
          {/* Main content wrapper with semantic HTML */}
          <div role="main">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
