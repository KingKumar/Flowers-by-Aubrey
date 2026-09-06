import Link from "next/link";
import { CustomInquiryForm, type InquiryKind } from "./CustomInquiryForm";
import { Footer } from "./Footer";
import { SiteHeader } from "./SiteHeader";

const copy = {
  custom: {
    label: "Custom Order",
    title: "Flowers, your way.",
    description:
      "A palette you love. An occasion worth celebrating. Tell Aubrey what you have in mind, and she'll create something personal.",
  },
  event: {
    label: "Event Inquiry",
    title: "Set the scene.",
    description:
      "From intimate dinners to a room full of celebration, let's bring your event to life with flowers. Share your vision and how many arrangements you'll need.",
  },
  program: {
    label: "Floral Program",
    title: "Something fresh to look forward to.",
    description:
      "Bring flowers into your everyday. Choose weekly, biweekly, or monthly arrangements, a size you love, and your budget for each delivery.",
  },
};

export function InquiryPage({ kind }: { kind: InquiryKind }) {
  const content = copy[kind];
  return (
    <main className="min-h-screen overflow-x-clip bg-[#fff2df] text-[#1b120c]">
      <SiteHeader />
      <section className="paper-grain px-5 pb-20 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="lg:sticky lg:top-10">
            <p className="inline-block bg-[#ed2b82] px-3 py-1 font-mono text-xs font-black uppercase tracking-[0.08em] text-[#fff2df]">
              {content.label}
            </p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-[0.9] text-[#253712] sm:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-xl font-mono text-base font-bold leading-8 text-[#344f20]">
              {content.description}
            </p>
            <Link
              href="/lookbook"
              className="mt-8 inline-block border-b-2 border-[#253712] pb-1 font-mono text-sm font-black uppercase text-[#253712] hover:text-[#ed2b82]"
            >
              Find inspiration in the lookbook &rarr;
            </Link>
            {kind !== "program" && (
              <p className="mt-8 max-w-sm font-mono text-sm font-bold leading-7 text-[#344f20]">
                Flowers on repeat? Explore the{" "}
                <Link
                  href="/floral-program"
                  className="underline underline-offset-4"
                >
                  Floral Program
                </Link>
                .
              </p>
            )}
          </div>
          <CustomInquiryForm key={kind} kind={kind} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
