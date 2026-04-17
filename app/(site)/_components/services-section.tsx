"use client";

import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { servicesContent } from "@/lib/content";

export function ServicesSection() {
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
    <section ref={sectionRef} className="bg-white px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-content">
        <div
          className={`mx-auto max-w-4xl text-center transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <p className="text-sm font-semibold text-muted">{servicesContent.eyebrow}</p>
          <SectionHeading className="mt-3">
            حلول متكاملة تساعدك في بناء علامة تجارية قوية
          </SectionHeading>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">
            {servicesContent.description}
          </p>
        </div>

        <div className="mt-14 border-t border-black/8">
          {servicesContent.items.map((item, index) => (
            <article
              key={item.number}
              className={`group border-b border-black/8 py-8 transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] md:py-10 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              style={{ transitionDelay: `${120 + index * 90}ms` }}
            >
              <div className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(5.5rem,0.16fr)_minmax(0,0.52fr)_minmax(0,0.32fr)] lg:items-start">
                <div className="flex items-center gap-1 text-3xl font-black tracking-[-0.05em] text-foreground/30 md:text-4xl">
                  <span>{item.number.replace(/\.$/, "")}</span>
                  <span className="text-accent">.</span>
                </div>

                <div>
                  <h3 className="text-2xl font-black leading-[1.25] tracking-[-0.04em] text-foreground md:text-[2rem]">
                    {item.title}
                  </h3>
                </div>

                <div>
                  <p className="max-w-xl text-base leading-8 text-muted md:text-lg md:translate-y-2 md:opacity-0 md:transition-[opacity,transform] md:duration-500 md:[transition-timing-function:cubic-bezier(0.32,0.72,0,1)] md:group-hover:translate-y-0 md:group-hover:opacity-100">
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
