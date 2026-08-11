import Providers from "@/layouts/Providers";
import "../styles/index.scss";
import { Poppins, Inter } from 'next/font/google';
import type { Metadata } from "next";
import JsonLd, { getOrganizationJsonLd } from "@/components/common/JsonLd";
import { getSiteUrl } from "@/lib/siteUrl";

const poppins = Poppins({
  subsets: ['latin'],
  display: "swap",
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  display: "swap",
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vadaanya Janaa Society",
    template: "%s | Vadaanya",
  },
  description:
    "Vadaanya Janaa Society turns a government-school child's hope into a degree — through talent tests, scholarships, financial assistance and mentorship across Andhra Pradesh & Telangana since 2010.",
  keywords: [
    "Vadaanya Janaa Society",
    "education NGO",
    "scholarship Andhra Pradesh",
    "Telangana education",
    "Vadaanya Talent Test",
    "government school students",
    "non-profit India",
    "education charity",
    "laptop donation NGO",
    "Srinivasa Ramanujan Talent Test",
    "Ashok Padapati",
  ],
  authors: [{ name: "Vadaanya Janaa Society", url: siteUrl }],
  creator: "Vadaanya Janaa Society",
  publisher: "Vadaanya Janaa Society",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Vadaanya Janaa Society",
    title: "Vadaanya Janaa Society",
    description:
      "Empowering government-school children through talent tests, scholarships, financial assistance & mentorship across AP & Telangana since 2010.",
    images: [
      {
        url: "/opengraph-image?v=2",
        width: 1200,
        height: 630,
        alt: "Vadaanya Janaa Society — Be the one, for the change",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VadaanyaJanaa",
    creator: "@VadaanyaJanaa",
    title: "Vadaanya Janaa Society",
    description:
      "Empowering government-school children through talent tests, scholarships, financial assistance & mentorship across AP & Telangana since 2010.",
    images: ["/opengraph-image?v=2"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="en" suppressHydrationWarning={isDev} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/png" href="/logos/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/logos/favicon.svg" />
        <link rel="shortcut icon" href="/logos/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logos/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Vadaanya Janaa Society" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <JsonLd data={getOrganizationJsonLd()} />

      </head>
      <body className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}