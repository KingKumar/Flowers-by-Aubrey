import Image from "next/image";

export function About() {
  return (
    <section id="about" className="paper-grain bg-[#fff2df] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative aspect-[4/5] overflow-hidden border-2 border-[#1b120c] bg-[#f26a21] shadow-[8px_8px_0_#ed2b82]">
          <Image
            src="/images/aubrey-grandmas-orchid-garden-scale.jpg"
            alt="Me holding Grandma's Orchid Garden"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover saturate-[1.08]"
          />
        </div>
        <div className="lg:pl-8">
          <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[#344f20]">
            About Me
          </p>
          <h2 className="mt-4 text-[clamp(1.125rem,6.2vw,3rem)] font-black uppercase leading-[1.05] text-[#1b120c] lg:text-[clamp(1.5rem,2.6vw,2.25rem)]">
            <span className="block">Rooted in Los Angeles,</span>
            <span className="block">Inspired by art,</span>
            <span className="block">Obsessed with flowers.</span>
          </h2>
          <div className="mt-7 space-y-5 font-mono text-base font-bold leading-8 text-[#344f20] sm:text-lg">
            <p>
              I’ve always had a love for nature, plants, and color. Growing up in
              Los Angeles and studying World Arts and Cultures at UCLA shaped the
              way I see beauty and creativity, but flowers have given me my own
              way to express it.
            </p>
            <p>
              I love that I can take something from nature and turn it into a
              piece of art. Playing with color, shape, texture, and movement, I
              create arrangements that can completely transform a space and bring
              a little more beauty into someone’s everyday life.
            </p>
            <p>
              There’s something special to me about the temporary nature of
              flowers. A vase can be filled with something new, beautiful, and
              unexpected, and then, when its time has passed, you get to create
              something completely different. I love being able to share that
              feeling with others and create pieces that make a space feel a
              little more alive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
