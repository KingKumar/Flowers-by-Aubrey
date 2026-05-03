"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { flowerOfferings } from "./flowerOfferings";
import { SectionHeader } from "./SectionHeader";

const studio = {
  label: "Wilshire Blvd & Barry Ave, Los Angeles",
  lat: 34.0467,
  lon: -118.4567,
};

const deliveryOptions = [
  {
    id: "same-day",
    label: "Same-day",
    note: "Best for orders before noon",
    fee: 18,
  },
  {
    id: "next-day",
    label: "Next day",
    note: "A little more time for sourcing",
    fee: 8,
  },
  {
    id: "scheduled",
    label: "Schedule",
    note: "Choose the day that feels right",
    fee: 0,
  },
];

const dropOffWindows = [
  "9 AM - 12 PM",
  "12 PM - 3 PM",
  "3 PM - 6 PM",
  "6 PM - 8 PM",
];

const cardOptions = [
  {
    name: "No card",
    price: 0,
    tone: "Just flowers",
    message: "Skip the printed card.",
    swatch: "bg-[#fff2df]",
  },
  {
    name: "Blush",
    price: 8,
    tone: "Soft pink",
    message: "A warm blush card for a soft, romantic finish.",
    swatch: "bg-[#b83a73]",
  },
  {
    name: "Sage",
    price: 8,
    tone: "Muted green",
    message: "A calm sage card with an understated garden feel.",
    swatch: "bg-[#344f20]",
  },
  {
    name: "Cream",
    price: 10,
    tone: "Deckled cream",
    message: "A premium cream card with a more elevated paper texture.",
    swatch: "bg-[#c85f22]",
  },
  {
    name: "Ivory",
    price: 8,
    tone: "Linen ivory",
    message: "A simple ivory card that works for almost any note.",
    swatch: "bg-[#fff2df]",
  },
  {
    name: "Butter",
    price: 9,
    tone: "Pale yellow",
    message: "A pale yellow card for something bright and gentle.",
    swatch: "bg-[#d88943]",
  },
];

