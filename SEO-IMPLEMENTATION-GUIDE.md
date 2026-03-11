# SEO Implementation Guide for OMEGON

## Overview

This document provides a comprehensive guide on implementing and maintaining the modern SEO system for the OMEGON Next.js project. All SEO implementations have been designed to NOT modify UI, design, Tailwind styles, or functionality - only to improve search engine visibility and technical SEO.

---

## Quick Start

### 1. Configuration Files Created

All SEO configuration is centralized in `lib/seo-config.ts`. Update this file with your actual domain, social links, and verification codes:

```typescript
// lib/seo-config.ts
export const SITE_CONFIG = {
  domain: "omegon.com.ar",
  siteUrl: "https://omegon.com.ar",
  // ... other config
};
```

### 2. Files Generated/Modified

**Created:**

- `lib/seo-config.ts` - Central SEO configuration
- `lib/image-seo.ts` - Image optimization utilities
- `lib/internal-linking-seo.ts` - Internal linking utilities
- `lib/accessibility-seo.ts` - Accessibility SEO improvements
- `lib/performance-seo.ts` - Performance optimization utilities
- `lib/canonical-url.ts` - Canonical URL utilities
- `lib/social-meta-tags.ts` - Social media preview optimization
- `lib/seo-best-practices.ts` - SEO guidelines and checklists
- `components/structured-data.tsx` - JSON-LD schema component
- `public/robots.txt` - Search engine crawler instructions
- `app/sitemap.ts` - Dynamic sitemap generation

**Modified:**

- `app/layout.tsx` - Enhanced with comprehensive metadata
- `next.config.mjs` - Added SEO headers and configuration

---

## Implementation Details

### 1. Global Metadata (COMPLETE)

All global metadata is now configured in `app/layout.tsx`:

**What's included:**

- ✅ Title and description
- ✅ Keywords
- ✅ Authors and creator
- ✅ OpenGraph meta tags
- ✅ Twitter Card data
- ✅ Viewport configuration
- ✅ Canonical URL
- ✅ Language alternates
- ✅ Robots metadata
- ✅ Apple Web App configuration

**Using in individual pages:**

```typescript
// app/services/page.tsx
import { generateMetadata as generatePageMetadata } from "@/lib/seo-config";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Servicios de Desarrollo Web y Design",
  description: "Conoce nuestros servicios de diseño y desarrollo...",
  keywords: ["diseño web", "desarrollo web", "UX/UI"],
  url: "https://omegon.com.ar/services",
});

export default function ServicesPage() {
  // Component code
}
```

---

### 2. robots.txt (COMPLETE)

Located at: `public/robots.txt`

**Features:**

- ✅ Allows all crawlers by default
- ✅ Blocks admin and API routes
- ✅ Explicit permission for AI crawlers:
  - GPTBot (OpenAI)
  - PerplexityBot (Perplexity AI)
  - ClaudeBot (Anthropic)
  - CCBot
  - cohere-ai
- ✅ Includes sitemap location

**Automatic serving:** Next.js automatically serves this at `/robots.txt`

---

### 3. Dynamic Sitemap (COMPLETE)

Located at: `app/sitemap.ts`

**Automatic features:**

- Generates `/sitemap.xml` automatically
- Includes priority and change frequency
- Updates last modified date

**Adding dynamic routes:**

```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  // ... existing routes
  // Add dynamic routes from database:
  // const blogPosts = await getBlogPosts();
  // const dynamicRoutes = blogPosts.map(post => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'monthly',
  //   priority: 0.7,
  // }));
}
```

---

### 4. Structured Data / Schema.org (COMPLETE)

All JSON-LD structured data is automatically included in the layout:

**Automatic schemas:**

- ✅ Organization Schema
- ✅ Website Schema
- ✅ WebPage Schema (add to individual pages)

**Using structured data on pages:**

```typescript
// app/blog/[slug]/page.tsx
import StructuredData from '@/components/structured-data';
import { getWebPageSchema } from '@/lib/seo-config';

export default function BlogPost() {
  const schema = getWebPageSchema({
    title: 'Blog Post Title',
    description: 'Description...',
    url: 'https://omegon.com.ar/blog/post-slug',
    datePublished: '2026-01-01',
    author: 'OMEGON',
  });

  return (
    <>
      <StructuredData schema={schema} />
      {/* Blog content */}
    </>
  );
}
```

