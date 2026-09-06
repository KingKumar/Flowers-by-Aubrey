import type { Metadata } from "next";
import { InquiryPage } from "@/components/InquiryPage";

export const metadata: Metadata = {
  title: "Custom Order | Aubrey Florals",
  description:
    "Request a custom floral arrangement with your favorite colors, size, and vase.",
};

export default function CustomOrderPage() {
  return <InquiryPage kind="custom" />;
}
