import Link from "next/link";

import { digitalOutcomesContent } from "@/lib/content";

export function OutcomesSection() {
  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-content rounded bg-white/70 px-5 py-8 backdrop-blur md:px-8 md:py-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-muted">
            {digitalOutcomesContent.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-[1.08] tracking-[-0.05em] text-foreground md:text-5xl">
            {digitalOutcomesContent.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-muted md:text-lg">
            {digitalOutcomesContent.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {digitalOutcomesContent.items.map((item, index) => (
            <article
              key={item.title}
              className="rounded border border-black/6 bg-surface/80 p-5 md:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-muted">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-black/8" />
              </div>
              <h3 className="text-xl font-bold leading-[1.5] tracking-[-0.03em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-8 text-muted">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href={digitalOutcomesContent.cta.href}
            className="inline-flex items-center justify-center rounded-2xl bg-foreground px-6 py-4 text-base font-semibold text-white transition hover:bg-primary-light"
          >
            {digitalOutcomesContent.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
