import type { Metadata } from "next";

import { HomePage } from "@/app/(site)/_components/home-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "استراتيجية العلامة التجارية في السعودية",
    description:
      "مُحاك تساعد الشركات في السعودية على بناء استراتيجية علامة تجارية أوضح وهوية أكثر تماسكًا ورسائل تحوّل الحضور الرقمي إلى نمو فعلي.",
    path: "/",
    keywords: [
      "استراتيجية العلامة التجارية في السعودية",
      "وكالة براندنج",
      "Brand Strategy Agency Saudi Arabia",
      "بناء الهوية التجارية",
    ],
  }),
};

export default function Page() {
  return <HomePage />;
}
