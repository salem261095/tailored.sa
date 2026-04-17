"use client";

import type { CSSProperties } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { linksContent, siteContent } from "@/lib/content";

const MENU_ID = "site-menu";
const MENU_OPEN_DATASET_VALUE = "true";
const MENU_ITEM_DELAY_MS = 90;
const LOGO_MAX_SCALE = 3;
const LOGO_MIN_SCALE = 1;
const LOGO_COLLAPSE_SCROLL_RANGE = 140;
const LOGO_ALT = siteContent.seo.siteName;
const HEADER_LOGO_CLASS_NAME =
  "absolute inset-0 h-10 w-auto max-w-none transition-all duration-500 md:h-11";
const MENU_BUTTON_BASE_CLASS_NAME =
  "inline-flex h-12 w-12 items-center justify-center rounded-xl border transition duration-500";
const MENU_LINK_BASE_CLASS_NAME =
  "text-3xl font-bold tracking-[-0.05em] text-white transition-all duration-500 md:text-4xl";
const CTA_LINK_BASE_CLASS_NAME =
  "text-2xl font-bold tracking-[-0.05em] text-accent transition-all duration-500 hover:text-accent-light md:text-3xl";

function getMenuOverlayClassName(isOpen: boolean) {
  return [
    "fixed inset-0 z-40 transition-[background-color,opacity,visibility] duration-500",
    isOpen ? "visible bg-black opacity-100" : "invisible bg-black/0 opacity-0",
  ].join(" ");
}

function getMenuButtonClassName(isOpen: boolean) {
  return [
    MENU_BUTTON_BASE_CLASS_NAME,
    isOpen
      ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
      : "border-white/10 bg-white/5 text-white hover:bg-white/15",
  ].join(" ");
}

function getLogoClassName(isVisible: boolean, visibleTransform: string, hiddenTransform: string) {
  return `${HEADER_LOGO_CLASS_NAME} ${isVisible ? visibleTransform : hiddenTransform}`;
}

function getMenuLinkClassName(isOpen: boolean, isActive: boolean) {
  return [
    MENU_LINK_BASE_CLASS_NAME,
    isOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
    isActive ? "text-accent" : "hover:text-white/70",
  ].join(" ");
}

function getCtaLinkClassName(isOpen: boolean) {
  return [
    CTA_LINK_BASE_CLASS_NAME,
    isOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
  ].join(" ");
}

function getMenuItemStyle(index: number, isOpen: boolean): CSSProperties {
  return {
    transitionDelay: isOpen ? `${index * MENU_ITEM_DELAY_MS}ms` : "0ms",
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getLogoScale(scrollY: number) {
  const progress = clamp(scrollY / LOGO_COLLAPSE_SCROLL_RANGE, 0, 1);

  return LOGO_MAX_SCALE - progress * (LOGO_MAX_SCALE - LOGO_MIN_SCALE);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [logoScale, setLogoScale] = useState(LOGO_MAX_SCALE);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateScale = () => {
      setLogoScale(getLogoScale(window.scrollY));
      frameRef.current = null;
    };

    const handleScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(updateScale);
    };

    updateScale();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.body.dataset.menuOpen = isOpen ? MENU_OPEN_DATASET_VALUE : "false";

    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.menuOpen;
    };
  }, [isOpen]);

  const activeLogoScale = isOpen ? LOGO_MIN_SCALE : logoScale;
  const logoScaleStyle: CSSProperties = {
    transform: `translate3d(0,0,0) scale(${activeLogoScale})`,
    transformOrigin: "top right",
    willChange: "transform",
  };

  return (
    <header
      data-site-header
      className="fixed inset-x-0 top-0 z-50 bg-black transition-colors duration-500"
    >
      <div className="relative z-50 mx-auto flex w-full max-w-content items-center justify-between bg-black px-6 py-5 transition-colors duration-500 md:px-8 md:py-7">
        <Link
          href="/"
          className="relative inline-flex h-10 items-center overflow-visible md:h-11"
        >
          <img
            src="/brand/tailored-white.svg"
            alt={LOGO_ALT}
            className={HEADER_LOGO_CLASS_NAME}
            style={logoScaleStyle}
          />
          <span className="invisible h-10 w-[7.75rem] md:h-11 md:w-[8.5rem]" />
        </Link>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={MENU_ID}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
          className={getMenuButtonClassName(isOpen)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition duration-500 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute inset-x-0 top-[7px] h-0.5 rounded-full bg-current transition duration-500 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-current transition duration-500 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div id={MENU_ID} className={getMenuOverlayClassName(isOpen)}>
        <div className="flex min-h-dvh items-center justify-center px-6 md:px-8">
          <nav className="flex w-full max-w-xl flex-col items-center justify-center gap-4 text-center">
            {linksContent.navigation.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getMenuLinkClassName(isOpen, isActive)}
                  style={getMenuItemStyle(index, isOpen)}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href={linksContent.primaryCta.href}
              className={getCtaLinkClassName(isOpen)}
              style={getMenuItemStyle(linksContent.navigation.length, isOpen)}
            >
              {linksContent.primaryCta.label}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
