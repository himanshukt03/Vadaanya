import Providers from "@/layouts/Providers";
import "../styles/index.scss";
import { Poppins, Inter } from 'next/font/google';
import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://vadaanya.org"),
  title: {
    default: "Vadaanya Janaa Society | Empowering Government-School Children in Andhra Pradesh & Telangana",
    template: "%s | Vadaanya Janaa Society",
  },
  description:
    "Vadaanya Janaa Society (also known as Vadaanya for short), founded in 2010 by Founder & President Ashok Padapati, empowers government-school students across Andhra Pradesh & Telangana through talent tests, scholarships, and mentorship.",
  keywords: [
    "Vadaanya Janaa Society",
    "education NGO Andhra Pradesh",
    "government school scholarship",
    "Vadaanya Talent Test",
    "education charity India",
    "Telangana student scholarships",
  ],
  authors: [{ name: "Vadaanya Janaa Society", url: "https://vadaanya.org" }],
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
    url: "https://vadaanya.org",
    siteName: "Vadaanya Janaa Society",
    title: "Vadaanya Janaa Society | Empowering Government-School Children in Andhra Pradesh & Telangana",
    description:
      "Vadaanya Janaa Society (also known as Vadaanya for short), founded in 2010 by Founder & President Ashok Padapati, empowers government-school students across Andhra Pradesh & Telangana.",
    images: [
      {
        url: "/opengraph-image?v=2",
        width: 1200,
        height: 630,
        alt: "Vadaanya Janaa Society — Founded by Ashok Padapati",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VadaanyaJanaa",
    creator: "@VadaanyaJanaa",
    title: "Vadaanya Janaa Society | Empowering Government-School Children in Andhra Pradesh & Telangana",
    description:
      "Vadaanya Janaa Society (also known as Vadaanya for short), founded in 2010 by Founder & President Ashok Padapati, empowers government-school students across Andhra Pradesh & Telangana.",
    images: ["/opengraph-image?v=2"],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "S2ApIho-dk4CAHi9QClgDmSvfocXCY0EMhkmppxBJuw",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PVQJL8PS1F"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PVQJL8PS1F');
          `}
        </Script>

      </head>
      <body className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}