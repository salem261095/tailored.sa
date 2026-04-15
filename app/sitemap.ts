import type { MetadataRoute } from "next";

import { siteContent } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteContent.seo.baseUrl;

  return ["", "/about", "/blog", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
    lastModified: new Date(),
  }));
}
