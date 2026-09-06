import type { Metadata } from "next";
import Link from "next/link";
import { contactDetails } from "@/components/contactDetails";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact Me | Aubrey Florals",
  description:
    "Get in touch with me by email or phone for custom flowers in Los Angeles. I would love to hear from you.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#fff2df] text-[#1b120c]">
      <SiteHeader />
      <section className="paper-grain px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="inline-block bg-[#ed2b82] px-3 py-1 font-mono text-xs font-black uppercase tracking-[0.08em] text-[#fff2df]">
            Let&apos;s talk flowers
          </p>
          <h1 className="mt-5 max-w-3xl text-6xl font-black uppercase leading-[0.9] text-[#253712] sm:text-8xl">
            Contact Me.
          </h1>
          <p className="mt-6 max-w-xl font-mono text-base font-bold leading-8 text-[#344f20]">
            A question, a celebration, or the start of something beautiful.
            I would love to hear from you.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <a
              href={`mailto:${contactDetails.email}`}
              className="min-w-0 border-2 border-[#1b120c] bg-white p-6 shadow-[6px_6px_0_#ed2b82] hover:bg-[#fff8eb] sm:p-8"
            >
              <span className="block font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                Email Me &rarr;
              </span>
              <span className="mt-4 block break-words font-mono text-lg font-bold text-[#1b120c]">
                {contactDetails.email}
              </span>
            </a>
            <a
              href={contactDetails.phoneHref}
              className="border-2 border-[#1b120c] bg-white p-6 shadow-[6px_6px_0_#f26a21] hover:bg-[#fff8eb] sm:p-8"
            >
              <span className="block font-mono text-xs font-black uppercase tracking-[0.12em] text-[#344f20]">
                Call Me &rarr;
              </span>
              <span className="mt-4 block font-mono text-xl font-bold text-[#1b120c]">
                {contactDetails.phone}
              </span>
            </a>
          </div>
          <p className="mt-10 font-mono text-sm font-bold leading-7 text-[#344f20]">
            Ready to share your ideas?{" "}
            <Link href="/custom-order" className="underline underline-offset-4">
              Request a custom order
            </Link>{" "}
            or{" "}
            <Link
              href="/event-inquiry"
              className="underline underline-offset-4"
            >
              tell me about your event
            </Link>
            .
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
