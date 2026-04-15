import type { ReactNode } from "react";

import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
