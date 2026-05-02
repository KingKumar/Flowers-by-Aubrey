import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

const arrangements = [
  {
    label: "Soft Romance",
    description: "Blush garden roses, creamy petals, and graphic greenery.",
    src: "https://images.unsplash.com/photo-1521543832500-49eefa983db0?auto=format&fit=crop&w=900&q=85",
  },
  {
    label: "Garden Pastels",
    description: "Airy stems in butter yellow, pale pink, and modern sage.",
    src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=85",
  },
  {
    label: "Celebration Bouquet",
    description: "A polished gathering of fresh, joyful, high-impact blooms.",
    src: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=900&q=85",
  },
  {
    label: "Petite Gesture",
    description: "A compact arrangement with clean shape and standout color.",
    src: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=900&q=85",
  },
  {
    label: "Table Flowers",
    description: "Low, architectural florals for dinners and intimate gatherings.",
    src: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=85",
  },
  {
    label: "Seasonal Grace",
    description: "Fresh textures and expressive tones chosen at their prettiest.",
    src: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=900&q=85",
  },
];

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
          {arrangements.map((arrangement) => (
            <article
              key={arrangement.label}
              className="group overflow-hidden rounded-[1.25rem] border-2 border-[#fffaf0] bg-[#fffaf0]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f4e6d8]">
                <Image
                  src={arrangement.src}
                  alt={`${arrangement.label} floral arrangement`}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                  className="object-cover saturate-[1.08] transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="border-t-2 border-[#171512] p-6">
                <h3 className="text-2xl font-black uppercase leading-none tracking-normal text-[#171512]">
                  {arrangement.label}
                </h3>
                <p className="mt-3 text-sm font-medium leading-7 text-[#5d574f]">
                  {arrangement.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
