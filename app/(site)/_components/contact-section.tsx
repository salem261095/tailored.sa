"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ContactForm } from "@/app/(site)/_components/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  createFadeUp,
  createSectionStagger,
  createTweenTransition,
} from "@/lib/motion";

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const revealTransition = createTweenTransition(prefersReducedMotion, 0.76);

  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <motion.div
        className="mx-auto max-w-content rounded border border-black/6 bg-white px-5 py-8 md:px-8 md:py-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={createSectionStagger(prefersReducedMotion)}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <motion.div
            variants={createFadeUp(prefersReducedMotion)}
            transition={revealTransition}
          >
            <p className="text-sm font-semibold text-muted">تواصل معنا</p>
            <SectionHeading className="mt-3 max-w-md">
              ابدأ الحديث حول مشروعك القادم.
            </SectionHeading>
            <p className="mt-5 max-w-md text-base leading-8 text-muted md:text-lg">
              شاركنا فكرتك، وسنرتب لك مسارًا أوضح للهوية والمحتوى والتجربة
              الرقمية.
            </p>
          </motion.div>

          <motion.div
            variants={createFadeUp(prefersReducedMotion)}
            transition={revealTransition}
          >
            <ContactForm submitLabel="أرسل التفاصيل" rows={6} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
