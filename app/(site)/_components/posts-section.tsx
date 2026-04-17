import { PostsCarousel } from "@/app/(site)/_components/posts-carousel";
import { PostsSectionShell } from "@/app/(site)/_components/posts-section-shell";
import { getArchivePosts } from "@/lib/wordpress";

export async function PostsSection() {
  try {
    const posts = await getArchivePosts(7, { revalidate: 900 });

    return (
      <PostsSectionShell>
        {posts.length > 0 ? (
          <PostsCarousel posts={posts} />
        ) : (
          <div className="border-2 border-black px-5 py-6 text-base text-muted md:px-6">
            لا توجد مقالات متاحة حاليًا.
          </div>
        )}
      </PostsSectionShell>
    );
  } catch {
    return (
      <PostsSectionShell>
        <div className="border-2 border-black px-5 py-6 text-base text-muted md:px-6">
          تعذّر تحميل أحدث المقالات حاليًا.
        </div>
      </PostsSectionShell>
    );
  }
}
