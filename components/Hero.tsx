import Image from "next/image";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1200&q=85",
    alt: "A romantic pastel floral arrangement in a glass vase",
    className: "col-span-2 row-span-2",
    sizes: "(min-width: 1024px) 470px, 90vw",
  },
  {
    src: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=85",
    alt: "Blush pink flowers with soft green stems",
    className: "",
    sizes: "(min-width: 1024px) 220px, 42vw",
  },
  {
    src: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=85",
    alt: "Fresh pale flowers gathered for an arrangement",
    className: "",
    sizes: "(min-width: 1024px) 220px, 42vw",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf0]">
      <div className="absolute inset-x-0 top-0 h-28 bg-[#f4e8d5]" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-16">
        <div className="max-w-2xl pt-16 sm:pt-20 lg:pt-0">
          <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#8d7652]">
            Boutique floral studio
          </p>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.02] tracking-normal text-[#2b2722] sm:text-6xl lg:text-7xl">
            Flowers by Aubrey
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#665d54] sm:text-xl">
            Thoughtfully arranged florals for everyday beauty, celebrations,
            and meaningful moments.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#inquiry"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#2f3b2f] px-7 py-3 text-sm font-semibold text-[#fffaf0] shadow-sm transition hover:bg-[#435141]"
            >
              Inquire About Flowers
            </a>
            <a
              href="#gallery"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9c6a7] bg-[#fffdf8] px-7 py-3 text-sm font-semibold text-[#3f392f] shadow-sm transition hover:border-[#bfa979] hover:bg-[#fbf3df]"
            >
              View Arrangements
            </a>
          </div>
        </div>

        <div className="grid h-[520px] grid-cols-2 grid-rows-2 gap-4 sm:h-[620px]">
          {heroImages.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-[2rem] bg-[#f3eadc] shadow-[0_24px_70px_rgba(63,57,47,0.14)] ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes={image.sizes}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
