"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import {
  GooglePlacesAddressInput,
  type SelectedPlaceDetails,
} from "./GooglePlacesAddressInput";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_EVENTS_ACCESS_KEY;

const projectTypes = [
  "Custom arrangement",
  "Event florals",
  "Floral installation",
  "Gift or delivery",
  "Brand or editorial",
  "Something else",
];

const budgetRanges = [
  "Under $150",
  "$150-$300",
  "$300-$750",
  "$750-$1,500",
  "$1,500+",
  "Not sure yet",
];

export function CustomInquiryForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: projectTypes[0],
    date: "",
    budget: "Not sure yet",
    location: "",
    details: "",
  });
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedPlaceDetails | null>(null);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitStatus === "submitting") {
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setSubmitStatus("error");
      setSubmitMessage(
        "This form is missing its Web3Forms access key. Add NEXT_PUBLIC_WEB3FORMS_EVENTS_ACCESS_KEY to the site environment."
      );
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName || !trimmedEmail) {
      setSubmitStatus("error");
      setSubmitMessage("Please add your name and email before sending.");
      return;
    }

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Custom Inquiry — ${formData.projectType}`,
      from_name: trimmedName,
      replyto: trimmedEmail,
      name: trimmedName,
      email: trimmedEmail,
      phone: formData.phone.trim(),
      "Customer Name": trimmedName,
      "Customer Email": trimmedEmail,
      "Customer Phone": formData.phone.trim(),
      "Inquiry type": formData.projectType,
      "Desired date": formData.date,
      "Budget range": formData.budget,
      "Location or delivery area": formData.location.trim(),
      "Location formatted address":
        selectedLocation?.formattedAddress || formData.location.trim(),
      "Location place ID": selectedLocation?.placeId || "",
      "Location latitude": selectedLocation?.latitude ?? "",
      "Location longitude": selectedLocation?.longitude ?? "",
      "Project details": formData.details.trim(),
      message: [
        "Customer:",
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Phone: ${formData.phone.trim() || "Not provided"}`,
        "",
        "Custom inquiry:",
        `Type: ${formData.projectType}`,
        `Desired date: ${formData.date || "Not provided"}`,
        `Budget range: ${formData.budget}`,
        `Location or delivery area: ${
          formData.location.trim() || "Not provided"
        }`,
        `Formatted address: ${
          selectedLocation?.formattedAddress ||
          formData.location.trim() ||
          "Not selected"
        }`,
        `Place ID: ${selectedLocation?.placeId || "Not selected"}`,
        `Latitude: ${selectedLocation?.latitude ?? "Not selected"}`,
        `Longitude: ${selectedLocation?.longitude ?? "Not selected"}`,
        "",
        "Project details:",
        formData.details.trim() || "Not provided",
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

      router.push("/thank-you");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong sending your inquiry. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-[#1b120c] bg-[#fff8eb] p-5 shadow-[8px_8px_0_#ed2b82] sm:p-8 lg:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
            Your Name
          </span>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
            className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-white px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
          />
        </label>

        <label className="block">
          <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-white px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
          />
        </label>

        <label className="block">
          <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
            Phone
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Optional"
            className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-white px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
          />
        </label>

        <label className="block">
          <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
            Project Type
          </span>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
            className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-white px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
            Desired Date
          </span>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(event) => updateField("date", event.target.value)}
            className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-white px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
          />
        </label>

        <label className="block">
          <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
            Budget Range
          </span>
          <select
            name="budget"
            value={formData.budget}
            onChange={(event) => updateField("budget", event.target.value)}
            className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-white px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
          >
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
          Location or Delivery Area
        </span>
        <GooglePlacesAddressInput
          value={formData.location}
          onChange={(value) => updateField("location", value)}
          onPlaceSelect={setSelectedLocation}
          placeholder="Venue, neighborhood, or delivery area"
          className="mt-2 min-h-12 w-full border-2 border-[#1b120c] bg-white px-3 font-mono text-base font-bold text-[#1b120c] outline-none focus:border-[#ed2b82]"
        />
      </label>

      <label className="mt-5 block">
        <span className="font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
          Tell Aubrey What You Are Dreaming Up
        </span>
        <textarea
          name="details"
          required
          value={formData.details}
          onChange={(event) => updateField("details", event.target.value)}
          rows={6}
          placeholder="Occasion, colors, inspiration, guest count, installation ideas, must-have flowers, or anything helpful."
          className="mt-2 w-full resize-none border-2 border-[#1b120c] bg-white px-3 py-3 font-mono text-base font-bold leading-6 text-[#1b120c] outline-none focus:border-[#ed2b82]"
        />
      </label>

      {submitMessage ? (
        <p className="mt-4 font-mono text-sm font-bold leading-6 text-[#ed2b82]">
          {submitMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitStatus === "submitting"}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center border-2 border-[#1b120c] bg-[#ed2b82] px-8 py-3 text-center font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df] shadow-[5px_5px_0_#1b120c] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {submitStatus === "submitting" ? "Sending..." : "Send Custom Inquiry"}
      </button>
    </form>
  );
}
