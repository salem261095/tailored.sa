"use client";
import { motion, useReducedMotion } from "framer-motion";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandStrategySectionContent } from "@/lib/content";

export function BrandStrategySection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const revealTransition = {
    duration: prefersReducedMotion ? 0.18 : 0.74,
    ease: [0.32, 0.72, 0, 1] as const,
    type: "tween" as const,
  };

  return (
    <section
      id="brand-strategy"
      className="bg-accent/20 px-6 py-16 md:px-8 md:py-24"
    >
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
              : { staggerChildren: 0.08, delayChildren: 0.04 },
          },
        }}
      >
        <div className="border-t border-black/8 pt-8 md:pt-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={revealTransition}
            >
              <SectionEyebrow>{brandStrategySectionContent.eyebrow}</SectionEyebrow>
              <SectionHeading className="mt-4 max-w-[12ch]">
                {brandStrategySectionContent.title}
              </SectionHeading>
            </motion.div>

            <motion.div
              className="space-y-6 text-base leading-8 text-foreground/82 md:text-lg md:leading-9"
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={revealTransition}
            >
              {brandStrategySectionContent.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-black/8 pt-8 md:grid-cols-3 md:gap-10 md:pt-10">
          {brandStrategySectionContent.items.map((item, index) => (
            <motion.article
              key={item.title}
              className="group border-t border-black/8 pt-6 first:border-t-0 md:min-h-[15rem] md:border-t-0 md:border-s md:ps-7 md:first:border-s md:first:ps-0"
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={revealTransition}
            >
              <p className="text-sm font-black tracking-[-0.03em] text-accent">
                {`0${index + 1}`.slice(-2)}
              </p>
              <h3 className="mt-4 max-w-[11ch] text-2xl font-black leading-[1.2] tracking-[-0.04em] text-foreground md:text-[2rem]">
                {item.title}
              </h3>
              <p className="mt-5 text-base leading-8 text-muted transition md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:text-lg">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
