const clientLogos = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  src: "/brand/tailored-black.svg",
  alt: "مُحاك",
}));

export function ClientsLogoSection() {
  const logoTrack = [...clientLogos, ...clientLogos];

  return (
    <section className="relative">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 md:px-8">
        <div className="rounded bg-white/45 px-5 py-6 md:px-8 md:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-xs text-sm font-medium leading-7 text-muted">
              نثق بأن الحضور المتقن يبدأ مع شركاء يقدّرون الجودة والاتساق.
            </p>

            <div className="w-full overflow-hidden lg:max-w-[52rem]">
              <div
                dir="ltr"
                className="animate-marquee flex min-w-max items-center gap-10 md:gap-14"
              >
                {logoTrack.map((logo, index) => (
                  <img
                    key={`${logo.id}-${index}`}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-7 w-auto shrink-0 opacity-70 md:h-8"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
