/**
 * SEO Best Practices Guide
 * Reference guide for implementing SEO best practices throughout the project
 */

/**
 * On-Page SEO Checklist
 */
export const OnPageSEOChecklist = {
  titleTag: {
    priority: "Critical",
    guidelines: [
      "Keep between 50-60 characters for optimal display",
      "Include primary keyword near the beginning",
      "Make each title unique on the site",
      "Avoid keyword stuffing",
      "Include brand name for homepage",
      "Use primary keyword + secondary keyword + brand",
    ],
    example: "Desarrollo Web y Diseño UX/UI | OMEGON",
  },
  metaDescription: {
    priority: "Critical",
    guidelines: [
      "Keep between 150-160 characters",
      "Include target keywords naturally",
      "Write compelling copy that encourages clicks",
      "Include a call-to-action when appropriate",
      "Make each description unique",
      "Avoid copying competitor descriptions",
    ],
    example:
      "OMEGON diseña soluciones digitales innovadoras. Desarrollo web, diseño UX/UI y transformación digital para tu negocio.",
  },
  h1Tag: {
    priority: "Critical",
    guidelines: [
      "Only ONE H1 per page",
      "Should match or closely relate to page title",
      "Include primary keyword if natural",
      "Make it descriptive and compelling",
      "Keep under 70 characters",
      "Should tell user what page is about at a glance",
    ],
  },
  headingHierarchy: {
    priority: "High",
    guidelines: [
      "Use H2 for main sections",
      "Use H3 for subsections within H2s",
      "Never skip heading levels (e.g., H1 to H3)",
      "Each heading should be descriptive",
      "Avoid using headings for styling",
      "Create logical content structure",
    ],
  },
  keywordPlacement: {
    priority: "High",
    guidelines: [
      "Primary keyword in H1",
      "Primary keyword in first paragraph",
      "Secondary keywords in H2/H3 tags",
      "Keywords in meta description",
      "Keywords in image alt text",
      "Natural keyword usage (avoid stuffing)",
    ],
  },
  internalLinks: {
    priority: "High",
    guidelines: [
      "Use descriptive anchor text",
      'Avoid "click here" or generic text',
      "Link to related pages with relevant keywords",
      "Ensure important pages are linked",
      "Use exact match anchor text sparingly",
      "Maintain 3-5 internal links per 1000 words",
    ],
  },
  contentQuality: {
    priority: "Critical",
    guidelines: [
      "Comprehensive coverage of topic (>300 words)",
      "Unique and original content",
      "Well-organized and readable",
      "Answer user search intent",
      "Include relevant examples",
      "Update content regularly",
    ],
  },
  images: {
    priority: "High",
    guidelines: [
      "Descriptive alt text (125 chars max)",
      "Optimized file size",
      "Responsive and properly sized",
      "Modern format (WebP with fallback)",
      "Lazy load images below fold",
      "Set width and height attributes",
    ],
  },
};

/**
 * Technical SEO Checklist
 */
export const TechnicalSEOChecklist = {
  siteSpeed: {
    priority: "Critical",
    guidelines: [
      "LCP (Largest Contentful Paint) < 2.5s",
      "FID (First Input Delay) < 100ms",
      "CLS (Cumulative Layout Shift) < 0.1",
      "First Contentful Paint (FCP) < 1.8s",
      "Time to First Byte (TTFB) < 0.6s",
    ],
  },
  mobileOptimization: {
    priority: "Critical",
    guidelines: [
      "Responsive design (mobile-first)",
      "Touch-friendly buttons/links (48x48px minimum)",
      "Readable font size (16px minimum)",
      "No intrusive interstitials",
      "Fast mobile page speed",
      "Proper viewport configuration",
    ],
  },
  https: {
    priority: "Critical",
    guidelines: [
      "HTTPS enabled on all pages",
      "Valid SSL certificate",
      "No mixed content warnings",
      "Secure all user input",
    ],
  },
  siteStructure: {
    priority: "High",
    guidelines: [
      "Clear URL structure",
      "Logical category organization",
      "Maximum 3 clicks to any page",
      "Descriptive URLs (not parameters)",
      "Consistent URL format",
      "Proper 404 error pages",
    ],
  },
  canonicalTags: {
    priority: "High",
    guidelines: [
      "One canonical per page",
      "Points to preferred version",
      "Uses HTTPS",
      "No trailing slash inconsistency",
      "Not to different domains",
      "Self-referential when no duplicate",
    ],
  },
  robots: {
    priority: "High",
    guidelines: [
      "robots.txt blocks appropriate pages",
      "Allow AI/LLM crawlers",
      "Crawl-delay only if necessary",
      "Sitemap URL included",
      "No overly restrictive rules",
    ],
  },
  sitemap: {
    priority: "High",
    guidelines: [
      "Sitemap.xml exists and is valid",
      "Includes all important pages",
      "Does not include noindex pages",
      "Submitted to search consoles",
      "Updated regularly",
      "Proper priority and changefreq",
    ],
  },
  structuredData: {
    priority: "High",
    guidelines: [
      "Organization schema included",
      "Website schema included",
      "WebPage schema on pages",
      "BreadcrumbList on navigation",
      "Valid JSON-LD format",
      "No duplicate schemas",
    ],
  },
};

