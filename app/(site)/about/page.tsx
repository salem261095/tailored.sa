import type { Metadata } from "next";

import { AboutPage } from "@/app/(site)/_components/about-page";
import { aboutContent } from "@/lib/content";

export const metadata: Metadata = {
  title: aboutContent.meta.title,
  description: aboutContent.meta.description,
};

export default function Page() {
  return <AboutPage />;
}
