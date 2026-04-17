"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const INTRO_HOLD_MS = 640;
const INTRO_EXIT_MS = 1120;
const PANEL_COUNT = 2;

export function IntroSplash() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const panels = useMemo(() => Array.from({ length: PANEL_COUNT }), []);

  const panelTransition = prefersReducedMotion
    ? { duration: 0.24, ease: [0, 0, 1, 1] as const, type: "tween" as const }
    : { duration: 0.98, ease: [0.32, 0.72, 0, 1] as const, type: "tween" as const };

  const logoTransition = prefersReducedMotion
    ? { duration: 0.18, ease: [0, 0, 1, 1] as const, type: "tween" as const }
    : { duration: 0.42, ease: [0.32, 0.72, 0, 1] as const, type: "tween" as const };

  const panelContainerVariants: Variants = {
    hidden: {},
    visible: {},
    exit: {
      transition: prefersReducedMotion
        ? undefined
        : {
            staggerChildren: 0.02,
          },
    },
  };

  const logoVariants: Variants = {
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: prefersReducedMotion ? 0.98 : 0.95,
    },
  };

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      setIsAnimatingOut(true);
    }, prefersReducedMotion ? 0 : INTRO_HOLD_MS);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, [isVisible, prefersReducedMotion]);

  useEffect(() => {
    if (!isAnimatingOut) {
      return;
    }

    const timeout = window.setTimeout(() => {
      document.body.style.overflow = "";
      setIsVisible(false);
    }, prefersReducedMotion ? 220 : INTRO_EXIT_MS);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isAnimatingOut, prefersReducedMotion]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden">
      <motion.div
        className="absolute inset-0 flex"
        variants={panelContainerVariants}
        initial="hidden"
        animate={isAnimatingOut ? "exit" : "visible"}
      >
        {panels.map((_, index) => {
          const direction = index === 0 ? -1 : 1;

          const panelVariants: Variants = {
            hidden: { y: "0%" },
            visible: { y: "0%" },
            exit: { y: `${direction * 108}%` },
          };

          return (
            <motion.div
              key={index}
              className="w-full flex-1 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02)]"
              variants={panelVariants}
              transition={panelTransition}
            />
          );
        })}
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={logoVariants}
        initial="visible"
        animate={isAnimatingOut ? "exit" : "visible"}
        transition={logoTransition}
      >
        <div className="relative h-14 w-[10rem] md:h-16 md:w-[11.5rem]">
          <Image
            src="/brand/tailored-black.svg"
            alt="مُحاك"
            fill
            priority
            className="object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
}
