import aboutContentJson from "@/content/en/about.json";
import blogContentJson from "@/content/en/blog.json";
import contactContentJson from "@/content/en/contact.json";
import homeContentJson from "@/content/en/home.json";
import siteContentJson from "@/content/en/site.json";
import type {
  AboutContent,
  BlogContent,
  ContactContent,
  HomeContent,
  SiteContent,
} from "@/types/content";

export const siteContent = siteContentJson as SiteContent;
export const homeContent = homeContentJson as HomeContent;
export const aboutContent = aboutContentJson as AboutContent;
export const contactContent = contactContentJson as ContactContent;
export const blogContent = blogContentJson as BlogContent;
