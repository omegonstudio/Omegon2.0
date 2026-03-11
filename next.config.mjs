/** @type {import('next').NextConfig} */
const nextConfig = {
  // Linting configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization configuration
  images: {
    unoptimized: true,
    domains: [
      "omegon.com.ar",
      "www.omegon.com.ar",
      // Add any external image domains here
    ],
  },

  // Security and SEO headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Security headers (also good for SEO trust signals)
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Performance hints
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          // Cache control for static assets
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache headers for HTML (short cache for dynamic content)
      {
        source: "/(.*\\.html?)?$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400",
          },
        ],
      },
      // Cache headers for images
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache headers for fonts
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Redirect non-www to www (uncomment and adjust as needed)
      // {
      //   source: '/:path*',
      //   destination: 'https://www.omegon.com.ar/:path*',
      //   permanent: true,
      //   has: [
      //     {
      //       type: 'host',
      //       value: 'omegon.com.ar',
      //     },
      //   ],
      // },
    ];
  },

  // Rewrites for clean URLs
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // Compression
  compress: true,

  // Generate ETags
  generateEtags: true,

  // Enable SWR (Stale-While-Revalidate) for incremental static regeneration
  swcMinify: true,

  // Experimental features for better performance
  experimental: {
    // Optimize CSS-in-JS
    optimizeCss: true,
    // Optimize fonts
    optimizeFonts: true,
  },

  // Internationalization setup (optional, for language support)
  i18n: {
    locales: ["es-AR", "es"],
    defaultLocale: "es-AR",
  },
};

export default nextConfig;
