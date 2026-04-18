import type { Metadata } from "next";

import { AboutPage } from "@/app/(site)/_components/about-page";
import { JsonLd } from "@/components/shared/json-ld";
import { aboutContent } from "@/lib/content";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: aboutContent.meta.title,
    description: aboutContent.meta.description,
    path: "/about",
    keywords: ["عن مُحاك", "وكالة استراتيجية علامة تجارية", "هوية العلامة التجارية"],
  }),
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "عن مُحاك", path: "/about" },
        ])}
      />
      <AboutPage />
    </>
  );
}
