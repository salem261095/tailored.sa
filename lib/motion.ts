import type { Transition, Variants } from "framer-motion";

export const REVEAL_EASE = [0.32, 0.72, 0, 1] as const;
const REDUCED_EASE = [0, 0, 1, 1] as const;

export function createTweenTransition(
  prefersReducedMotion: boolean,
  duration = 0.72,
  reducedDuration = 0.18,
  delay = 0,
): Transition {
  return {
    duration: prefersReducedMotion ? reducedDuration : duration,
    ease: prefersReducedMotion ? REDUCED_EASE : REVEAL_EASE,
    type: "tween",
    delay,
  };
}

export function createSectionStagger(
  prefersReducedMotion: boolean,
  staggerChildren = 0.08,
  delayChildren = 0.04,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: prefersReducedMotion
        ? undefined
        : { staggerChildren, delayChildren },
    },
  };
}

export function createFadeUp(
  prefersReducedMotion: boolean,
  distance = 24,
): Variants {
  return {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : distance,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
}

export function createDividerLead(
  prefersReducedMotion: boolean,
): Variants {
  return {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { scaleX: 1, opacity: 1 },
  };
}
