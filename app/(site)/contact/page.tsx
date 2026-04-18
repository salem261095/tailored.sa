import type { Metadata } from "next";

import { ContactPage } from "@/app/(site)/_components/contact-page";
import { JsonLd } from "@/components/shared/json-ld";
import { contactContent } from "@/lib/content";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: contactContent.meta.title,
    description: contactContent.meta.description,
    path: "/contact",
    keywords: [
      "تواصل مع وكالة براندنج",
      "استشارة استراتيجية العلامة التجارية",
      "طلب عرض مُحاك",
    ],
  }),
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "تواصل معنا", path: "/contact" },
        ])}
      />
      <ContactPage />
    </>
  );
}
