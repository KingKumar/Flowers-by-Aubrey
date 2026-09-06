import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Lookbook | Aubrey Florals",
  description:
    "Explore my custom floral arrangements, from vivid roses to sculptural seasonal blooms.",
};

export default function LookbookPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#fff2df] text-[#1b120c]">
      <SiteHeader />
      <Gallery />
      <Footer />
    </main>
  );
}
