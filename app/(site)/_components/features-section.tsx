"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { featuresContent } from "@/lib/content";

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-content">

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(18rem,0.32fr)] lg:items-start lg:gap-12">
          <div className="order-1">
            <div className="border-t border-black/10">
              {featuresContent.items.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className={`group w-full border-b border-black/10 py-7 text-start transition-[opacity,transform,color,border-color] duration-500 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] md:py-9 lg:py-10 ${isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                      }`}
                    style={{ transitionDelay: `${120 + index * 90}ms` }}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-start gap-4 md:gap-6 lg:gap-7">
                      <span
                        className={`shrink-0 pt-1 text-base font-black tracking-[-0.03em] transition-colors duration-500 md:text-lg ${isActive
                          ? "text-accent"
                          : "text-black group-hover:text-accent group-focus-visible:text-accent"
                          }`}
                      >
                        {`{${(index + 1).toString().padStart(2, "0")}}`}
                      </span>

                      <h3
                        className={`flex-1 text-start font-black leading-[1.08] tracking-[-0.045em] transition-colors duration-500 text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.7rem] xl:text-[3rem] ${isActive
                          ? "text-foreground group-hover:text-accent group-focus-visible:text-accent"
                          : "text-black group-hover:text-accent group-focus-visible:text-accent"
                          }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <FeaturePreview
            item={featuresContent.items[activeIndex]}
            visual={featureVisuals[activeIndex]}
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
}

function FeaturePreview({
  item,
  visual,
  isVisible,
}: {
  item: (typeof featuresContent.items)[number];
  visual?: FeatureVisual;
  isVisible: boolean;
}) {
  if (!item) {
    return null;
  }

  return (
    <div
      className={`order-2 transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] lg:sticky lg:top-28 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
    >
      <div className="mx-auto max-w-md lg:mr-0 lg:ml-auto">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/4">
          {visual ? (
            <Image
              src={visual.image}
              alt={visual.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 28vw, 100vw"
            />
          ) : null}
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-muted">{item.title}</p>
          <p className="mt-4 max-w-sm text-base leading-8 text-foreground md:text-lg">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
