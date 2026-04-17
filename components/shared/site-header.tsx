"use client";

import type { CSSProperties } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { linksContent, siteContent } from "@/lib/content";

const MENU_ID = "site-menu";
const MENU_OPEN_DATASET_VALUE = "true";
const MENU_ITEM_DELAY_MS = 90;

const MOBILE_LOGO_MAX_SCALE = 1.2;
const COMPACT_LAPTOP_LOGO_MAX_SCALE = 1.45;
const STANDARD_LAPTOP_LOGO_MAX_SCALE = 1.72;
const DESKTOP_LOGO_MAX_SCALE = 2.1;
const LOGO_MIN_SCALE = 1;
const LOGO_COLLAPSE_SCROLL_RANGE = 140;

const LOGO_ALT = siteContent.seo.siteName;

const HEADER_LOGO_CLASS_NAME =
  "absolute inset-0 h-10 w-auto max-w-none object-contain transition-transform duration-500 ease-out md:h-11";

const MENU_BUTTON_BASE_CLASS_NAME =
  "inline-flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-md transition-all duration-500 md:h-12 md:w-12";

const MENU_LINK_BASE_CLASS_NAME =
  "group relative text-2xl font-bold tracking-[-0.05em] transition-all duration-500 ease-out md:text-4xl";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getMaxLogoScale(width: number, height: number) {
  if (width < 768) {
    return MOBILE_LOGO_MAX_SCALE;
  }

  // Treat shorter laptop viewports more conservatively so the scaled logo
  // doesn't compete with the hero headline.
  if (width < 1200 || height < 760) {
    return COMPACT_LAPTOP_LOGO_MAX_SCALE;
  }

  if (width < 1440 || height < 900) {
    return STANDARD_LAPTOP_LOGO_MAX_SCALE;
  }

  return DESKTOP_LOGO_MAX_SCALE;
}

function getLogoScale(scrollY: number, width: number, height: number) {
  const progress = clamp(scrollY / LOGO_COLLAPSE_SCROLL_RANGE, 0, 1);
  const maxScale = getMaxLogoScale(width, height);

  return maxScale - progress * (maxScale - LOGO_MIN_SCALE);
}

function getHeaderClassName(isOpen: boolean) {
  return [
    "fixed inset-x-0 top-0 z-50 transition-all duration-500",
    isOpen ? "min-h-dvh" : "",
  ].join(" ");
}

function getHeaderInnerSurfaceClassName(
  isOpen: boolean,
  isScrolled: boolean
) {
  return [
    "relative z-50 w-full transition-all duration-500",
    isOpen || isScrolled
      ? "bg-black/58 shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
      : "bg-transparent",
  ].join(" ");
}

function getMenuOverlayClassName(isOpen: boolean) {
  return [
    "absolute inset-0 z-40 transition-[opacity,visibility,background-color,backdrop-filter] duration-500",
    isOpen
      ? "visible bg-black/58 opacity-100 backdrop-blur-2xl"
      : "invisible bg-black/0 opacity-0 backdrop-blur-none",
  ].join(" ");
}

function getMenuButtonClassName(isOpen: boolean) {
  return [
    MENU_BUTTON_BASE_CLASS_NAME,
    isOpen
      ? "border-white/18 bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
      : "border-white/10 bg-white/[0.06] text-white hover:border-white/16 hover:bg-white/[0.1]",
  ].join(" ");
}

function getMenuLinkClassName(isOpen: boolean, isActive: boolean) {
  return [
    MENU_LINK_BASE_CLASS_NAME,
    isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0",
    isActive
      ? "text-white [text-shadow:0_0_14px_rgba(255,255,255,0.16)]"
      : "text-white hover:text-white",
  ].join(" ");
}

function getCtaLinkClassName(isOpen: boolean) {
  return [
    MENU_LINK_BASE_CLASS_NAME,
    isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0",
    "text-accent hover:text-accent-light",
  ].join(" ");
}

function getMenuItemStyle(index: number, isOpen: boolean): CSSProperties {
  return {
    transitionDelay: isOpen ? `${index * MENU_ITEM_DELAY_MS}ms` : "0ms",
  };
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [logoScale, setLogoScale] = useState(DESKTOP_LOGO_MAX_SCALE);
  const [isScrolled, setIsScrolled] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateHeaderState = () => {
      const scrollY = window.scrollY;
      const width = window.innerWidth;
      const height = window.innerHeight;

      setLogoScale(getLogoScale(scrollY, width, height));
      setIsScrolled(scrollY > 10);
      frameRef.current = null;
    };

    const handleScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateHeaderState);
    };

    const handleResize = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

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
    <header data-site-header className={getHeaderClassName(isOpen)}>
      <div className={getHeaderInnerSurfaceClassName(isOpen, isScrolled)}>
        <div className="mx-auto flex w-full max-w-content items-center justify-between px-6 py-5 md:px-8 md:py-7">
          <Link
            href="/"
            className="relative inline-flex h-10 items-center overflow-visible md:h-11"
            aria-label={siteContent.seo.siteName}
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
                className={`absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition duration-500 ${isOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
              />
              <span
                className={`absolute inset-x-0 top-[7px] h-0.5 rounded-full bg-current transition duration-500 ${isOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-current transition duration-500 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div id={MENU_ID} className={getMenuOverlayClassName(isOpen)}>
        <div className="flex min-h-dvh items-center justify-center px-6 pt-24 md:px-8 md:pt-28">
          <nav className="flex w-full max-w-xl flex-col items-center justify-center gap-4 text-center md:gap-5">
            {linksContent.navigation.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getMenuLinkClassName(isOpen, isActive)}
                  style={getMenuItemStyle(index, isOpen)}
                >
                  <span className="relative inline-block">
                    <span className="relative z-10">{item.label}</span>

                    <span
                      className={[
                        "pointer-events-none absolute inset-x-[-0.5rem] top-1/2 -z-0 h-[1.05em] -translate-y-1/2 rounded-full",
                        "bg-white/[0.06] backdrop-blur-md transition-all duration-500",
                        isOpen ? "opacity-100 blur-[10px]" : "opacity-0 blur-0",
                        isActive
                          ? "scale-100"
                          : "scale-90 group-hover:scale-100 group-hover:opacity-100",
                      ].join(" ")}
                    />

                    <span
                      className={[
                        "pointer-events-none absolute inset-x-[-0.2rem] bottom-[-0.15em] h-px",
                        "bg-gradient-to-r from-transparent via-white/22 to-transparent",
                        "transition-opacity duration-500",
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100",
                      ].join(" ")}
                    />
                  </span>
                </Link>
              );
            })}

            <div
              className={`transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0"
                }`}
              style={getMenuItemStyle(linksContent.navigation.length, isOpen)}
            >
              <Link
                href={linksContent.primaryCta.href}
                className={getCtaLinkClassName(isOpen)}
              >
                {linksContent.primaryCta.label}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
