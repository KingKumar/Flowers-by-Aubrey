import type { Metadata } from "next";
import Link from "next/link";
import { CustomInquiryForm } from "@/components/CustomInquiryForm";

export const metadata: Metadata = {
  title: "Custom Floral Inquiry | Aubrey Florals",
  description:
    "Contact Aubrey Florals for custom arrangements, events, installations, gifts, and seasonal floral work in Los Angeles.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#fff2df] text-[#1b120c]">
      <section className="paper-grain border-b-2 border-[#1b120c] bg-[#fff2df]">
        <div className="bg-[#f24b12] px-5 py-2 text-center font-mono text-xs font-black uppercase tracking-[0.12em] text-[#1b120c]">
          Los Angeles custom floral design &rarr;
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-7 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="text-3xl font-black uppercase leading-none tracking-[0.08em] text-[#f24b12]"
          >
            Aubrey
            <span className="block">Florals</span>
          </Link>
          <Link
            href="/"
            className="font-mono text-sm font-black uppercase tracking-[0.08em] text-[#253712] transition hover:text-[#f24b12]"
          >
            Return Home
          </Link>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-12 pt-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-20 lg:pt-10">
          <div>
            <p className="inline-block bg-[#ed2b82] px-3 py-1 font-mono text-xs font-black uppercase tracking-[0.08em] text-[#fff2df]">
              Custom Inquiry
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black uppercase leading-[0.9] text-[#253712] sm:text-7xl lg:text-8xl">
              Flowers for the full moment.
            </h1>
            <p className="mt-6 max-w-xl font-mono text-base font-bold leading-8 text-[#344f20] sm:text-lg">
              Tell Aubrey about custom arrangements, events, installations,
              gifts, brand florals, or anything you want to build from scratch.
            </p>
            <div className="mt-8 grid gap-3 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#344f20] sm:grid-cols-2">
              <div className="border-2 border-[#1b120c] bg-white p-4 shadow-[4px_4px_0_#c7da38]">
                Custom arrangements
              </div>
              <div className="border-2 border-[#1b120c] bg-white p-4 shadow-[4px_4px_0_#c7da38]">
                Events and celebrations
              </div>
              <div className="border-2 border-[#1b120c] bg-white p-4 shadow-[4px_4px_0_#c7da38]">
                Installations
              </div>
              <div className="border-2 border-[#1b120c] bg-white p-4 shadow-[4px_4px_0_#c7da38]">
                Local delivery
              </div>
            </div>
          </div>

          <CustomInquiryForm />
        </div>
      </section>
    </main>
  );
}
