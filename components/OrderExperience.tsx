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
    swatch: "bg-[#fffaf0]",
  },
  {
    name: "Blush",
    price: 8,
    tone: "Soft pink",
    message: "A warm blush card for a soft, romantic finish.",
    swatch: "bg-[#f2d7dd]",
  },
  {
    name: "Sage",
    price: 8,
    tone: "Muted green",
    message: "A calm sage card with an understated garden feel.",
    swatch: "bg-[#dce8c8]",
  },
  {
    name: "Cream",
    price: 10,
    tone: "Deckled cream",
    message: "A premium cream card with a more elevated paper texture.",
    swatch: "bg-[#f7ead5]",
  },
  {
    name: "Ivory",
    price: 8,
    tone: "Linen ivory",
    message: "A simple ivory card that works for almost any note.",
    swatch: "bg-[#f3efe7]",
  },
  {
    name: "Butter",
    price: 9,
    tone: "Pale yellow",
    message: "A pale yellow card for something bright and gentle.",
    swatch: "bg-[#f4e9b8]",
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
      className="border-y-2 border-[#171512] bg-[#fffaf0] px-5 py-20 sm:px-8 lg:px-12"
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
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#5f6f44]">
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
                      className={`w-[72vw] shrink-0 snap-start overflow-hidden rounded-[1rem] border-2 bg-[#fffdf8] transition sm:w-[42vw] lg:w-[calc((100%-3rem)/4)] ${
                        isSelected
                          ? "border-[#171512] shadow-[8px_8px_0_#dce8c8]"
                          : "border-[#e3d7c6] hover:border-[#171512]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => addOffering(offering.id)}
                        className="relative block aspect-[5/4] w-full bg-[#f3eadc]"
                      >
                        <Image
                          src={offering.image}
                          alt={`${offering.name} bouquet`}
                          fill
                          sizes="310px"
                          className="object-cover saturate-[1.06]"
                        />
                      </button>
                      <div className="p-4">
                        <span className="block">
                          <span className="flex min-h-10 items-end text-base font-black uppercase leading-none text-[#171512]">
                            {offering.name}
                          </span>
                          <span className="mt-2 block text-base font-black text-[#5f6f44]">
                            {currency(offering.price)}
                          </span>
                        </span>
                        <span className="mt-2 line-clamp-2 block text-sm font-medium leading-6 text-[#5d574f]">
                          {offering.description}
                        </span>
                        <div className="mt-4 space-y-3">
                          <button
                            type="button"
                            onClick={() => addOffering(offering.id)}
                            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#171512] px-5 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#fffaf0] transition hover:bg-[#354126]"
                          >
                            Add to cart
                          </button>
                          <div className="flex min-h-11 w-full items-center justify-between rounded-full border-2 border-[#171512] bg-[#fffaf0]">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(offering.id, quantity - 1)
                              }
                              className="flex h-10 w-10 items-center justify-center text-lg font-black text-[#171512]"
                              aria-label={`Decrease ${offering.name} quantity`}
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-black text-[#171512]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(offering.id, quantity + 1)
                              }
                              className="flex h-10 w-10 items-center justify-center text-lg font-black text-[#171512]"
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
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#5f6f44]">
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
                      className={`rounded-[1rem] border-2 bg-[#fffdf8] p-4 text-left transition ${
                        isSelected
                          ? "border-[#171512] shadow-[7px_7px_0_#f2d7dd]"
                          : "border-[#e3d7c6] hover:border-[#171512]"
                      }`}
                    >
                      <span
                        className={`block h-24 rounded-[0.75rem] border-2 border-[#171512]/15 ${card.swatch}`}
                      >
                        <span className="flex h-full items-center justify-center px-4 text-center text-lg font-serif italic leading-6 text-[#3c372f]">
                          {card.name}
                        </span>
                      </span>
                      <span className="mt-4 flex items-start justify-between gap-3">
                        <span>
                          <span className="block text-base font-black uppercase leading-none text-[#171512]">
                            {card.name}
                          </span>
                          <span className="mt-2 block text-xs font-black uppercase tracking-[0.14em] text-[#5f6f44]">
                            {card.tone}
                          </span>
                        </span>
                        <span className="text-sm font-black text-[#5f6f44]">
                          {card.price ? `+${currency(card.price)}` : "Free"}
                        </span>
                      </span>
                      <span className="mt-3 block text-sm font-medium leading-6 text-[#5d574f]">
                        {card.message}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[1rem] border-2 border-[#171512] bg-[#fffdf8] p-5 sm:p-6">
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#5f6f44]">
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
                          ? "border-[#171512] bg-[#f2d7dd]"
                          : "border-[#e3d7c6] bg-[#fffaf0] hover:border-[#171512]"
                      }`}
                    >
                      <span className="block text-base font-black uppercase leading-none text-[#171512]">
                        {option.label}
                      </span>
                      <span className="mt-2 block text-sm font-medium leading-5 text-[#5d574f]">
                        {option.note}
                      </span>
                      <span className="mt-3 block text-sm font-black text-[#5f6f44]">
                        {option.fee ? `+${currency(option.fee)}` : "No rush fee"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d574f]">
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
                    className="mt-2 min-h-12 w-full rounded-[0.65rem] border-2 border-[#d8ccb9] bg-white px-4 text-sm font-medium text-[#171512] outline-none transition placeholder:text-[#9b9284] focus:border-[#171512]"
                  />
                  {isCalculatingDistance ? (
                    <span className="mt-2 block text-xs font-bold leading-5 text-[#5f6f44]">
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
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d574f]">
                    Drop-off time
                  </span>
                  <select
                    value={dropOffWindow}
                    onChange={(event) => setDropOffWindow(event.target.value)}
                    className="mt-2 min-h-12 w-full rounded-[0.65rem] border-2 border-[#d8ccb9] bg-white px-4 text-sm font-medium text-[#171512] outline-none transition focus:border-[#171512]"
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
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d574f]">
                    Desired date
                  </span>
                  <input
                    value={desiredDate}
                    onChange={(event) => setDesiredDate(event.target.value)}
                    type="date"
                    className="mt-2 min-h-12 w-full rounded-[0.65rem] border-2 border-[#d8ccb9] bg-white px-4 text-sm font-medium text-[#171512] outline-none transition focus:border-[#171512]"
                  />
                </label>
              ) : null}

              <label className="mt-4 block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5d574f]">
                  Gift note
                </span>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Optional message for the recipient"
                  className="mt-2 w-full rounded-[0.65rem] border-2 border-[#d8ccb9] bg-white px-4 py-3 text-sm font-medium text-[#171512] outline-none transition placeholder:text-[#9b9284] focus:border-[#171512]"
                />
              </label>
            </div>
          </div>

          <aside className="h-fit rounded-[1rem] border-2 border-[#171512] bg-[#f2d7dd] p-6 shadow-[10px_10px_0_#171512] lg:sticky lg:top-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5f6f44]">
              Order summary
            </p>
            <h3 className="mt-4 text-3xl font-black uppercase leading-none text-[#171512]">
              Your flowers
            </h3>
            <p className="mt-3 text-sm font-bold leading-6 text-[#5d574f]">
              {selectedCard.name === "No card"
                ? "No printed card"
                : `${selectedCard.name} card included`}
            </p>

            <div className="mt-6 space-y-3 text-sm font-bold text-[#3c372f]">
              {cartItems.length ? (
                cartItems.map((item) => (
                  <div
                    key={item.offering.id}
                    className="flex justify-between gap-4 border-b border-[#171512]/20 pb-3"
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
                <div className="flex justify-between gap-4 border-b border-[#171512]/20 pb-3">
                  <span>No bouquets selected</span>
                  <span>{currency(0)}</span>
                </div>
              )}
              <div className="flex justify-between gap-4 border-b border-[#171512]/20 pb-3">
                <span>Card</span>
                <span>{selectedCard.price ? currency(selectedCard.price) : "Free"}</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#171512]/20 pb-3">
                <span>{deliveryOption.label} delivery</span>
                <span>{currency(12 + deliveryOption.fee)}</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#171512]/20 pb-3">
                <span>
                  {isCalculatingDistance ? "Estimating delivery" : "Address-based delivery"}
                </span>
                <span>
                  {distance === null ? "Pending" : currency(distance * 2.25)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <span className="text-sm font-black uppercase tracking-[0.16em] text-[#5d574f]">
                Estimated total
              </span>
              <span className="text-4xl font-black leading-none text-[#171512]">
                {currency(pricing.total)}
              </span>
            </div>

            <a
              href={`mailto:hello@flowersbyaubrey.com?subject=Flower order request&body=${mailtoBody}`}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#171512] px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#fffaf0] transition hover:bg-[#354126]"
            >
              Request This Order
            </a>
            <p className="mt-4 text-xs font-medium leading-5 text-[#5d574f]">
              Final pricing is confirmed after address validation, stem
              availability, and delivery window approval.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
