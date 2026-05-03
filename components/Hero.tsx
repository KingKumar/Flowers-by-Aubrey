import Image from "next/image";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1200&q=85",
    alt: "A sculptural pastel floral arrangement in a glass vase",
    className: "col-span-2 row-span-2",
    sizes: "(min-width: 1024px) 620px, 90vw",
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
    <section className="relative overflow-hidden bg-[#fff8df]">
      <div className="absolute left-0 top-0 h-full w-1/3 bg-[#f2d7dd]" />
      <div className="absolute bottom-0 right-0 h-1/2 w-2/3 bg-[#dce8c8]" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-12">
        <div className="z-10 max-w-3xl rounded-[2rem] bg-[#fffaf0]/92 p-6 shadow-[0_30px_90px_rgba(23,21,18,0.14)] backdrop-blur sm:p-8 lg:-mr-24 lg:p-10">
          <p className="text-xs font-black uppercase tracking-[0.34em] text-[#5f6f44]">
            Boutique floral studio
          </p>
          <h1 className="mt-5 text-6xl font-black uppercase leading-[0.86] tracking-normal text-[#171512] sm:text-7xl lg:text-8xl">
            Flowers by Aubrey
          </h1>
          <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-[#4d4841] sm:text-xl">
            Thoughtfully arranged florals for everyday beauty, celebrations,
            and meaningful moments.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#order"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#171512] px-7 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#fffaf0] shadow-sm transition hover:bg-[#354126]"
            >
              Order Flowers
            </a>
            <a
              href="#gallery"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#171512] bg-[#fffaf0] px-7 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#171512] transition hover:bg-[#f7dfe4]"
            >
              View Arrangements
            </a>
          </div>
        </div>

        <div className="grid h-[560px] grid-cols-2 grid-rows-2 gap-3 sm:h-[680px] lg:gap-4">
          {heroImages.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-[1.25rem] border-[6px] border-[#fffaf0] bg-[#f3eadc] shadow-[0_30px_90px_rgba(23,21,18,0.22)] ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes={image.sizes}
                className="object-cover saturate-[1.08]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
