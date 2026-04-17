"use client";

import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";

export default function Error() {
  return (
    <main className="px-6 py-16 md:px-8 md:py-24">
      <section className="mx-auto max-w-content rounded border border-black/6 bg-white px-5 py-10 md:px-8 md:py-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-muted">المدونة</p>
          <SectionHeading className="mt-3">
            تعذر تحميل المحتوى الآن.
          </SectionHeading>
          <p className="mt-5 text-base leading-8 text-muted md:text-lg">
            حدثت مشكلة أثناء جلب المقالات من ووردبريس. يمكنك العودة إلى الصفحة
            الرئيسية أو إعادة المحاولة لاحقًا.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="ui-radius-button inline-flex items-center justify-center bg-foreground px-6 py-4 text-base font-semibold text-white transition hover:bg-accent"
            >
              العودة للرئيسية
            </Link>
            <Link
              href="/blog"
              className="ui-radius-button inline-flex items-center justify-center border border-black/8 bg-white px-6 py-4 text-base font-semibold text-foreground transition hover:text-accent"
            >
              عرض المدونة
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
