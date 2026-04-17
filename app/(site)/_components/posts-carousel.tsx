"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { BlogPostPreview } from "@/lib/wordpress";

type PostsCarouselProps = {
  posts: BlogPostPreview[];
};

const DESKTOP_VISIBLE_CARDS = 4;
const MOBILE_VISIBLE_CARDS = 1;

export function PostsCarousel({ posts }: PostsCarouselProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);

  const desktopMaxIndex = useMemo(
    () => Math.max(posts.length - DESKTOP_VISIBLE_CARDS, 0),
    [posts.length],
  );

  const mobileMaxIndex = useMemo(
    () => Math.max(posts.length - MOBILE_VISIBLE_CARDS, 0),
    [posts.length],
  );

  const desktopStepPercent = 100 / DESKTOP_VISIBLE_CARDS;
  const mobileStepPercent = 100;

  const canGoNextDesktop = activeIndex < desktopMaxIndex;
  const canGoPrevDesktop = activeIndex > 0;
  const canGoNextMobile = activeIndex < mobileMaxIndex;
  const canGoPrevMobile = activeIndex > 0;

  const trackTransition = {
    duration: prefersReducedMotion ? 0.12 : 0.52,
    ease: [0.32, 0.72, 0, 1] as const,
    type: "tween" as const,
  };

  return (
    <>
      <div className="md:hidden">
        <div className="mb-6 flex items-center justify-start gap-3">
          <ArrowButton
            direction="next"
            disabled={!canGoNextMobile}
            onClick={() => setActiveIndex((current) => Math.min(current + 1, mobileMaxIndex))}
          />
          <ArrowButton
            direction="prev"
            disabled={!canGoPrevMobile}
            onClick={() => setActiveIndex((current) => Math.max(current - 1, 0))}
          />
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-0 will-change-transform"
            animate={{ x: `-${activeIndex * mobileStepPercent}%` }}
            transition={trackTransition}
          >
            {posts.map((post, index) => (
              <motion.article
                key={post.databaseId}
                className={`group shrink-0 border-black bg-transparent px-5 py-7 ${index === 0 ? "border-s-2" : ""}`}
                style={{
                  width: "100%",
                  borderInlineEndWidth: "1px",
                }}
                whileHover={prefersReducedMotion ? undefined : { y: -4, backgroundColor: "#ffffff" }}
                transition={trackTransition}
              >
                <PostCardContent post={post} />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="mb-6 flex items-center justify-start gap-3">
          <ArrowButton
            direction="next"
            disabled={!canGoNextDesktop}
            onClick={() => setActiveIndex((current) => Math.min(current + 1, desktopMaxIndex))}
          />
          <ArrowButton
            direction="prev"
            disabled={!canGoPrevDesktop}
            onClick={() => setActiveIndex((current) => Math.max(current - 1, 0))}
          />
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-0 will-change-transform"
            animate={{ x: `-${activeIndex * desktopStepPercent}%` }}
            transition={trackTransition}
          >
            {posts.map((post, index) => (
              <motion.article
                key={post.databaseId}
                className={`group shrink-0 border-black bg-transparent px-6 py-8 ${index === 0 ? "border-s-2" : ""}`}
                style={{
                  width: `${100 / DESKTOP_VISIBLE_CARDS}%`,
                  borderInlineEndWidth: "1px",
                }}
                whileHover={prefersReducedMotion ? undefined : { y: -4, backgroundColor: "#ffffff" }}
                transition={trackTransition}
              >
                <PostCardContent post={post} />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "next" | "prev";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "next" ? ChevronRight : ChevronLeft;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      className={`ui-radius-button inline-flex h-11 w-11 items-center justify-center border-2 border-black text-xl font-semibold transition ${
        disabled
          ? "cursor-not-allowed border-black/20 text-foreground/25"
          : "bg-white text-foreground hover:bg-black hover:text-white"
      }`}
      aria-label={direction === "next" ? "Next posts" : "Previous posts"}
    >
      <Icon className="h-4 w-4" strokeWidth={2.25} />
    </motion.button>
  );
}

function PostCardContent({ post }: { post: BlogPostPreview }) {
  return (
    <div className="flex h-full min-h-[20rem] flex-col justify-between">
      <div>
        <p className="text-sm font-semibold text-muted">{formatMixedDate(post.date)}</p>
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
