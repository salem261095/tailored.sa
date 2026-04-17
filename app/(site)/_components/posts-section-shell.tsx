"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import {
  createFadeUp,
  createSectionStagger,
  createTweenTransition,
} from "@/lib/motion";

export function PostsSectionShell({
  children,
}: {
  children: ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section className="px-6 py-16 md:px-0 md:py-24">
      <motion.div
        className="mx-auto max-w-content md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        variants={createSectionStagger(prefersReducedMotion)}
      >
        <motion.div
          className="mb-10 max-w-3xl md:px-0"
          variants={createFadeUp(prefersReducedMotion)}
          transition={createTweenTransition(prefersReducedMotion)}
        >
          <p className="text-sm font-semibold text-muted">المدونة</p>
          <SectionHeading className="mt-3">
            أحدث المقالات في التسويق وتصميم العلامات
          </SectionHeading>
        </motion.div>

        <motion.div
          variants={createFadeUp(prefersReducedMotion, 22)}
          transition={createTweenTransition(prefersReducedMotion)}
        >
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
