"use client";

import Image from "next/image";
import { flowerOfferings } from "./flowerOfferings";

function addToCart(offeringId: string) {
  window.dispatchEvent(
    new CustomEvent("flowers:add-to-cart", {
      detail: { offeringId },
    })
  );
  document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
}

export function Gallery() {
  return (
    <section id="gallery" className="paper-grain bg-[#fff2df] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-block rotate-[-1deg] bg-[#1b120c] px-3 py-1 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df]">
              Collections
            </p>
            <h2 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.9] text-[#344f20] sm:text-7xl">
              Pick your mood
            </h2>
          </div>
          <a
            href="#order"
            className="font-mono text-sm font-black uppercase tracking-[0.08em] text-[#ed2b82] transition hover:text-[#f26a21]"
          >
            Build an order &rarr;
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flowerOfferings.map((offering, index) => (
            <article key={offering.id} className="group">
              <div
                className="relative aspect-[4/5] overflow-hidden border-4 bg-white"
                style={{ borderColor: offering.cardColor }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-2"
                  style={{ backgroundColor: offering.cardColor }}
                />
                <Image
                  src={offering.cutoutImage}
                  alt={`${offering.name} cutout`}
                  fill
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                  className="sticker-image object-contain p-5 transition duration-500 group-hover:scale-[1.04]"
                />
                <button
                  type="button"
                  onClick={() => addToCart(offering.id)}
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center border-2 border-[#1b120c] bg-white text-2xl font-black text-[#ed2b82] shadow-[3px_3px_0_#1b120c] transition hover:-translate-y-0.5"
                  aria-label={`Add ${offering.name} to cart`}
                >
                  +
                </button>
                {index === 0 || index === 3 ? (
                  <span className="absolute right-3 top-3 text-4xl leading-none text-[#1b120c]">
                    ☆
                  </span>
                ) : null}
              </div>
              <div className="pt-4">
                <h3 className="stamp-label inline bg-[#1b120c] px-2 py-1 font-mono text-lg font-black uppercase leading-tight text-[#fff2df]">
                  {offering.name}
                </h3>
                <p className="mt-3 font-mono text-sm font-bold leading-6 text-[#344f20]">
                  {offering.description}
                </p>
                <p className="mt-3 font-mono text-sm font-black text-[#1b120c]">
                  ${offering.price}.00
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
