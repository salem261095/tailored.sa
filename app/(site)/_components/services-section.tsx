import { servicesContent } from "@/lib/content";

export function ServicesSection() {
  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-content">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold text-muted">{servicesContent.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black leading-[1.08] tracking-[-0.05em] text-foreground md:text-5xl">
            نُصمّم خدماتنا لتخدم حضورك من الفكرة إلى الظهور.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">
            {servicesContent.description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {servicesContent.items.map((item, index) => (
            <article
              key={item.number}
              className={`group flex min-h-[20rem] flex-col justify-between rounded border border-black/6 p-6 transition duration-300 hover:-translate-y-1 hover:border-black/12 md:p-7 ${
                index === 0
                  ? "bg-foreground text-white md:col-span-2 xl:col-span-1"
                  : "bg-white/85"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`text-sm font-semibold ${
                    index === 0 ? "text-white/55" : "text-muted"
                  }`}
                >
                  {item.number}
                </span>
                <span
                  className={`h-px w-16 transition duration-300 group-hover:w-24 ${
                    index === 0 ? "bg-white/18" : "bg-black/10"
                  }`}
                />
              </div>

              <div className="mt-10">
                <h3
                  className={`text-2xl font-black leading-[1.35] tracking-[-0.04em] ${
                    index === 0 ? "text-white" : "text-foreground"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-4 text-base leading-8 ${
                    index === 0 ? "text-white/72" : "text-muted"
                  }`}
                >
                  {item.description}
                </p>
              </div>

              <div className="mt-10">
                <span
                  className={`text-sm font-semibold ${
                    index === 0 ? "text-white/55" : "text-foreground/35"
                  }`}
                >
                  {item.number}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
