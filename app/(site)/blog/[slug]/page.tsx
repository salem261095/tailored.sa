import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import { SharedPageHero } from "@/app/(site)/_components/shared-page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  buildPostDescription,
  createArticleSchema,
  createBreadcrumbSchema,
  createPageMetadata,
} from "@/lib/seo";
import { getSinglePost } from "@/lib/wordpress";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getSinglePost(slug, { revalidate: 900 });

    if (!post) {
      return {
        title: "المقال غير موجود",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    return createPageMetadata({
      title: post.title,
      description: buildPostDescription(post.content),
      path: `/blog/${post.slug}`,
      openGraphType: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      keywords: post.categories.map((category) => category.name),
    });
  } catch {
    return {
      title: "مقالة من المدونة",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getSinglePost(slug, { revalidate: 900 });

  if (!post) {
    notFound();
  }

  const description = buildPostDescription(post.content);
  const breadcrumb = createBreadcrumbSchema([
    { name: "الرئيسية", path: "/" },
    { name: "المدونة", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
  const articleSchema = createArticleSchema({
    title: post.title,
    description,
    path: `/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.modified,
  });

  return (
    <>
      <JsonLd data={[breadcrumb, articleSchema]} />

      <main>
        <SharedPageHero contentClassName="pb-12 md:pb-16">
          <div className="max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-accent"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              العودة إلى المدونة
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {post.categories.map((category) => (
                <span
                  key={`${post.databaseId}-${category.slug}`}
                  className="ui-radius-control border border-white/12 bg-white/6 px-3 py-1.5 text-xs font-semibold text-white/72"
                >
                  {category.name}
                </span>
              ))}
            </div>

            <p className="mt-6 text-sm font-semibold text-muted">
              {formatMixedDate(post.date)}
            </p>

            <SectionHeading className="mt-7 max-w-4xl text-[2.9rem] leading-[1.02] md:mt-8 md:text-[4.5rem] lg:text-[5.4rem]">
              {post.title}
            </SectionHeading>
          </div>
        </SharedPageHero>

        <article className="mx-auto max-w-content px-6 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="ui-radius-control border border-black/8 bg-white/88 px-6 py-6 shadow-[0_24px_80px_rgba(17,17,17,0.05)] backdrop-blur md:px-8 md:py-8">
              <p className="max-w-3xl text-base leading-8 text-foreground/72 md:text-lg md:leading-9">
                {description}
              </p>
            </div>

            <div className="mt-8 h-px bg-gradient-to-r from-black/14 via-black/8 to-transparent" />

            <div
              className="prose prose-neutral mt-10 max-w-none text-foreground prose-headings:font-black prose-headings:tracking-[-0.04em] prose-headings:text-foreground prose-h2:mt-20 prose-h2:border-t prose-h2:border-black/8 prose-h2:pt-10 prose-h2:text-3xl prose-h2:leading-[1.15] md:prose-h2:text-[2.35rem] prose-h3:mt-14 prose-h3:text-2xl prose-h3:leading-[1.22] prose-h4:mt-10 prose-h4:text-xl prose-h4:leading-[1.32] prose-p:my-7 prose-p:text-[1.02rem] prose-p:leading-[2.15rem] prose-p:text-foreground/88 md:prose-p:text-[1.06rem] md:prose-p:leading-[2.3rem] prose-a:font-semibold prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent-light prose-strong:font-bold prose-strong:text-foreground prose-em:text-foreground/80 prose-ul:my-7 prose-ul:list-disc prose-ul:space-y-3 prose-ul:ps-7 prose-ol:my-7 prose-ol:list-decimal prose-ol:space-y-3 prose-ol:ps-7 prose-li:ps-2 prose-li:leading-[2.1rem] prose-li:marker:text-accent prose-blockquote:my-10 prose-blockquote:border-s-4 prose-blockquote:border-accent prose-blockquote:bg-black/[0.02] prose-blockquote:px-6 prose-blockquote:py-5 prose-blockquote:text-foreground/76 prose-blockquote:italic prose-hr:my-12 prose-hr:border-black/10 prose-table:my-12 prose-table:w-full prose-table:overflow-hidden prose-table:rounded-[1.25rem] prose-table:border prose-table:border-black/10 prose-thead:bg-black/[0.03] prose-th:border-black/10 prose-th:px-4 prose-th:py-4 prose-th:text-right prose-th:text-sm prose-th:font-bold prose-th:text-foreground prose-td:border-t prose-td:border-black/8 prose-td:px-4 prose-td:py-4 prose-td:text-[0.98rem] prose-td:leading-7 prose-td:text-foreground/82 prose-img:my-12 prose-img:ui-radius-control prose-img:border prose-img:border-black/8 prose-img:shadow-[0_18px_48px_rgba(17,17,17,0.06)] prose-figure:my-12 prose-figcaption:mt-4 prose-figcaption:text-sm prose-figcaption:text-muted prose-pre:my-10 prose-pre:overflow-x-auto prose-pre:rounded-[1.25rem] prose-pre:bg-[#161616] prose-pre:px-5 prose-pre:py-5 prose-pre:text-white prose-code:rounded prose-code:bg-black/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.92em] prose-code:text-foreground prose-code:before:hidden prose-code:after:hidden"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="ui-radius-control mt-12 border border-black/8 bg-black/[0.02] px-6 py-7 md:px-8 md:py-8">
              <p className="text-sm font-semibold text-muted">واصل من نفس النقطة</p>
              <h2 className="mt-3 text-2xl font-black leading-[1.2] tracking-[-0.04em] text-foreground md:text-[2.2rem]">
                حوّل الفكرة إلى قرار أوضح للعلامة.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted md:text-lg">
                إن كان هذا المقال يلامس سؤالًا داخل مشروعك، فابدأ من صفحة استراتيجية
                العلامة أو شاركنا تفاصيلك مباشرة لنقترح المسار الأنسب.
              </p>

              <div className="mt-6 flex flex-col gap-3 md:flex-row md:flex-wrap">
                <Link
                  href="/#brand-strategy"
                  className="ui-radius-button inline-flex items-center justify-center bg-foreground px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
                >
                  ارجع إلى استراتيجية العلامة
                </Link>
                <Link
                  href="/contact"
                  className="ui-radius-button inline-flex items-center justify-center border border-black/10 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
                >
                  تحدث معنا حول مشروعك
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
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
