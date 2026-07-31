import Providers from "@/layouts/Providers";
import "../styles/index.scss";
import { Poppins, Inter } from 'next/font/google';

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

export const metadata = {
  title: "Vadaanya Janaa Society — From Dreams to Degrees",
  description:
    "Vadaanya Janaa Society turns a government-school child's hope into a degree — through talent tests, scholarships, laptops and mentorship across Andhra Pradesh & Telangana since 2010.",
  keywords:
    "Vadaanya Janaa Society, education NGO, scholarship Andhra Pradesh, Telangana education, Vadaanya Talent Test, government school students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" type="image/png" href="/logos/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/logos/favicon.svg" />
        <link rel="shortcut icon" href="/logos/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logos/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Vadaanya Janaa Society" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}