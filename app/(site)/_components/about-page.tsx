import Link from "next/link";

import { SharedPageHero } from "@/app/(site)/_components/shared-page-hero";

const aboutStory = [
  "نشأ مؤسسو هذه الوكالة في عائلة أحسائية توارثت مهنتي خياطة المشالح العربية وصياغة الذهب جيلًا بعد جيل، في مدينة عرفت بإبداعها وحرفيتها. ومن تلك القدرة المتوارثة على التشكيل، ولدت لدى مُحاك عناية خاصة بصناعة الصورة والرسالة، من حياكة الأفكار إلى صياغة الكلمات، لتخرج العلامات التجارية بملمس أدق وحضور أوضح.",
  "نسميها «مُحاك» لأننا نرى الحضور الرقمي ثوبًا يفصل بعناية. نحن الجهة التي تأخذ المقاسات، وتختار الخامات، وتنسج الأسلوب المناسب لكل ظهور، ثم تهتم بكيف يبدو المشروع أمام الناس في التفاصيل الكبيرة والصغيرة معًا.",
  "بدأت قصة الوكالة خلال فترة دفعت المشاريع إلى التكيف مع الواقع الرقمي المتسارع، ومعها ظهرت الحاجة الواضحة إلى تسويق إبداعي وهوية رقمية أكثر نضجًا في منطقتنا العربية. من هنا جاءت مُحاك من المنطقة الشرقية في المملكة العربية السعودية لتبني علامات تجارية أكثر تماسكًا، وأكثر استعدادًا للوصول.",
];

const philosophyItems = [
  {
    index: "01",
    title: "هوية مترابطة",
    description:
      "ننظر إلى الهوية كمنظومة واحدة، لا كعناصر منفصلة تتجاور بلا معنى.",
  },
  {
    index: "02",
    title: "جمال يخدم الوضوح",
    description:
      "نوازن بين الحرفة البصرية والدقة التجارية حتى يبقى الأثر جميلًا ومفهومًا في الوقت نفسه.",
  },
  {
    index: "03",
    title: "حضور ثابت عبر كل نقطة تماس",
    description:
      "نبني تجربة تبدو متماسكة في الموقع والمحتوى والرسائل وكل ما يراه العميل ويشعر به.",
  },
];

export function AboutPage() {
  return (
    <div>
      <SharedPageHero>
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-muted">من نحن</p>
          <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-foreground md:text-6xl">
            نحمل الحرفة إلى العالم الرقمي
            <br />
            بصياغة أدق وحضور أوضح.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted md:text-xl">
            نبني حضور العلامات التجارية كما تبنى الأشياء النفيسة: بعناية،
            واتساق، وفهم حقيقي لما يجب أن يراه الناس وما يجب أن يشعروا به.
          </p>
        </div>
      </SharedPageHero>

      <section className="mx-auto mt-12 max-w-content px-6 pb-24 md:mt-16 md:px-8 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-7 border-b border-black/8 pb-12 md:space-y-8 md:pb-16">
            {aboutStory.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[1.05rem] leading-[2.15rem] text-foreground/88 md:text-[1.18rem] md:leading-[2.5rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 md:mt-16">
            <div className="flex flex-col gap-4 border-b border-black/8 pb-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold text-muted">فلسفة مُحاك</p>
                <h2 className="mt-3 text-3xl font-black leading-[1.08] tracking-[-0.04em] text-foreground md:text-[3.25rem]">
                  ثلاث ركائز
                  <span className="text-accent">.</span>
                </h2>
              </div>

              <p className="max-w-xl text-base leading-8 text-muted md:text-lg">
                منهجنا بسيط في شكله، لكنه دقيق في أثره: نبني صورة مترابطة،
                ونحافظ على وضوحها، ثم نثبتها في كل نقطة ظهور.
              </p>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              {philosophyItems.map((item) => (
                <div
                  key={item.index}
                  className="border-t border-black/10 pt-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold tracking-[0.24em] text-muted">
                      {item.index}
                    </span>
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                  </div>
                  <h3 className="mt-5 text-xl font-black leading-[1.25] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 border-t border-black/8 pt-8 md:mt-20 md:pt-10">
            <p className="text-sm font-semibold text-muted">هل مشروعك جاهز؟</p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground/82 md:text-xl">
              إن كان مشروعك مستعدًا لرحلة أكثر نضجًا واتساقًا، فنحن مستعدون
              لبدء الحديث.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-foreground transition hover:text-accent"
            >
              تواصل معنا
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
