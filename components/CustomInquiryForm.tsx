"use client";

import { useRouter } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { contactDetails } from "./contactDetails";
import {
  GooglePlacesAddressInput,
  type SelectedPlaceDetails,
} from "./GooglePlacesAddressInput";

export type InquiryKind = "custom" | "event" | "program";

const colors = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Pink",
  "White",
  "Brown",
  "Dark",
  "Pastels",
];
const sizes = [
  "Petit — $50–$80",
  "Classic — $80–$150",
  "Signature — $150–$250",
  "Deluxe — $250+",
];
const vases = ["Clear glass vase", "Ceramic vase", "Fun artistic vase"];
const frequencies = ["Weekly", "Biweekly (every two weeks)", "Monthly"];
const inquiryNames = {
  custom: "Custom Order",
  event: "Event Inquiry",
  program: "Floral Program",
};
const inputClass =
  "mt-2 min-h-12 w-full rounded-none border-2 border-[#1b120c] bg-white px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]";
const legendClass =
  "mb-5 text-2xl font-black uppercase leading-none text-[#253712]";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-xs font-black uppercase tracking-[0.08em] text-[#344f20]">
        {label}
      </span>
      {children}
    </label>
  );
}

export function CustomInquiryForm({ kind = "custom" }: { kind?: InquiryKind }) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedPlaceDetails | null>(null);
  const [fulfillment, setFulfillment] = useState("Delivery");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isSubmitting = useRef(false);
  const isProgram = kind === "program";
  const isEvent = kind === "event";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const chosenColors = data.getAll("colors").map(String);
    if (!value("name") || !value("email") || !chosenColors.length) {
      setStatus("error");
      setErrorMessage(
        "Please add your name, email, and at least one color choice.",
      );
      if (!chosenColors.length)
        form.querySelector<HTMLInputElement>('[name="colors"]')?.focus();
      return;
    }

    const accessKey = isEvent
      ? process.env.NEXT_PUBLIC_WEB3FORMS_EVENTS_ACCESS_KEY
      : process.env.NEXT_PUBLIC_WEB3FORMS_ARRANGEMENT_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "We couldn't send your request right now. Please try again or email Aubrey below.",
      );
      return;
    }

    const details: Record<string, string | number> = {
      "Inquiry type": inquiryNames[kind],
      "Color choices": chosenColors.join(", "),
      "Arrangement size": value("size"),
      "Vase preference": value("vase"),
      ...(isEvent ? { "Number of arrangements": value("quantity") } : {}),
      ...(isProgram
        ? {
            "Delivery frequency": value("frequency"),
            "Budget per delivery (USD)": value("deliveryBudget"),
          }
        : {}),
      "Requested date": value("date"),
      "Delivery or pickup": isProgram ? "Delivery" : fulfillment,
      "Preferred time window": value("timeWindow"),
      "Location or delivery area": location.trim(),
      "Location formatted address":
        selectedLocation?.formattedAddress || location.trim(),
      "Location place ID": selectedLocation?.placeId || "",
      "Location latitude": selectedLocation?.latitude ?? "",
      "Location longitude": selectedLocation?.longitude ?? "",
      "Delivery notes": value("deliveryNotes"),
      Occasion: value("occasion"),
      "Flowers to include or avoid": value("flowerRequests"),
      "Card message": value("cardMessage"),
      "Additional details": value("details"),
    };
    const payload = {
      access_key: accessKey,
      subject: `New ${inquiryNames[kind]} Request`,
      from_name: "Aubrey Florals Website",
      replyto: value("email"),
      name: value("name"),
      email: value("email"),
      phone: value("phone"),
      ...details,
      message: [
        `Name: ${value("name")}`,
        `Email: ${value("email")}`,
        `Phone: ${value("phone") || "Not provided"}`,
        "",
        ...Object.entries(details).map(
          ([label, answer]) =>
            `${label}: ${answer === "" ? "Not provided" : answer}`,
        ),
      ].join("\n"),
    };

    isSubmitting.current = true;
    setStatus("submitting");
    setErrorMessage("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Submission failed");
      router.push("/thank-you");
    } catch {
      isSubmitting.current = false;
      setStatus("error");
      setErrorMessage(
        "Your request couldn't be sent. Your answers are still here—please try again, or email Aubrey below.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-0 space-y-9 border-2 border-[#1b120c] bg-[#fff8eb] p-5 shadow-[8px_8px_0_#ed2b82] sm:p-8 lg:p-10"
    >
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />
      <fieldset>
        <legend className={legendClass}>01 / A little about you</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name">
            <input
              name="name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </Field>
          <Field label="Email">
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputClass}
            />
          </Field>
          <Field label="Phone (optional)">
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
            />
          </Field>
          <Field label="Occasion (optional)">
            <input
              name="occasion"
              placeholder={
                isEvent
                  ? "Wedding, dinner, celebration"
                  : "Birthday, a gift, just because"
              }
              className={inputClass}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="border-t-2 border-[#1b120c]/15 pt-7">
        <legend className={legendClass}>02 / Your flowers</legend>
        <fieldset>
          <legend className="font-mono text-xs font-black uppercase tracking-[0.08em] text-[#344f20]">
            Color choices — choose one or more
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {colors.map((color) => (
              <label
                key={color}
                className="flex min-h-11 cursor-pointer items-center gap-2 border-2 border-[#1b120c] bg-white px-3 font-mono text-sm font-bold text-[#344f20] has-checked:bg-[#c7da38]/30"
              >
                <input
                  type="checkbox"
                  name="colors"
                  value={color}
                  className="h-4 w-4 accent-[#344f20]"
                />
                {color}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Arrangement size">
            <select
              name="size"
              required
              defaultValue=""
              aria-describedby="pricing-note"
              className={inputClass}
            >
              <option value="" disabled>
                Choose a size
              </option>
              {sizes.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </Field>
          <Field label="Vase">
            <select name="vase" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Choose a vase
              </option>
              {vases.map((vase) => (
                <option key={vase}>{vase}</option>
              ))}
            </select>
          </Field>
          {isEvent && (
            <Field label="Number of arrangements">
              <input
                type="number"
                name="quantity"
                min="1"
                step="1"
                required
                placeholder="How many?"
                className={inputClass}
              />
            </Field>
          )}
        </div>
        <p
          id="pricing-note"
          className="mt-3 font-mono text-xs font-bold leading-6 text-[#344f20]"
        >
          Pricing may change depending on flower choices.
        </p>
        {isProgram && (
          <div className="mt-6 grid gap-5 border-2 border-[#344f20] bg-white p-4 sm:grid-cols-2">
            <Field label="How often?">
              <select
                name="frequency"
                required
                defaultValue="Weekly"
                className={inputClass}
              >
                {frequencies.map((frequency) => (
                  <option key={frequency}>{frequency}</option>
                ))}
              </select>
            </Field>
            <Field label="Budget per delivery ($)">
              <input
                type="number"
                name="deliveryBudget"
                min="1"
                step="0.01"
                required
                placeholder="Your budget"
                className={inputClass}
              />
            </Field>
          </div>
        )}
      </fieldset>

      <fieldset className="border-t-2 border-[#1b120c]/15 pt-7">
        <legend className={legendClass}>
          03 / {isEvent ? "The event" : "Getting your flowers"}
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label={
              isProgram
                ? "Preferred first delivery date"
                : isEvent
                  ? "Event date"
                  : "Preferred date"
            }
          >
            <input type="date" name="date" required className={inputClass} />
          </Field>
          {!isProgram && (
            <Field label="Delivery or pickup">
              <select
                name="fulfillment"
                value={fulfillment}
                onChange={(event) => {
                  setFulfillment(event.target.value);
                  setLocation("");
                  setSelectedLocation(null);
                }}
                className={inputClass}
              >
                <option>Delivery</option>
                <option>Pickup</option>
              </select>
            </Field>
          )}
          <Field label="Preferred time (optional)">
            <select name="timeWindow" defaultValue="" className={inputClass}>
              <option value="">No preference</option>
              {["8am–11am", "11am–2pm", "2pm–5pm", "3pm–6pm"].map((time) => (
                <option key={time}>{time}</option>
              ))}
            </select>
          </Field>
        </div>
        {(isProgram || fulfillment === "Delivery") && (
          <div className="mt-5">
            <Field
              label={isEvent ? "Venue or delivery address" : "Delivery address"}
            >
              <GooglePlacesAddressInput
                value={location}
                onChange={setLocation}
                onPlaceSelect={setSelectedLocation}
                required
                name="location"
                placeholder="Street address, city, and ZIP code"
                className={inputClass}
              />
            </Field>
          </div>
        )}
        <div className="mt-5">
          <Field label="Delivery or pickup notes (optional)">
            <textarea
              name="deliveryNotes"
              rows={2}
              placeholder="Access instructions, timing, or other helpful details"
              className={`${inputClass} resize-y py-3`}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5 border-t-2 border-[#1b120c]/15 pt-7">
        <legend className={legendClass}>04 / The finishing touches</legend>
        <Field label="Flowers to include or avoid (optional)">
          <input
            name="flowerRequests"
            placeholder="Favorites, allergies, or anything to avoid"
            className={inputClass}
          />
        </Field>
        <Field label="Card message (optional)">
          <textarea
            name="cardMessage"
            rows={2}
            className={`${inputClass} resize-y py-3`}
          />
        </Field>
        <Field label="Tell Aubrey what you are dreaming up (optional)">
          <textarea
            name="details"
            rows={4}
            placeholder="Your inspiration, a lookbook arrangement you love, or anything else you'd like Aubrey to know."
            className={`${inputClass} resize-y py-3`}
          />
        </Field>
      </fieldset>

      <div>
        <p className="font-mono text-sm font-bold leading-6 text-[#344f20]">
          {isProgram
            ? "Aubrey will follow up to confirm your recurring deliveries, budget, and start date."
            : "Aubrey will follow up to confirm availability, flower choices, and the details."}
        </p>
        {errorMessage && (
          <p
            role="alert"
            className="mt-4 font-mono text-sm font-bold leading-6 text-[#a8204e]"
          >
            {errorMessage}{" "}
            <a href={`mailto:${contactDetails.email}`} className="underline">
              Email Aubrey
            </a>
          </p>
        )}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center border-2 border-[#1b120c] bg-[#ed2b82] px-5 py-3 text-center font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df] shadow-[5px_5px_0_#1b120c] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting"
            ? "Sending..."
            : isProgram
              ? "Request recurring deliveries"
              : isEvent
                ? "Send event inquiry"
                : "Send custom order request"}
        </button>
      </div>
    </form>
  );
}
