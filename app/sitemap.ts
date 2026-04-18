import { stat } from "node:fs/promises";
import path from "node:path";

import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { getArchivePosts } from "@/lib/wordpress";

const staticRoutes = [
  {
    path: "/",
    file: "app/(site)/page.tsx",
    changeFrequency: "weekly" as const,
    priority: 1,
  },
  {
    path: "/about",
    file: "app/(site)/about/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  {
    path: "/blog",
    file: "app/(site)/blog/page.tsx",
    changeFrequency: "weekly" as const,
    priority: 0.8,
  },
  {
    path: "/contact",
    file: "app/(site)/contact/page.tsx",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await Promise.all(
    staticRoutes.map(async (route) => ({
      url: absoluteUrl(route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      lastModified: await getFileLastModified(route.file),
    })),
  );

  try {
    const posts = await getArchivePosts(100, { revalidate: 900 });

    return [
      ...pages,
      ...posts.map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        lastModified: new Date(post.modified || post.date),
      })),
    ];
  } catch {
    return pages;
  }
}

async function getFileLastModified(relativePath: string) {
  try {
    const fileStats = await stat(path.join(process.cwd(), relativePath));
    return fileStats.mtime;
  } catch {
    return new Date();
  }
}
