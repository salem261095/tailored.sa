"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { featuresContent } from "@/lib/content";
import { useMemo, useState } from "react";

type FeatureVisual = {
  image: string;
  alt: string;
};

const featureVisuals: FeatureVisual[] = [
  {
    image: "/images/features/branding.jpg",
    alt: "Branding preview",
  },
  {
    image: "/images/features/development.jpg",
    alt: "Development preview",
  },
  {
    image: "/images/features/websites.jpg",
    alt: "Websites preview",
  },
  {
    image: "/images/features/design-support.jpg",
    alt: "Design support preview",
  },
];

export function FeaturesSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);

  const itemTransition = useMemo(
    () => ({
      duration: prefersReducedMotion ? 0.18 : 0.62,
      ease: [0.32, 0.72, 0, 1] as const,
      type: "tween" as const,
    }),
    [prefersReducedMotion],
  );

  return (
    <section className="bg-white px-6 py-20 md:px-8 md:py-28">
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
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(18rem,0.32fr)] lg:items-start lg:gap-12">
          <motion.div
            className="order-1"
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={itemTransition}
          >
            <div className="border-t border-black/10">
              {featuresContent.items.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className="group w-full border-b border-black/10 py-7 text-start md:py-9 lg:py-10"
                    variants={{
                      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={itemTransition}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-start gap-4 md:gap-6 lg:gap-7">
                      <motion.span
                        animate={{
                          color: isActive ? "var(--color-accent)" : "rgb(0 0 0 / 1)",
                        }}
                        whileHover={{ color: "var(--color-accent)" }}
                        className="shrink-0 pt-1 text-base font-black tracking-[-0.03em] md:text-lg"
                        transition={itemTransition}
                      >
                        {`{${(index + 1).toString().padStart(2, "0")}}`}
                      </motion.span>

                      <motion.h3
                        animate={{
                          color: isActive ? "var(--color-foreground)" : "rgb(0 0 0 / 1)",
                        }}
                        whileHover={{ color: "var(--color-accent)" }}
                        transition={itemTransition}
                        className="flex-1 text-start text-[1.5rem] font-black leading-[1.08] tracking-[-0.045em] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.7rem] xl:text-[3rem]"
                      >
                        {item.title}
                      </motion.h3>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <FeaturePreview
            item={featuresContent.items[activeIndex]}
            visual={featureVisuals[activeIndex]}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </motion.div>
    </section>
  );
}

function FeaturePreview({
  item,
  visual,
  prefersReducedMotion,
}: {
  item: (typeof featuresContent.items)[number];
  visual?: FeatureVisual;
  prefersReducedMotion: boolean;
}) {
  if (!item) {
    return null;
  }

  return (
    <motion.div
      className="order-2 lg:sticky lg:top-28"
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: prefersReducedMotion ? 0.18 : 0.68,
        ease: [0.32, 0.72, 0, 1],
        type: "tween",
      }}
    >
      <div className="mx-auto max-w-md lg:mr-0 lg:ml-auto">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/4">
          <AnimatePresence mode="wait">
            {visual ? (
              <motion.div
                key={visual.image}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -14 }}
                transition={{
                  duration: prefersReducedMotion ? 0.16 : 0.54,
                  ease: [0.32, 0.72, 0, 1],
                  type: "tween",
                }}
                className="absolute inset-0"
              >
                <Image
                  src={visual.image}
                  alt={visual.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 28vw, 100vw"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.title}
            className="mt-5"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
            transition={{
              duration: prefersReducedMotion ? 0.14 : 0.42,
              ease: [0.32, 0.72, 0, 1],
              type: "tween",
            }}
          >
            <p className="text-sm font-medium text-muted">{item.title}</p>
            <p className="mt-4 max-w-sm text-base leading-8 text-foreground md:text-lg">
              {item.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
