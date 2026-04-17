import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";

export default function NotFound() {
  return (
    <main className="px-6 py-16 md:px-8 md:py-24">
      <section className="mx-auto max-w-content rounded border border-black/6 bg-white px-5 py-10 md:px-8 md:py-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-muted">المدونة</p>
          <SectionHeading className="mt-3">
            لم نعثر على هذه المقالة.
          </SectionHeading>
          <p className="mt-5 text-base leading-8 text-muted md:text-lg">
            ربما تم حذف المقالة أو تغيير رابطها. يمكنك العودة إلى صفحة المدونة
            واستعراض المقالات المتاحة.
          </p>
          <div className="mt-8">
            <Link
              href="/blog"
              className="ui-radius-button inline-flex items-center justify-center bg-foreground px-6 py-4 text-base font-semibold text-white transition hover:bg-accent"
            >
              العودة إلى المدونة
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
