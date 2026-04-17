"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/ui/section-heading";
import {
  createDividerLead,
  createFadeUp,
  createTweenTransition,
} from "@/lib/motion";

export function BottleneckSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const dividerTransition = createTweenTransition(prefersReducedMotion, 0.72, 0.18);
  const contentTransition = createTweenTransition(prefersReducedMotion, 0.82, 0.2, 0.08);

  return (
    <section className="flex min-h-screen items-center bg-foreground px-6 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto flex w-full max-w-content items-center">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          <motion.div
            className="h-px w-20 bg-white/35 md:w-28"
            variants={createDividerLead(prefersReducedMotion)}
            transition={dividerTransition}
            style={{ transformOrigin: "right center" }}
          />

          <motion.div
            className="mt-8 md:mt-10"
            variants={createFadeUp(prefersReducedMotion)}
            transition={contentTransition}
          >
            <p className="text-sm font-semibold text-white/55">ما الذي يعيق التقدّم؟</p>
            <SectionHeading tone="inverse" size="large" className="mt-4">
              العوائق التي تُبطئ نموّك
              <br />
              وتؤخّر أثر علامتك.
            </SectionHeading>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
