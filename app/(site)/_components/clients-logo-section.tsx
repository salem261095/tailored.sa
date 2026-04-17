const clientLogos = [
  { id: "alghanim", src: "/assets/clients/alghanim.webp", alt: "Alghanim" },
  { id: "algharbi", src: "/assets/clients/algharbi.webp", alt: "Algharbi" },
  {
    id: "artboard-3",
    src: "/assets/clients/Artboard 3 copy 2.webp",
    alt: "Client logo 3",
  },
  {
    id: "artboard-4",
    src: "/assets/clients/Artboard 4 copy 2.webp",
    alt: "Client logo 4",
  },
  {
    id: "artboard-5",
    src: "/assets/clients/Artboard 5 copy 2.webp",
    alt: "Client logo 5",
  },
  { id: "ballorah", src: "/assets/clients/ballorah.webp", alt: "Ballorah" },
  { id: "carefer", src: "/assets/clients/carefer.webp", alt: "Carefer" },
  { id: "cliko", src: "/assets/clients/cliko.webp", alt: "Cliko" },
  {
    id: "creative-culture",
    src: "/assets/clients/creativeCulture.webp",
    alt: "Creative Culture",
  },
  { id: "mosam", src: "/assets/clients/mosam.webp", alt: "Mosam" },
  { id: "qhm", src: "/assets/clients/QHM.webp", alt: "QHM" },
  { id: "regal", src: "/assets/clients/regal.webp", alt: "Regal" },
  { id: "romah", src: "/assets/clients/romah.webp", alt: "Romah" },
];

export function ClientsLogoSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-content px-4 sm:px-6 md:px-8">
        <div className="overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-5">
            {clientLogos.map((logo) => (
              <div
                key={logo.id}
                className="group flex min-h-18 items-center justify-center border-b border-e border-black/10 bg-white/30 p-5 transition-all duration-300 hover:bg-white sm:min-h-24 sm:p-6 md:min-h-36 md:border-b md:border-e"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-[3.5rem] w-auto max-w-full object-contain opacity-70 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 sm:max-h-[4rem] md:max-h-[4.75rem]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
