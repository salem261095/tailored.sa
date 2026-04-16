"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { linksContent } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="relative z-50">
      <div className="relative z-50 mx-auto flex w-full max-w-content items-center justify-between px-6 py-5 md:px-8 md:py-7">
        <Link href="/" className="relative inline-flex h-10 items-center md:h-11">
          <img
            src="/brand/tailored-black.svg"
            alt="مُحاك"
            className={`absolute inset-0 h-10 w-auto max-w-none transition-all duration-500 md:h-11 ${isOpen ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
              }`}
          />
          <img
            src="/brand/tailored-white.svg"
            alt="مُحاك"
            className={`absolute inset-0 h-10 w-auto max-w-none transition-all duration-500 md:h-11 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
              }`}
          />
          <span className="invisible h-10 w-[7.75rem] md:h-11 md:w-[8.5rem]" />
        </Link>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition duration-500 ${isOpen
            ? "bg-white/10 text-white hover:bg-white/15"
            : "bg-white text-foreground hover:bg-surface-alt"
            }`}
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

      <div
        id="site-menu"
        className={`fixed inset-0 z-40 transition-[background-color,opacity,visibility] duration-500 ${isOpen
          ? "visible bg-black opacity-100"
          : "invisible bg-black/0 opacity-0"
          }`}
      >
        <div className="flex min-h-dvh items-center justify-center px-6 md:px-8">
          <nav className="flex w-full max-w-xl flex-col items-center justify-center gap-4 text-center">
            {linksContent.navigation.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-3xl font-bold tracking-[-0.05em] text-white transition-all duration-500 md:text-4xl ${isOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-6 opacity-0"
                    } ${isActive ? "text-accent" : "hover:text-white/70"}`}
                  style={{ transitionDelay: isOpen ? `${index * 90}ms` : "0ms" }}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href={linksContent.primaryCta.href}
              className={`text-2xl font-bold tracking-[-0.05em] text-white transition-all duration-500 md:text-3xl ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
                } hover:text-white/70`}
              style={{
                transitionDelay: isOpen
                  ? `${linksContent.navigation.length * 90}ms`
                  : "0ms",
              }}
            >
              {linksContent.primaryCta.label}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