function currency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function milesBetween(
  start: { lat: number; lon: number },
  end: { lat: number; lon: number }
) {
  const radiusInMiles = 3958.8;
  const latDelta = ((end.lat - start.lat) * Math.PI) / 180;
  const lonDelta = ((end.lon - start.lon) * Math.PI) / 180;
  const startLat = (start.lat * Math.PI) / 180;
  const endLat = (end.lat * Math.PI) / 180;
  const a =
    Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
    Math.cos(startLat) *
      Math.cos(endLat) *
      Math.sin(lonDelta / 2) *
      Math.sin(lonDelta / 2);

  return radiusInMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function OrderExperience() {
  const [cart, setCart] = useState<Record<string, number>>({
    [flowerOfferings[2].id]: 1,
  });
  const [featuredOfferingId, setFeaturedOfferingId] = useState(
    flowerOfferings[2].id
  );
  const [deliveryOption, setDeliveryOption] = useState(deliveryOptions[1]);
  const [selectedCard, setSelectedCard] = useState(cardOptions[0]);
  const [distance, setDistance] = useState<number | null>(null);
  const [distanceError, setDistanceError] = useState("");
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [address, setAddress] = useState("");
  const [desiredDate, setDesiredDate] = useState("");
  const [dropOffWindow, setDropOffWindow] = useState(dropOffWindows[1]);
  const [note, setNote] = useState("");

  function updateQuantity(offeringId: string, quantity: number) {
    setFeaturedOfferingId(offeringId);
    setCart((currentCart) => {
      const nextCart = { ...currentCart };

      if (quantity <= 0) {
        delete nextCart[offeringId];
        return nextCart;
      }

      nextCart[offeringId] = quantity;
      return nextCart;
    });
  }

  function addOffering(offeringId: string) {
    setFeaturedOfferingId(offeringId);
    setCart((currentCart) => ({
      ...currentCart,
      [offeringId]: (currentCart[offeringId] ?? 0) + 1,
    }));
  }

  useEffect(() => {
    function handleGalleryAdd(event: Event) {
      const { offeringId } = (event as CustomEvent<{ offeringId: string }>).detail;

      if (offeringId) {
        addOffering(offeringId);
      }
    }

    window.addEventListener("flowers:add-to-cart", handleGalleryAdd);

    return () => {
      window.removeEventListener("flowers:add-to-cart", handleGalleryAdd);
    };
  }, []);

  const cartItems = useMemo(
    () =>
      flowerOfferings
        .map((offering) => ({
          offering,
          quantity: cart[offering.id] ?? 0,
        }))
        .filter((item) => item.quantity > 0),
    [cart]
  );

  const pricing = useMemo(() => {
    const baseDelivery = 12;
    const mileageFee = Math.max(0, distance ?? 0) * 2.25;
    const deliveryTotal = baseDelivery + mileageFee + deliveryOption.fee;
    const flowersTotal = cartItems.reduce(
      (total, item) => total + item.offering.price * item.quantity,
      0
    );
    const subtotal = flowersTotal + selectedCard.price;
    return {
      flowersTotal,
      subtotal,
      deliveryTotal,
      total: subtotal + deliveryTotal,
    };
  }, [cartItems, deliveryOption.fee, distance, selectedCard.price]);

  useEffect(() => {
    const deliveryAddress = address.trim();

    if (deliveryAddress.length < 8) {
      return;
    }

    let isCurrent = true;
    const timer = window.setTimeout(async () => {
      setIsCalculatingDistance(true);
      setDistanceError("");

      try {
        const query = encodeURIComponent(`${deliveryAddress}, Los Angeles, CA`);
        const geocodeResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${query}`
        );
        const geocodeResults = (await geocodeResponse.json()) as Array<{
          lat: string;
          lon: string;
        }>;
        const destination = geocodeResults[0];

        if (!destination) {
          throw new Error("Delivery estimate will be confirmed after checkout.");
        }

        const destinationCoords = {
          lat: Number(destination.lat),
          lon: Number(destination.lon),
        };
        const routeResponse = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${studio.lon},${studio.lat};${destinationCoords.lon},${destinationCoords.lat}?overview=false`
        );
        const route = (await routeResponse.json()) as {
          routes?: Array<{ distance: number }>;
        };
        const routeMeters = route.routes?.[0]?.distance;

        if (!isCurrent) {
          return;
        }

        if (routeMeters) {
          setDistance(Number((routeMeters / 1609.344).toFixed(1)));
          return;
        }

        const estimatedMiles = milesBetween(studio, destinationCoords) * 1.25;
        setDistance(Number(estimatedMiles.toFixed(1)));
      } catch (error) {
        if (!isCurrent) {
          return;
        }

        setDistance(null);
        setDistanceError(
          error instanceof Error
            ? error.message
            : "Delivery estimate will be confirmed after checkout."
        );
      } finally {
        if (isCurrent) {
          setIsCalculatingDistance(false);
        }
      }
    }, 750);

    return () => {
      isCurrent = false;
      window.clearTimeout(timer);
    };
  }, [address]);

  const mailtoBody = encodeURIComponent(
    [
      `Flowers: ${
        cartItems.length
          ? cartItems
              .map(
                (item) =>
                  `${item.quantity} x ${item.offering.name} (${currency(
                    item.offering.price * item.quantity
                  )})`
              )
              .join(", ")
          : "No bouquets selected"
      }`,
      `Card: ${selectedCard.name}`,
      `Delivery: ${deliveryOption.label}`,
      deliveryOption.id === "scheduled" && desiredDate
        ? `Desired date: ${desiredDate}`
        : "",
      `Drop-off window: ${dropOffWindow}`,
      `Address: ${address || "To be confirmed"}`,
      `Studio: ${studio.label}`,
      distance === null
        ? "Driving distance: Needs calculation"
        : `Driving distance: ${distance} miles`,
      `Estimated total: ${currency(pricing.total)}`,
      note ? `Gift note: ${note}` : "",
    ]
      .filter(Boolean)
      .join("\n")
  );

  return (
    <section
      id="order"
      className="paper-grain border-y-2 border-[#1b120c] bg-[#fff2df] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Order flowers"
          title="Build your cart, choose delivery, and send the request"
          description="A simple shop-style flow with live pricing based on bouquet, card choice, delivery timing, and delivery address."
        />

        <div className="mt-12 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
          <div className="min-w-0 space-y-6">
            <div>
              <h3 className="font-mono text-sm font-black uppercase tracking-[0.16em] text-[#344f20]">
                Select bouquets
              </h3>
              <div className="mt-4 max-w-full overflow-x-auto overscroll-x-contain pb-4">
                <div className="flex snap-x gap-4 pr-4">
                {flowerOfferings.map((offering) => {
                  const quantity = cart[offering.id] ?? 0;
                  const isSelected = offering.id === featuredOfferingId;

                  return (
                    <article
                      key={offering.id}
                      className={`w-[72vw] shrink-0 snap-start overflow-hidden border-2 bg-white transition sm:w-[42vw] lg:w-[calc((100%-3rem)/4)] ${
                        isSelected
                          ? "shadow-[7px_7px_0_#ed2b82]"
                          : "hover:shadow-[7px_7px_0_#f26a21]"
                      }`}
                      style={{ borderColor: isSelected ? offering.cardColor : "#1b120c" }}
                    >
                      <button
                        type="button"
                        onClick={() => addOffering(offering.id)}
                        className="relative block aspect-[5/4] w-full overflow-hidden border-b-4 bg-white"
                        style={{ borderColor: offering.cardColor }}
                      >
                        <div
                          className="pointer-events-none absolute inset-x-0 top-0 h-2"
                          style={{ backgroundColor: offering.cardColor }}
                        />
                        <Image
                          src={offering.cutoutImage}
                          alt={`${offering.name} bouquet`}
                          fill
                          sizes="310px"
                          className="sticker-image object-contain p-4"
                        />
                      </button>
                      <div className="p-4">
                        <span className="block">
                          <span className="flex min-h-10 items-end font-mono text-lg font-black uppercase leading-none text-[#1b120c]">
                            {offering.name}
                          </span>
                          <span className="mt-2 block font-mono text-base font-black text-[#ed2b82]">
                            {currency(offering.price)}
                          </span>
                        </span>
                        <span className="mt-2 line-clamp-2 block font-mono text-xs font-bold leading-5 text-[#344f20]">
                          {offering.description}
                        </span>
                        <div className="mt-4 space-y-3">
                          <button
                            type="button"
                            onClick={() => addOffering(offering.id)}
                            className="inline-flex min-h-11 w-full items-center justify-center border-2 border-[#1b120c] bg-[#ed2b82] px-5 py-2 font-mono text-xs font-black uppercase tracking-[0.08em] text-[#fff2df] shadow-[3px_3px_0_#1b120c] transition hover:-translate-y-0.5"
                          >
                            Add to cart
                          </button>
                          <div className="flex min-h-11 w-full items-center justify-between border-2 border-[#1b120c] bg-[#fff2df]">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(offering.id, quantity - 1)
                              }
                              className="flex h-10 w-10 items-center justify-center text-lg font-black text-[#1b120c]"
                              aria-label={`Decrease ${offering.name} quantity`}
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-mono text-sm font-black text-[#1b120c]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(offering.id, quantity + 1)
                              }
                              className="flex h-10 w-10 items-center justify-center text-lg font-black text-[#1b120c]"
                              aria-label={`Increase ${offering.name} quantity`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#344f20]">
                Add a card
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cardOptions.map((card) => {
                  const isSelected = card.name === selectedCard.name;

                  return (
                    <button
                      key={card.name}
                      type="button"
                      onClick={() => setSelectedCard(card)}
                    className={`border-2 bg-[#fff2df] p-4 text-left transition ${
                        isSelected
                          ? "border-[#344f20] shadow-[0_10px_24px_rgba(36,23,15,0.12)]"
                          : "border-[#1b120c] hover:border-[#1b120c]"
                      }`}
                    >
                      <span
                        className={`block h-24 rounded-[0.75rem] border-2 border-[#1b120c]/15 ${card.swatch}`}
                      >
                        <span className="flex h-full items-center justify-center px-4 text-center text-lg font-serif italic leading-6 text-[#3c372f]">
                          {card.name}
                        </span>
                      </span>
                      <span className="mt-4 flex items-start justify-between gap-3">
                        <span>
                          <span className="block font-mono text-lg font-black uppercase leading-none text-[#1b120c]">
                            {card.name}
                          </span>
                          <span className="mt-2 block text-xs font-black uppercase tracking-[0.14em] text-[#344f20]">
                            {card.tone}
                          </span>
                        </span>
                        <span className="text-sm font-black text-[#344f20]">
                          {card.price ? `+${currency(card.price)}` : "Free"}
                        </span>
                      </span>
                      <span className="mt-3 block text-sm font-medium leading-6 text-[#344f20]">
                        {card.message}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-2 border-[#1b120c] bg-[#fff2df] p-5 sm:p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#344f20]">
                Delivery details
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {deliveryOptions.map((option) => {
                  const isSelected = option.id === deliveryOption.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setDeliveryOption(option)}
                      className={`rounded-[0.8rem] border-2 p-4 text-left transition ${
                        isSelected
                          ? "border-[#344f20] bg-[#eef4e8]"
                          : "border-[#1b120c] bg-[#fff2df] hover:border-[#1b120c]"
                      }`}
                    >
                      <span className="block font-mono text-lg font-black uppercase leading-none text-[#1b120c]">
                        {option.label}
                      </span>
                      <span className="mt-2 block text-sm font-medium leading-5 text-[#344f20]">
                        {option.note}
                      </span>
                      <span className="mt-3 block text-sm font-black text-[#344f20]">
                        {option.fee ? `+${currency(option.fee)}` : "No rush fee"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#344f20]">
                    Delivery address
                  </span>
                  <input
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                      setDistance(null);
                      setDistanceError("");
                      setIsCalculatingDistance(false);
                    }}
                    placeholder="Street, city, zip"
                    className="mt-2 min-h-12 w-full rounded-[0.65rem] border-2 border-[#1b120c] bg-white px-4 text-sm font-medium text-[#1b120c] outline-none transition placeholder:text-[#9b9284] focus:border-[#1b120c]"
                  />
                  {isCalculatingDistance ? (
                    <span className="mt-2 block text-xs font-bold leading-5 text-[#344f20]">
                      Updating delivery estimate...
                    </span>
                  ) : null}
                  {distanceError ? (
                    <span className="mt-2 block text-xs font-bold leading-5 text-[#8a3737]">
                      {distanceError}
                    </span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#344f20]">
                    Drop-off time
                  </span>
                  <select
                    value={dropOffWindow}
                    onChange={(event) => setDropOffWindow(event.target.value)}
                    className="mt-2 min-h-12 w-full rounded-[0.65rem] border-2 border-[#1b120c] bg-white px-4 text-sm font-medium text-[#1b120c] outline-none transition focus:border-[#1b120c]"
                  >
                    {dropOffWindows.map((window) => (
                      <option key={window} value={window}>
                        {window}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {deliveryOption.id === "scheduled" ? (
                <label className="mt-4 block">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#344f20]">
                    Desired date
                  </span>
                  <input
                    value={desiredDate}
                    onChange={(event) => setDesiredDate(event.target.value)}
                    type="date"
                    className="mt-2 min-h-12 w-full rounded-[0.65rem] border-2 border-[#1b120c] bg-white px-4 text-sm font-medium text-[#1b120c] outline-none transition focus:border-[#1b120c]"
                  />
                </label>
              ) : null}

              <label className="mt-4 block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#344f20]">
                  Gift note
                </span>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Optional message for the recipient"
                  className="mt-2 w-full rounded-[0.65rem] border-2 border-[#1b120c] bg-white px-4 py-3 text-sm font-medium text-[#1b120c] outline-none transition placeholder:text-[#9b9284] focus:border-[#1b120c]"
                />
              </label>
            </div>
          </div>

          <aside className="h-fit border-2 border-[#1b120c] bg-[#fff2df] p-6 shadow-[7px_7px_0_#f26a21] lg:sticky lg:top-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#344f20]">
              Order summary
            </p>
            <h3 className="mt-4 font-mono text-3xl font-black uppercase leading-none text-[#1b120c]">
              Your flowers
            </h3>
            <p className="mt-3 text-sm font-bold leading-6 text-[#344f20]">
              {selectedCard.name === "No card"
                ? "No printed card"
                : `${selectedCard.name} card included`}
            </p>

            <div className="mt-6 space-y-3 text-sm font-bold text-[#3c372f]">
              {cartItems.length ? (
                cartItems.map((item) => (
                  <div
                    key={item.offering.id}
                    className="flex justify-between gap-4 border-b border-[#1b120c]/20 pb-3"
                  >
                    <span>
                      {item.quantity} x {item.offering.name}
                    </span>
                    <span>
                      {currency(item.offering.price * item.quantity)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex justify-between gap-4 border-b border-[#1b120c]/20 pb-3">
                  <span>No bouquets selected</span>
                  <span>{currency(0)}</span>
                </div>
              )}
              <div className="flex justify-between gap-4 border-b border-[#1b120c]/20 pb-3">
                <span>Card</span>
                <span>{selectedCard.price ? currency(selectedCard.price) : "Free"}</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1b120c]/20 pb-3">
                <span>{deliveryOption.label} delivery</span>
                <span>{currency(12 + deliveryOption.fee)}</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1b120c]/20 pb-3">
                <span>
                  {isCalculatingDistance ? "Estimating delivery" : "Address-based delivery"}
                </span>
                <span>
                  {distance === null ? "Pending" : currency(distance * 2.25)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <span className="text-sm font-black uppercase tracking-[0.16em] text-[#344f20]">
                Estimated total
              </span>
              <span className="text-4xl font-black leading-none text-[#1b120c]">
                {currency(pricing.total)}
              </span>
            </div>

            <a
              href={`mailto:hello@flowersbyaubrey.com?subject=Flower order request&body=${mailtoBody}`}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1b120c] px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#fff2df] transition hover:bg-[#344f20]"
            >
              Request This Order
            </a>
            <p className="mt-4 text-xs font-medium leading-5 text-[#344f20]">
              Final pricing is confirmed after address validation, stem
              availability, and delivery window approval.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
