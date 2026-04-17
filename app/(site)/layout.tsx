import type { ReactNode } from "react";

import { IntroSplash } from "@/components/shared/intro-splash";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <IntroSplash />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
