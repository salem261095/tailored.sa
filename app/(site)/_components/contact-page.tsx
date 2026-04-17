import { ContactForm } from "@/app/(site)/_components/contact-form";
import { agencyInfoContent } from "@/lib/content";

export function ContactPage() {
  return (
    <div className="px-6 py-16 md:px-8 md:py-24">
      <section className="mx-auto max-w-content">
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
      </section>

      <section className="mx-auto mt-16 max-w-content rounded border border-black/6 bg-white px-5 py-8 md:mt-20 md:px-8 md:py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <p className="text-sm font-semibold text-muted">قنوات التواصل</p>
            <div className="mt-5 space-y-5">
              <div className="rounded bg-surface px-5 py-5">
                <p className="text-sm font-semibold text-muted">البريد الإلكتروني</p>
                <p className="mt-2 text-lg font-bold text-foreground">
                  {agencyInfoContent.contactEmail}
                </p>
              </div>
              <div className="rounded bg-surface px-5 py-5">
                <p className="text-sm font-semibold text-muted">واتساب</p>
                <p className="mt-2 text-lg font-bold text-foreground">
                  {agencyInfoContent.whatsapp}
                </p>
              </div>
              <div className="rounded bg-surface px-5 py-5">
                <p className="text-sm font-semibold text-muted">الموقع</p>
                <p className="mt-2 text-lg font-bold text-foreground">
                  {agencyInfoContent.address}
                </p>
              </div>
            </div>
          </div>

          <ContactForm
            submitLabel="أرسل رسالتك"
            messagePlaceholder="كيف يمكننا مساعدتك؟"
            rows={7}
          />
        </div>
      </section>
    </div>
  );
}
