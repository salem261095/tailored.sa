"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeFaqSectionContent } from "@/lib/content";

export function HomeFaqSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [openIndex, setOpenIndex] = useState(0);

  const revealTransition = {
    duration: prefersReducedMotion ? 0.18 : 0.68,
    ease: [0.32, 0.72, 0, 1] as const,
    type: "tween" as const,
  };

  return (
    <section id="faq" className="bg-white px-6 py-16 md:px-8 md:py-24">
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
              : { staggerChildren: 0.07, delayChildren: 0.04 },
          },
        }}
      >
        <motion.div
          className="max-w-3xl"
          variants={{
            hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={revealTransition}
        >
          <SectionEyebrow>{homeFaqSectionContent.eyebrow}</SectionEyebrow>
          <SectionHeading className="mt-3">
            {homeFaqSectionContent.title}
          </SectionHeading>
        </motion.div>

        <div className="mt-10 border-t border-black/8">
          {homeFaqSectionContent.items.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <motion.article
                key={item.question}
                className="border-b border-black/8"
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={revealTransition}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                  className="flex w-full items-start justify-between gap-6 py-7 text-start md:py-8"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0">
                    <p className="text-xl font-black leading-[1.35] text-foreground md:text-[1.55rem]">
                      {item.question}
                    </p>
                  </div>

                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 text-foreground">
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={revealTransition}
                    >
                      <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={revealTransition}
                      className="overflow-hidden"
                    >
                      <p className="max-w-4xl pb-7 text-base leading-8 text-muted md:pb-8 md:text-lg">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="mt-10 flex flex-col gap-3 md:flex-row md:flex-wrap"
          variants={{
            hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={revealTransition}
        >
          <Link
            href={homeFaqSectionContent.cta.primary.href}
            className="ui-radius-button inline-flex items-center justify-center bg-foreground px-6 py-4 text-base font-semibold text-white transition hover:bg-accent"
          >
            {homeFaqSectionContent.cta.primary.label}
          </Link>
          <Link
            href={homeFaqSectionContent.cta.secondary.href}
            className="ui-radius-button inline-flex items-center justify-center border border-black/10 px-6 py-4 text-base font-semibold text-foreground transition hover:border-accent hover:text-accent"
          >
            {homeFaqSectionContent.cta.secondary.label}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
