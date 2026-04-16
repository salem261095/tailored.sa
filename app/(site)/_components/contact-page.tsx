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
                <p className="mt-2 text-lg font-bold text-foreground">mohamed@tailored.sa</p>
              </div>
              <div className="rounded bg-surface px-5 py-5">
                <p className="text-sm font-semibold text-muted">واتساب</p>
                <p className="mt-2 text-lg font-bold text-foreground">966591960366</p>
              </div>
              <div className="rounded bg-surface px-5 py-5">
                <p className="text-sm font-semibold text-muted">الموقع</p>
                <p className="mt-2 text-lg font-bold text-foreground">
                  الدمام، المملكة العربية السعودية
                </p>
              </div>
            </div>
          </div>

          <form
            className="grid gap-4"
            action="mailto:tailored2024@gmail.com"
            method="post"
            encType="text/plain"
          >
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
                <option>التسويق</option>
                <option>تطوير الويب</option>
              </select>
            </div>

            <textarea
              placeholder="كيف يمكننا مساعدتك؟"
              rows={7}
              className="w-full rounded border border-black/8 bg-surface px-4 py-4 text-base text-foreground outline-none transition placeholder:text-muted focus:border-foreground"
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-foreground px-6 py-4 text-base font-semibold text-white transition hover:bg-primary-light"
            >
              أرسل رسالتك
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
