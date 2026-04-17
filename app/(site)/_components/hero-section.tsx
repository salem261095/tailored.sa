"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { categoriesContent, heroContent } from "@/lib/content";

export function HeroSection() {
  const chipTrack = categoriesContent.items;
  const prefersReducedMotion = useReducedMotion() ?? false;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (chipTrack.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);

      window.setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % chipTrack.length);
        setIsVisible(true);
      }, 420);
    }, 2600);

    return () => clearInterval(interval);
  }, [chipTrack.length]);

  const heroTransition = useMemo(
    () =>
      prefersReducedMotion
        ? ({ duration: 0.18, ease: [0, 0, 1, 1], type: "tween" } as const)
        : ({ duration: 0.88, ease: [0.32, 0.72, 0, 1], type: "tween" } as const),
    [prefersReducedMotion],
  );

  const chipTransition = prefersReducedMotion
    ? ({ duration: 0.14, ease: [0, 0, 1, 1], type: "tween" } as const)
    : ({ duration: 0.42, ease: [0.32, 0.72, 0, 1], type: "tween" } as const);

  return (
    <section
      data-hero-section
      className="relative min-h-[100svh] overflow-hidden bg-black"
    >
      <motion.div
        className="absolute inset-0 z-0 select-none"
        initial={prefersReducedMotion ? false : { scale: 1.04 }}
        animate={prefersReducedMotion ? undefined : { scale: 1 }}
        transition={{ duration: 1.6, ease: [0.32, 0.72, 0, 1], type: "tween" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover scale-x-[-1] md:hidden"
        >
          <source src="/assets/videos/HeroSectionVidBG-mobile.mp4" type="video/mp4" />
        </video>

        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden h-full w-full object-cover scale-x-[-1] md:block"
        >
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-content items-end px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 md:min-h-[calc(100dvh-5rem)] md:px-8 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32 xl:pt-24 2xl:pt-16">
        <motion.div
          className="w-full lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: prefersReducedMotion
                ? undefined
                : { staggerChildren: 0.08, delayChildren: 0.06 },
            },
          }}
        >
          <div>
            <motion.div
              className="mb-6 w-full sm:mb-8 md:mb-10 md:max-w-[34rem] lg:mb-0 lg:hidden"
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={heroTransition}
            >
              <div className="relative h-11 sm:h-12 md:h-14">
                <AnimatePresence mode="wait">
                  {isVisible ? (
                    <motion.span
                      key={chipTrack[activeIndex]}
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                      transition={chipTransition}
                      className="absolute start-0 top-0 inline-flex items-center whitespace-nowrap rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.2)] sm:px-4 sm:py-2.5 sm:text-sm md:px-5 md:py-3"
                    >
                      <span className="relative pe-3">
                        {chipTrack[activeIndex]}
                        <span className="absolute end-0 top-0 h-2 w-2 rounded-full bg-accent" />
                      </span>
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 28 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={heroTransition}
            >
              <h1 className="max-w-[11ch] text-[3.35rem] font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-[4.25rem] md:max-w-[10.5ch] md:text-[5.5rem] lg:max-w-[10ch] lg:text-[6.6rem] xl:text-[7.4rem]">
                {heroContent.title}
              </h1>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={heroTransition}
            >
              <p className="mt-4 max-w-md text-start text-base font-bold leading-7 text-white/80 sm:mt-5 sm:max-w-lg sm:text-lg sm:leading-8 md:mt-6 md:max-w-xl md:text-xl lg:text-[1.45rem] lg:leading-9">
                {heroContent.description}
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={heroTransition}
            >
              <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:gap-4 md:mt-12 md:w-auto md:flex-row md:flex-wrap md:justify-start">
                <Link
                  href={heroContent.cta.primary.href}
                  className="ui-radius-button inline-flex min-h-12 w-full items-center justify-center bg-white px-6 py-3.5 text-sm font-bold text-black transition-all active:scale-95 sm:px-8 sm:text-base md:w-auto md:px-10 md:py-4 md:hover:scale-105 md:hover:bg-accent md:hover:text-white"
                >
                  {heroContent.cta.primary.label}
                </Link>

                <Link
                  href={heroContent.cta.secondary.href}
                  className="ui-radius-button inline-flex min-h-12 w-full items-center justify-center border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all active:scale-95 sm:px-8 sm:text-base md:w-auto md:px-10 md:py-4 md:hover:scale-105 md:hover:border-accent md:hover:bg-accent"
                >
                  {heroContent.cta.secondary.label}
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hidden self-end lg:block"
            variants={{
              hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 20 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={heroTransition}
          >
            <div className="relative h-14 w-[16rem] xl:w-[18rem]">
              <AnimatePresence mode="wait">
                {isVisible ? (
                  <motion.span
                    key={chipTrack[activeIndex]}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                    transition={chipTransition}
                    className="absolute bottom-0 end-0 inline-flex items-center whitespace-nowrap rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.2)]"
                  >
                    <span className="relative pe-3">
                      {chipTrack[activeIndex]}
                      <span className="absolute end-0 top-0 h-2 w-2 rounded-full bg-accent" />
                    </span>
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
