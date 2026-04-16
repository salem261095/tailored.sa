export function ContactSection() {
  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-content rounded border border-black/6 bg-white px-5 py-8 md:px-8 md:py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <p className="text-sm font-semibold text-muted">تواصل معنا</p>
            <h2 className="mt-3 max-w-md text-3xl font-black leading-[1.08] tracking-[-0.05em] text-foreground md:text-5xl">
              ابدأ الحديث حول مشروعك القادم.
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-muted md:text-lg">
              شاركنا فكرتك، وسنرتب لك مسارًا أوضح للهوية والمحتوى والتجربة
              الرقمية.
            </p>

            <div className="mt-8 space-y-4 text-base leading-8 text-muted">
              <p>واتساب: +966 50 000 0000</p>
              <p>البريد: hello@tailored.sa</p>
              <p>الموقع: الدمام، المملكة العربية السعودية</p>
            </div>
          </div>

          <form className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="الاسم"
                className="w-full rounded border border-black/8 bg-surface px-4 py-4 text-base text-foreground outline-none transition placeholder:text-muted focus:border-foreground"
              />
              <input
                type="text"
                placeholder="اسم الشركة"
                className="w-full rounded border border-black/8 bg-surface px-4 py-4 text-base text-foreground outline-none transition placeholder:text-muted focus:border-foreground"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="w-full rounded border border-black/8 bg-surface px-4 py-4 text-base text-foreground outline-none transition placeholder:text-muted focus:border-foreground"
              />
              <select className="w-full rounded border border-black/8 bg-surface px-4 py-4 text-base text-foreground outline-none transition focus:border-foreground">
                <option>الخدمة المطلوبة</option>
                <option>استراتيجية العلامة</option>
                <option>صناعة المحتوى</option>
                <option>استراتيجية التسويق</option>
                <option>تطوير الويب</option>
              </select>
            </div>

            <textarea
              placeholder="اكتب نبذة مختصرة عن مشروعك"
              rows={6}
              className="w-full rounded border border-black/8 bg-surface px-4 py-4 text-base text-foreground outline-none transition placeholder:text-muted focus:border-foreground"
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-foreground px-6 py-4 text-base font-semibold text-white transition hover:bg-primary-light"
            >
              أرسل التفاصيل
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
