/**
 * Accessibility SEO Utilities
 * Provides utilities for improving accessibility and WCAG compliance
 */

/**
 * Heading level validation
 * Ensures proper H1, H2, H3 hierarchy
 */
export function validateHeadingHierarchy(
  headings: Array<{ level: number; text: string }>,
) {
  const issues: string[] = [];

  // Check for missing H1
  const h1Count = headings.filter((h) => h.level === 1).length;
  if (h1Count === 0) {
    issues.push("Page is missing H1 heading");
  } else if (h1Count > 1) {
    issues.push(`Page has ${h1Count} H1 headings, but should have only one`);
  }

  // Check for heading hierarchy gaps
  let prevLevel = 0;
  for (const heading of headings) {
    if (heading.level > prevLevel + 1) {
      issues.push(
        `Heading hierarchy skipped from H${prevLevel} to H${heading.level}`,
      );
    }
    prevLevel = heading.level;
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Semantic HTML structure validation
 */
export const SemanticElements = [
  "header",
  "main",
  "section",
  "article",
  "footer",
  "aside",
  "nav",
];

export function validateSemanticStructure(html: string) {
  const issues: string[] = [];

  const hasHeader = html.includes("<header");
  const hasMain = html.includes("<main");
  const hasFooter = html.includes("<footer");

  if (!hasMain) {
    issues.push("Page is missing <main> element");
  }

  if (!hasHeader) {
    issues.push("Page is missing <header> element");
  }

  if (!hasFooter) {
    issues.push("Page is missing <footer> element");
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * ARIA label validation
 */
export interface AriaElement {
  element: string;
  label?: string;
  ariaLabel?: string;
}

export function validateAriaLabels(elements: AriaElement[]) {
  const issues: string[] = [];

  for (const elem of elements) {
    if (!elem.label && !elem.ariaLabel) {
      issues.push(`${elem.element} is missing aria-label or visual label`);
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Color contrast validator (should be checked in design)
 */
export const WCAG_CONTRAST_RATIOS = {
  AALarge: 3, // Large text: min 3:1
  AANormal: 4.5, // Normal text: min 4.5:1
  AAA: 7, // Enhanced: min 7:1
};

/**
 * Accessibility SEO checklist
 */
export const AccessibilityChecklist = {
  images: {
    title: "Image Alt Text",
    items: [
      "All images have descriptive alt text",
      "Alt text is not too long (max 125 characters)",
      'Alt text describes the image content, not the word "image"',
      'Decorative images use empty alt attribute (alt="")',
    ],
  },
  forms: {
    title: "Forms",
    items: [
      "All form inputs have associated labels",
      "Form validation messages are clear",
      "Error messages are announced to screen readers",
      "Placeholder text is not used as label substitute",
    ],
  },
  headings: {
    title: "Headings",
    items: [
      "Only one H1 per page",
      "Headings are in proper order (no skips)",
      "Headings describe content accurately",
      "Headings are not used for styling",
    ],
  },
  links: {
    title: "Links",
    items: [
      "Link text is descriptive",
      'No "click here" or generic link text',
      "No links with only icon or image without text",
      "Links have clear focus indicators",
    ],
  },
  semantic: {
    title: "Semantic HTML",
    items: [
      "Page has <header>, <main>, and <footer>",
      "Content uses appropriate semantic elements",
      "Navigation uses <nav> element",
      "Lists use <ul>, <ol>, or <dl> elements",
    ],
  },
  aria: {
    title: "ARIA Labels",
    items: [
      "Interactive elements have ARIA labels if needed",
      "Live regions use aria-live attribute",
      'Modal dialogs have aria-modal="true"',
      "Buttons have accessible names",
    ],
  },
};

/**
 * Get heading level
 */
export function getHeadingLevel(element: string): number {
  const match = element.match(/h(\d)/i);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Generate ARIA attributes for common patterns
 */
export function getAriaAttributes(elementType: string, customLabel?: string) {
  const ariaMap: Record<string, Record<string, string>> = {
    button: {
      role: "button",
      "aria-label": customLabel || "Button",
    },
    link: {
      role: "link",
    },
    navigation: {
      role: "navigation",
      "aria-label": customLabel || "Navigation",
    },
    search: {
      role: "search",
    },
    banner: {
      role: "banner",
    },
    contentinfo: {
      role: "contentinfo",
    },
    main: {
      role: "main",
    },
  };

  return ariaMap[elementType] || {};
}
