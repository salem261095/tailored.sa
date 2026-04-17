import { ContactForm } from "@/app/(site)/_components/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { agencyInfoContent } from "@/lib/content";

export function ContactSection() {
  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-content rounded border border-black/6 bg-white px-5 py-8 md:px-8 md:py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <p className="text-sm font-semibold text-muted">تواصل معنا</p>
            <SectionHeading className="mt-3 max-w-md">
              ابدأ الحديث حول مشروعك القادم.
            </SectionHeading>
            <p className="mt-5 max-w-md text-base leading-8 text-muted md:text-lg">
              شاركنا فكرتك، وسنرتب لك مسارًا أوضح للهوية والمحتوى والتجربة
              الرقمية.
            </p>

            <div className="mt-8 space-y-4 text-base leading-8 text-muted">
              <p>واتساب: {agencyInfoContent.whatsapp}</p>
              <p>البريد: {agencyInfoContent.contactEmail}</p>
              <p>الموقع: {agencyInfoContent.address}</p>
            </div>
          </div>

          <ContactForm
            submitLabel="أرسل التفاصيل"
            messagePlaceholder="اكتب نبذة مختصرة عن مشروعك"
            rows={6}
          />
        </div>
      </div>
    </section>
  );
}
