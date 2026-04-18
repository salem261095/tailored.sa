import type { Metadata } from "next";

import { agencyInfoContent, siteContent } from "@/lib/content";

type OpenGraphType = "article" | "website";

type CreatePageMetadataOptions = {
  description: string;
  keywords?: string[];
  modifiedTime?: string;
  openGraphType?: OpenGraphType;
  path: string;
  publishedTime?: string;
  title: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ArticleSchemaOptions = {
  dateModified?: string;
  datePublished: string;
  description: string;
  path: string;
  title: string;
};

type FaqItem = {
  answer: string;
  question: string;
};

const normalizedBaseUrl = siteContent.seo.baseUrl.replace(/\/$/, "");

export const siteSeo = {
  address: agencyInfoContent.address,
  baseUrl: normalizedBaseUrl,
  contactEmail: agencyInfoContent.contactEmail,
  countryName: "المملكة العربية السعودية",
  defaultDescription: siteContent.seo.defaultDescription,
  defaultKeywords: [
    "استراتيجية العلامة التجارية",
    "وكالة براندنج السعودية",
    "بناء الهوية التجارية",
    "استراتيجية الهوية",
    "وكالة هوية بصرية السعودية",
    "Brand Strategy Saudi Arabia",
  ],
  defaultTitle: siteContent.seo.defaultTitle,
  locale: "ar_SA",
  name: siteContent.seo.siteName,
  ogImage:
    siteContent.seo.defaultSocialImage ?? `${normalizedBaseUrl}/brand/tailored-black.svg`,
  phone: agencyInfoContent.phone,
  siteName: siteContent.seo.siteName,
  whatsapp: agencyInfoContent.whatsapp,
} as const;

export function absoluteUrl(path: string) {
  if (!path || path === "/") {
    return siteSeo.baseUrl;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteSeo.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function truncateText(value: string, maxLength = 160) {
  const normalized = value.trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}

export function buildPostDescription(content: string, maxLength = 160) {
  return truncateText(stripHtml(content), maxLength);
}

export function createPageMetadata({
  description,
  keywords,
  modifiedTime,
  openGraphType = "website",
  path,
  publishedTime,
  title,
}: CreatePageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const image = absoluteUrl(siteSeo.ogImage);

  return {
    title,
    description,
    keywords: [...siteSeo.defaultKeywords, ...(keywords ?? [])],
    alternates: {
      canonical: path === "/" ? "/" : path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteSeo.siteName,
      locale: siteSeo.locale,
      type: openGraphType,
      images: [
        {
          url: image,
          alt: siteSeo.siteName,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteSeo.baseUrl}#organization`,
    name: siteSeo.name,
    url: siteSeo.baseUrl,
    logo: absoluteUrl("/brand/tailored-black.svg"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteSeo.contactEmail,
        telephone: siteSeo.phone,
        areaServed: siteSeo.countryName,
        availableLanguage: ["ar"],
      },
    ],
  };
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteSeo.baseUrl}#website`,
    url: siteSeo.baseUrl,
    name: siteSeo.siteName,
    inLanguage: "ar-SA",
  };
}

export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AdvertisingAgency",
    "@id": `${siteSeo.baseUrl}#local-business`,
    name: siteSeo.name,
    url: siteSeo.baseUrl,
    image: absoluteUrl("/brand/tailored-black.svg"),
    telephone: siteSeo.phone,
    email: siteSeo.contactEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSeo.address,
      addressCountry: "SA",
    },
    areaServed: {
      "@type": "Country",
      name: siteSeo.countryName,
    },
    priceRange: "$$",
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createArticleSchema({
  dateModified,
  datePublished,
  description,
  path,
  title,
}: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: "ar-SA",
    mainEntityOfPage: absoluteUrl(path),
    author: {
      "@type": "Organization",
      name: siteSeo.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteSeo.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/tailored-black.svg"),
      },
    },
    image: [absoluteUrl(siteSeo.ogImage)],
  };
}

export function createFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