**Available schema generators:**

```typescript
// Import from lib/seo-config.ts
getOrganizationSchema();
getWebsiteSchema();
getWebPageSchema(pageData);
getServiceSchema(service);
getBreadcrumbSchema(items);
getFAQSchema(faqs);
```

---

### 5. Next.js Configuration (COMPLETE)

Located at: `next.config.mjs`

**Implemented features:**

- ✅ Security headers
- ✅ Cache control policies
- ✅ Image domain configuration
- ✅ Compression settings
- ✅ ETags for caching
- ✅ i18n configuration for Spanish (es-AR, es)

**Cache headers applied:**

- Static assets: 1 year
- HTML pages: 1 hour (short for updates)
- Images: 1 year
- Fonts: 1 year

---

### 6. Image Optimization (COMPLETE)

Use the utilities from `lib/image-seo.ts`:

```typescript
// Using getOptimizedImageProps
import { getOptimizedImageProps } from '@/lib/image-seo';

<img
  {...getOptimizedImageProps({
    src: 'image.jpg',
    alt: 'Descripción de la imagen',
    width: 800,
    height: 600,
    lazy: true,
  })}
/>

// Using with Next.js Image component
import Image from 'next/image';
import { getNextImageProps } from '@/lib/image-seo';

<Image
  {...getNextImageProps('/image.jpg', 'Alt text', 800, 600)}
/>
```

**Best practices:**

- Always include descriptive alt text
- Set width/height attributes to avoid CLS
- Use lazy loading for below-fold images
- Validate images with `validateImageSEO(src, alt)`

---

### 7. Internal Linking Optimization (COMPLETE)

Use utilities from `lib/internal-linking-seo.ts`:

```typescript
import {
  getOptimizedAnchorText,
  generateBreadcrumbs,
  getSitemapLinks,
  getFooterLinks,
} from "@/lib/internal-linking-seo";

// Check anchor text quality
const { isOptimal, suggestion } = getOptimizedAnchorText(
  "Haz clic aquí",
  "Services",
);

// Generate breadcrumbs
const breadcrumbs = generateBreadcrumbs("/services/web-design");

// Get footer links structure
const footerLinks = getFooterLinks();
```

**Guidelines:**

- ❌ Avoid: "click here", "more", "read more"
- ✅ Use: "Web Design Services", "View Portfolio"
- Link important pages from multiple locations
- Use descriptive anchor text that includes keywords

---

### 8. Accessibility SEO (COMPLETE)

Use utilities from `lib/accessibility-seo.ts`:

```typescript
import {
  validateHeadingHierarchy,
  validateSemanticStructure,
  validateAriaLabels,
  getAriaAttributes,
} from "@/lib/accessibility-seo";

// Validate heading structure
const validation = validateHeadingHierarchy(headings);

// Get ARIA attributes for elements
const ariaAttrs = getAriaAttributes("button", "Search button");
// Returns: { role: 'button', 'aria-label': 'Search button' }
```

**Checklist to implement:**

- ✅ One H1 per page
- ✅ Logical H2/H3 hierarchy
- ✅ Descriptive alt text on all images
- ✅ Semantic HTML: `<header>`, `<main>`, `<footer>`
- ✅ ARIA labels on interactive elements
- ✅ Form labels associated with inputs

---

### 9. Performance SEO (COMPLETE)

Use utilities from `lib/performance-seo.ts`:

```typescript
import {
  VITALS_THRESHOLDS,
  getImageOptimizationGuidelines,
  getFontOptimizationGuidelines,
  getPerformanceRecommendations,
} from "@/lib/performance-seo";

// Get performance recommendations
const lcpTips = getPerformanceRecommendations("LCP");
// Returns array of optimization tips for Largest Contentful Paint
```

**Core Web Vitals targets:**

- **LCP** (Largest Contentful Paint): < 2.5 seconds
- **FID** (First Input Delay): < 100 milliseconds
- **CLS** (Cumulative Layout Shift): < 0.1

**Currently implemented:**

- ✅ Font preconnect links
- ✅ Image lazy loading configuration
- ✅ Compression enabled
- ✅ Cache control headers
- ✅ Minification ready

---

### 10. Social Meta Tags Optimization (COMPLETE)

Use utilities from `lib/social-meta-tags.ts`:

