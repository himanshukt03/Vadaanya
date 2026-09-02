import Providers from "@/layouts/Providers";
import "../styles/index.scss";
import { Poppins, Inter } from 'next/font/google';
import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#060b22",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vadaanya.org"),
  title: {
    default: "Vadaanya | Be the one, for the change",
    template: "%s | Vadaanya",
  },
  description:
    "Vadaanya Janaa Society, founded in 2010 by Founder & President Ashok Padapati, empowers government-school students across India through scholarships and mentorship.",
  keywords: [
    "Vadaanya Janaa Society",
    "education NGO India",
    "government school scholarship",
    "Vadaanya Talent Test",
    "education charity India",
    "student scholarships India",
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
    title: "Vadaanya | Be the one, for the change",
    description:
      "Vadaanya Janaa Society, founded in 2010 by Founder & President Ashok Padapati, empowers government-school students across India.",
    images: [
      {
        url: "https://vadaanya.org/og-image.png",
        secureUrl: "https://vadaanya.org/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Vadaanya — Be the one, for the change",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VadaanyaJanaa",
    creator: "@VadaanyaJanaa",
    title: "Vadaanya | Be the one, for the change",
    description:
      "Vadaanya Janaa Society, founded in 2010 by Founder & President Ashok Padapati, empowers government-school students across India.",
    images: ["https://vadaanya.org/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/logos/favicon.ico", sizes: "any" },
      { url: "/logos/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/logos/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logos/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "og:type": "website",
    "og:image": "https://vadaanya.org/og-image.png",
    "og:image:secure_url": "https://vadaanya.org/og-image.png",
    "og:image:type": "image/png",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": "Vadaanya — Be the one, for the change",
    "og:logo": "https://vadaanya.org/logos/web-app-manifest-512x512.png",
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
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
      </head>
      <body className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning={true}>
        <a href="#top" className="vad-skip-link">
          Skip to main content
        </a>
        <JsonLd data={getOrganizationJsonLd()} />
        <Providers>
          {children}
        </Providers>
        {!isDev && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-PVQJL8PS1F"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-PVQJL8PS1F');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}