export function Inquiry() {
  return (
    <section
      id="inquiry"
      className="bg-[#f6e8df] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#e5cfc1] bg-[#fffdf8] px-6 py-12 text-center shadow-[0_24px_70px_rgba(67,55,45,0.12)] sm:px-10 lg:px-16">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#8d7652]">
          Custom inquiries
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-medium tracking-normal text-[#2f2a25] sm:text-5xl">
          Tell Aubrey what you are dreaming up, and she will help shape the
          flowers around it.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6f665d] sm:text-lg">
          Reach out for custom arrangements, gifts, events, seasonal requests,
          or a floral idea that needs a little care and imagination.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:hello@flowersbyaubrey.com"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#2f3b2f] px-8 py-3 text-sm font-semibold text-[#fffaf0] shadow-sm transition hover:bg-[#435141]"
          >
            Start an Inquiry
          </a>
          <p className="text-sm leading-6 text-[#756b61]">
            hello@flowersbyaubrey.com · (555) 014-2783
          </p>
        </div>
      </div>
    </section>
  );
}
