import { featuresContent } from "@/lib/content";

export function FeaturesSection() {
  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-content">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold text-muted">{featuresContent.eyebrow}</p>
            <h2 className="mt-3 max-w-md text-3xl font-black leading-[1.08] tracking-[-0.05em] text-foreground md:text-5xl">
              ما الذي يجعل حضور علامتك أكثر اتساقًا وتأثيرًا؟
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-muted md:text-lg">
              نعالج حضور العلامة كمنظومة واحدة: الرسالة، والهوية، وطريقة الظهور،
              حتى يبدو كل ما يراه العميل منك متماسكًا وواضحًا.
            </p>
          </div>

          <div className="space-y-4">
            {featuresContent.items.map((item, index) => (
              <article
                key={item.title}
                className="rounded border border-black/6 bg-white/80 px-5 py-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-black/12 md:px-7 md:py-7"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold leading-[1.55] tracking-[-0.03em] text-foreground md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-3">
                    <span className="text-3xl font-black tracking-[-0.05em] text-foreground/15 md:text-4xl">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="h-px w-14 bg-black/10 md:w-px md:h-14" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
