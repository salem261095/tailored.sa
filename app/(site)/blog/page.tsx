import type { Metadata } from "next";

import { BlogPage } from "@/app/(site)/_components/blog-page";
import { blogContent } from "@/lib/content";
import { getArchivePosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: blogContent.meta.title,
  description: blogContent.meta.description,
};

export default async function Page() {
  try {
    const posts = await getArchivePosts(12, { revalidate: 900 });

    return <BlogPage posts={posts} />;
  } catch {
    return (
      <BlogPage
        posts={[]}
        errorMessage="تعذر تحميل المقالات حاليًا. حاول مرة أخرى لاحقًا."
      />
    );
  }
}
