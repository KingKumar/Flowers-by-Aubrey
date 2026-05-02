import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="bg-[#fffdf8] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#efe5d7] shadow-[0_24px_70px_rgba(62,55,45,0.13)]">
          <Image
            src="https://images.unsplash.com/photo-1509719662289-352f219b1e55?auto=format&fit=crop&w=1100&q=85"
            alt="Aubrey arranging pale flowers on a studio table"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:pl-8">
          <SectionHeader
            eyebrow="About Aubrey"
            title="Florals with a thoughtful hand and a romantic point of view"
            align="left"
          />
          <div className="mt-7 space-y-5 text-base leading-8 text-[#6b6258] sm:text-lg">
            <p>
              Flowers by Aubrey began with a love for small details: the curve
              of a stem, the softness of a blush petal, and the way fresh
              flowers can make a room feel cared for.
            </p>
            <p>
              Aubrey creates boutique arrangements that feel personal, graceful,
              and never overdone. Each design is guided by the occasion, the
              season, and the simple pleasure of giving something beautiful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
