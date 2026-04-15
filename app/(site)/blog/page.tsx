import type { Metadata } from "next";

import { BlogPage } from "@/app/(site)/_components/blog-page";
import { blogContent } from "@/lib/content";

export const metadata: Metadata = {
  title: blogContent.meta.title,
  description: blogContent.meta.description,
};

export default function Page() {
  return <BlogPage />;
}