/**
 * Off-Page SEO Checklist
 */
export const OffPageSEOChecklist = {
  backlinks: {
    priority: "High",
    guidelines: [
      "Build quality backlinks from relevant sites",
      "Avoid paid link schemes",
      "Link to trustworthy domains (DA > 30)",
      "Get links from sites in your industry",
      "Vary anchor text naturally",
      "Monitor backlink profile regularly",
    ],
  },
  socialSignals: {
    priority: "Medium",
    guidelines: [
      "Share content on social media",
      "Get social engagement/shares",
      "Include social sharing buttons",
      "Open Graph meta tags complete",
      "Twitter Card tags complete",
      "Professional social profiles",
    ],
  },
  brandBuilding: {
    priority: "Medium",
    guidelines: [
      "Consistent brand messaging",
      "Active social media presence",
      "Positive online reviews",
      "Industry mentions and citations",
      "Author authority building",
      "E-A-T signals (expertise, authority, trustworthiness)",
    ],
  },
};

/**
 * Content SEO Guidelines
 */
export const ContentSEOGuidelines = {
  wordCount: {
    recommended: "1500-2000+",
    guideline: "Longer content (1500+ words) typically ranks better",
    exceptions: "News, snippets can be shorter if comprehensive",
  },
  keywordDensity: {
    recommended: "1-2%",
    guideline: "Include keyword naturally throughout content",
    warning: "Above 3% may be considered keyword stuffing",
  },
  readability: {
    guidelines: [
      "Flesch Reading Ease score > 60",
      "Average sentence length < 20 words",
      "Short paragraphs (3-4 sentences)",
      "Use subheadings frequently",
      "Include lists and bullet points",
      "Bold important keywords/phrases",
    ],
  },
  contentFreshness: {
    guidelines: [
      "Initial publish date visible",
      "Last update date displayed",
      "Regular content updates",
      "Remove outdated information",
      "Add new information/statistics",
      "Update links to avoid 404s",
    ],
  },
};

/**
 * SEO Tools and Resources
 */
export const SEOTools = {
  analysis: [
    "Google Search Console - Track impressions, clicks, rankings",
    "Google Analytics - Track user behavior and conversions",
    "Page Speed Insights - Analyze page speed and Web Vitals",
    "Mobile-Friendly Test - Check mobile responsiveness",
    "Lighthouse - Analyze performance, SEO, accessibility",
  ],
  research: [
    "Google Keyword Planner - Find keyword volume and CPC",
    "Ahrefs - Analyze competitors and backlinks",
    "SEMrush - Competitor research and keyword analysis",
    "Moz - Rank tracking and backlink analysis",
    "Ubersuggest - Keyword and content ideas",
  ],
  testing: [
    "Schema Markup Validator - Validate structured data",
    "Mobile-Friendly Test - Test mobile experience",
    "Open Graph Debugger - Test social meta tags",
    "Broken Link Checker - Find 404 links",
    "GTmetrix - Detailed performance analysis",
  ],
};

/**
 * Search Intent Types
 */
export const SearchIntent = {
  informational: {
    description: "User wants to learn about something",
    examples: ["How to optimize images", "What is SEO"],
    contentType: "Blog posts, guides, tutorials",
  },
  navigational: {
    description: "User wants to find a specific website/page",
    examples: ["OMEGON website", "OMEGON contact"],
    contentType: "Brand pages, service pages",
  },
  commercial: {
    description: "User is evaluating products/services before buying",
    examples: ["Best web agencies", "Cheapest web hosting"],
    contentType: "Comparison pages, case studies, reviews",
  },
  transactional: {
    description: "User wants to buy something or take action",
    examples: ["Buy domain name", "Hire web developer"],
    contentType: "Product pages, pricing pages, sign-up pages",
  },
};

/**
 * Common SEO Mistakes to Avoid
 */
export const CommonSEOMistakes = [
  "Duplicate content across pages",
  "Thin content (< 300 words)",
  "Keyword stuffing",
  "Broken internal links (404s)",
  "Missing or poor meta descriptions",
  'Non-descriptive anchor text ("click here")',
  "Images without alt text",
  "Slow page speed",
  "Not mobile-friendly",
  "Missing structured data",
  "Broken external links",
  "Auto-playing videos/music",
  "Intrusive pop-ups/ads",
  "Redirects chains",
  "Mixed HTTP/HTTPS content",
  "Blocking robots.txt incorrectly",
  "Not submitting sitemap",
  "Poor heading hierarchy",
  "Duplicate title tags",
  "No canonical tags for duplicates",
];
