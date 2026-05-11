"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import {
  GooglePlacesAddressInput,
  type SelectedPlaceDetails,
} from "./GooglePlacesAddressInput";

type SelectedBouquet = {
  id: string;
  name: string;
  description: string;
  image?: string;
};

type SelectionState = {
  sizeId: keyof typeof SIZE_OPTIONS;
  vaseId: keyof typeof VASE_OPTIONS;
};

type MobileStep =
  | {
      kind: "size" | "vase";
      lineIndex: number;
    }
  | {
      kind: "delivery";
    };

type Coordinates = {
  lat: number;
  lng: number;
};

const SIZE_OPTIONS = {
  petite: {
    label: "Petite",
    dimensions: 'Approx: 8-10" wide, 10-12" tall',
    description:
      "A small, thoughtful arrangement perfect for a desk or side table",
    price: 75,
  },
  classic: {
    label: "Classic",
    dimensions: 'Approx: 10-12" wide, 12-14" tall',
    description: "A balanced, everyday bouquet with a full, elegant presence",
    price: 110,
  },
  signature: {
    label: "Signature",
    dimensions: 'Approx: 12-14" wide, 14-16" tall',
    description: "A lush, layered arrangement with noticeable impact",
    price: 160,
  },
  luxe: {
    label: "Luxe",
    dimensions: 'Approx: 14-18" wide, 16-20" tall',
    description: "A statement arrangement designed to stand out",
    price: 250,
  },
};

const VASE_OPTIONS = {
  wrapped: {
    label: "Wrapped bouquet",
    price: 0,
    note: undefined,
  },
  clearGlass: {
    label: "Clear glass vase",
    price: 25,
    note: undefined,
  },
  ceramic: {
    label: "Ceramic vase",
    price: 45,
    note: undefined,
  },
  antiqueJapanese: {
    label: "Antique Japanese vase",
    price: 90,
    note: "Limited availability. Final selection may vary.",
  },
};

const DELIVERY_TIME_WINDOWS = [
  "8am-11am",
  "11am-2pm",
  "2pm-5pm",
  "3pm-6pm",
];

const DEFAULT_SELECTION: SelectionState = {
  sizeId: "classic",
  vaseId: "wrapped",
};

const DELIVERY_ORIGIN = {
  label: "Aubrey Florals Studio",
  lat: 34.04872,
  lng: -118.45906,
};

