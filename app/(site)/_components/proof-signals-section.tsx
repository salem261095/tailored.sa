"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { proofSignalsSectionContent } from "@/lib/content";

export function ProofSignalsSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const revealTransition = {
    duration: prefersReducedMotion ? 0.18 : 0.74,
    ease: [0.32, 0.72, 0, 1] as const,
    type: "tween" as const,
  };

  return (
    <section id="proof" className="bg-[#1d1d1d] px-6 py-20 text-white md:px-8 md:py-28">
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
        <div className="border-t border-white/12 pt-8 md:pt-10">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={revealTransition}
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end lg:gap-16">
              <div>
                <SectionEyebrow tone="inverse">
                  {proofSignalsSectionContent.eyebrow}
                </SectionEyebrow>
                <SectionHeading tone="inverse" className="mt-4 max-w-[12ch]">
                  {proofSignalsSectionContent.title}
                </SectionHeading>
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <p className="max-w-2xl text-base leading-8 text-white/62 md:text-lg">
                  {proofSignalsSectionContent.description}
                </p>

                <div className="flex items-end lg:justify-end">
                  <Link
                    href={proofSignalsSectionContent.cta.href}
                    className="ui-radius-button inline-flex items-center justify-center border border-white/14 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent hover:bg-accent hover:text-white"
                  >
                    {proofSignalsSectionContent.cta.label}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-14 grid gap-8 border-t border-white/12 pt-8 md:grid-cols-3 md:gap-10 md:pt-10">
            {proofSignalsSectionContent.items.map((item, index) => (
              <motion.article
                key={item.title}
                className="border-t border-white/12 pt-6 first:border-t-0 first:pt-0 md:border-t-0 md:border-s md:border-white/12 md:ps-7 md:first:border-s md:first:ps-0"
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={revealTransition}
              >
                <p className="text-sm font-black tracking-[-0.03em] text-accent">
                  {`0${index + 1}`.slice(-2)}
                </p>
                <h3 className="mt-4 max-w-[12ch] text-2xl font-bold leading-[1.2] tracking-[-0.04em] text-white md:text-[2rem]">
                  {item.title}
                </h3>
                <p className="mt-5 text-base leading-8 text-white/60 md:text-lg">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
