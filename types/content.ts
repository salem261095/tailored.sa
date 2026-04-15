export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SeoContent {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  baseUrl: string;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    summary: string;
  };
  navigation: NavItem[];
  footer: {
    note: string;
    contactLabel: string;
    navigationLabel: string;
    socialLabel: string;
    copyright: string;
  };
  socialLinks: SocialLink[];
  seo: SeoContent;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
  trustLine: string;
  panels: {
    eyebrow: string;
    title: string;
    description: string;
    inverted?: boolean;
  }[];
}

export interface ServiceItem {
  title: string;
  description: string;
  detail: string;
}

export interface CaseStudyItem {
  name: string;
  category: string;
  summary: string;
  impact: string;
  palette: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface OutcomeItem {
  title: string;
  description: string;
}

export interface BlogCard {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
}

export interface HomeContent {
  meta: {
    title: string;
    description: string;
  };
  hero: HeroContent;
  trust: {
    eyebrow: string;
    items: string[];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceItem[];
  };
  work: {
    eyebrow: string;
    title: string;
    description: string;
    items: CaseStudyItem[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  outcomes: {
    eyebrow: string;
    title: string;
    items: OutcomeItem[];
  };
  blogPreview: {
    eyebrow: string;
    title: string;
    description: string;
    cta: NavItem;
  };
  finalCta: {
    title: string;
    description: string;
    primaryCta: NavItem;
    secondaryCta: NavItem;
  };
}

export interface AboutContent {
  meta: {
    title: string;
    description: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  story: {
    heading: string;
    paragraphs: string[];
  }[];
  philosophy: {
    eyebrow: string;
    title: string;
    items: OutcomeItem[];
  };
  cta: {
    title: string;
    description: string;
    primaryCta: NavItem;
  };
}

export interface ContactMethod {
  label: string;
  value: string;
  description: string;
}

export interface ContactContent {
  meta: {
    title: string;
    description: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  methods: ContactMethod[];
  form: {
    title: string;
    description: string;
    fields: {
      name: string;
      company: string;
      email: string;
      service: string;
      brief: string;
    };
    serviceOptions: string[];
    submitLabel: string;
    note: string;
  };
  location: {
    eyebrow: string;
    title: string;
    description: string;
  };
}

export interface BlogContent {
  meta: {
    title: string;
    description: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  featured: BlogCard;
  articles: BlogCard[];
}
