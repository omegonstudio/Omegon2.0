/**
 * Canonical URL and Duplicate Content Prevention Utilities
 */

import { SITE_CONFIG } from "./seo-config";

/**
 * Generate canonical URLs for pages
 */
export function getCanonicalUrl(pathname: string): string {
  // Remove trailing slash except for root
  const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  return `${SITE_CONFIG.siteUrl}${cleanPath}`;
}

/**
 * Validate canonical URL
 */
export function validateCanonicalUrl(url: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!url) {
    errors.push("Canonical URL is missing");
  }

  if (!url.startsWith("https://")) {
    errors.push("Canonical URL should use HTTPS protocol");
  }

  if (url.includes("?utm_") || url.includes("?ref=")) {
    errors.push("Canonical URL should not contain tracking parameters");
  }

  if (url.includes("#")) {
    errors.push("Canonical URL should not contain hash fragments");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Prevent self-referential canonicals (should point to preferred version)
 */
export function shouldAddCanonical(
  currentUrl: string,
  canonicalUrl: string,
): boolean {
  // Don't add if they're the same
  if (currentUrl === canonicalUrl) {
    return false;
  }

  // Only add canonical if there's actual duplication
  const current = new URL(currentUrl);
  const canonical = new URL(canonicalUrl);

  // Same domain is required
  if (current.hostname !== canonical.hostname) {
    return false;
  }

  return true;
}

/**
 * Duplicate content patterns to check
 */
export const DuplicateContentPatterns = {
  WWWVariant: {
    description: "www and non-www versions of the same page",
    solution: "Use canonical tag to point to preferred version",
  },
  HTTPSHTTPVariant: {
    description: "HTTPS and HTTP versions of the same page",
    solution: "Redirect HTTP to HTTPS and use canonical HTTPS URL",
  },
  TrailingSlash: {
    description: "URLs with and without trailing slash",
    solution: "Use canonical tag and configure server preferences",
  },
  SessionParameters: {
    description: "URLs with session IDs or tracking parameters",
    solution: "Use canonical tag to remove parameters",
  },
  QueryParameters: {
    description: "Different sort/filter parameters on same content",
    solution: "Use canonical tag to point to main faceted page",
  },
  PrintablePages: {
    description: "Separate print and web versions of same content",
    solution: "Use canonical tag on print version to point to web version",
  },
};

/**
 * Generate alternate language links (hreflang)
 */
export interface LanguageAlternate {
  lang: string;
  url: string;
}

export function getLanguageAlternates(pathname: string): LanguageAlternate[] {
  return [
    {
      lang: "es-AR",
      url: getCanonicalUrl(pathname),
    },
    {
      lang: "es",
      url: getCanonicalUrl(pathname),
    },
    {
      lang: "x-default",
      url: getCanonicalUrl(pathname),
    },
  ];
}

/**
 * Check for duplicate content issues
 */
export function checkDuplicateContent(
  url: string,
  contentHash: string,
  previousUrls?: Map<string, string>,
): {
  isDuplicate: boolean;
  duplicateUrl?: string;
  issue?: string;
} {
  if (!previousUrls) {
    return { isDuplicate: false };
  }

  for (const [prevUrl, prevHash] of previousUrls) {
    if (prevHash === contentHash && prevUrl !== url) {
      return {
        isDuplicate: true,
        duplicateUrl: prevUrl,
        issue: `Content is identical to ${prevUrl}`,
      };
    }
  }

  return { isDuplicate: false };
}

/**
 * Sitemap canonical URL validation
 */
export function validateSitemapCanonical(url: string): boolean {
  // Canonicals in sitemap should be clean URLs
  return (
    !url.includes("?") &&
    !url.includes("#") &&
    !url.includes("utm_") &&
    url.startsWith("https://")
  );
}
