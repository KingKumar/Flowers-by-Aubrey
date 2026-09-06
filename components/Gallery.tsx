"use client";

import Image from "next/image";
import type { KeyboardEvent, TouchEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { FlowerMedia } from "./flowerOfferings";
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lightboxOpen = lightboxIndex !== null;

  const activeLook = flowerOfferings[activeIndex];
  const lightboxLook =
    lightboxIndex === null ? null : (flowerOfferings[lightboxIndex] ?? null);

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    dialogRef.current
      ?.querySelector<HTMLButtonElement>('button[aria-label="Close gallery"]')
      ?.focus();

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex="0"]',
        );
        const first = controls?.[0];
        const last = controls?.[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex((currentIndex) =>
          currentIndex === null
            ? currentIndex
            : currentIndex === 0
              ? flowerOfferings.length - 1
              : currentIndex - 1,
        );
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex((currentIndex) =>
          currentIndex === null
            ? currentIndex
            : currentIndex === flowerOfferings.length - 1
              ? 0
              : currentIndex + 1,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [lightboxOpen]);

  function showPreviousLook() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? flowerOfferings.length - 1 : currentIndex - 1,
    );
  }

  function showNextLook() {
    setActiveIndex((currentIndex) =>
      currentIndex === flowerOfferings.length - 1 ? 0 : currentIndex + 1,
    );
  }

  function showPreviousLightboxLook() {
    setLightboxIndex((currentIndex) =>
      currentIndex === null
        ? currentIndex
        : currentIndex === 0
          ? flowerOfferings.length - 1
          : currentIndex - 1,
    );
  }

  function showNextLightboxLook() {
    setLightboxIndex((currentIndex) =>
      currentIndex === null
        ? currentIndex
        : currentIndex === flowerOfferings.length - 1
          ? 0
          : currentIndex + 1,
    );
  }

  function openLightbox(index: number) {
    preloadLookImages(index);
    preloadLookImages(index === 0 ? flowerOfferings.length - 1 : index - 1);
    preloadLookImages(index === flowerOfferings.length - 1 ? 0 : index + 1);
    setLightboxIndex(index);
  }

  function preloadLookImages(index: number) {
    if (typeof window === "undefined") {
      return;
    }

    const look = flowerOfferings[index];

    if (!look) {
      return;
    }

    const imageSources = (
      look.media?.length
        ? look.media.flatMap((item) =>
            item.type === "image"
              ? [item.src]
              : item.poster
                ? [item.poster]
                : [],
          )
        : [look.image]
    ).filter(Boolean);

    imageSources.forEach((imageSource) => {
      const image = new globalThis.Image();
      image.decoding = "async";
      image.src = imageSource;
    });
  }

  function handleOpenKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
    index: number,
  ) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(index);
    }
  }

  const gridClass =
    mode === "dense"
      ? "grid gap-4 sm:grid-cols-3 lg:grid-cols-5"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

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
            <h1 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.9] text-[#344f20] sm:text-7xl">
              Flowers with a point of view
            </h1>
            <p className="mt-4 max-w-2xl font-mono text-sm font-bold leading-6 text-[#344f20]">
              Explore {flowerOfferings.length} Aubrey Florals arrangements. Open
              a look for a closer view, and scroll through its photos and
              videos.
            </p>
          </div>

          <div className="hidden w-full flex-col gap-3 sm:flex lg:w-auto lg:flex-row lg:items-center">
            <div
              className="grid w-full grid-cols-3 border-2 border-[#1b120c] bg-white lg:w-auto"
              aria-label="Lookbook layout"
            >
              {modeLabels.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMode(option.id)}
                  aria-pressed={mode === option.id}
                  className={`min-h-11 border-r-2 border-[#1b120c] px-3 font-mono text-xs font-black uppercase tracking-[0.08em] last:border-r-0 lg:px-4 ${
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

        {mode === "gallery" ? (
          <div className="mt-12">
            <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
              <button
                type="button"
                onClick={showPreviousLook}
                className="hidden h-14 w-14 items-center justify-center border-2 border-[#1b120c] bg-white font-mono text-3xl font-black text-[#253712] shadow-[4px_4px_0_#f26a21] transition hover:-translate-y-0.5 xl:flex"
                aria-label="Previous look"
              >
                &larr;
              </button>
              <article className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start">
                <div
                  className="relative h-[calc(100svh-15rem)] min-h-[360px] cursor-zoom-in overflow-hidden border-4 bg-white sm:min-h-[560px] lg:h-[620px] lg:max-h-none xl:h-[720px]"
                  style={{ borderColor: activeLook.cardColor }}
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(activeIndex)}
                  onKeyDown={(event) => handleOpenKeyDown(event, activeIndex)}
                  onPointerEnter={() => preloadLookImages(activeIndex)}
                  onFocus={() => preloadLookImages(activeIndex)}
                  aria-label={`Open ${activeLook.name} larger`}
                >
                  <LookbookImage
                    src={activeLook.image}
                    key={activeLook.id}
                    media={activeLook.media}
                    alt={activeLook.name}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    priority
                  />
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      showPreviousLook();
                    }}
                    className="absolute bottom-3 left-3 z-20 flex h-12 w-12 items-center justify-center border-2 border-[#1b120c] bg-white/95 font-mono text-2xl font-black text-[#253712] shadow-[3px_3px_0_#f26a21] transition hover:brightness-95 xl:hidden"
                    aria-label="Previous look"
                  >
                    &larr;
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      showNextLook();
                    }}
                    className="absolute bottom-3 right-3 z-20 flex h-12 w-12 items-center justify-center border-2 border-[#1b120c] bg-white/95 font-mono text-2xl font-black text-[#253712] shadow-[3px_3px_0_#f26a21] transition hover:brightness-95 xl:hidden"
                    aria-label="Next look"
                  >
                    &rarr;
                  </button>
                  <div className="absolute left-3 top-3 z-20 border-2 border-[#1b120c] bg-white/95 px-3 py-2 font-mono text-xs font-black uppercase tracking-[0.08em] text-[#253712] shadow-[3px_3px_0_#f26a21] lg:hidden">
                    {activeIndex + 1} / {flowerOfferings.length}
                  </div>
                </div>
                <div className="border-2 border-[#1b120c] bg-white p-4 shadow-[4px_4px_0_#ed2b82] lg:hidden">
                  <h3 className="text-2xl font-black uppercase leading-none text-[#1b120c]">
                    {activeLook.name}
                  </h3>
                  <p className="mt-3 line-clamp-2 font-mono text-xs font-bold leading-5 text-[#344f20]">
                    {activeLook.description}
                  </p>
                </div>
                <div className="hidden border-2 border-[#1b120c] bg-white p-6 shadow-[7px_7px_0_#ed2b82] lg:block">
                  <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[#344f20]">
                    Look {activeIndex + 1} of {flowerOfferings.length}
                  </p>
                  <h3 className="mt-4 text-4xl font-black uppercase leading-none text-[#1b120c] sm:text-5xl">
                    {activeLook.name}
                  </h3>
                  <p className="mt-5 font-mono text-sm font-bold leading-7 text-[#344f20]">
                    {activeLook.description}
                  </p>
                </div>
              </article>
              <button
                type="button"
                onClick={showNextLook}
                className="hidden h-14 w-14 items-center justify-center border-2 border-[#1b120c] bg-white font-mono text-3xl font-black text-[#253712] shadow-[4px_4px_0_#f26a21] transition hover:-translate-y-0.5 xl:flex"
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
                  aria-pressed={activeIndex === index}
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
            {flowerOfferings.map((offering, index) => (
              <article
                id={offering.id}
                key={offering.id}
                className="group scroll-mt-6"
              >
                <div
                  className="relative aspect-[4/5] cursor-zoom-in overflow-hidden border-4 bg-white"
                  style={{ borderColor: offering.cardColor }}
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(index)}
                  onKeyDown={(event) => handleOpenKeyDown(event, index)}
                  onPointerEnter={() => preloadLookImages(index)}
                  onFocus={() => preloadLookImages(index)}
                  aria-label={`Open ${offering.name} larger`}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-2"
                    style={{ backgroundColor: offering.cardColor }}
                  />
                  <LookbookImage
                    src={offering.image}
                    media={offering.media}
                    alt={offering.name}
                    sizes={
                      mode === "dense"
                        ? "(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 100vw"
                        : "(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                    }
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

        {lightboxLook ? (
          <div
            ref={dialogRef}
            className="fixed inset-0 z-[80] h-[100dvh] overflow-hidden bg-[#1b120c]/80 p-2 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${lightboxLook.name} gallery`}
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="mx-auto flex h-full max-h-full max-w-6xl flex-col overflow-hidden border-2 border-[#1b120c] bg-[#fff2df] shadow-[5px_5px_0_#ed2b82] sm:shadow-[8px_8px_0_#ed2b82]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b-2 border-[#1b120c] p-2 sm:p-4">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#344f20] sm:text-xs">
                    Look {(lightboxIndex ?? 0) + 1} of {flowerOfferings.length}
                  </p>
                  <h3 className="truncate text-xl font-black uppercase leading-none text-[#1b120c] sm:text-4xl">
                    {lightboxLook.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#1b120c] bg-white font-mono text-2xl font-black text-[#ed2b82] shadow-[3px_3px_0_#1b120c] transition hover:-translate-y-0.5 sm:h-11 sm:w-11"
                  aria-label="Close gallery"
                >
                  x
                </button>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2 sm:gap-3 sm:p-4 lg:grid lg:grid-cols-[minmax(0,1fr)_300px]">
                <div
                  className="relative min-h-0 flex-1 overflow-hidden border-4 bg-white lg:min-h-0"
                  style={{ borderColor: lightboxLook.cardColor }}
                >
                  <LookbookImage
                    src={lightboxLook.image}
                    key={lightboxLook.id}
                    media={lightboxLook.media}
                    alt={lightboxLook.name}
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    priority
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={showPreviousLightboxLook}
                    className="absolute left-3 top-3 z-30 flex h-12 w-12 items-center justify-center border-2 border-[#1b120c] bg-white/95 font-mono text-2xl font-black text-[#253712] shadow-[3px_3px_0_#f26a21] transition hover:brightness-95"
                    aria-label="Previous look"
                  >
                    &larr;
                  </button>
                  <button
                    type="button"
                    onClick={showNextLightboxLook}
                    className="absolute right-3 top-3 z-30 flex h-12 w-12 items-center justify-center border-2 border-[#1b120c] bg-white/95 font-mono text-2xl font-black text-[#253712] shadow-[3px_3px_0_#f26a21] transition hover:brightness-95"
                    aria-label="Next look"
                  >
                    &rarr;
                  </button>
                </div>
                <div className="max-h-[24dvh] shrink-0 overflow-y-auto border-2 border-[#1b120c] bg-white p-3 shadow-[3px_3px_0_#f26a21] sm:p-4 lg:max-h-none">
                  <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[#ed2b82]">
                    Arrangement Notes
                  </p>
                  <p className="mt-2 font-mono text-xs font-bold leading-5 text-[#344f20] sm:mt-3 sm:text-sm sm:leading-6">
                    {lightboxLook.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function LookbookImage({
  src,
  media,
  alt,
  sizes,
  priority = false,
  unoptimized = false,
}: {
  src: string;
  media?: FlowerMedia[];
  alt: string;
  sizes: string;
  priority?: boolean;
  unoptimized?: boolean;
}) {
  const mediaItems = media?.length
    ? media
    : [{ type: "image" as const, src, alt }];
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  function showPreviousMedia() {
    const nextIndex =
      activeMediaIndex === 0 ? mediaItems.length - 1 : activeMediaIndex - 1;

    setActiveMediaIndex(nextIndex);
  }

  function showNextMedia() {
    const nextIndex =
      activeMediaIndex === mediaItems.length - 1 ? 0 : activeMediaIndex + 1;

    setActiveMediaIndex(nextIndex);
  }

  function showMedia(index: number) {
    setActiveMediaIndex(index);
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null || mediaItems.length < 2) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX;

    if (touchEndX === undefined) {
      return;
    }

    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > 40) {
      if (swipeDistance > 0) {
        showNextMedia();
      } else {
        showPreviousMedia();
      }
    }

    setTouchStartX(null);
  }

  return (
    <div
      className="absolute inset-0"
      onTouchStart={(event) =>
        setTouchStartX(event.touches[0]?.clientX ?? null)
      }
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute inset-0 z-10 flex bg-white transition-transform duration-700 ease-[cubic-bezier(0.2,0.75,0.2,1)] motion-reduce:duration-0"
        style={{ transform: `translateX(-${activeMediaIndex * 100}%)` }}
      >
        {mediaItems.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className="relative h-full w-full shrink-0 bg-white"
          >
            <MediaItem
              media={item}
              alt={alt}
              sizes={sizes}
              priority={priority}
              isActive={index === activeMediaIndex}
              liftOnHover={index === activeMediaIndex}
              unoptimized={unoptimized}
            />
          </div>
        ))}
      </div>

      {mediaItems.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousMedia();
            }}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border-2 border-[#1b120c] bg-white/95 font-mono text-xl font-black text-[#253712] shadow-[3px_3px_0_#f26a21] transition hover:brightness-95 sm:left-3"
            aria-label="Previous media"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextMedia();
            }}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border-2 border-[#1b120c] bg-white/95 font-mono text-xl font-black text-[#253712] shadow-[3px_3px_0_#f26a21] transition hover:brightness-95 sm:right-3"
            aria-label="Next media"
          >
            &rarr;
          </button>
          <div
            className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 cursor-default gap-1.5 border-2 border-[#1b120c] bg-white/95 px-2 py-1.5 shadow-[3px_3px_0_#f26a21]"
            onPointerDown={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            {mediaItems.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showMedia(index);
                }}
                className={`h-2.5 w-2.5 rounded-full border border-[#1b120c] ${
                  index === activeMediaIndex ? "bg-[#ed2b82]" : "bg-[#fff2df]"
                }`}
                aria-label={`Show ${item.type} ${index + 1}`}
                aria-pressed={activeMediaIndex === index}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function MediaItem({
  media,
  alt,
  sizes,
  priority,
  isActive,
  liftOnHover = false,
  unoptimized = false,
}: {
  media: FlowerMedia;
  alt: string;
  sizes: string;
  priority: boolean;
  isActive: boolean;
  liftOnHover?: boolean;
  unoptimized?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (media.type !== "video" || !videoRef.current) {
      return;
    }

    const video = videoRef.current;

    video.muted = true;
    video.defaultMuted = true;

    if (isActive) {
      video.play().catch(() => {
        // Some browsers wait until the slide is fully visible; the next user tap will retry.
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive, media.type, media.src]);

  if (media.type === "video" && !isActive) {
    return media.poster ? (
      <Image
        src={media.poster}
        alt={media.alt ?? alt}
        fill
        sizes={sizes}
        className="object-contain"
      />
    ) : null;
  }

  if (media.type === "image") {
    return (
      <Image
        src={media.src}
        alt={media.alt ?? alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        className={`object-contain transition duration-500 ${
          liftOnHover ? "group-hover:scale-[1.04]" : ""
        }`}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="h-full w-full object-contain"
      autoPlay
      controls={false}
      controlsList="nodownload noplaybackrate noremoteplayback"
      disablePictureInPicture
      loop
      muted
      playsInline
      preload="metadata"
      poster={media.poster}
      aria-label={media.alt ?? alt}
    >
      <source src={media.src} type="video/mp4" />
    </video>
  );
}
