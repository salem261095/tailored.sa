import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import type { BlogPostPreview } from "@/lib/wordpress";

type BlogPageProps = {
  errorMessage?: string;
  posts: BlogPostPreview[];
};

export function BlogPage({ errorMessage, posts }: BlogPageProps) {
  return (
    <div className="px-6 py-16 md:px-8 md:py-24">
      <section className="mx-auto max-w-content">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-muted">المدونة</p>
          <SectionHeading className="mt-3">
            مقالات وأفكار حول الهوية والمحتوى والتسويق الرقمي.
          </SectionHeading>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-content md:mt-20">
        {errorMessage ? (
          <div className="rounded border border-black/6 bg-white px-5 py-6 text-base text-muted md:px-6">
            {errorMessage}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.databaseId}
                className="flex h-full flex-col justify-between rounded border border-black/6 bg-white px-5 py-6 md:px-6"
              >
                <div>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category) => (
                      <span
                        key={`${post.databaseId}-${category.slug}`}
                        className="text-xs font-semibold text-muted"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-muted">
                    {formatArabicDate(post.date)}
                  </p>
                  <h2 className="mt-4 text-2xl font-black leading-[1.3] tracking-[-0.04em] text-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-muted">
                    {truncate(post.excerpt, 180)}
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-foreground transition hover:text-accent"
                  >
                    اقرأ المقال
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded border border-black/6 bg-white px-5 py-6 text-base text-muted md:px-6">
            لا توجد مقالات منشورة حاليًا.
          </div>
        )}
      </section>
    </div>
  );
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
}

function formatArabicDate(value: string) {
  return new Intl.DateTimeFormat("ar-SA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
