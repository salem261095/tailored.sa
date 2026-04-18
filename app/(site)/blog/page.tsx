import type { Metadata } from "next";

import { BlogPage } from "@/app/(site)/_components/blog-page";
import { JsonLd } from "@/components/shared/json-ld";
import { blogContent } from "@/lib/content";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { getArchivePosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: blogContent.meta.title,
    description: blogContent.meta.description,
    path: "/blog",
    keywords: [
      "مدونة براندنج",
      "مقالات استراتيجية العلامة التجارية",
      "التسويق الرقمي في السعودية",
    ],
  }),
};

export default async function Page() {
  try {
    const posts = await getArchivePosts(12, { revalidate: 900 });

    return (
      <>
        <JsonLd
          data={createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "المدونة", path: "/blog" },
          ])}
        />
        <BlogPage posts={posts} />
      </>
    );
  } catch {
    return (
      <>
        <JsonLd
          data={createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "المدونة", path: "/blog" },
          ])}
        />
        <BlogPage
          posts={[]}
          errorMessage="تعذر تحميل المقالات حاليًا. حاول مرة أخرى لاحقًا."
        />
      </>
    );
  }
}