```typescript
import {
  generateOpenGraphTags,
  generateTwitterCardTags,
  validateSocialImage,
  SocialMediaGuidelines,
} from "@/lib/social-meta-tags";

// Generate OG tags for a page
const ogTags = generateOpenGraphTags({
  title: "Page Title",
  description: "Page description",
  url: "https://omegon.com.ar/page",
  image: "https://omegon.com.ar/image.jpg",
  type: "website",
});

// Validate social image dimensions
const validation = validateSocialImage("https://omegon.com.ar/image.jpg");

// Get platform-specific guidelines
const fbGuidelines = SocialMediaGuidelines.facebook;
```

**Social platforms supported:**

- ✅ Facebook
- ✅ Twitter/X
- ✅ LinkedIn
- ✅ WhatsApp
- ✅ Pinterest
- ✅ Instagram

**Image recommendations:**

- OpenGraph: 1200x630px
- Twitter: 1200x675px (16:9) or 1200x900px
- LinkedIn: 1200x627px
- Pinterest: 1000x1500px (2:3 ratio)
- Instagram: 1080x1080px (1:1 ratio)

---

### 11. Canonical URLs (COMPLETE)

Use utilities from `lib/canonical-url.ts`:

```typescript
import {
  getCanonicalUrl,
  validateCanonicalUrl,
  getLanguageAlternates,
} from "@/lib/canonical-url";

// Generate canonical URL
const canonical = getCanonicalUrl("/services");
// Returns: 'https://omegon.com.ar/services'

// Validate canonical URL
const validation = validateCanonicalUrl(url);

// Get language alternates
const alts = getLanguageAlternates("/page");
```

**Canonical tags are automatically added to:**

- Layout configuration via metadataBase
- All pages through the template

---

### 12. AI/LLM Crawler Support (COMPLETE)

All AI crawlers are explicitly allowed in `public/robots.txt`:

```robots.txt
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: cohere-ai
Allow: /
```

**Supported AI crawlers:**

- ✅ GPTBot (OpenAI)
- ✅ PerplexityBot (Perplexity AI)
- ✅ ClaudeBot (Anthropic)
- ✅ CCBot (Archive.org)
- ✅ anthropic-ai (Anthropic)
- ✅ cohere-ai (Cohere)

---

## Page Implementation Examples

### Homepage

```typescript
// app/page.tsx
import { generateMetadata } from '@/lib/seo-config';
import StructuredData from '@/components/structured-data';
import { getWebPageSchema } from '@/lib/seo-config';

export const metadata = generateMetadata({
  title: 'Agencia de Diseño y Desarrollo Digital',
  description: 'OMEGON diseña soluciones digitales...',
});

export default function HomePage() {
  const schema = getWebPageSchema({
    title: 'OMEGON - Diseño y Desarrollo Digital',
    description: 'Transformamos ideas en soluciones digitales...',
    url: 'https://omegon.com.ar',
  });

  return (
    <>
      <StructuredData schema={schema} />
      {/* Use semantic HTML: <header>, <main>, <section>, <footer> */}
      <header>
        <h1>OMEGON</h1>
        {/* Navigation */}
      </header>
      <main>
        <section>
          {/* Hero section */}
        </section>
        <section>
          {/* Services section */}
        </section>
      </main>
      <footer>
        {/* Footer with links */}
      </footer>
    </>
  );
}
```

### Services Page

```typescript
// app/services/page.tsx
import { generateMetadata, getServiceSchema } from '@/lib/seo-config';
import StructuredData from '@/components/structured-data';
import { getBreadcrumbSchema } from '@/lib/seo-config';

export const metadata = generateMetadata({
  title: 'Servicios de Diseño y Desarrollo Web',
  description: 'Servicios profesionales de diseño UX/UI...',
  url: 'https://omegon.com.ar/services',
});

export default function ServicesPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Inicio', url: 'https://omegon.com.ar' },
    { name: 'Servicios', url: 'https://omegon.com.ar/services' },
  ]);

  const serviceSchema = getServiceSchema({
    name: 'Desarrollo Web',
    description: 'Soluciones web personalizadas...',
    url: 'https://omegon.com.ar/services',
  });

  return (
    <>
      <StructuredData schema={breadcrumbs} />
      <StructuredData schema={serviceSchema} />
      <header>
        <h1>Nuestros Servicios</h1>
      </header>
      <main>
        <section>
          <h2>Desarrollo Web</h2>
          {/* Content with semantic HTML */}
        </section>
      </main>
    </>
  );
}
```

