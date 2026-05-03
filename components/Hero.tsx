import Image from "next/image";

export function Hero() {
  return (
    <section className="paper-grain relative overflow-hidden bg-[#fff2df]">
      <div className="bg-[#f24b12] px-5 py-2 text-center font-mono text-xs font-black uppercase tracking-[0.12em] text-[#1b120c]">
        Free local delivery on orders $75+ &rarr;
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-7 sm:px-8 lg:px-12">
        <a
          href="#"
          className="text-3xl font-black uppercase leading-none tracking-[0.08em] text-[#f24b12]"
        >
          Aubrey
          <span className="block">Bloom</span>
        </a>
        <nav className="hidden items-center gap-10 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#253712] md:flex">
          <a href="#gallery" className="transition hover:text-[#f24b12]">
            Shop
          </a>
          <a href="#gallery" className="transition hover:text-[#f24b12]">
            Collections
          </a>
          <a href="#order" className="transition hover:text-[#f24b12]">
            Custom
          </a>
          <a href="#about" className="transition hover:text-[#f24b12]">
            About
          </a>
          <a href="#inquiry" className="transition hover:text-[#f24b12]">
            Contact
          </a>
        </nav>
        <div className="flex gap-5 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#253712]">
          <a href="#gallery" className="hidden transition hover:text-[#f24b12] sm:inline">
            Search
          </a>
          <a href="#order" className="transition hover:text-[#f24b12]">
            Cart
          </a>
        </div>
      </div>

      <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-8 px-5 pb-12 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-12">
        <div className="z-10">
          <h1 className="max-w-3xl text-7xl font-black uppercase leading-[0.82] text-[#253712] sm:text-8xl lg:text-9xl">
            Flowers that hit
            <span className="block text-[#f24b12]">different.</span>
          </h1>
          <p className="mt-7 max-w-lg font-mono text-base font-black uppercase leading-7 text-[#253712]">
            Bold blooms for bold souls.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#gallery"
              className="inline-flex min-h-12 items-center justify-center bg-[#f24b12] px-7 py-3 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df] transition hover:bg-[#ed2b82]"
            >
              Shop bouquets &rarr;
            </a>
            <a
              href="#order"
              className="inline-flex min-h-12 items-center justify-center border-b-2 border-[#253712] px-2 py-3 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#253712] transition hover:text-[#f24b12]"
            >
              Build your own &rarr;
            </a>
          </div>
        </div>

        <div className="relative min-h-[440px] lg:min-h-[680px]">
          <div className="absolute -right-16 top-6 h-[86%] w-[70%] bg-[#f24b12]" />
          <Image
            src="/images/IMG_8278.JPG"
            alt="Orange lily arrangement"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="relative z-10 object-cover object-[50%_42%] saturate-[1.08]"
          />
          <div className="absolute bottom-12 right-10 z-20 hidden h-28 w-28 items-center justify-center rounded-full border border-[#fff2df] p-4 text-center font-mono text-xs font-black uppercase leading-4 text-[#fff2df] lg:flex">
            Handmade with attitude
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="absolute left-0 top-10 flex h-[calc(100%-2.5rem)] w-16 items-center justify-center bg-[#253712] font-mono text-xs font-black uppercase tracking-[0.18em] text-[#fff2df] [writing-mode:vertical-rl]">
          For bold souls.
        </div>
      </div>
    </section>
  );
}
