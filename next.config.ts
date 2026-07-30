import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import'],
  },
  images: {
    qualities: [75, 85],
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
        // YouTube thumbnails
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