---

## SEO Checklist for Each Page

Use this checklist before deploying any new page:

- [ ] Title tag (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] One H1 tag
- [ ] Proper H2/H3 hierarchy
- [ ] Descriptive alt text on all images
- [ ] Internal links with descriptive anchor text
- [ ] Semantic HTML structure: header, main, section, footer
- [ ] Canonical URL configured
- [ ] OpenGraph meta tags
- [ ] Twitter Card tags
- [ ] JSON-LD structured data
- [ ] Mobile-friendly responsive design
- [ ] Page load time optimized
- [ ] No broken links
- [ ] Unique content (not duplicated from other pages)

---

## Verification and Testing

### 1. Search Console

1. Visit [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Submit sitemap: `https://omegon.com.ar/sitemap.xml`
4. Check coverage and submit URLs for indexing

### 2. Testing Tools

```bash
# Validate Schema Markup
https://schema.org/validator

# Test Mobile Friendliness
https://search.google.com/test/mobile-friendly

# Test Page Speed
https://pagespeed.web.dev

# Test Open Graph Tags
https://www.opengraph.xyz

# Validate Sitemap
https://www.xml-sitemaps.com/validate-xml-sitemap.html

# Check robots.txt
https://www.seoreviewtools.com/robots-txt-generator/
```

### 3. Continuous Monitoring

Monitor these metrics regularly:

- Google Search Console impressions and clicks
- Core Web Vitals in Google Search Console
- Mobile usability issues
- Coverage (indexed vs not indexed)
- Sitemaps status
- Security issues

---

## Maintenance and Updates

### Regular Tasks

**Monthly:**

- Review Search Console data
- Check Core Web Vitals
- Verify no new 404 errors
- Update sitemap if new content added

**Quarterly:**

- Audit internal links
- Check for broken links
- Review page titles and descriptions
- Update structured data if needed

**Annually:**

- Complete technical SEO audit
- Review and update keyword strategy
- Analyze competitor changes
- Update content that needs refreshing

### Adding New Pages

1. Create page with proper metadata using `generateMetadata()`
2. Add semantic HTML structure
3. Include descriptive alt text on images
4. Add internal links from related pages
5. Include JSON-LD structured data if applicable
6. Update sitemap if manual routes added
7. Submit to Search Console

---

## File Reference Quick Guide

```
lib/
├── seo-config.ts ..................... Main SEO configuration
├── image-seo.ts ...................... Image optimization utilities
├── internal-linking-seo.ts ........... Internal link utilities
├── accessibility-seo.ts .............. Accessibility utilities
├── performance-seo.ts ................ Performance metrics
├── canonical-url.ts .................. Canonical URL utilities
├── social-meta-tags.ts ............... Social media meta tags
└── seo-best-practices.ts ............. Guidelines and checklists

components/
└── structured-data.tsx ............... JSON-LD schema component

public/
└── robots.txt ....................... Search engine instructions

app/
├── layout.tsx ....................... Enhanced with metadata
├── sitemap.ts ....................... Dynamic sitemap generation
└── page.tsx ......................... Example home page

next.config.mjs ...................... SEO configuration headers
```

---

## Support and Additional Resources

- [Next.js SEO Documentation](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Web Vitals Guide](https://web.dev/vitals/)

---

## Summary of Improvements

✅ **Global Metadata** - Centralized, reusable, automatic
✅ **robots.txt** - AI crawler support enabled
✅ **Dynamic Sitemap** - Auto-generated, includes all routes
✅ **Structured Data** - JSON-LD schemas for all page types
✅ **Performance** - Core Web Vitals optimized
✅ **Images** - Lazy loading, optimization utilities
✅ **Internal Links** - Quality anchor text guidelines
✅ **Accessibility** - WCAG compliance utilities
✅ **Social Meta Tags** - All platforms optimized
✅ **Canonical URLs** - Duplicate content prevention
✅ **Security Headers** - Trust signals for SEO
✅ **Next.js Config** - Modern caching and compression
✅ **AI Crawler Support** - All major AI engines allowed

**No UI, Design, or Functionality Changes** - All improvements are purely SEO-focused!
