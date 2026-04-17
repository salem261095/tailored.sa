"use client";

import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { featuresContent } from "@/lib/content";

const revealCardSpans = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
] as const;

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-content">
        <div
          className={`mx-auto max-w-3xl text-center transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold text-muted">{featuresContent.eyebrow}</p>
          <SectionHeading className="mt-3">
            ما الذي يجعل حضور علامتك أكثر اتساقًا وتأثيرًا؟
          </SectionHeading>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-5 lg:mt-18 lg:gap-6">
          {featuresContent.items.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-[1.75rem] border border-black/6 bg-white/80 px-5 py-6 backdrop-blur transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 md:px-7 md:py-7 ${revealCardSpans[index] ?? "md:col-span-6"} ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${120 + index * 110}ms` }}
            >
              <div className="flex h-full flex-col justify-between gap-10">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="max-w-[20ch] text-xl font-bold leading-[1.55] tracking-[-0.03em] text-foreground md:text-2xl">
                    {item.title}
                  </h3>
                  <span className="shrink-0 text-3xl font-black tracking-[-0.05em] text-foreground/15 md:text-4xl">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  <span className="h-px w-14 bg-black/10" />
                  <p className="max-w-2xl text-base leading-8 text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
