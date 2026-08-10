import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/action/"],
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
