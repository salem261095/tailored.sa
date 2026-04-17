import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SharedPageHeroProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SharedPageHero({
  children,
  className,
  contentClassName,
}: SharedPageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-primary text-white",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,73,37,0.18),transparent_32%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />

      <div
        className={cn(
          "relative mx-auto flex min-h-[21rem] max-w-content items-end px-6 pb-10 pt-28 md:min-h-[25rem] md:px-8 md:pb-14 md:pt-40 lg:pt-44",
          "[&_h1]:text-white [&_h2]:text-white [&_.text-foreground]:text-white [&_.text-muted]:text-white/64",
          "[&_a.text-muted]:text-white/72 [&_a.text-muted:hover]:text-white [&_a:hover]:text-accent-light",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
