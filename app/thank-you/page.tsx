import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Request Sent | Aubrey Florals",
  description: "Your Aubrey Florals request has been received.",
};

export default function ThankYouPage() {
  return (
    <main className="paper-grain min-h-screen bg-[#fff2df] px-5 py-8 text-[#1b120c] sm:px-8 sm:py-12 lg:px-12">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="w-full border-2 border-[#1b120c] bg-[#fff8eb] p-5 text-center shadow-[8px_8px_0_#ed2b82] sm:p-10 lg:p-14">
          <p className="inline-block bg-[#ed2b82] px-3 py-1 font-mono text-xs font-black uppercase tracking-[0.08em] text-[#fff2df]">
            Aubrey Florals
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase leading-none text-[#344f20] sm:text-7xl">
            Request Sent ✿
          </h1>

          <p className="mx-auto mt-5 max-w-2xl font-mono text-base font-bold leading-7 text-[#344f20] sm:text-lg">
            Thank you for reaching out to Aubrey Florals.
          </p>

          <div className="mx-auto mt-8 max-w-2xl border-2 border-[#1b120c] bg-white p-5 text-left shadow-[5px_5px_0_#c7da38] sm:p-7">
            <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-[#344f20] sm:text-base">
              Your request has been received.
            </p>
            <p className="mt-4 font-mono text-sm font-bold leading-6 text-[#344f20] sm:text-base">
              Aubrey will follow up shortly to confirm availability, timing,
              and next steps.
            </p>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center border-2 border-[#1b120c] bg-[#e9542b] px-8 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df] shadow-[5px_5px_0_#1b120c] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#1b120c] focus:outline-none focus:ring-2 focus:ring-[#ed2b82] focus:ring-offset-2 focus:ring-offset-[#fff2df]"
          >
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}
