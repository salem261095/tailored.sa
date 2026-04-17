const clientLogos = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  src: "/brand/tailored-black.svg",
  alt: "مُحاك",
}));

export function ClientsLogoSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-content px-4 sm:px-6 md:px-8">
        <div className="overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-5">
            {clientLogos.map((logo, index) => (
              <div
                key={logo.id}
                className={`group flex min-h-24 items-center justify-center bg-white/30 p-6 transition-all duration-300 hover:bg-white sm:min-h-28 md:min-h-32
                  border-b border-black/10
                  border-e border-black/10
                  md:border-b md:border-e`}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-7 w-auto max-w-[8rem] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 sm:h-8 md:h-9"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}