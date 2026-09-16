import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="paper-grain relative overflow-hidden bg-[#fff2df]">
      <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-8 px-5 pb-12 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-12 2xl:pl-28">
        <div className="z-10">
          <h1 className="max-w-3xl text-6xl font-black uppercase leading-[0.86] text-[#253712] sm:text-8xl lg:text-[clamp(5.5rem,8vw,8rem)] xl:text-9xl">
            Flowers that hit
            <span className="block text-[#ed2b82]">different.</span>
          </h1>
          <p className="mt-7 max-w-lg font-mono text-base font-black uppercase leading-7 text-[#253712]">
            Bold custom florals in Los Angeles.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              id="hero-lookbook-link"
              href="/lookbook"
              className="inline-flex min-h-12 items-center justify-center bg-[#f24b12] px-7 py-3 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df] transition hover:bg-[#ed2b82]"
            >
              View lookbook &rarr;
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center border-b-2 border-[#253712] px-2 py-3 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#253712] transition hover:text-[#f24b12]"
            >
              Contact Me &rarr;
            </Link>
          </div>
        </div>

        <div className="relative min-w-0 py-6 lg:flex lg:min-h-[680px] lg:flex-col lg:justify-center lg:py-10">
          <div className="relative mx-auto w-full max-w-md shadow-[8px_8px_0_#f24b12] lg:mx-0 lg:w-[min(32vw,28rem)] lg:shadow-[12px_12px_0_#f24b12]">
            <Image
              src="/images/IMG_7786.jpg"
              alt="Orange Rose arrangement in a white ceramic vase"
              width={1536}
              height={2142}
              priority
              sizes="(min-width: 1400px) 448px, (min-width: 1024px) 32vw, (min-width: 488px) 448px, calc(100vw - 40px)"
              className="block h-auto w-full"
            />
            <div className="absolute bottom-3 right-3 z-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#253712] bg-[#fff2df]/90 p-2 text-center font-mono text-[10px] font-black uppercase leading-3 text-[#253712] lg:bottom-4 lg:right-4 lg:h-28 lg:w-28 lg:p-4 lg:text-xs lg:leading-4">
              Handmade with love
            </div>
          </div>
        </div>
      </div>

      <div className="hidden 2xl:block">
        <div className="absolute left-0 top-10 flex h-[calc(100%-2.5rem)] w-16 items-center justify-center bg-[#253712] font-mono text-xs font-black uppercase tracking-[0.18em] text-[#fff2df] [writing-mode:vertical-rl]">
          For bold souls.
        </div>
      </div>
    </section>
  );
}
