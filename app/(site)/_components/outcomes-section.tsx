"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { digitalOutcomesContent } from "@/lib/content";

export function OutcomesSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const revealTransition = {
    duration: prefersReducedMotion ? 0.18 : 0.78,
    ease: [0.32, 0.72, 0, 1] as const,
    type: "tween" as const,
  };

  return (
    <section className="bg-[#1d1d1d] px-6 py-20 text-white md:px-8 md:py-28">
      <motion.div
        className="mx-auto max-w-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={{
          hidden: {},
          visible: {
            transition: prefersReducedMotion
              ? undefined
              : { staggerChildren: 0.09, delayChildren: 0.04 },
          },
        }}
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <motion.div
            className="lg:sticky lg:top-28 lg:self-start"
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={revealTransition}
          >
            <SectionEyebrow tone="inverse">
              {digitalOutcomesContent.eyebrow}
            </SectionEyebrow>
            <SectionHeading tone="inverse" className="mt-4 max-w-full">
              {digitalOutcomesContent.title}
            </SectionHeading>
            <p className="mt-8 max-w-md text-base leading-8 text-white/62 md:text-lg">
              {digitalOutcomesContent.description}
            </p>
          </motion.div>

          <div className="flex flex-col">
            {digitalOutcomesContent.items.map((item, index) => (
              <motion.article
                key={item.title}
                className="border-t border-white/12 py-7 first:border-t-0 first:pt-0 last:pb-0"
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={revealTransition}
              >
                <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] md:gap-6 lg:items-start">
                  <motion.div
                    className="flex items-center gap-1 text-3xl font-black tracking-[-0.05em] text-white/28 md:text-4xl"
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { color: "rgb(255 255 255 / 0.38)" }
                    }
                    transition={revealTransition}
                  >
                    <span>{(index + 1).toString().padStart(2, "0")}</span>
                    <span className="text-accent">.</span>
                  </motion.div>

                  <div>
                    <motion.h3
                      className="text-2xl font-bold leading-[1.3] tracking-[-0.04em] text-white md:text-[2rem]"
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : { color: "rgb(255 255 255 / 0.92)" }
                      }
                      transition={revealTransition}
                    >
                      {item.title}
                    </motion.h3>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}

            <motion.div
              className="mt-10"
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={revealTransition}
            >
              <Link
                href={digitalOutcomesContent.cta.href}
                className="ui-radius-button inline-flex items-center justify-center bg-white px-6 py-4 text-base font-semibold text-foreground transition hover:bg-accent hover:text-white"
              >
                {digitalOutcomesContent.cta.label}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
