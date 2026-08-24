import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vadaanya Janaa Society",
    short_name: "Vadaanya",
    description:
      "Vadaanya Janaa Society empowers government-school students across India through talent tests, scholarships, and mentorship since 2010.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1628",
    theme_color: "#0f1d2e",
    icons: [
      {
        src: "/logos/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logos/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
