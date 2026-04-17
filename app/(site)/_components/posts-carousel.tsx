"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { BlogPostPreview } from "@/lib/wordpress";

type PostsCarouselProps = {
  posts: BlogPostPreview[];
};

const DESKTOP_VISIBLE_CARDS = 5;
const MOBILE_CARD_WIDTH = "82vw";

export function PostsCarousel({ posts }: PostsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const maxIndex = useMemo(() => {
    return Math.max(posts.length - DESKTOP_VISIBLE_CARDS, 0);
  }, [posts.length]);

  const canGoNext = activeIndex < maxIndex;
  const canGoPrev = activeIndex > 0;

  return (
    <>
      <div className="md:hidden">
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-0">
            {posts.map((post, index) => (
              <article
                key={post.databaseId}
                className={`group shrink-0 border-black bg-transparent px-5 py-7 transition duration-300 hover:-translate-y-1 hover:bg-white ${
                  index === 0 ? "border-s-2" : ""
                }`}
                style={{
                  width: MOBILE_CARD_WIDTH,
                  borderInlineEndWidth: "2px",
                }}
              >
                <PostCardContent post={post} />
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="mb-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setActiveIndex((current) => Math.max(current - 1, 0))}
            disabled={!canGoPrev}
            className={`ui-radius-button inline-flex h-11 w-11 items-center justify-center border-2 border-black text-xl font-semibold transition ${
              canGoPrev
                ? "bg-white text-foreground hover:bg-black hover:text-white"
                : "cursor-not-allowed border-black/20 text-foreground/25"
            }`}
            aria-label="Previous posts"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((current) => Math.min(current + 1, maxIndex))}
            disabled={!canGoNext}
            className={`ui-radius-button inline-flex h-11 w-11 items-center justify-center border-2 border-black text-xl font-semibold transition ${
              canGoNext
                ? "bg-white text-foreground hover:bg-black hover:text-white"
                : "cursor-not-allowed border-black/20 text-foreground/25"
            }`}
            aria-label="Next posts"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] will-change-transform"
            style={{
              transform: `translate3d(-${activeIndex * (100 / DESKTOP_VISIBLE_CARDS)}%, 0, 0)`,
            }}
          >
            {posts.map((post, index) => (
              <article
                key={post.databaseId}
                className={`group shrink-0 border-black bg-transparent px-6 py-8 transition duration-300 hover:-translate-y-1 hover:bg-white ${
                  index === 0 ? "border-s-2" : ""
                }`}
                style={{
                  width: `${100 / DESKTOP_VISIBLE_CARDS}%`,
                  borderInlineEndWidth: "2px",
                }}
              >
                <PostCardContent post={post} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function PostCardContent({ post }: { post: BlogPostPreview }) {
  return (
    <div className="flex h-full min-h-[20rem] flex-col justify-between">
      <div>
        <p className="text-sm font-semibold text-muted">
          {formatGregorianDate(post.date)}
        </p>
        <h3 className="mt-10 flex items-start gap-2 text-2xl font-black leading-[1.3] tracking-[-0.04em] text-foreground">
          <span className="mt-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
          <span>{post.title}</span>
        </h3>
        <p className="mt-4 text-base leading-8 text-muted">
          {truncate(post.excerpt, 150)}
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
    </div>
  );
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
}

function formatGregorianDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
