import type { Metadata } from "next";

import { siteContent } from "@/lib/content";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
