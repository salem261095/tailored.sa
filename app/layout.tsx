import type { Metadata } from "next";
import localFont from "next/font/local";

import { GoogleAnalytics } from "@/components/shared/google-analytics";
import { JsonLd } from "@/components/shared/json-ld";
import {
  absoluteUrl,
  createLocalBusinessSchema,
  createOrganizationSchema,
  createWebsiteSchema,
  siteSeo,
} from "@/lib/seo";
import "./globals.css";

const gtAmericaArabic = localFont({
  src: [
    {
      path: "./fonts/gt-america-arabic-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/gt-america-arabic-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const gtAmericaArabicDisplay = localFont({
  src: [
    {
      path: "./fonts/gt-america-arabic-black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteSeo.baseUrl),
  title: {
    default: siteSeo.defaultTitle,
    template: `%s | ${siteSeo.siteName}`,
  },
  description: siteSeo.defaultDescription,
  applicationName: siteSeo.siteName,
  alternates: {
    canonical: "/",
  },
  keywords: [...siteSeo.defaultKeywords],
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: siteSeo.defaultTitle,
    description: siteSeo.defaultDescription,
    url: siteSeo.baseUrl,
    siteName: siteSeo.siteName,
    locale: siteSeo.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl(siteSeo.ogImage),
        alt: siteSeo.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteSeo.defaultTitle,
    description: siteSeo.defaultDescription,
    images: [absoluteUrl(siteSeo.ogImage)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${gtAmericaArabic.variable} ${gtAmericaArabicDisplay.variable} bg-surface font-sans text-foreground antialiased`}
      >
        <GoogleAnalytics />
        <JsonLd
          data={[
            createOrganizationSchema(),
            createWebsiteSchema(),
            createLocalBusinessSchema(),
          ]}
        />
        {children}
      </body>
    </html>
  );
}
