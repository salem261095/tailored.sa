import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";

export function CtaSection() {
  return (
    <section className="bg-foreground px-6 py-12 text-white md:px-8 md:py-16">
      <div className="mx-auto max-w-content">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading tone="inverse">
            لا تكتفي بالمنافسة… بل تصدّر
          </SectionHeading>
          <p className="mt-5 text-base leading-8 text-white/80 md:text-lg">
            دعنا نبتكر استراتيجيات إبداعية تجعل علامتك تقود السوق
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="ui-radius-button inline-flex items-center justify-center bg-white px-6 py-4 text-base font-semibold text-foreground transition hover:bg-accent hover:text-white"
            >
              احجز استشارة مجانية
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
