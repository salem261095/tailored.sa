import { SectionHeading } from "@/components/ui/section-heading";

export function NewsletterSection() {
  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-content rounded bg-foreground px-5 py-8 text-white md:px-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-12">
          <div>
            <p className="text-sm font-semibold text-white/55">النشرة البريدية</p>
            <SectionHeading tone="inverse" className="mt-3 max-w-md">
              أفكار قصيرة تصل إليك قبل أن تضيع في الزحام.
            </SectionHeading>
            <p className="mt-5 max-w-md text-base leading-8 text-white/68 md:text-lg">
              اشترك لتصلك ملاحظات مختصرة حول الهوية والمحتوى والتجربة الرقمية.
            </p>
          </div>

          <form className="grid gap-4 md:grid-cols-[1fr_auto]">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="ui-radius-control w-full border border-white/12 bg-white/8 px-4 py-4 text-base text-white outline-none transition placeholder:text-white/45 focus:border-white/30"
            />
            <button
              type="submit"
              className="ui-radius-button inline-flex items-center justify-center bg-white px-6 py-4 text-base font-semibold text-foreground transition hover:bg-white/90"
            >
              اشترك الآن
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
