import Link from "next/link";

import { linksContent, siteContent } from "@/lib/content";

const FOOTER_COPY =
  " مُحَاك هي وكالة إبداعية تقدم حلولًا تسويقية للمشاريع ذات الحضور الرقمي في المملكة العربية السعودية";
const COPYRIGHT_YEAR = "2026";

export function SiteFooter() {
  const { navigation } = linksContent;
  const {
    seo: { baseUrl, siteName },
  } = siteContent;

  return (
    <footer className="bg-[#111111] px-6 pb-8 pt-16 text-white md:px-8 md:pt-20">
      <div className="mx-auto max-w-content">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16 md:pb-14">
          <div className="max-w-xl">
            <img
              src="/brand/tailored-white.svg"
              alt={siteName}
              className="h-9 w-auto"
            />
            <p className="mt-6 max-w-md text-sm leading-7 text-white/68 md:text-base">
              {FOOTER_COPY}
            </p>
          </div>

          <div>
            <nav className="flex flex-col gap-4 text-sm text-white/68 md:flex-row md:flex-wrap md:justify-end md:gap-x-5 md:gap-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <form className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="ui-radius-control w-full border border-white/12 bg-white/8 px-4 py-4 text-base text-white outline-none transition placeholder:text-white/45 focus:border-white/30"
              />
              <button
                type="submit"
                className="ui-radius-button inline-flex items-center justify-center bg-white px-6 py-4 text-base font-semibold text-foreground transition hover:bg-white/90"
              >
                اشترك الآن
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {siteName}. All rights reserved.
          </p>
          <p>{baseUrl}</p>
        </div>
      </div>
    </footer>
  );
}
