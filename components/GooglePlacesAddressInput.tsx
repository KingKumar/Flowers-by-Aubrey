"use client";

import { useEffect, useRef, useState } from "react";

export type SelectedPlaceDetails = {
  formattedAddress: string;
  placeId: string;
  latitude: number | null;
  longitude: number | null;
};

type PlaceSuggestion = {
  description: string;
  placeId: string;
};

export function GooglePlacesAddressInput({
  value,
  onChange,
  onPlaceSelect,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: SelectedPlaceDetails | null) => void;
  placeholder: string;
  className: string;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, []);

  useEffect(() => {
    const trimmedValue = value.trim();

    if (trimmedValue.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/places/autocomplete?input=${encodeURIComponent(trimmedValue)}`,
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error("Autocomplete unavailable.");
        }

        const result = (await response.json()) as {
          suggestions?: PlaceSuggestion[];
        };

        setSuggestions(result.suggestions ?? []);
        setIsOpen(Boolean(result.suggestions?.length));
        setActiveIndex(-1);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setSuggestions([]);
          setIsOpen(false);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 220);

    return () => {
      window.clearTimeout(timeout);
      abortController.abort();
    };
  }, [value]);

  async function selectSuggestion(suggestion: PlaceSuggestion) {
    onChange(suggestion.description);
    setIsOpen(false);
    setSuggestions([]);

    try {
      const response = await fetch(
        `/api/places/details?placeId=${encodeURIComponent(suggestion.placeId)}`
      );

      if (!response.ok) {
        throw new Error("Place details unavailable.");
      }

      const result = (await response.json()) as {
        place?: SelectedPlaceDetails;
      };

      onPlaceSelect(
        result.place ?? {
          formattedAddress: suggestion.description,
          placeId: suggestion.placeId,
          latitude: null,
          longitude: null,
        }
      );
    } catch {
      onPlaceSelect({
        formattedAddress: suggestion.description,
        placeId: suggestion.placeId,
        latitude: null,
        longitude: null,
      });
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          onPlaceSelect(null);
        }}
        onFocus={() => {
          if (suggestions.length) {
            setIsOpen(true);
          }
        }}
        onKeyDown={(event) => {
          if (!isOpen || !suggestions.length) {
            return;
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((current) =>
              Math.min(current + 1, suggestions.length - 1)
            );
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((current) => Math.max(current - 1, 0));
          }

          if (event.key === "Enter" && activeIndex >= 0) {
            event.preventDefault();
            void selectSuggestion(suggestions[activeIndex]);
          }

          if (event.key === "Escape") {
            setIsOpen(false);
          }
        }}
        placeholder={placeholder}
        autoComplete="street-address"
        className={className}
      />

      {isOpen ? (
        <div className="absolute left-0 right-0 top-full z-[90] mt-1 max-h-56 overflow-y-auto border-2 border-[#1b120c] bg-white shadow-[4px_4px_0_#ed2b82]">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.placeId}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => void selectSuggestion(suggestion)}
              className={`block w-full border-b border-[#1b120c]/20 px-3 py-2 text-left font-mono text-xs font-bold leading-5 text-[#344f20] transition last:border-b-0 ${
                activeIndex === index ? "bg-[#fff2df]" : "bg-white"
              }`}
            >
              {suggestion.description}
            </button>
          ))}
        </div>
      ) : null}

      {isLoading ? (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] font-black uppercase tracking-[0.08em] text-[#344f20]">
          ...
        </span>
      ) : null}
    </div>
  );
}
