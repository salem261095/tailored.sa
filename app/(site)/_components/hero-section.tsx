import Link from "next/link";

import { categoriesContent, heroContent } from "@/lib/content";

export function HeroSection() {
  const chipTrack = [...categoriesContent.items, ...categoriesContent.items];

  return (
    <section
      data-hero-section
      className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-black transition-colors duration-500"
    >
      <div className="absolute inset-x-0 inset-y-0 z-0 select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover scale-x-[-1]"
        >
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] max-w-content items-end justify-start px-6 pb-20 pt-4 md:px-8 lg:pb-24 lg:pt-6">
        <div className="flex w-full flex-col items-start text-start">
          <div className="mb-10 w-full max-w-[34rem] overflow-hidden">
            <div className="animate-marquee flex min-w-max gap-3">
              {chipTrack.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="animate-floaty backdrop-blur-md whitespace-nowrap rounded-2xl bg-white/10 border border-white/10 px-5 py-3 text-sm font-semibold text-white/90 shadow-[0_10px_28px_rgba(0,0,0,0.2)]"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-[fade-up_900ms_cubic-bezier(0.32,0.72,0,1)_both]">
            <h1 className="max-w-[12ch] text-5xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[6.1rem]">
              {heroContent.title}
            </h1>
          </div>

          <div className="animate-[fade-up_900ms_cubic-bezier(0.32,0.72,0,1)_140ms_both]">
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70 md:text-xl">
              {heroContent.description}
            </p>
          </div>

          <div className="animate-[fade-up_900ms_cubic-bezier(0.32,0.72,0,1)_280ms_both]">
            <div className="mt-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-start">
              <Link
                href={heroContent.cta.primary.href}
                className="ui-radius-button group relative inline-flex items-center justify-center bg-white px-10 py-4 text-base font-bold text-black transition-all hover:bg-accent hover:text-white hover:scale-105 active:scale-95"
              >
                {heroContent.cta.primary.label}
              </Link>

              <Link
                href={heroContent.cta.secondary.href}
                className="ui-radius-button backdrop-blur-sm inline-flex items-center justify-center border border-white/20 bg-white/10 px-10 py-4 text-base font-bold text-white transition-all hover:bg-accent hover:border-accent hover:scale-105 active:scale-95"
              >
                {heroContent.cta.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
