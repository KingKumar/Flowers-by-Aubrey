import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="paper-grain bg-[#fff2df] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative aspect-[4/5] overflow-hidden border-2 border-[#1b120c] bg-[#f26a21] shadow-[8px_8px_0_#ed2b82]">
          <Image
            src="/images/green-amaranth-lily-garden.png"
            alt="Green hydrangea and lily arrangement with hanging amaranthus"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover saturate-[1.08]"
          />
        </div>
        <div className="lg:pl-8">
          <SectionHeader
            eyebrow="About Aubrey"
            title="Color-rich florals with a composed, personal touch"
            align="left"
          />
          <div className="mt-7 space-y-5 font-mono text-base font-bold leading-8 text-[#344f20] sm:text-lg">
            <p>
              Aubrey Florals began with a love for expressive color, clean
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
