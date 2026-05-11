"use client";

import { useEffect, useRef, useState } from "react";

export type SelectedPlaceDetails = {
  formattedAddress: string;
  placeId: string;
  latitude: number | null;
  longitude: number | null;
};

type GoogleAutocomplete = {
  addListener: (eventName: "place_changed", handler: () => void) => void;
  getPlace: () => {
    formatted_address?: string;
    place_id?: string;
    geometry?: {
      location?: {
        lat: () => number;
        lng: () => number;
      };
    };
  };
};

type GoogleMapsWindow = Window &
  typeof globalThis & {
    google?: {
      maps?: {
        LatLngBounds: new (
          southwest: { lat: number; lng: number },
          northeast: { lat: number; lng: number }
        ) => unknown;
        places?: {
          Autocomplete: new (
            input: HTMLInputElement,
            options: Record<string, unknown>
          ) => GoogleAutocomplete;
        };
      };
    };
  };

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_SCRIPT_ID = "google-maps-places-script";
const GOOGLE_SCRIPT_READY_EVENT = "google-maps-places-ready";

function loadGooglePlacesScript() {
  if (!GOOGLE_MAPS_API_KEY || typeof window === "undefined") {
    return;
  }

  const typedWindow = window as GoogleMapsWindow;

  if (typedWindow.google?.maps?.places?.Autocomplete) {
    window.dispatchEvent(new Event(GOOGLE_SCRIPT_READY_EVENT));
    return;
  }

  const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);

  if (existingScript) {
    return;
  }

  const script = document.createElement("script");
  script.id = GOOGLE_SCRIPT_ID;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
    GOOGLE_MAPS_API_KEY
  )}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.addEventListener("load", () => {
    window.dispatchEvent(new Event(GOOGLE_SCRIPT_READY_EVENT));
  });

  document.head.appendChild(script);
}

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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<GoogleAutocomplete | null>(null);
  const onChangeRef = useRef(onChange);
  const onPlaceSelectRef = useRef(onPlaceSelect);
  const [hasAutocomplete, setHasAutocomplete] = useState(false);

  useEffect(() => {
    onChangeRef.current = onChange;
    onPlaceSelectRef.current = onPlaceSelect;
  }, [onChange, onPlaceSelect]);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      return;
    }

    loadGooglePlacesScript();

    function setupAutocomplete() {
      const typedWindow = window as GoogleMapsWindow;

      if (
        autocompleteRef.current ||
        !inputRef.current ||
        !typedWindow.google?.maps?.places?.Autocomplete
      ) {
        return;
      }

      const losAngelesSantaMonicaBounds =
        new typedWindow.google.maps.LatLngBounds(
          { lat: 33.92, lng: -118.55 },
          { lat: 34.18, lng: -118.18 }
        );

      const autocomplete = new typedWindow.google.maps.places.Autocomplete(
        inputRef.current,
        {
          bounds: losAngelesSantaMonicaBounds,
          componentRestrictions: { country: "us" },
          fields: ["formatted_address", "geometry", "place_id"],
          strictBounds: false,
          types: ["address"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const formattedAddress = place.formatted_address ?? inputRef.current?.value ?? "";
        const selectedPlace = {
          formattedAddress,
          placeId: place.place_id ?? "",
          latitude: place.geometry?.location?.lat() ?? null,
          longitude: place.geometry?.location?.lng() ?? null,
        };

        onChangeRef.current(formattedAddress);
        onPlaceSelectRef.current(selectedPlace.placeId ? selectedPlace : null);
      });

      autocompleteRef.current = autocomplete;
      setHasAutocomplete(true);
    }

    setupAutocomplete();
    window.addEventListener(GOOGLE_SCRIPT_READY_EVENT, setupAutocomplete);

    return () => {
      window.removeEventListener(GOOGLE_SCRIPT_READY_EVENT, setupAutocomplete);
    };
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
        onPlaceSelect(null);
      }}
      placeholder={placeholder}
      autoComplete={hasAutocomplete ? "off" : "street-address"}
      className={className}
    />
  );
}
