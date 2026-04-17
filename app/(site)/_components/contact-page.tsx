import { Mail, MapPin, MessageCircle } from "lucide-react";

import { ContactForm } from "@/app/(site)/_components/contact-form";
import { SharedPageHero } from "@/app/(site)/_components/shared-page-hero";
import { agencyInfoContent } from "@/lib/content";

const contactItems = [
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: agencyInfoContent.contactEmail,
    href: `mailto:${agencyInfoContent.contactEmail}`,
  },
  {
    icon: MessageCircle,
    label: "واتساب",
    value: agencyInfoContent.whatsapp,
    href: `https://wa.me/${agencyInfoContent.whatsapp.replace(/\D/g, "")}`,
  },
  {
    icon: MapPin,
    label: "الموقع",
    value: agencyInfoContent.address,
  },
];

export function ContactPage() {
  return (
    <div>
      <SharedPageHero>
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-muted">تواصل معنا</p>
          <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-foreground md:text-6xl">
            لنبدأ حديثًا واضحًا
            <br />
            حول مشروعك القادم.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted md:text-xl">
            شاركنا تفاصيل مشروعك، وسنعود إليك بمسار أوضح للهوية والمحتوى والحضور
            الرقمي.
          </p>
        </div>
      </SharedPageHero>

      <section className="mx-auto mt-12 max-w-content px-6 pb-24 md:mt-16 md:px-8 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:pt-2">
            <p className="text-sm font-semibold text-muted">قنوات التواصل</p>
            <p className="mt-4 max-w-md text-base leading-8 text-muted md:text-lg">
              اختر القناة الأنسب لك، أو أرسل تفاصيل المشروع مباشرة عبر النموذج.
            </p>

            <div className="mt-8 border-t border-black/8">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex gap-4 border-b border-black/8 py-6"
                  >
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-foreground">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-muted">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-2 inline-flex max-w-full break-words text-lg font-bold leading-8 text-foreground transition hover:text-accent"
                          dir="ltr"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-2 text-lg font-bold leading-8 text-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-black/8 pt-8 lg:pt-2">
            <ContactForm submitLabel="أرسل رسالتك" rows={7} />
          </div>
        </div>
      </section>
    </div>
  );
}
