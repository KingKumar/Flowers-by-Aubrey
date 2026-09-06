import type { Metadata } from "next";
import { InquiryPage } from "@/components/InquiryPage";

export const metadata: Metadata = {
  title: "Floral Program | Aubrey Florals",
  description:
    "Request weekly, biweekly, or monthly flower deliveries with your preferred size and budget.",
};

export default function FloralProgramPage() {
  return <InquiryPage kind="program" />;
}
