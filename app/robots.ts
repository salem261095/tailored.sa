import type { MetadataRoute } from "next";

import { siteSeo } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: siteSeo.baseUrl,
    sitemap: `${siteSeo.baseUrl}/sitemap.xml`,
  };
}
