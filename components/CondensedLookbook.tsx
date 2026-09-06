import Image from "next/image";
import Link from "next/link";
import { flowerOfferings } from "./flowerOfferings";

export function CondensedLookbook() {
  return (
    <section
      aria-label="Aubrey Florals lookbook preview"
      className="bg-[#fff2df] px-5 py-16 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {flowerOfferings.map((look) => (
          <Link
            key={look.id}
            href={`/lookbook#${look.id}`}
            aria-label={`View ${look.name} in the lookbook`}
            className="relative aspect-[4/5] overflow-hidden bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed2b82]"
          >
            <Image
              src={look.image}
              alt={look.name}
              fill
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 24vw, 48vw"
              className="object-contain transition duration-300 hover:scale-[1.03] motion-reduce:transition-none"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
