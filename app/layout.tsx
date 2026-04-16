import type { Metadata } from "next";
import localFont from "next/font/local";

import { siteContent } from "@/lib/content";
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
  metadataBase: new URL(siteContent.seo.baseUrl),
  title: {
    default: siteContent.seo.defaultTitle,
    template: `%s | ${siteContent.seo.siteName}`,
  },
  description: siteContent.seo.defaultDescription,
  openGraph: {
    title: siteContent.seo.defaultTitle,
    description: siteContent.seo.defaultDescription,
    siteName: siteContent.seo.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.defaultTitle,
    description: siteContent.seo.defaultDescription,
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
        {children}
      </body>
    </html>
  );
}
