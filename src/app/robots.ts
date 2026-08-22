import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/admin", "/admin/", "/api/", "/action/"],
      },
    ],
    sitemap: "https://vadaanya.org/sitemap.xml",
  };
}
