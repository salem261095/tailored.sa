import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionEyebrowTone = "default" | "inverse";

type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: SectionEyebrowTone;
} & Omit<ComponentPropsWithoutRef<"p">, "children" | "className">;

const toneClassNames: Record<SectionEyebrowTone, string> = {
  default: "text-muted",
  inverse: "text-white/55",
};

export function SectionEyebrow({
  children,
  className,
  tone = "default",
  ...props
}: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-sm font-semibold",
        toneClassNames[tone],
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="relative inline-block h-3.5 w-3.5 shrink-0"
      >
        <span className="absolute inset-0 border-s-2 border-t-2 border-accent" />
        <span className="absolute start-0 top-0 h-[2px] w-[8px] origin-top-left rotate-45 bg-accent" />
      </span>
      <span>{children}</span>
    </p>
  );
}
