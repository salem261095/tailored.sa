import Link from "next/link";

import { NewsletterSignupForm } from "@/components/shared/newsletter-signup-form";
import { linksContent, siteContent } from "@/lib/content";

const FOOTER_COPY =
  "مُحاك هي وكالة إبداعية تقدم حلولًا تسويقية للمشاريع ذات الحضور الرقمي في المملكة العربية السعودية";
const COPYRIGHT_YEAR = "2026";

export function SiteFooter() {
  const { navigation } = linksContent;
  const {
    seo: { baseUrl, siteName },
  } = siteContent;

  return (
    <footer className="mt-12 bg-primary px-6 pb-8 pt-16 text-white md:mt-16 md:px-8 md:pt-20">
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

            <NewsletterSignupForm variant="footer" />
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
