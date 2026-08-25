import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/admin", "/admin/", "/api/", "/action/"],
      },
      {
        userAgent: "Googlebot-Image",
        disallow: ["/hero-1.jpg", "/hero-1.*"],
      },
    ],
    sitemap: "https://vadaanya.org/sitemap.xml",
  };
}
