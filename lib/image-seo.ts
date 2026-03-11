/**
 * Image Optimization and SEO Utilities
 * Provides utilities for optimizing images and improving performance SEO
 */

/**
 * Image properties for optimal SEO and performance
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  title?: string;
}

/**
 * Generate optimized image props with best practices
 * Ensures proper alt text, lazy loading, and semantic markup
 */
export function getOptimizedImageProps({
  src,
  alt,
  width,
  height,
  lazy = true,
  title,
}: OptimizedImageProps) {
  return {
    src,
    alt,
    width,
    height,
    title: title || alt, // Use alt as title if not provided
    loading: lazy ? "lazy" : "eager",
    decoding: "async", // Allow browser to decode asynchronously
    // Modern image formats: use webp with fallback
    srcSet:
      width && height ? `${src} '1x', ${src}?w=${width * 2} 2x` : undefined,
  };
}

/**
 * Generate a semantic image wrapper with proper accessibility
 * Returns object with optimal attributes for <img> tag
 */
export function createSemanticImage(
  src: string,
  alt: string,
  options?: {
    width?: number;
    height?: number;
    priority?: boolean;
    quality?: number;
  },
) {
  if (!alt || alt.trim().length === 0) {
    console.warn(
      `Image at ${src} is missing alt text - this will impact SEO and accessibility`,
    );
  }

  return {
    src,
    alt,
    width: options?.width,
    height: options?.height,
    loading: options?.priority ? "eager" : "lazy",
    decoding: "async",
  };
}

/**
 * Structured image data for SEO
 */
export function getImageStructuredData(
  url: string,
  alt: string,
  width?: number,
  height?: number,
) {
  return {
    "@type": "ImageObject",
    url: url,
    description: alt,
    ...(width &&
      height && {
        width: width,
        height: height,
      }),
  };
}

/**
 * Check if image has required SEO attributes
 */
export function validateImageSEO(
  src: string,
  alt?: string,
): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];

  if (!src) {
    issues.push("Image src is missing");
  }

  if (!alt || alt.trim().length === 0) {
    issues.push("Image alt text is missing or empty");
  }

  if (alt && alt.length > 125) {
    issues.push(`Image alt text is too long (${alt.length}/125 characters)`);
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Generate CSS for lazy loading optimization
 */
export const lazyLoadingStyles = `
  img[loading="lazy"] {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

/**
 * Get Next.js Image component props optimized for SEO
 */
export function getNextImageProps(
  src: string,
  alt: string,
  width: number = 800,
  height: number = 600,
  priority: boolean = false,
) {
  return {
    src,
    alt,
    width,
    height,
    priority,
    quality: 75,
    loading: priority ? "eager" : "lazy",
    decoding: "async",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw",
  };
}
