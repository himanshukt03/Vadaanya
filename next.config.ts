import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const staticCacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import'],
  },
  experimental: {
    optimizePackageImports: [
      'swiper',
      'lucide-react',
      'react-fast-marquee',
      'react-toastify',
      'react-player',
      'yet-another-react-lightbox',
      'react-redux',
      '@reduxjs/toolkit',
      'bootstrap',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    qualities: [75, 80, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vadaanya.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.vadaanya.org",
        pathname: "/**",
      },
      {
        // YouTube thumbnails (img.youtube.com CDN)
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        // YouTube thumbnails (i.ytimg.com CDN — used by RSS feed)
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        // Sanity CDN images
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/news-english/(.*)",
        headers: staticCacheHeaders,
      },
      {
        source: "/news-telugu/(.*)",
        headers: staticCacheHeaders,
      },
    ];
  },
};

export default nextConfig;
