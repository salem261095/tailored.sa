import Link from "next/link";

import { SharedPageHero } from "@/app/(site)/_components/shared-page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import type { BlogPostPreview } from "@/lib/wordpress";

type BlogPageProps = {
  errorMessage?: string;
  posts: BlogPostPreview[];
};

export function BlogPage({ errorMessage, posts }: BlogPageProps) {
  return (
    <div>
      <SharedPageHero>
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-muted">المدونة</p>
          <SectionHeading className="mt-3">
            مقالات وأفكار حول الهوية والمحتوى والتسويق الرقمي.
          </SectionHeading>
        </div>
      </SharedPageHero>

      <section className="mx-auto mt-10 max-w-content px-6 pb-16 md:mt-14 md:px-8 md:pb-24">
        {errorMessage ? (
          <div className="ui-radius-control border border-black/8 bg-white px-5 py-6 text-base text-muted md:px-6">
            {errorMessage}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.databaseId}
                href={`/blog/${post.slug}`}
                className="group ui-radius-control flex min-h-[18.5rem] flex-col justify-between border border-black/8 bg-white px-5 py-6 transition duration-300 hover:-translate-y-1 hover:border-accent/20 md:px-6 md:py-7"
              >
                <article className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-muted">
                      <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                      <span className="line-clamp-1">
                        {post.categories[0]?.name ?? "عام"}
                      </span>
                    </div>

                    <p className="mt-5 text-sm font-semibold text-muted">
                      {formatMixedDate(post.date)}
                    </p>

                    <h2 className="mt-8 text-2xl font-black leading-[1.25] tracking-[-0.04em] text-foreground md:text-[2rem]">
                      {post.title}
                    </h2>
                  </div>

                  <div className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition group-hover:text-accent">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    اقرأ المقال
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="ui-radius-control border border-black/8 bg-white px-5 py-6 text-base text-muted md:px-6">
            لا توجد مقالات منشورة حاليًا.
          </div>
        )}
      </section>
    </div>
  );
}

function formatMixedDate(value: string) {
  const date = new Date(value);

  const day = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    numberingSystem: "latn",
  }).format(date);

  const month = new Intl.DateTimeFormat("ar", {
    month: "long",
  }).format(date);

  const year = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    numberingSystem: "latn",
  }).format(date);

  return `${day} ${month} ${year}`;
}
