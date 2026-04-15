import type { Metadata } from "next";

import { HomePage } from "@/app/(site)/_components/home-page";
import { homeContent } from "@/lib/content";

export const metadata: Metadata = {
  title: homeContent.meta.title,
  description: homeContent.meta.description,
};

export default function Page() {
  return <HomePage />;
}
