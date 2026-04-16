import Link from "next/link";

import { categoriesContent, heroContent } from "@/lib/content";

export function HeroSection() {
  const chipTrack = [...categoriesContent.items, ...categoriesContent.items];

  return (
    <section className="relative">
      <div className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-content items-center px-6 pb-10 pt-4 md:px-8 lg:pb-16 lg:pt-6">
        <div className="flex w-full flex-col items-start text-start">
          <div className="mb-8 w-[calc(100%+1.5rem)] max-w-[34rem] overflow-hidden sm:w-full">
            <div className="animate-marquee flex min-w-max gap-3">
              {chipTrack.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="animate-floaty whitespace-nowrap rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-[0_10px_28px_rgba(17,17,17,0.06)]"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <h1 className="max-w-[11ch] text-5xl font-black leading-[1.02] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl lg:text-[6.1rem]">
            {heroContent.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted md:text-xl">
            {heroContent.description}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              href={heroContent.cta.primary.href}
              className="inline-flex items-center justify-center rounded-2xl bg-foreground px-7 py-4 text-base font-semibold text-white transition hover:bg-primary-light"
            >
              {heroContent.cta.primary.label}
            </Link>

            <Link
              href={heroContent.cta.secondary.href}
              className="inline-flex items-center justify-center rounded-2xl border border-black/8 bg-white px-6 py-4 text-base font-semibold text-foreground shadow-[0_14px_34px_rgba(17,17,17,0.06)] transition hover:text-accent"
            >
              {heroContent.cta.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
