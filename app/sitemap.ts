/**
 * Dynamic Sitemap Generation
 * Generates sitemap.xml dynamically with all routes
 * Next.js automatically converts this to a sitemap at /sitemap.xml
 */

import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.siteUrl;
  const today = new Date().toISOString().split("T")[0];

  // Main pages with their priorities and change frequencies
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // TODO: If you have dynamic routes (e.g., blog posts, portfolio items),
  // fetch them from your database and add them here
  // Example:
  // const blogPosts = await getBlogPosts();
  // const dynamicRoutes = blogPosts.map(post => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt.toISOString().split('T')[0],
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.7,
  // }));
  // routes.push(...dynamicRoutes);

  return routes;
}
