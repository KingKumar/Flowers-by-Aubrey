export function Inquiry() {
  return (
    <section
      id="inquiry"
      className="bg-[#f2d7dd] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl rounded-[1.25rem] border-2 border-[#171512] bg-[#fffaf0] px-6 py-12 text-center shadow-[12px_12px_0_#171512] sm:px-10 lg:px-16">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-[#5f6f44]">
          Custom inquiries
        </p>
        <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-normal text-[#171512] sm:text-6xl">
          Tell Aubrey what you are dreaming up, and she will help shape the
          flowers around it.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-[#5d574f] sm:text-lg">
          Reach out for custom arrangements, gifts, events, seasonal requests,
          or a floral idea that needs a little care and imagination.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:hello@flowersbyaubrey.com"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#171512] px-8 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#fffaf0] shadow-sm transition hover:bg-[#354126]"
          >
            Start an Inquiry
          </a>
          <p className="text-sm font-bold leading-6 text-[#4d4841]">
            hello@flowersbyaubrey.com · (555) 014-2783
          </p>
        </div>
      </div>
    </section>
  );
}
