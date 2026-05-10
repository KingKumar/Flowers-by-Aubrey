export function Inquiry() {
  return (
    <section
      id="inquiry"
      className="paper-grain bg-[#344f20] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl border-2 border-[#1b120c] bg-[#fff2df] px-6 py-12 text-center shadow-[8px_8px_0_#ed2b82] sm:px-10 lg:px-16">
        <h2 className="mx-auto max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-normal text-[#1b120c] sm:text-7xl">
          Tell Aubrey what you are dreaming up, and she will help shape the
          flowers around it.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-mono text-base font-bold leading-8 text-[#344f20] sm:text-lg">
          Reach out for custom arrangements, gifts, events, seasonal requests,
          or a floral idea that needs a little care and imagination.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#price-estimate"
            className="inline-flex min-h-12 items-center justify-center border-2 border-[#1b120c] bg-[#ed2b82] px-8 py-3 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df] shadow-[4px_4px_0_#1b120c] transition hover:-translate-y-0.5"
          >
            Contact Aubrey
          </a>
        </div>
      </div>
    </section>
  );
}
