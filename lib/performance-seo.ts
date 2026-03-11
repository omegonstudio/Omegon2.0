/**
 * Performance SEO Utilities
 * Provides utilities for Core Web Vitals and performance optimization
 */

/**
 * Core Web Vitals metrics
 */
export interface CoreWebVitals {
  LCP: number; // Largest Contentful Paint (in ms) - should be < 2.5s
  FID: number; // First Input Delay (in ms) - should be < 100ms
  CLS: number; // Cumulative Layout Shift (unitless) - should be < 0.1
}

export interface WebVitalsThresholds {
  good: number;
  needsImprovement: number;
}

export const VITALS_THRESHOLDS: Record<string, WebVitalsThresholds> = {
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
};

/**
 * Image optimization recommendations
 */
export interface ImageOptimization {
  recommendations: string[];
  tips: string[];
}

export function getImageOptimizationGuidelines(): ImageOptimization {
  return {
    recommendations: [
      "Use next/image component for automatic optimization",
      "Serve modern formats (WebP) with fallbacks",
      "Implement lazy loading for below-the-fold images",
      "Set appropriate width and height attributes",
      "Use responsive image sizes (srcset)",
      "Compress images without losing quality",
      "Use CDN for image delivery",
    ],
    tips: [
      "Optimize hero images as they impact LCP",
      "Use placeholder blur while loading (LQIP)",
      "Implement srcset for different screen sizes",
      "Use CSS for decorative images when possible",
      "Avoid serving unnecessarily large images",
    ],
  };
}

/**
 * Font performance optimization
 */
export interface FontOptimization {
  recommendations: string[];
  tips: string[];
}

export function getFontOptimizationGuidelines(): FontOptimization {
  return {
    recommendations: [
      "Use font-display: swap to prevent FOUT",
      "Preload critical fonts in <head>",
      "Subset or limit font files to needed characters",
      "Consider variable fonts to reduce file count",
      "Load fonts from same origin when possible",
      "Use font-display: fallback for non-critical fonts",
    ],
    tips: [
      "Limit to 2-3 font families maximum",
      "Avoid loading fonts in <head> before other resources",
      "Consider system fonts to reduce requests",
      "Use only needed font weights and styles",
      "Use @font-face with proper format declarations",
    ],
  };
}

/**
 * Script optimization recommendations
 */
export interface ScriptOptimization {
  recommendations: string[];
  tips: string[];
}

export function getScriptOptimizationGuidelines(): ScriptOptimization {
  return {
    recommendations: [
      "Use dynamic imports for non-critical JavaScript",
      "Implement code splitting at route level",
      "Defer non-critical third-party scripts",
      "Use async for non-render-blocking scripts",
      "Minimize JavaScript bundle size",
      "Enable compression (gzip/brotli)",
    ],
    tips: [
      "Analytics and ads should be async or deferred",
      "Use web workers for heavy computations",
      "Consider removing unused polyfills",
      "Tree-shake unused code and dependencies",
      "Monitor bundle size in CI/CD pipeline",
    ],
  };
}

/**
 * CSS optimization recommendations
 */
export interface CSSOptimization {
  recommendations: string[];
  tips: string[];
}

export function getCSSOptimizationGuidelines(): CSSOptimization {
  return {
    recommendations: [
      "Inline critical CSS above the fold",
      "Defer non-critical CSS",
      "Remove unused CSS rules",
      "Minify CSS files",
      "Use CSS classes instead of inline styles",
      "Enable gzip compression",
    ],
    tips: [
      "Extract critical CSS for above-fold content",
      "Use PurgeCSS or similar tools",
      "Avoid @import in CSS files",
      "Optimize media queries for mobile first",
      "Use CSS variables for maintainability",
    ],
  };
}

/**
 * HTML optimization recommendations
 */
export interface HTMLOptimization {
  recommendations: string[];
  tips: string[];
}

export function getHTMLOptimizationGuidelines(): HTMLOptimization {
  return {
    recommendations: [
      "Minify HTML in production",
      "Remove unnecessary whitespace",
      "Use semantic HTML elements",
      "Defer rendering of below-fold content",
      "Use CDN for static assets",
      "Implement resource hints (preload, prefetch)",
    ],
    tips: [
      'Use <link rel="preconnect"> for critical origins',
      'Use <link rel="dns-prefetch"> for DNS lookup',
      'Use <link rel="prefetch"> for likely next page',
      "Place script tags at end of body",
      "Avoid inline script in critical rendering path",
    ],
  };
}

/**
 * Performance SEO checklist
 */
export const PerformanceSEOChecklist = {
  images: {
    title: "Image Optimization",
    checks: [
      "Images are served in next-gen format (WebP)",
      "Appropriate image size for container",
      "Images are lazy-loaded below fold",
      "Responsive images with srcset",
      "No oversized images for mobile",
    ],
  },
  fonts: {
    title: "Font Optimization",
    checks: [
      "Fonts use font-display: swap",
      "Critical fonts are preloaded",
      "Font files are subset/minimized",
      "System fonts used where appropriate",
      "Font loading does not block rendering",
    ],
  },
  scripts: {
    title: "Script Optimization",
    checks: [
      "Third-party scripts are async/defer",
      "Code splitting implemented",
      "Unused JavaScript removed",
      "Analytics loaded asynchronously",
      "Bundle size is monitored",
    ],
  },
  css: {
    title: "CSS Optimization",
    checks: [
      "Critical CSS is inlined",
      "Non-critical CSS is deferred",
      "Unused CSS is removed",
      "CSS is minified",
      "No render-blocking CSS",
    ],
  },
  network: {
    title: "Network Optimization",
    checks: [
      "Compression enabled (gzip/brotli)",
      "HTTP/2 or HTTP/3 enabled",
      "CDN used for static assets",
      "Resource hints implemented",
      "Cache headers configured",
    ],
  },
};

/**
 * Get performance recommendations for a specific metric
 */
export function getPerformanceRecommendations(
  metric: "LCP" | "FID" | "CLS",
): string[] {
  const recommendations: Record<string, string[]> = {
    LCP: [
      "Optimize images (use WebP, lazy load, responsive)",
      "Preload critical resources",
      "Reduce CSS/JavaScript",
      "Use a CDN for static assets",
      "Enable compression",
      "Minimize CSS-in-JS",
    ],
    FID: [
      "Reduce JavaScript execution time",
      "Use code splitting and lazy loading",
      "Use web workers for heavy tasks",
      "Reduce main thread work",
      "Optimize JavaScript bundles",
      "Defer non-critical scripts",
    ],
    CLS: [
      "Set explicit dimensions for images/videos",
      "Avoid inserting content above existing content",
      "Use CSS transforms for animations",
      "Avoid format-changing animations",
      "Use pointer-events: none during animations",
      "Reserve space for dynamic content",
    ],
  };

  return recommendations[metric] || [];
}
