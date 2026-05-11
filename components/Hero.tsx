"use client";

import Image from "next/image";
import Link from "next/link";

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  return (
    <section className="paper-grain relative overflow-hidden bg-[#fff2df]">
      <div className="bg-[#f24b12] px-5 py-2 text-center font-mono text-xs font-black uppercase tracking-[0.12em] text-[#1b120c]">
        Los Angeles floral design studio &rarr;
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-7 sm:px-8 lg:px-12 xl:px-12">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-3xl font-black uppercase leading-none tracking-[0.08em] text-[#f24b12]"
        >
          Aubrey
          <span className="block">Florals</span>
        </button>
        <nav className="hidden items-center gap-10 font-mono text-sm font-black tracking-normal text-[#253712] md:flex">
          <button
            type="button"
            onClick={() => scrollToSection("gallery")}
            className="transition hover:text-[#f24b12]"
          >
            Lookbook
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="transition hover:text-[#f24b12]"
          >
            About
          </button>
          <Link
            href="/contact"
            className="transition hover:text-[#f24b12]"
          >
            Contact
          </Link>
        </nav>
      </div>

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
            <button
              type="button"
              onClick={() => scrollToSection("gallery")}
              className="inline-flex min-h-12 items-center justify-center bg-[#f24b12] px-7 py-3 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df] transition hover:bg-[#ed2b82]"
            >
              View lookbook &rarr;
            </button>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center border-b-2 border-[#253712] px-2 py-3 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#253712] transition hover:text-[#f24b12]"
            >
              Contact Aubrey &rarr;
            </Link>
          </div>
        </div>

        <div className="relative min-h-[440px] lg:min-h-[680px]">
          <div className="absolute -right-16 top-6 h-[86%] w-[70%] bg-[#f24b12]" />
          <Image
            src="/images/sage-ribbon-vase.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="z-0 scale-110 object-cover opacity-35 blur-xl saturate-[1.08]"
          />
          <Image
            src="/images/sage-ribbon-vase.png"
            alt="Orange Rose Hydrangea Bouquet"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="relative z-10 object-contain saturate-[1.08]"
          />
          <div className="absolute bottom-12 right-10 z-20 hidden h-28 w-28 items-center justify-center rounded-full border border-[#253712] p-4 text-center font-mono text-xs font-black uppercase leading-4 text-[#253712] lg:flex">
            Handmade with love
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
