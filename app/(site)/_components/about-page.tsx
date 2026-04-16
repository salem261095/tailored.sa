import Link from "next/link";

const aboutStory = [
  "نشأ مؤسسو هذه الوكالة في عائلة أحسائية توارثت مهنتي خياطة المشالح العربية وصياغة الذهب جيلًا بعد جيل، في مدينةٍ عُرفت بإبداعها وحرفيتها. ومن تلك القدرة المتوارثة على التشكيل، وُلدت لدى مُحاك عناية خاصة بصناعة الصورة والرسالة، من حياكة الأفكار إلى صياغة الكلمات، لتخرج العلامات التجارية بملمسٍ أدق وحضورٍ أوضح.",
  "نسميها «مُحاك» لأننا نرى الحضور الرقمي ثوبًا يُفصّل بعناية. نحن الجهة التي تأخذ المقاسات، وتختار الخامات، وتنسج الأسلوب المناسب لكل ظهور، ثم تهتم بكيف يبدو المشروع أمام الناس في التفاصيل الكبيرة والصغيرة معًا.",
  "بدأت قصة الوكالة خلال فترةٍ دفعت المشاريع إلى التكيّف مع الواقع الرقمي المتسارع، ومعها ظهرت الحاجة الواضحة إلى تسويق إبداعي وهوية رقمية أكثر نضجًا في منطقتنا العربية. من هنا جاءت مُحاك من المنطقة الشرقية في المملكة العربية السعودية لتبني علاماتٍ تجاريةٍ أكثر تماسكًا، وأكثر استعدادًا للوصول.",
];

export function AboutPage() {
  return (
    <div className="px-6 py-16 md:px-8 md:py-24">
      <section className="mx-auto max-w-content">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-muted">من نحن</p>
          <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-foreground md:text-6xl">
            نحمل الحرفة إلى العالم الرقمي
            <br />
            بصياغةٍ أدق وحضورٍ أوضح.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted md:text-xl">
            نبني حضور العلامات التجارية كما تُبنى الأشياء النفيسة: بعناية،
            واتساق، وفهمٍ حقيقي لما يجب أن يراه الناس وما يجب أن يشعروا به.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-content rounded bg-white/80 px-5 py-8 backdrop-blur md:mt-20 md:px-8 md:py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
          <div className="space-y-6">
            {aboutStory.map((paragraph) => (
              <p
                key={paragraph}
                className="text-lg leading-9 text-foreground/88 md:text-xl"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded border border-black/6 bg-surface px-5 py-6 md:px-6">
              <p className="text-sm font-semibold text-muted">فلسفة مُحاك</p>
              <ul className="mt-5 space-y-4 text-base leading-8 text-muted">
                <li>ننظر إلى الهوية كمنظومة لا كعناصر متفرقة.</li>
                <li>نوازن بين الحرفة الجمالية والوضوح التجاري.</li>
                <li>نبني حضورًا رقميًا يبدو متماسكًا في كل نقطة تماس.</li>
              </ul>
            </div>

            <div className="mt-5 rounded border border-black/6 bg-foreground px-5 py-6 text-white md:px-6">
              <p className="text-sm font-semibold text-white/55">هل مشروعك جاهز؟</p>
              <p className="mt-3 text-lg leading-8 text-white/80">
                إن كان مشروعك مستعدًا لرحلة أكثر نضجًا واتساقًا، فنحن مستعدون
                لبدء الحديث.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-base font-semibold text-foreground transition hover:bg-white/90"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
