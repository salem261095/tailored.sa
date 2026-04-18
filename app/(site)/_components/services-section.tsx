"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { servicesContent } from "@/lib/content";

export function ServicesSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const revealTransition = {
    duration: prefersReducedMotion ? 0.18 : 0.72,
    ease: [0.32, 0.72, 0, 1] as const,
    type: "tween" as const,
  };

  return (
    <section id="services" className="bg-white px-6 py-16 md:px-8 md:py-24">
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
        <motion.div
          className="max-w-4xl"
          variants={{
            hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={revealTransition}
        >
          <SectionEyebrow>{servicesContent.eyebrow}</SectionEyebrow>
          <SectionHeading className="mt-3">
            حلول متكاملة تساعدك في بناء علامة تجارية قوية
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">
            {servicesContent.description}
          </p>
        </motion.div>

        <div className="mt-14 border-t border-black/8">
          {servicesContent.items.map((item, index) => (
            <motion.article
              key={item.number}
              className="group border-b border-black/8 pt-6 pb-6 md:pt-7 md:pb-7"
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={revealTransition}
            >
              <div className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(5.5rem,0.16fr)_minmax(0,0.52fr)_minmax(0,0.32fr)] lg:items-start">
                <motion.div
                  className="flex items-center gap-1 text-3xl font-black tracking-[-0.05em] text-foreground/30 md:text-4xl"
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { color: "rgb(17 17 17 / 0.62)" }
                  }
                  transition={revealTransition}
                >
                  <span>{item.number.replace(/\.$/, "")}</span>
                  <span className="text-accent">.</span>
                </motion.div>

                <div>
                  <motion.h3
                    className="text-2xl font-black leading-[1.25] tracking-[-0.04em] text-foreground md:text-[2rem]"
                    transition={revealTransition}
                  >
                    {item.title}
                  </motion.h3>
                </div>

                <div>
                  <motion.p className="max-w-xl text-base leading-8 text-muted md:text-lg md:translate-y-2 md:opacity-0 md:transition-[opacity,transform] md:duration-500 md:[transition-timing-function:cubic-bezier(0.32,0.72,0,1)] md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    {item.description}
                  </motion.p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
