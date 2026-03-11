/**
 * Social Media Meta Tags Optimization
 * Utilities for Open Graph, Twitter Card, and social preview optimization
 */

import { SITE_CONFIG } from "./seo-config";

/**
 * Social media platforms
 */
export type SocialPlatform =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "whatsapp"
  | "pinterest"
  | "instagram";

/**
 * Article metadata for content pages
 */
export interface ArticleMetadata {
  title: string;
  description: string;
  image: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  tags?: string[];
}

/**
 * Generate complete Open Graph metadata
 */
export function generateOpenGraphTags(pageData: {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "video" | "music";
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}) {
  return {
    "og:title": pageData.title,
    "og:description": pageData.description,
    "og:url": pageData.url,
    "og:site_name": SITE_CONFIG.siteName,
    "og:locale": SITE_CONFIG.locale,
    "og:type": pageData.type || "website",
    "og:image": pageData.image || SITE_CONFIG.ogImage.url,
    "og:image:width": SITE_CONFIG.ogImage.width.toString(),
    "og:image:height": SITE_CONFIG.ogImage.height.toString(),
    "og:image:alt": pageData.imageAlt || pageData.title,
    ...(pageData.author && { "article:author": pageData.author }),
    ...(pageData.publishedDate && {
      "article:published_time": pageData.publishedDate,
    }),
    ...(pageData.modifiedDate && {
      "article:modified_time": pageData.modifiedDate,
    }),
  };
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterCardTags(pageData: {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  creator?: string;
  type?: "summary" | "summary_large_image" | "app" | "player";
}) {
  return {
    "twitter:card": pageData.type || "summary_large_image",
    "twitter:title": pageData.title,
    "twitter:description": pageData.description,
    "twitter:image": pageData.image || SITE_CONFIG.ogImage.url,
    "twitter:image:alt": pageData.imageAlt || pageData.title,
    "twitter:creator": pageData.creator || SITE_CONFIG.twitterHandle,
    "twitter:site": SITE_CONFIG.twitterHandle,
  };
}

/**
 * Validate image for social sharing
 */
export function validateSocialImage(url: string): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!url) {
    errors.push("Social image URL is missing");
    return { isValid: false, errors, warnings };
  }

  // Check for absolute URL
  if (!url.startsWith("http")) {
    errors.push(
      "Social image must be an absolute URL (starting with http/https)",
    );
  }

  // Recommend ideal dimensions for different platforms
  if (!url.includes("1200") && !url.includes("1080")) {
    warnings.push(
      "Image should be at least 1200x630px (OpenGraph standard) or 1080x1080px (Instagram)",
    );
  }

  // Check for modern formats
  if (
    !url.includes(".jpg") &&
    !url.includes(".png") &&
    !url.includes(".webp")
  ) {
    warnings.push("Consider using PNG or JPG format for better compatibility");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Social platform specific recommendations
 */
export const SocialMediaGuidelines: Record<SocialPlatform, any> = {
  facebook: {
    name: "Facebook",
    idealImageSize: "1200x630",
    minImageSize: "600x315",
    imageRatios: "1.91:1",
    descriptionLength: 165,
    titleLength: 65,
    tips: [
      "Use og:image with 1200x630px dimensions",
      "Keep description under 165 characters",
      "Keep title under 65 characters",
      "Include og:url with exact current page URL",
      "Use og:type to specify content type",
    ],
  },
  twitter: {
    name: "Twitter",
    idealImageSize: "1200x675 or 1200x900",
    minImageSize: "506x506",
    imageRatios: "16:9 or 3:2 or 1:1",
    descriptionLength: 280,
    titleLength: 70,
    tips: [
      'Use twitter:card="summary_large_image" for image preview',
      "Keep text under 280 characters",
      "Use twitter:creator for author attribution",
      "Use twitter:site for your account",
      "Include clear, high-contrast images",
    ],
  },
  linkedin: {
    name: "LinkedIn",
    idealImageSize: "1200x627",
    minImageSize: "400x209",
    imageRatios: "1.91:1",
    descriptionLength: 230,
    titleLength: 100,
    tips: [
      "Use og:image with 1200x627px dimensions",
      "Professional images perform better",
      "Keep title clear and concise",
      "Include author information",
      "Use relevant hashtags in description",
    ],
  },
  whatsapp: {
    name: "WhatsApp",
    idealImageSize: "1200x630",
    minImageSize: "300x157",
    imageRatios: "1.91:1",
    descriptionLength: 165,
    titleLength: 65,
    tips: [
      "Uses OpenGraph metadata",
      "Shows first 300 characters of description",
      "Title should be engaging",
      "Image should be eye-catching",
      "Links are shared as web previews",
    ],
  },
  pinterest: {
    name: "Pinterest",
    idealImageSize: "1000x750",
    minImageSize: "600x750",
    imageRatios: "2:3 or 1:1",
    descriptionLength: 500,
    titleLength: 100,
    tips: [
      "Vertical images (2:3 ratio) perform best",
      "Use 1000x1500px for ideal tall image",
      "Include descriptive, keyword-rich description",
      "Pin title should describe the image",
      "Include rich pins metadata",
    ],
  },
  instagram: {
    name: "Instagram",
    idealImageSize: "1080x1080",
    minImageSize: "320x320",
    imageRatios: "1:1 or 4:5 (story)",
    descriptionLength: 2200,
    titleLength: 100,
    tips: [
      "Square images (1:1, 1080x1080px) perform best",
      "Stories use 9:16 ratio (1080x1920px)",
      "High quality, clear images essential",
      "Use hashtags effectively in caption",
      "Include call-to-action (CTAs)",
    ],
  },
};

/**
 * Test social media preview
 */
export interface SocialPreviewTest {
  platform: SocialPlatform;
  url: string;
  title: string;
  description: string;
  image: string;
}

export function generateSocialPreviewTest(
  platform: SocialPlatform,
  data: SocialPreviewTest,
) {
  const platformLinks: Record<SocialPlatform, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(data.title + "%20" + data.url)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(data.url)}&media=${encodeURIComponent(data.image)}&description=${encodeURIComponent(data.description)}`,
    instagram: `https://www.instagram.com/`, // Cannot directly share to feed
  };

  return {
    platform,
    shareUrl: platformLinks[platform],
    guidelines: SocialMediaGuidelines[platform],
  };
}

/**
 * Verify all required social meta tags
 */
export function verifySocialMetaTags(data: ArticleMetadata): {
  missingTags: string[];
  warnings: string[];
} {
  const missingTags: string[] = [];
  const warnings: string[] = [];

  // Check Open Graph tags
  if (!data.title) missingTags.push("og:title");
  if (!data.description) missingTags.push("og:description");
  if (!data.image) missingTags.push("og:image");

  // Check for recommended fields
  if (!data.author) warnings.push("article:author is recommended");
  if (!data.publishedDate)
    warnings.push("article:published_time is recommended");
  if (!data.modifiedDate) warnings.push("article:modified_time is recommended");

  // Validate content lengths
  if (data.title.length > 100) {
    warnings.push(`Title is ${data.title.length} characters (ideal: 50-100)`);
  }

  if (data.description.length > 165) {
    warnings.push(
      `Description is ${data.description.length} characters (ideal: 150-160)`,
    );
  }

  return {
    missingTags,
    warnings,
  };
}
