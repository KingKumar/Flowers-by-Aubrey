"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { FlowerOffering } from "./flowerOfferings";

type HeroArrangement = Pick<FlowerOffering, "id" | "name" | "image">;
const imageSizes =
  "(min-width: 1400px) 448px, (min-width: 1024px) 32vw, (min-width: 448px) 448px, 100vw";

export function HeroArrangementCarousel({
  arrangements,
}: {
  arrangements: HeroArrangement[];
}) {
  const loadedImages = useRef(new Set<string>());
  const [ready, setReady] = useState(false);

  function markImageReady(key: string) {
    loadedImages.current.add(key);
    if (loadedImages.current.size === arrangements.length * 2) {
      setReady(true);
    }
  }

  return (
    <div
      className="hero-reel relative z-10"
      role="region"
      aria-label={`A continuous look at ${arrangements.length} floral arrangements`}
      data-ready={ready}
    >
      <div
        className="hero-reel-viewport overflow-hidden"
        tabIndex={0}
        aria-label="Arrangement photos. With reduced motion enabled, scroll horizontally to browse."
      >
        {!ready && (
          <Image
            src={arrangements[0].image}
            alt={arrangements[0].name}
            fill
            priority
            sizes={imageSizes}
            className="object-cover"
          />
        )}
        <div
          className={`hero-reel-track flex w-max ${ready ? "" : "invisible"}`}
          aria-hidden={!ready || undefined}
          style={{
            animationDuration: `${arrangements.length * 8}s`,
            animationPlayState: ready ? "running" : "paused",
          }}
        >
          {[false, true].map((duplicate) => (
            <div
              key={String(duplicate)}
              className={`flex shrink-0 ${duplicate ? "hero-reel-copy" : ""}`}
              aria-hidden={duplicate || undefined}
            >
              {arrangements.map((arrangement, index) => (
                <div
                  key={arrangement.id}
                  className="hero-reel-slide relative shrink-0 overflow-hidden"
                >
                  <Image
                    src={arrangement.image}
                    alt={duplicate ? "" : arrangement.name}
                    fill
                    sizes={imageSizes}
                    loading="eager"
                    priority={!duplicate && index === 0}
                    onLoad={() =>
                      markImageReady(`${duplicate}-${arrangement.id}`)
                    }
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
