import type { Metadata } from "next";

import { HomePage } from "@/app/(site)/_components/home-page";
import { siteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: siteContent.seo.defaultTitle,
  description: siteContent.seo.defaultDescription,
};

export default function Page() {
  return <HomePage />;
}
