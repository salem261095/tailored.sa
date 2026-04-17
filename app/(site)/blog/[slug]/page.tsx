import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/lib/content";
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
      };
    }

    return {
      title: post.title,
      description: buildDescription(post.content),
      alternates: {
        canonical: `/blog/${post.slug}`,
      },
      openGraph: {
        title: post.title,
        description: buildDescription(post.content),
        url: `${siteContent.seo.baseUrl}/blog/${post.slug}`,
        type: "article",
      },
    };
  } catch {
    return {
      title: blogFallbackTitle(),
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getSinglePost(slug, { revalidate: 900 });

  if (!post) {
    notFound();
  }

  return (
    <main className="px-6 py-16 md:px-8 md:py-24">
      <article className="mx-auto max-w-content">
        <div className="max-w-4xl">
          <Link
            href="/blog"
            className="text-sm font-semibold text-muted transition hover:text-accent"
          >
            العودة إلى المدونة
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={`${post.databaseId}-${category.slug}`}
                className="text-xs font-semibold text-muted"
              >
                {category.name}
              </span>
            ))}
          </div>

          <p className="mt-5 text-sm font-semibold text-muted">
            {formatArabicDate(post.date)}
          </p>

          <SectionHeading className="mt-4 max-w-4xl">
            {post.title}
          </SectionHeading>
        </div>

        <div
          className="prose prose-neutral mt-10 max-w-4xl text-foreground prose-headings:font-black prose-headings:tracking-[-0.04em] prose-p:leading-8 prose-a:text-accent prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}

function formatArabicDate(value: string) {
  return new Intl.DateTimeFormat("ar-SA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function buildDescription(content: string) {
  const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  if (plainText.length <= 160) {
    return plainText;
  }

  return `${plainText.slice(0, 160).trimEnd()}...`;
}

function blogFallbackTitle() {
  return "مقالة من المدونة";
}