const DELIVERY_TIERS = [
  {
    minMiles: 0,
    maxMiles: 3,
    fee: 15,
  },
  {
    minMiles: 3,
    maxMiles: 8,
    fee: 25,
  },
  {
    minMiles: 8,
    maxMiles: 15,
    fee: 40,
  },
];

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ARRANGEMENT_ACCESS_KEY;
const PRICING_DISCLAIMER =
  "This is an estimate. Final pricing may vary based on seasonal flower availability, vase availability, delivery requirements, and custom requests.";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function PriceEstimatePanel({
  selectedBouquets,
}: {
  selectedBouquets: SelectedBouquet[];
}) {
  const router = useRouter();
  const [selections, setSelections] = useState<Record<string, SelectionState>>({});
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTimeWindow, setDeliveryTimeWindow] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryPlace, setDeliveryPlace] =
    useState<SelectedPlaceDetails | null>(null);
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [occasion, setOccasion] = useState("");
  const [preferredColors, setPreferredColors] = useState("");
  const [flowerRequests, setFlowerRequests] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [showDeliveryWarning, setShowDeliveryWarning] = useState(false);
  const [showNameWarning, setShowNameWarning] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [mobileStepIndex, setMobileStepIndex] = useState(0);

  const bouquetLines = selectedBouquets.map((bouquet) => {
    const selection = selections[bouquet.id] ?? DEFAULT_SELECTION;
    const size = SIZE_OPTIONS[selection.sizeId];
    const vase = VASE_OPTIONS[selection.vaseId];
    const itemPrice = size.price + vase.price;

    return {
      bouquet,
      selection,
      size,
      vase,
      itemPrice,
    };
  });

  const bouquetSubtotal = bouquetLines.reduce(
    (total, line) => total + line.itemPrice,
    0
  );
  const deliveryEstimate = getDeliveryEstimate(deliveryPlace);
  const estimatedTotal =
    deliveryEstimate.status === "estimated"
      ? bouquetSubtotal + deliveryEstimate.fee
      : null;
  const mobileSteps: MobileStep[] = [
    ...bouquetLines.flatMap((_, lineIndex): MobileStep[] => [
      { kind: "size", lineIndex },
      { kind: "vase", lineIndex },
    ]),
    { kind: "delivery" },
  ];
  const activeMobileStep =
    mobileSteps[Math.min(mobileStepIndex, mobileSteps.length - 1)];
  const isFinalMobileStep = mobileStepIndex >= mobileSteps.length - 1;

  useEffect(() => {
    setMobileStepIndex((currentStep) =>
      Math.min(currentStep, Math.max(mobileSteps.length - 1, 0))
    );
  }, [mobileSteps.length]);

  const bouquetName =
    bouquetLines.map((line) => line.bouquet.name).join(", ") || "Custom Arrangement";
  const sizeSummary = bouquetLines
    .map(
      (line) =>
        `${line.bouquet.name}: ${line.size.label} (${line.size.dimensions})`
    )
    .join("; ");
  const vaseSummary = bouquetLines
    .map((line) => `${line.bouquet.name}: ${line.vase.label}`)
    .join("; ");

  function updateSelection(
    bouquetId: string,
    field: keyof SelectionState,
    value: SelectionState[keyof SelectionState]
  ) {
    setSelections((currentSelections) => ({
      ...currentSelections,
      [bouquetId]: {
        ...(currentSelections[bouquetId] ?? DEFAULT_SELECTION),
        [field]: value,
      },
    }));
  }

  async function handleRequestSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitStatus === "submitting") {
      return;
    }

    const trimmedName = customerName.trim();
    const trimmedEmail = customerEmail.trim();

    if (!trimmedName) {
      setShowNameWarning(true);
      return;
    }

    if (!trimmedEmail) {
      setShowEmailWarning(true);
      return;
    }

    setShowDeliveryWarning(!deliveryAddress.trim());

    if (!WEB3FORMS_ACCESS_KEY) {
      setSubmitStatus("error");
      setSubmitMessage(
        "This form is missing its Web3Forms access key. Add NEXT_PUBLIC_WEB3FORMS_ARRANGEMENT_ACCESS_KEY to the site environment."
      );
      return;
    }

    const arrangementDetails = bouquetLines
      .map(
        (line) =>
          `${line.bouquet.name}\nSize: ${line.size.label} (${line.size.dimensions})\nVase: ${line.vase.label}\nItem estimate: ${formatPrice(line.itemPrice)}`
      )
      .join("\n\n");

    const requestedDelivery =
      [deliveryDate, deliveryTimeWindow].filter(Boolean).join(", ") || "";

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Arrangement Request — ${bouquetName}`,
      from_name: trimmedName,
      replyto: trimmedEmail,
      name: trimmedName,
      email: trimmedEmail,
      phone: customerPhone.trim(),
      "Customer Name": trimmedName,
      "Customer Email": trimmedEmail,
      "Customer Phone": customerPhone.trim(),
      "Bouquet inspiration": bouquetName,
      "Arrangement details": arrangementDetails,
      "Selected size and dimensions": sizeSummary,
      "Vase selection": vaseSummary,
      "Estimated bouquet subtotal": formatPrice(bouquetSubtotal),
      "Arrangement Subtotal": formatPrice(bouquetSubtotal),
      "Delivery address": deliveryAddress.trim(),
      "Delivery Address": deliveryAddress.trim(),
      "Delivery formatted address":
        deliveryPlace?.formattedAddress || deliveryAddress.trim(),
      "Delivery place ID": deliveryPlace?.placeId || "",
      "Google Place ID": deliveryPlace?.placeId || "",
      "Delivery latitude": deliveryPlace?.latitude ?? "",
      "Delivery Latitude": deliveryPlace?.latitude ?? "",
      "Delivery longitude": deliveryPlace?.longitude ?? "",
      "Delivery Longitude": deliveryPlace?.longitude ?? "",
      "Estimated Delivery Distance":
        deliveryEstimate.distanceMiles !== null
          ? `${deliveryEstimate.distanceMiles.toFixed(1)} miles`
          : "Unavailable",
      "Estimated Delivery Fee":
        deliveryEstimate.status === "estimated"
          ? formatPrice(deliveryEstimate.fee)
          : deliveryEstimate.status === "custom"
            ? "Custom quote required"
            : "To be confirmed after address review",
      "Delivery Pricing Status": deliveryEstimate.label,
      "Estimated Total":
        estimatedTotal !== null
          ? formatPrice(estimatedTotal)
          : `Estimated total before delivery: ${formatPrice(bouquetSubtotal)}`,
      "Delivery notes": deliveryNotes.trim(),
      Occasion: occasion.trim(),
      "Preferred colors or tones": preferredColors.trim(),
      "Flowers to include/avoid": flowerRequests.trim(),
      "Card message": cardMessage.trim(),
      "Requested delivery date/time": requestedDelivery,
      "Pricing Disclaimer": PRICING_DISCLAIMER,
      Disclaimer: PRICING_DISCLAIMER,
      message: [
        "Customer:",
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Phone: ${customerPhone.trim() || "Not provided"}`,
        "",
        "Arrangement:",
        `Bouquet inspiration: ${bouquetName}`,
        arrangementDetails,
        `Estimated bouquet subtotal: ${formatPrice(bouquetSubtotal)}`,
        "",
        "Delivery:",
        `Address: ${deliveryAddress.trim()}`,
        `Formatted address: ${
          deliveryPlace?.formattedAddress || deliveryAddress.trim()
        }`,
        `Place ID: ${deliveryPlace?.placeId || "Not selected"}`,
        `Latitude: ${deliveryPlace?.latitude ?? "Not selected"}`,
        `Longitude: ${deliveryPlace?.longitude ?? "Not selected"}`,
        `Estimated delivery distance: ${
          deliveryEstimate.distanceMiles !== null
            ? `${deliveryEstimate.distanceMiles.toFixed(1)} miles`
            : "Unavailable"
        }`,
        `Estimated delivery fee: ${
          deliveryEstimate.status === "estimated"
            ? formatPrice(deliveryEstimate.fee)
            : deliveryEstimate.status === "custom"
              ? "Custom quote required"
              : "To be confirmed after address review"
        }`,
        `Delivery pricing status: ${deliveryEstimate.label}`,
        `Notes: ${deliveryNotes.trim()}`,
        "",
        "Pricing:",
        `Arrangement subtotal: ${formatPrice(bouquetSubtotal)}`,
        `Estimated total: ${
          estimatedTotal !== null
            ? formatPrice(estimatedTotal)
            : `Estimated total before delivery: ${formatPrice(bouquetSubtotal)}`
        }`,
        "",
        "Additional details:",
        `Occasion: ${occasion.trim()}`,
        `Preferred colors or tones: ${preferredColors.trim()}`,
        `Flowers to include/avoid: ${flowerRequests.trim()}`,
        `Card message: ${cardMessage.trim()}`,
        `Requested delivery date/time: ${requestedDelivery}`,
        "",
        PRICING_DISCLAIMER,
      ].join("\n"),
    };

    setSubmitStatus("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed.");
      }

      setSubmitStatus("success");
      router.push("/thank-you");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong sending your request. Please try again."
      );
    }
  }

  function showNextMobileStep() {
    if (isFinalMobileStep) {
      return;
    }

    setMobileStepIndex((currentStep) =>
      Math.min(currentStep + 1, mobileSteps.length - 1)
    );
  }

  function showPreviousMobileStep() {
    setMobileStepIndex((currentStep) => Math.max(currentStep - 1, 0));
  }

  return (
    <section
      id="price-estimate"
      className="mt-6 scroll-mt-24 sm:mt-20 sm:scroll-mt-28"
    >
      <form
        onSubmit={handleRequestSubmit}
        className="border-2 border-[#1b120c] bg-[#fff8eb] shadow-[8px_8px_0_#ed2b82] sm:p-8 lg:p-10"
      >
        <div className="p-1 sm:hidden">
          {!selectedBouquets.length ? (
            <>
              <MobileEstimateHeader />
              <div className="mt-6 border-2 border-dashed border-[#344f20] bg-white px-5 py-8 text-center font-mono text-sm font-black uppercase tracking-[0.06em] text-[#344f20]">
                Select one or more bouquets to estimate pricing.
              </div>
            </>
          ) : (
            <div className="flex h-[85svh] min-h-[560px] flex-col overflow-hidden">
              <MobileEstimateHeader />

              <div className="mt-1 flex items-center justify-between gap-3 border-y-2 border-[#1b120c] py-1 font-mono text-[clamp(10px,1.25svh,14px)] font-black uppercase tracking-[0.08em] text-[#344f20]">
                <span>
                  Step {mobileStepIndex + 1} / {mobileSteps.length}
                </span>
                <span>{formatPrice(bouquetSubtotal)}</span>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden py-1">
                {activeMobileStep?.kind === "size" ? (
                  <MobileBouquetStep
                    line={bouquetLines[activeMobileStep.lineIndex]}
                    stepLabel="Choose size"
                  >
                    <div className="grid h-full grid-cols-2 grid-rows-2 gap-2">
                      {Object.entries(SIZE_OPTIONS).map(([sizeId, size]) => (
                        <label
                          key={sizeId}
                          className={`flex cursor-pointer border-2 p-2 transition ${
                            bouquetLines[activeMobileStep.lineIndex].selection
                              .sizeId === sizeId
                              ? "border-[#ed2b82] bg-[#fff2df]"
                              : "border-[#1b120c] bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`${bouquetLines[activeMobileStep.lineIndex].bouquet.id}-mobile-size`}
                            value={sizeId}
                            checked={
                              bouquetLines[activeMobileStep.lineIndex].selection
                                .sizeId === sizeId
                            }
                            onChange={() =>
                              updateSelection(
                                bouquetLines[activeMobileStep.lineIndex].bouquet.id,
                                "sizeId",
                                sizeId as keyof typeof SIZE_OPTIONS
                              )
                            }
                            className="sr-only"
                          />
                          <span className="flex h-full flex-col justify-between gap-1">
                            <span>
                              <span className="block font-mono text-[clamp(13px,1.95svh,24px)] font-black uppercase leading-none text-[#1b120c]">
                                {size.label}
                              </span>
                              <span className="mt-1 block font-mono text-[clamp(11px,1.65svh,20px)] font-bold leading-tight text-[#344f20]">
                                {size.dimensions}
                              </span>
                              <span className="mt-1 hidden font-mono text-[clamp(10px,1.25svh,15px)] font-bold leading-tight text-[#344f20] [@media(min-height:720px)]:block">
                                {size.description}
                              </span>
                            </span>
                            <span className="font-mono text-[clamp(18px,2.6svh,34px)] font-black leading-none text-[#ed2b82]">
                              {formatPrice(size.price)}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </MobileBouquetStep>
                ) : null}

                {activeMobileStep?.kind === "vase" ? (
                  <MobileBouquetStep
                    line={bouquetLines[activeMobileStep.lineIndex]}
                    stepLabel="Choose presentation"
                  >
                    <div className="grid h-full grid-cols-2 grid-rows-2 gap-2">
                      {Object.entries(VASE_OPTIONS).map(([vaseId, vase]) => (
                        <label
                          key={vaseId}
                          className={`flex cursor-pointer border-2 p-2 transition ${
                            bouquetLines[activeMobileStep.lineIndex].selection
                              .vaseId === vaseId
                              ? "border-[#ed2b82] bg-[#fff2df]"
                              : "border-[#1b120c] bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`${bouquetLines[activeMobileStep.lineIndex].bouquet.id}-mobile-vase`}
                            value={vaseId}
                            checked={
                              bouquetLines[activeMobileStep.lineIndex].selection
                                .vaseId === vaseId
                            }
                            onChange={() =>
                              updateSelection(
                                bouquetLines[activeMobileStep.lineIndex].bouquet.id,
                                "vaseId",
                                vaseId as keyof typeof VASE_OPTIONS
                              )
                            }
                            className="sr-only"
                          />
                          <span className="flex h-full flex-col justify-between gap-1">
                            <span>
                              <span className="block font-mono text-[clamp(13px,1.95svh,24px)] font-black uppercase leading-tight text-[#1b120c]">
                                {vase.label}
                              </span>
                              {vase.note ? (
                                <span className="mt-1 block font-mono text-[clamp(10px,1.3svh,15px)] font-bold leading-tight text-[#344f20]">
                                  {vase.note}
                                </span>
                              ) : null}
                            </span>
                            <span className="font-mono text-[clamp(18px,2.6svh,34px)] font-black leading-none text-[#ed2b82]">
                              {vase.price ? `+${formatPrice(vase.price)}` : "$0"}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </MobileBouquetStep>
                ) : null}

                {activeMobileStep?.kind === "delivery" ? (
                  <div className="h-full overflow-y-auto border-2 border-[#1b120c] bg-white p-2">
                    <div className="grid gap-1.5">
                      <label>
                        <span className="font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[#344f20]">
                          Your Name
                        </span>
                        <input
                          type="text"
                          name="customerName"
                          required
                          value={customerName}
                          onChange={(event) => {
                            setCustomerName(event.target.value);
                            if (event.target.value.trim()) {
                              setShowNameWarning(false);
                            }
                          }}
                          placeholder="Your name"
                          className="mt-1 min-h-9 w-full border-2 border-[#1b120c] bg-[#fff8eb] px-2 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                        />
                      </label>
                      {showNameWarning ? (
                        <p className="font-mono text-[9px] font-bold leading-3 text-[#ed2b82]">
                          Please add your name before requesting.
                        </p>
                      ) : null}
                      <div className="grid grid-cols-2 gap-2">
                        <label className="min-w-0">
                          <span className="font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[#344f20]">
                            Email
                          </span>
                          <input
                            type="email"
                            name="customerEmail"
                            required
                            value={customerEmail}
                            onChange={(event) => {
                              setCustomerEmail(event.target.value);
                              if (event.target.value.trim()) {
                                setShowEmailWarning(false);
                              }
                            }}
                            placeholder="Email"
                            className="mt-1 min-h-9 w-full border-2 border-[#1b120c] bg-[#fff8eb] px-2 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                          />
                        </label>
                        <label className="min-w-0">
                          <span className="font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[#344f20]">
                            Phone
                          </span>
                          <input
                            type="tel"
                            name="customerPhone"
                            value={customerPhone}
                            onChange={(event) => setCustomerPhone(event.target.value)}
                            placeholder="Optional"
                            className="mt-1 min-h-9 w-full border-2 border-[#1b120c] bg-[#fff8eb] px-2 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                          />
                        </label>
                      </div>
                      {showEmailWarning ? (
                        <p className="font-mono text-[9px] font-bold leading-3 text-[#ed2b82]">
                          Please add your email so Aubrey can reply.
                        </p>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-xl font-black uppercase leading-none text-[#1b120c]">
                      Delivery
                    </h3>
                    <div className="mt-2 grid gap-1.5">
                      <div className="grid grid-cols-2 gap-2">
                        <label className="min-w-0">
                          <span className="font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[#344f20]">
                            Desired date
                          </span>
                          <input
                            type="date"
                            name="deliveryDate"
                            value={deliveryDate}
                            onChange={(event) => setDeliveryDate(event.target.value)}
                            className="mt-1 h-11 w-full appearance-none border-2 border-[#1b120c] bg-[#fff8eb] px-2 font-mono text-base font-bold leading-none text-[#1b120c] outline-none focus:border-[#ed2b82]"
                          />
                        </label>
                        <label className="min-w-0">
                          <span className="font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[#344f20]">
                            Time window
                          </span>
                          <select
                            name="deliveryTimeWindow"
                            value={deliveryTimeWindow}
                            onChange={(event) =>
                              setDeliveryTimeWindow(event.target.value)
                            }
                            className="mt-1 h-11 w-full appearance-none border-2 border-[#1b120c] bg-[#fff8eb] px-2 font-mono text-base font-bold leading-none text-[#1b120c] outline-none focus:border-[#ed2b82]"
                          >
                            <option value="">Select</option>
                            {DELIVERY_TIME_WINDOWS.map((timeWindow) => (
                              <option key={timeWindow} value={timeWindow}>
                                {timeWindow}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <label>
                        <span className="font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[#344f20]">
                          Delivery address
                        </span>
                        <GooglePlacesAddressInput
                          value={deliveryAddress}
                          onChange={(value) => {
                            setDeliveryAddress(value);
                            if (value.trim()) {
                              setShowDeliveryWarning(false);
                            }
                          }}
                          onPlaceSelect={setDeliveryPlace}
                          placeholder="Street address, city"
                          className="mt-1 min-h-9 w-full border-2 border-[#1b120c] bg-[#fff8eb] px-2 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                        />
                      </label>
                      {showDeliveryWarning ? (
                        <p className="font-mono text-[9px] font-bold leading-3 text-[#ed2b82]">
                          You can still request this arrangement without an
                          address. Aubrey will confirm delivery details.
                        </p>
                      ) : null}
                      <DeliveryEstimateCard
                        deliveryEstimate={deliveryEstimate}
                        compact
                      />
                      <label>
                        <span className="font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[#344f20]">
                          Delivery notes
                        </span>
                        <textarea
                          value={deliveryNotes}
                          onChange={(event) => setDeliveryNotes(event.target.value)}
                          rows={2}
                          placeholder="Gate code, timing, handoff notes"
                          className="mt-1 w-full resize-none border-2 border-[#1b120c] bg-[#fff8eb] px-2 py-1.5 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                        />
                      </label>
                      <label>
                        <span className="font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[#344f20]">
                          Extra details
                        </span>
                        <textarea
                          value={occasion}
                          onChange={(event) => setOccasion(event.target.value)}
                          rows={2}
                          placeholder="Occasion, colors, flowers, card message"
                          className="mt-1 w-full resize-none border-2 border-[#1b120c] bg-[#fff8eb] px-2 py-1.5 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                        />
                      </label>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="border-t-2 border-[#1b120c] bg-[#fff8eb] pt-1.5">
                <div className="mb-1 font-mono text-[9px] font-bold leading-3 text-[#344f20]">
                  Final pricing confirmed after review. Estimate may vary.
                </div>
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={showPreviousMobileStep}
                    disabled={mobileStepIndex === 0}
                    className="min-h-9 border-2 border-[#1b120c] bg-white px-3 font-mono text-[10px] font-black uppercase tracking-[0.08em] text-[#344f20] disabled:opacity-40"
                  >
                    Back
                  </button>
                  <div className="text-right">
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.08em] text-[#344f20]">
                      {estimatedTotal !== null ? "Estimated total" : "Before delivery"}
                    </p>
                    <p className="text-xl font-black text-[#ed2b82]">
                      {formatPrice(estimatedTotal ?? bouquetSubtotal)}
                    </p>
                    {deliveryEstimate.status === "estimated" ? (
                      <p className="font-mono text-[8px] font-black uppercase tracking-[0.06em] text-[#344f20]">
                        Delivery {formatPrice(deliveryEstimate.fee)}
                      </p>
                    ) : null}
                  </div>
                  {isFinalMobileStep ? (
                    <button
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className={`inline-flex min-h-9 items-center justify-center border-2 border-[#1b120c] px-3 text-center font-mono text-[9px] font-black uppercase tracking-[0.08em] shadow-[3px_3px_0_#1b120c] ${
                        customerName.trim() && customerEmail.trim()
                          ? "bg-[#ed2b82] text-[#fff2df]"
                          : "bg-white text-[#344f20] opacity-70"
                      }`}
                    >
                      {submitStatus === "submitting"
                        ? "Sending..."
                        : "Request This Arrangement"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={showNextMobileStep}
                      className="min-h-9 border-2 border-[#1b120c] bg-[#ed2b82] px-4 font-mono text-[10px] font-black uppercase tracking-[0.08em] text-[#fff2df] shadow-[3px_3px_0_#1b120c]"
                    >
                      Next
                    </button>
                  )}
                </div>
                {submitMessage ? (
                  <p
                    className={`mt-2 font-mono text-[10px] font-bold leading-4 ${
                      submitStatus === "success"
                        ? "text-[#344f20]"
                        : "text-[#ed2b82]"
                    }`}
                  >
                    {submitMessage}
                  </p>
                ) : null}
              </div>
            </div>
          )}
        </div>

        <div className="hidden sm:block">
        <div className="max-w-3xl">
          <p className="inline-block bg-[#ed2b82] px-3 py-1 font-mono text-xs font-black uppercase tracking-[0.08em] text-[#fff2df]">
            Estimate
          </p>
          <h2 className="mt-4 text-4xl font-black uppercase leading-none text-[#344f20] sm:text-6xl">
            Estimate Your Arrangement
          </h2>
          <p className="mt-4 font-mono text-sm font-bold leading-7 text-[#344f20] sm:text-base">
            Select a size and presentation style for each bouquet. This helps
            Aubrey prepare a thoughtful quote before confirming your order.
          </p>
        </div>

        {!selectedBouquets.length ? (
          <div className="mt-8 border-2 border-dashed border-[#344f20] bg-white px-5 py-8 text-center font-mono text-sm font-black uppercase tracking-[0.06em] text-[#344f20]">
            Select one or more bouquets to estimate pricing.
          </div>
        ) : (
          <>
            <div className="mt-10 space-y-6">
              {bouquetLines.map((line) => (
                <article
                  key={line.bouquet.id}
                  className="grid gap-5 border-2 border-[#1b120c] bg-white p-4 shadow-[5px_5px_0_#c7da38] sm:grid-cols-[140px_minmax(0,1fr)] sm:p-5 lg:grid-cols-[180px_minmax(0,1fr)_auto]"
                >
                  {line.bouquet.image ? (
                    <div className="relative aspect-[4/5] overflow-hidden border-2 border-[#1b120c] bg-[#fff2df]">
                      <Image
                        src={line.bouquet.image}
                        alt={line.bouquet.name}
                        fill
                        sizes="(min-width: 1024px) 180px, 140px"
                        className="object-contain"
                      />
                    </div>
                  ) : null}

                  <div className="min-w-0">
                    <h3 className="text-2xl font-black uppercase leading-none text-[#1b120c]">
                      {line.bouquet.name}
                    </h3>
                    <p className="mt-3 font-mono text-sm font-bold leading-6 text-[#344f20]">
                      {line.bouquet.description}
                    </p>

                    <fieldset className="mt-6">
                      <legend className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#1b120c]">
                        Size
                      </legend>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {Object.entries(SIZE_OPTIONS).map(([sizeId, size]) => (
                          <label
                            key={sizeId}
                            className={`cursor-pointer border-2 p-3 transition ${
                              line.selection.sizeId === sizeId
                                ? "border-[#ed2b82] bg-[#fff2df]"
                                : "border-[#1b120c] bg-white hover:bg-[#fff8eb]"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`${line.bouquet.id}-size`}
                              value={sizeId}
                              checked={line.selection.sizeId === sizeId}
                              onChange={() =>
                                updateSelection(
                                  line.bouquet.id,
                                  "sizeId",
                                  sizeId as keyof typeof SIZE_OPTIONS
                                )
                              }
                              className="sr-only"
                            />
                            <span className="block font-mono text-sm font-black uppercase text-[#1b120c]">
                              {size.label}
                            </span>
                            <span className="mt-1 block font-mono text-xs font-bold leading-5 text-[#344f20]">
                              {size.dimensions}
                            </span>
                            <span className="mt-2 block font-mono text-xs font-bold leading-5 text-[#344f20]">
                              {size.description}
                            </span>
                            <span className="mt-2 block font-mono text-xs font-black text-[#ed2b82]">
                              {formatPrice(size.price)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset className="mt-6">
                      <legend className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#1b120c]">
                        Presentation
                      </legend>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {Object.entries(VASE_OPTIONS).map(([vaseId, vase]) => (
                          <label
                            key={vaseId}
                            className={`cursor-pointer border-2 p-3 transition ${
                              line.selection.vaseId === vaseId
                                ? "border-[#ed2b82] bg-[#fff2df]"
                                : "border-[#1b120c] bg-white hover:bg-[#fff8eb]"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`${line.bouquet.id}-vase`}
                              value={vaseId}
                              checked={line.selection.vaseId === vaseId}
                              onChange={() =>
                                updateSelection(
                                  line.bouquet.id,
                                  "vaseId",
                                  vaseId as keyof typeof VASE_OPTIONS
                                )
                              }
                              className="sr-only"
                            />
                            <span className="block font-mono text-sm font-black uppercase text-[#1b120c]">
                              {vase.label}
                            </span>
                            <span className="mt-2 block font-mono text-xs font-black text-[#ed2b82]">
                              {vase.price ? `+${formatPrice(vase.price)}` : "$0"}
                            </span>
                            {vase.note ? (
                              <span className="mt-2 block font-mono text-xs font-bold leading-5 text-[#344f20]">
                                {vase.note}
                              </span>
                            ) : null}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div className="flex items-center justify-between border-t-2 border-[#1b120c] pt-4 lg:min-w-36 lg:flex-col lg:items-end lg:justify-start lg:border-l-2 lg:border-t-0 lg:pl-5 lg:pt-0">
                    <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                      Item price
                    </span>
                    <span className="text-3xl font-black text-[#ed2b82]">
                      {formatPrice(line.itemPrice)}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="border-2 border-[#1b120c] bg-white p-5 shadow-[5px_5px_0_#f26a21]">
                <div className="grid gap-4">
                  <label className="block">
                    <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                      Your Name
                    </span>
                    <input
                      type="text"
                      name="customerName"
                      required
                      value={customerName}
                      onChange={(event) => {
                        setCustomerName(event.target.value);
                        if (event.target.value.trim()) {
                          setShowNameWarning(false);
                        }
                      }}
                      placeholder="Your name"
                      className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-[#fff8eb] px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                    />
                    {showNameWarning ? (
                      <span className="mt-2 block font-mono text-xs font-bold leading-5 text-[#ed2b82]">
                        Please add your name before requesting.
                      </span>
                    ) : null}
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                        Email
                      </span>
                      <input
                        type="email"
                        name="customerEmail"
                        required
                        value={customerEmail}
                        onChange={(event) => {
                          setCustomerEmail(event.target.value);
                          if (event.target.value.trim()) {
                            setShowEmailWarning(false);
                          }
                        }}
                        placeholder="you@example.com"
                        className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-[#fff8eb] px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                      />
                      {showEmailWarning ? (
                        <span className="mt-2 block font-mono text-xs font-bold leading-5 text-[#ed2b82]">
                          Please add your email so Aubrey can reply.
                        </span>
                      ) : null}
                    </label>
                    <label className="block">
                      <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                        Phone
                      </span>
                      <input
                        type="tel"
                        name="customerPhone"
                        value={customerPhone}
                        onChange={(event) => setCustomerPhone(event.target.value)}
                        placeholder="Optional"
                        className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-[#fff8eb] px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                      />
                    </label>
                  </div>
                </div>
                <h3 className="mt-6 text-3xl font-black uppercase leading-none text-[#1b120c]">
                  Delivery
                </h3>
                <p className="mt-3 font-mono text-sm font-bold leading-6 text-[#344f20]">
                  Enter the delivery address and Aubrey will confirm
                  availability and delivery pricing.
                </p>
                <div className="mt-5 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                        Desired delivery date
                      </span>
                      <input
                        type="date"
                        name="deliveryDate"
                        value={deliveryDate}
                        onChange={(event) => setDeliveryDate(event.target.value)}
                        className="mt-2 h-12 w-full appearance-none border-2 border-[#1b120c] bg-[#fff8eb] px-3 font-mono text-base font-bold leading-none text-[#1b120c] outline-none focus:border-[#ed2b82]"
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                        Time window
                      </span>
                      <select
                        name="deliveryTimeWindow"
                        value={deliveryTimeWindow}
                        onChange={(event) =>
                          setDeliveryTimeWindow(event.target.value)
                        }
                        className="mt-2 h-12 w-full appearance-none border-2 border-[#1b120c] bg-[#fff8eb] px-3 font-mono text-base font-bold leading-none text-[#1b120c] outline-none focus:border-[#ed2b82]"
                      >
                        <option value="">Select a window</option>
                        {DELIVERY_TIME_WINDOWS.map((timeWindow) => (
                          <option key={timeWindow} value={timeWindow}>
                            {timeWindow}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                      Delivery address
                    </span>
                    <GooglePlacesAddressInput
                      value={deliveryAddress}
                      onChange={(value) => {
                        setDeliveryAddress(value);
                        if (value.trim()) {
                          setShowDeliveryWarning(false);
                        }
                      }}
                      onPlaceSelect={setDeliveryPlace}
                      placeholder="Street address, city"
                      className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-[#fff8eb] px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                    />
                  </label>
                  {showDeliveryWarning || !deliveryAddress.trim() ? (
                    <p className="font-mono text-xs font-bold leading-5 text-[#ed2b82]">
                      You can still request this arrangement without an address.
                      Aubrey will confirm delivery details.
                    </p>
                  ) : null}
                  <DeliveryEstimateCard deliveryEstimate={deliveryEstimate} />

                  <label className="block">
                    <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                      Delivery notes
                    </span>
                    <textarea
                      value={deliveryNotes}
                      onChange={(event) => setDeliveryNotes(event.target.value)}
                      rows={4}
                      placeholder="Gate code, timing, handoff notes"
                      className="mt-2 w-full resize-y border-2 border-[#1b120c] bg-[#fff8eb] px-3 py-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                        Occasion
                      </span>
                      <input
                        type="text"
                        value={occasion}
                        onChange={(event) => setOccasion(event.target.value)}
                        placeholder="Birthday, dinner, just because"
                        className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-[#fff8eb] px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                        Preferred colors
                      </span>
                      <input
                        type="text"
                        value={preferredColors}
                        onChange={(event) => setPreferredColors(event.target.value)}
                        placeholder="Soft pinks, citrus, moody"
                        className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-[#fff8eb] px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                      Flowers to include/avoid
                    </span>
                    <input
                      type="text"
                      value={flowerRequests}
                      onChange={(event) => setFlowerRequests(event.target.value)}
                      placeholder="Favorites, allergies, no lilies, etc."
                      className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-[#fff8eb] px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                      Card message
                    </span>
                    <textarea
                      value={cardMessage}
                      onChange={(event) => setCardMessage(event.target.value)}
                      rows={3}
                      placeholder="Optional message for an enclosure card"
                      className="mt-2 w-full resize-y border-2 border-[#1b120c] bg-[#fff8eb] px-3 py-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
                    />
                  </label>
                </div>
              </div>

              <aside className="border-2 border-[#1b120c] bg-[#344f20] p-5 text-[#fff2df] shadow-[5px_5px_0_#ed2b82]">
                <h3 className="text-3xl font-black uppercase leading-none">
                  Summary
                </h3>
                <div className="mt-6 space-y-4 font-mono text-sm font-black uppercase tracking-[0.06em]">
                  <div className="flex items-center justify-between gap-4">
                    <span>Arrangement subtotal</span>
                    <span>{formatPrice(bouquetSubtotal)}</span>
                  </div>
                  <p className="font-mono text-[11px] font-bold normal-case leading-5 tracking-normal text-[#fff2df]/80">
                    Vase add-ons are included in the arrangement subtotal.
                  </p>
                  <div className="flex items-center justify-between gap-4 border-t border-[#fff2df]/50 pt-4">
                    <span>Estimated delivery</span>
                    <span>
                      {deliveryEstimate.status === "estimated"
                        ? formatPrice(deliveryEstimate.fee)
                        : deliveryEstimate.status === "custom"
                          ? "Custom"
                          : "Review"}
                    </span>
                  </div>
                  <div className="border-t border-[#fff2df]/50 pt-4">
                    {estimatedTotal !== null ? (
                      <div className="flex items-center justify-between gap-4 text-[#c7da38]">
                        <span>Estimated total</span>
                        <span>{formatPrice(estimatedTotal)}</span>
                      </div>
                    ) : (
                      <div className="space-y-2 text-[#c7da38]">
                        <div className="flex items-center justify-between gap-4">
                          <span>Before delivery</span>
                          <span>{formatPrice(bouquetSubtotal)}</span>
                        </div>
                        <p className="normal-case leading-6 tracking-normal">
                          Delivery pricing will be confirmed after address
                          review.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-[#fff2df]/50 pt-4">
                    <p className="leading-6 text-[#fff2df]/90">
                      Final pricing confirmed after review.
                    </p>
                  </div>
                </div>

                <p className="mt-6 font-mono text-xs font-bold leading-5 text-[#fff2df]/85">
                  {PRICING_DISCLAIMER}
                </p>

                {submitMessage ? (
                  <p
                    className={`mt-5 border border-[#fff2df]/40 p-3 font-mono text-xs font-bold leading-5 ${
                      submitStatus === "success"
                        ? "text-[#c7da38]"
                        : "text-[#fff2df]"
                    }`}
                  >
                    {submitMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  className={`mt-7 inline-flex min-h-12 w-full items-center justify-center border-2 border-[#1b120c] px-5 text-center font-mono text-xs font-black uppercase tracking-[0.08em] shadow-[4px_4px_0_#1b120c] transition hover:-translate-y-0.5 ${
                    customerName.trim() && customerEmail.trim()
                      ? "bg-[#ed2b82] text-[#fff2df]"
                      : "bg-white text-[#344f20] opacity-70"
                  }`}
                >
                  {submitStatus === "submitting"
                    ? "Sending..."
                    : "Request This Arrangement"}
                </button>
              </aside>
            </div>
          </>
        )}
        </div>
      </form>
    </section>
  );
}

function MobileEstimateHeader() {
  return (
    <div>
      <p className="inline-block bg-[#ed2b82] px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-[0.08em] text-[#fff2df]">
        Estimate
      </p>
      <h2 className="mt-1 text-2xl font-black uppercase leading-none text-[#344f20]">
        Estimate Your Arrangement
      </h2>
      <p className="mt-1 font-mono text-[10px] font-bold leading-3 text-[#344f20]">
        Choose size, presentation, and delivery.
      </p>
    </div>
  );
}

function MobileBouquetStep({
  line,
  stepLabel,
  children,
}: {
  line: {
    bouquet: SelectedBouquet;
    size: (typeof SIZE_OPTIONS)[keyof typeof SIZE_OPTIONS];
    itemPrice: number;
  };
  stepLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col border-2 border-[#1b120c] bg-white p-2">
      <div className="grid grid-cols-[56px_minmax(0,1fr)] gap-2">
        {line.bouquet.image ? (
          <div className="relative h-16 overflow-hidden border-2 border-[#1b120c] bg-[#fff2df]">
            <Image
              src={line.bouquet.image}
              alt={line.bouquet.name}
              fill
              sizes="72px"
              className="object-contain"
            />
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="font-mono text-[clamp(9px,1.15svh,12px)] font-black uppercase tracking-[0.12em] text-[#ed2b82]">
            {stepLabel}
          </p>
          <h3 className="mt-0.5 text-[clamp(16px,2.2svh,24px)] font-black uppercase leading-none text-[#1b120c]">
            {line.bouquet.name}
          </h3>
          <p className="mt-1 line-clamp-1 font-mono text-[clamp(9px,1.15svh,12px)] font-bold leading-tight text-[#344f20]">
            {line.bouquet.description}
          </p>
          <p className="mt-1 font-mono text-[clamp(10px,1.3svh,14px)] font-black text-[#ed2b82]">
            Item: {formatPrice(line.itemPrice)}
          </p>
        </div>
      </div>
      <div className="mt-2 min-h-0 flex-1">{children}</div>
    </div>
  );
}

type DeliveryEstimate =
  | {
      status: "estimated";
      label: string;
      distanceMiles: number;
      fee: number;
    }
  | {
      status: "custom";
      label: string;
      distanceMiles: number;
      fee: null;
    }
  | {
      status: "unavailable";
      label: string;
      distanceMiles: null;
      fee: null;
    };

function DeliveryEstimateCard({
  deliveryEstimate,
  compact = false,
}: {
  deliveryEstimate: DeliveryEstimate;
  compact?: boolean;
}) {
  const textSize = compact ? "text-[9px] leading-3" : "text-xs leading-5";
  const padding = compact ? "p-2" : "p-3";

  if (deliveryEstimate.status === "estimated") {
    return (
      <div
        className={`border-2 border-[#1b120c] bg-[#fff2df] ${padding} font-mono font-bold text-[#344f20]`}
      >
        <p
          className={`font-black uppercase tracking-[0.08em] text-[#1b120c] ${textSize}`}
        >
          Delivery estimate
        </p>
        <div className={`mt-1 grid gap-1 ${textSize}`}>
          <p>
            Estimated distance: {deliveryEstimate.distanceMiles.toFixed(1)} miles
          </p>
          <p>Estimated delivery: {formatPrice(deliveryEstimate.fee)}</p>
        </div>
      </div>
    );
  }

  if (deliveryEstimate.status === "custom") {
    return (
      <div
        className={`border-2 border-[#1b120c] bg-[#fff2df] ${padding} font-mono font-bold text-[#344f20]`}
      >
        <p
          className={`font-black uppercase tracking-[0.08em] text-[#1b120c] ${textSize}`}
        >
          Delivery estimate
        </p>
        <p className={`mt-1 ${textSize}`}>Custom delivery quote required.</p>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-[#1b120c] bg-[#fff2df] ${padding} font-mono font-bold text-[#344f20]`}
    >
      <p
        className={`font-black uppercase tracking-[0.08em] text-[#1b120c] ${textSize}`}
      >
        Delivery estimate
      </p>
      <p className={`mt-1 ${textSize}`}>
        Delivery pricing will be confirmed after Aubrey reviews the address.
      </p>
    </div>
  );
}

function getDeliveryEstimate(
  deliveryPlace: SelectedPlaceDetails | null
): DeliveryEstimate {
  if (
    deliveryPlace?.latitude === null ||
    deliveryPlace?.longitude === null ||
    deliveryPlace?.latitude === undefined ||
    deliveryPlace?.longitude === undefined
  ) {
    return {
      status: "unavailable",
      label: "Delivery pricing will be confirmed after address review.",
      distanceMiles: null,
      fee: null,
    };
  }

  const distanceMiles = calculateDistanceMiles(
    {
      lat: DELIVERY_ORIGIN.lat,
      lng: DELIVERY_ORIGIN.lng,
    },
    {
      lat: deliveryPlace.latitude,
      lng: deliveryPlace.longitude,
    }
  );
  const tier = DELIVERY_TIERS.find(
    (deliveryTier) =>
      distanceMiles >= deliveryTier.minMiles &&
      distanceMiles <= deliveryTier.maxMiles
  );

  if (!tier) {
    return {
      status: "custom",
      label: "Custom delivery quote required.",
      distanceMiles,
      fee: null,
    };
  }

  return {
    status: "estimated",
    label: `Estimated delivery from ${DELIVERY_ORIGIN.label}.`,
    distanceMiles,
    fee: tier.fee,
  };
}

function calculateDistanceMiles(origin: Coordinates, destination: Coordinates) {
  const earthRadiusMiles = 3958.8;
  const latDistance = toRadians(destination.lat - origin.lat);
  const lngDistance = toRadians(destination.lng - origin.lng);
  const originLat = toRadians(origin.lat);
  const destinationLat = toRadians(destination.lat);
  const haversine =
    Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
    Math.cos(originLat) *
      Math.cos(destinationLat) *
      Math.sin(lngDistance / 2) *
      Math.sin(lngDistance / 2);
  const angularDistance =
    2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  return Math.round(earthRadiusMiles * angularDistance * 10) / 10;
}

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

function formatPrice(price: number) {
  return currencyFormatter.format(price);
}
