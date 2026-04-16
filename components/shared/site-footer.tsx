import Link from "next/link";

import { linksContent } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="px-6 pb-10 pt-4 md:px-8">
      <div className="mx-auto flex max-w-content flex-col gap-6 border-t border-black/8 pt-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <img
            src="/brand/tailored-black.svg"
            alt="مُحاك"
            className="h-9 w-auto"
          />
          <p className="mt-4 text-sm leading-7 text-muted">
            وكالة إبداعية تركّز على بناء حضور رقمي متقن للعلامات التجارية.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted">
          {linksContent.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
