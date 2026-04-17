import { SectionHeading } from "@/components/ui/section-heading";
import { getArchivePosts } from "@/lib/wordpress";

import { PostsCarousel } from "@/app/(site)/_components/posts-carousel";

export async function PostsSection() {
  try {
    const posts = await getArchivePosts(7, { revalidate: 900 });

    return (
      <section className="px-6 py-16 md:px-0 md:py-24">
      <div className="mx-auto max-w-content md:px-8">
        <div className="mb-10 max-w-3xl md:px-0">
          <p className="text-sm font-semibold text-muted">المدونة</p>
          <SectionHeading className="mt-3">
            أحدث المقالات في التسويق وتصميم العلامات
          </SectionHeading>
        </div>
      </div>

        {posts.length > 0 ? (
          <div className="mx-auto max-w-content px-6 md:px-8">
            <PostsCarousel posts={posts} />
          </div>
        ) : (
          <div className="mx-auto max-w-content px-6 md:px-8">
            <div className="border-2 border-black px-5 py-6 text-base text-muted md:px-6">
              لا توجد مقالات متاحة حاليًا.
            </div>
          </div>
        )}
      </section>
    );
  } catch {
    return (
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-content border-2 border-black px-5 py-6 text-base text-muted md:px-6">
          تعذر تحميل أحدث المقالات حاليًا.
        </div>
      </section>
    );
  }
}
