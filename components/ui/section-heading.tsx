import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingTone = "default" | "inverse";
type SectionHeadingSize = "standard" | "large" | "display";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
  size?: SectionHeadingSize;
  tone?: SectionHeadingTone;
} & Omit<ComponentPropsWithoutRef<"h2">, "children" | "className">;

const sizeClassNames: Record<SectionHeadingSize, string> = {
  standard: "text-3xl md:text-5xl",
  large: "text-4xl md:text-5xl lg:text-6xl",
  display: "text-[3.3rem] md:text-[5.5rem] lg:text-[7rem]",
};

const toneClassNames: Record<SectionHeadingTone, string> = {
  default: "text-foreground",
  inverse: "text-white",
};

export function SectionHeading({
  children,
  className,
  size = "standard",
  tone = "default",
  ...props
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-black tracking-[-0.05em]",
        size === "display" ? "leading-[0.88]" : "leading-[1.08]",
        sizeClassNames[size],
        toneClassNames[tone],
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
