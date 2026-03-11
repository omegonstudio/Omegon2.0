/**
 * Internal Linking SEO Utilities
 * Provides utilities for optimizing internal links and navigation
 */

import { SITE_CONFIG } from "./seo-config";

/**
 * Generate an SEO-optimized internal link
 */
export interface InternalLinkProps {
  href: string;
  label: string;
  title?: string;
  rel?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Get proper anchor text for internal links
 * Avoids generic text like "click here", "read more", etc.
 */
export function getOptimizedAnchorText(
  currentText: string,
  targetPage: string,
): { text: string; isOptimal: boolean; suggestion?: string } {
  const genericTexts = [
    "haz clic aquí",
    "click here",
    "más",
    "more",
    "leer más",
    "read more",
    "enlace",
    "link",
  ];

  const isGeneric = genericTexts.some((text) =>
    currentText.toLowerCase().includes(text),
  );

  if (isGeneric) {
    return {
      text: currentText,
      isOptimal: false,
      suggestion: `Consider using descriptive text like "${targetPage}" instead of "${currentText}"`,
    };
  }

  return {
    text: currentText,
    isOptimal: true,
  };
}

/**
 * Generate breadcrumb navigation
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Inicio",
      href: "/",
    },
  ];

  if (pathname !== "/") {
    const segments = pathname.split("/").filter(Boolean);
    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      if (!isLast) {
        breadcrumbs.push({
          label:
            segment.charAt(0).toUpperCase() +
            segment.slice(1).replace("-", " "),
          href: currentPath,
        });
      }
    });
  }

  return breadcrumbs;
}

/**
 * Generate sitemap links for important pages
 */
export interface SitemapLink {
  category: string;
  links: {
    title: string;
    href: string;
    description?: string;
  }[];
}

export function getSitemapLinks(): SitemapLink[] {
  return [
    {
      category: "Principales",
      links: [
        {
          title: "Inicio",
          href: "/",
          description: "Página principal de OMEGON",
        },
        {
          title: "Servicios",
          href: "/services",
          description: "Nuestros servicios de tecnología y diseño",
        },
        {
          title: "Portafolio",
          href: "/portfolio",
          description: "Proyectos destacados y casos de éxito",
        },
        {
          title: "Acerca de",
          href: "/about",
          description: "Conoce más sobre OMEGON",
        },
        {
          title: "Contacto",
          href: "/contact",
          description: "Ponte en contacto con nosotros",
        },
      ],
    },
    {
      category: "Blog",
      links: [
        {
          title: "Blog",
          href: "/blog",
          description: "Artículos y noticias sobre tecnología y diseño",
        },
      ],
    },
  ];
}

/**
 * Link hint for preloading important pages
 */
export function getLinkHints(): string[] {
  return [
    SITE_CONFIG.routes.services,
    SITE_CONFIG.routes.portfolio,
    SITE_CONFIG.routes.contact,
  ];
}

/**
 * Footer link structure with semantic importance
 */
export interface FooterLink {
  section: string;
  links: {
    title: string;
    href: string;
  }[];
}

export function getFooterLinks(): FooterLink[] {
  return [
    {
      section: "Servicios",
      links: [
        { title: "Desarrollo Web", href: SITE_CONFIG.routes.services },
        { title: "Diseño UX/UI", href: SITE_CONFIG.routes.services },
        { title: "Consultoría Digital", href: SITE_CONFIG.routes.services },
      ],
    },
    {
      section: "Empresa",
      links: [
        { title: "Acerca de", href: SITE_CONFIG.routes.about },
        { title: "Portafolio", href: SITE_CONFIG.routes.portfolio },
        { title: "Blog", href: SITE_CONFIG.routes.blog },
      ],
    },
    {
      section: "Legal",
      links: [
        { title: "Política de Privacidad", href: "/privacy" },
        { title: "Términos de Servicio", href: "/terms" },
      ],
    },
  ];
}
