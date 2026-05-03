"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { flowerOfferings } from "./flowerOfferings";

type LookbookMode = "big" | "dense" | "gallery";

const modeLabels: Array<{ id: LookbookMode; label: string }> = [
  { id: "big", label: "Big" },
  { id: "dense", label: "More per row" },
  { id: "gallery", label: "Gallery" },
];

export function Gallery() {
  const [mode, setMode] = useState<LookbookMode>("big");
  const [activeIndex, setActiveIndex] = useState(0);
  const [savedLookIds, setSavedLookIds] = useState<string[]>([]);

  const activeLook = flowerOfferings[activeIndex];
  const savedLooks = useMemo(
    () => flowerOfferings.filter((look) => savedLookIds.includes(look.id)),
    [savedLookIds]
  );
  const inquiryBody = encodeURIComponent(
    [
      "Hi Aubrey Florals,",
      "",
      savedLooks.length
        ? `I am interested in looks similar to: ${savedLooks
            .map((look) => look.name)
            .join(", ")}.`
        : "I am interested in talking through a custom floral look.",
      "",
      "Occasion:",
      "Date:",
      "Location: Los Angeles",
      "Notes:",
    ].join("\n")
  );

  function toggleSavedLook(lookId: string) {
    setSavedLookIds((currentIds) =>
      currentIds.includes(lookId)
        ? currentIds.filter((id) => id !== lookId)
        : [...currentIds, lookId]
    );
  }

  function showPreviousLook() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? flowerOfferings.length - 1 : currentIndex - 1
    );
  }

  function showNextLook() {
    setActiveIndex((currentIndex) =>
      currentIndex === flowerOfferings.length - 1 ? 0 : currentIndex + 1
    );
  }

  const gridClass =
    mode === "dense"
      ? "grid gap-4 sm:grid-cols-3 lg:grid-cols-5"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";
  const savedCountLabel = `${savedLookIds.length} ${
    savedLookIds.length === 1 ? "flower look" : "flower looks"
  } added`;

  return (
    <section
      id="gallery"
      className="paper-grain bg-[#fff2df] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-block rotate-[-1deg] bg-[#1b120c] px-3 py-1 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df]">
              Los Angeles Lookbook
            </p>
            <h2 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.9] text-[#344f20] sm:text-7xl">
              Save the stems that feel like you
            </h2>
            <p className="mt-4 max-w-2xl font-mono text-sm font-bold leading-6 text-[#344f20]">
              Browse {flowerOfferings.length} unique Aubrey Florals looks, mark your favorites, then
              contact Aubrey about a custom arrangement with a similar palette, shape,
              and flower mood.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div
              className="inline-flex border-2 border-[#1b120c] bg-white"
              aria-label="Lookbook layout"
            >
              {modeLabels.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMode(option.id)}
                  className={`min-h-11 border-r-2 border-[#1b120c] px-4 font-mono text-xs font-black uppercase tracking-[0.08em] last:border-r-0 ${
                    mode === option.id
                      ? "bg-[#ed2b82] text-[#fff2df]"
                      : "text-[#253712] hover:bg-[#fff2df]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-30 mt-8 border-y-2 border-[#1b120c] bg-[#fff2df]/95 py-4 shadow-[0_8px_24px_rgba(27,18,12,0.08)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-[#253712]">
                {savedCountLabel}
              </p>
              {savedLooks.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {savedLooks.map((look) => (
                    <button
                      key={look.id}
                      type="button"
                      onClick={() => toggleSavedLook(look.id)}
                      className="inline-flex min-h-9 items-center gap-2 border-2 border-[#1b120c] bg-white px-3 font-mono text-xs font-black uppercase leading-none text-[#344f20] shadow-[2px_2px_0_#f26a21] transition hover:-translate-y-0.5"
                      aria-label={`Remove ${look.name}`}
                    >
                      <span>{look.name}</span>
                      <span className="text-[#ed2b82]" aria-hidden="true">
                        x
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-2 font-mono text-xs font-bold leading-5 text-[#344f20]">
                  Tap the flower on any look to save it for your inquiry.
                </p>
              )}
            </div>
            <a
              href={`mailto:aubrey.glassberg@gmail.com?subject=Lookbook inquiry&body=${inquiryBody}`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center border-2 border-[#1b120c] bg-[#f24b12] px-5 font-mono text-xs font-black uppercase tracking-[0.08em] text-[#fff2df] shadow-[3px_3px_0_#1b120c] transition hover:-translate-y-0.5"
            >
              Inquire about the looks
            </a>
          </div>
        </div>

        {mode === "gallery" ? (
          <div className="mt-12">
            <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
              <button
                type="button"
                onClick={showPreviousLook}
                className="hidden h-14 w-14 items-center justify-center border-2 border-[#1b120c] bg-white font-mono text-3xl font-black text-[#253712] shadow-[4px_4px_0_#f26a21] transition hover:-translate-y-0.5 lg:flex"
                aria-label="Previous look"
              >
                &larr;
              </button>
              <article className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start">
                <div
                  className="relative h-[100svh] max-h-[900px] min-h-[560px] overflow-hidden border-4 bg-white"
                  style={{ borderColor: activeLook.cardColor }}
                >
                  <LookbookImage
                    src={activeLook.image}
                    alt={activeLook.name}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    priority
                  />
                  <SaveButton
                    isSaved={savedLookIds.includes(activeLook.id)}
                    label={activeLook.name}
                    onClick={() => toggleSavedLook(activeLook.id)}
                  />
                </div>
                <div className="border-2 border-[#1b120c] bg-white p-6 shadow-[7px_7px_0_#ed2b82]">
                  <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[#344f20]">
                    Look {activeIndex + 1} of {flowerOfferings.length}
                  </p>
                  <h3 className="mt-4 text-4xl font-black uppercase leading-none text-[#1b120c] sm:text-5xl">
                    {activeLook.name}
                  </h3>
                  <p className="mt-5 font-mono text-sm font-bold leading-7 text-[#344f20]">
                    {activeLook.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleSavedLook(activeLook.id)}
                    className="mt-7 inline-flex min-h-12 w-full items-center justify-center border-2 border-[#1b120c] bg-[#ed2b82] px-6 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df] shadow-[4px_4px_0_#1b120c] transition hover:-translate-y-0.5"
                  >
                    {savedLookIds.includes(activeLook.id)
                      ? "Remove from inquiry"
                      : "Add this look"}
                  </button>
                  <div className="mt-5 flex gap-3 lg:hidden">
                    <button
                      type="button"
                      onClick={showPreviousLook}
                      className="min-h-11 flex-1 border-2 border-[#1b120c] bg-white font-mono text-sm font-black uppercase"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={showNextLook}
                      className="min-h-11 flex-1 border-2 border-[#1b120c] bg-white font-mono text-sm font-black uppercase"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </article>
              <button
                type="button"
                onClick={showNextLook}
                className="hidden h-14 w-14 items-center justify-center border-2 border-[#1b120c] bg-white font-mono text-3xl font-black text-[#253712] shadow-[4px_4px_0_#f26a21] transition hover:-translate-y-0.5 lg:flex"
                aria-label="Next look"
              >
                &rarr;
              </button>
            </div>
            <div className="mt-5 flex gap-3 overflow-x-auto pb-3">
              {flowerOfferings.map((look, index) => (
                <button
                  key={look.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-24 w-20 shrink-0 overflow-hidden border-2 ${
                    index === activeIndex
                      ? "border-[#ed2b82]"
                      : "border-[#1b120c]"
                  }`}
                  aria-label={`Show ${look.name}`}
                >
                  <Image
                    src={look.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={`mt-12 ${gridClass}`}>
            {flowerOfferings.map((offering) => (
              <article key={offering.id} className="group">
                <div
                  className="relative aspect-[4/5] overflow-hidden border-4 bg-white"
                  style={{ borderColor: offering.cardColor }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-2"
                    style={{ backgroundColor: offering.cardColor }}
                  />
                  <LookbookImage
                    src={offering.image}
                    alt={offering.name}
                    sizes={
                      mode === "dense"
                        ? "(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 100vw"
                        : "(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                    }
                  />
                  <SaveButton
                    isSaved={savedLookIds.includes(offering.id)}
                    label={offering.name}
                    onClick={() => toggleSavedLook(offering.id)}
                  />
                </div>
                <div className="pt-4">
                  <h3 className="stamp-label inline bg-[#1b120c] px-2 py-1 font-mono text-lg font-black uppercase leading-tight text-[#fff2df]">
                    {offering.name}
                  </h3>
                  <p className="mt-3 font-mono text-sm font-bold leading-6 text-[#344f20]">
                    {offering.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LookbookImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        priority={priority}
        className="z-0 scale-110 object-cover opacity-35 blur-xl saturate-[1.08]"
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="relative z-10 object-contain transition duration-500 group-hover:scale-[1.04]"
      />
    </>
  );
}

function SaveButton({
  isSaved,
  label,
  onClick,
}: {
  isSaved: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute bottom-3 right-3 z-20 flex h-12 w-12 items-center justify-center border-2 border-[#1b120c] text-2xl font-black shadow-[3px_3px_0_#1b120c] transition hover:-translate-y-0.5 ${
        isSaved
          ? "bg-[#ed2b82] text-[#fff2df]"
          : "bg-white text-[#ed2b82]"
      }`}
      aria-label={`${isSaved ? "Remove" : "Save"} ${label}`}
      aria-pressed={isSaved}
    >
      ✿
    </button>
  );
}
