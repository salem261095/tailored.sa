import type { Metadata } from "next";

import { ContactPage } from "@/app/(site)/_components/contact-page";
import { contactContent } from "@/lib/content";

export const metadata: Metadata = {
  title: contactContent.meta.title,
  description: contactContent.meta.description,
};

export default function Page() {
  return <ContactPage />;
}
