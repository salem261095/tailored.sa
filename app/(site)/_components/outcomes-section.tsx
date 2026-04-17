"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { digitalOutcomesContent } from "@/lib/content";

export function OutcomesSection() {
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
      { threshold: 0.18 },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0d0d0d] px-6 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-content">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div
            className={`lg:sticky lg:top-28 lg:self-start transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            <p className="text-sm font-semibold text-white/45">
              {digitalOutcomesContent.eyebrow}
            </p>
            <SectionHeading
              tone="inverse"
              className="mt-4 max-w-full"
            >
              {digitalOutcomesContent.title}
            </SectionHeading>
            <p className="mt-8 max-w-md text-base leading-8 text-white/62 md:text-lg">
              {digitalOutcomesContent.description}
            </p>
          </div>

          <div className="flex flex-col">
            {digitalOutcomesContent.items.map((item, index) => (
              <article
                key={item.title}
                className={`border-t border-white/12 py-7 first:border-t-0 first:pt-0 last:pb-0 transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                style={{ transitionDelay: `${120 + index * 110}ms` }}
              >
                <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] md:gap-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-start">
                  <div className="flex items-center gap-1 text-3xl font-black tracking-[-0.05em] text-white/28 md:text-4xl">
                    <span>{(index + 1).toString().padStart(2, "0")}</span>
                    <span className="text-accent">.</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold leading-[1.3] tracking-[-0.04em] text-white md:text-[2rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
                      {item.description}
                    </p>
                  </div>

                  <div className="hidden lg:flex lg:justify-end">
                    <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/28">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </article>
            ))}

            <div
              className={`mt-10 transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              style={{ transitionDelay: `${120 + digitalOutcomesContent.items.length * 110}ms` }}
            >
              <Link
                href={digitalOutcomesContent.cta.href}
                className="ui-radius-button inline-flex items-center justify-center bg-white px-6 py-4 text-base font-semibold text-foreground transition hover:bg-accent hover:text-white"
              >
                {digitalOutcomesContent.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
