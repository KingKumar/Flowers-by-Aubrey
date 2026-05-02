import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="bg-[#fffaf0] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border-2 border-[#171512] bg-[#efe5d7] shadow-[12px_12px_0_#dce8c8]">
          <Image
            src="https://images.unsplash.com/photo-1509719662289-352f219b1e55?auto=format&fit=crop&w=1100&q=85"
            alt="Aubrey arranging pale flowers on a studio table"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover saturate-[1.08]"
          />
        </div>
        <div className="lg:pl-8">
          <SectionHeader
            eyebrow="About Aubrey"
            title="Thoughtful florals with a confident modern edge"
            align="left"
          />
          <div className="mt-7 space-y-5 text-base font-medium leading-8 text-[#5d574f] sm:text-lg">
            <p>
              Flowers by Aubrey began with a love for expressive color, clean
              composition, and the way fresh flowers can make a room feel
              instantly considered.
            </p>
            <p>
              Aubrey creates boutique arrangements that feel personal and
              elevated, with sculptural shape, seasonal texture, and palettes
              that are polished without feeling predictable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
