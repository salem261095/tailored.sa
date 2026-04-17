"use client";

import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "@/components/ui/section-heading";

export function BottleneckSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen items-center bg-foreground px-6 py-24 text-white md:px-8 md:py-32"
    >
      <div className="mx-auto flex w-full max-w-content items-center">
        <div
          className={`mx-auto max-w-4xl transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold text-white/55">ما الذي يعيق التقدّم؟</p>
          <SectionHeading tone="inverse" size="large" className="mt-4">
            العوائق التي تُبطئ نموّك
            <br />
            وتؤخّر أثر علامتك.
          </SectionHeading>
        </div>
      </div>
    </section>
  );
}
