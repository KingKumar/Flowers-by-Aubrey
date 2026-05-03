"use client";

import Image from "next/image";
import { flowerOfferings } from "./flowerOfferings";
import { SectionHeader } from "./SectionHeader";

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
    <section id="gallery" className="bg-[#171512] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Arrangements"
          title="Bold arrangements, modern garden energy"
          tone="light"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {flowerOfferings.map((offering) => (
            <article
              key={offering.id}
              className="group overflow-hidden rounded-[1.25rem] border-2 border-[#fffaf0] bg-[#fffaf0]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f4e6d8]">
                <Image
                  src={offering.image}
                  alt={`${offering.name} floral arrangement`}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                  className="object-cover saturate-[1.08] transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <button
                    type="button"
                    onClick={() => addToCart(offering.id)}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#171512] px-5 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#fffaf0] shadow-lg transition hover:bg-[#354126]"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="border-t-2 border-[#171512] p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-black uppercase leading-none tracking-normal text-[#171512]">
                    {offering.name}
                  </h3>
                  <p className="text-base font-black text-[#5f6f44]">
                    ${offering.price}
                  </p>
                </div>
                <p className="mt-3 text-sm font-medium leading-7 text-[#5d574f]">
                  {offering.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
