import type { Metadata } from "next";
import { InquiryPage } from "@/components/InquiryPage";

export const metadata: Metadata = {
  title: "Event Inquiry | Aubrey Florals",
  description:
    "Plan floral arrangements for your wedding, dinner, celebration, or special event.",
};

export default function EventInquiryPage() {
  return <InquiryPage kind="event" />;
}
