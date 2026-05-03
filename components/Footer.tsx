export function Footer() {
  return (
    <footer className="border-t-2 border-[#1b120c] bg-[#ed2b82] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-4xl font-black uppercase leading-none tracking-normal text-[#c7da38]">
            Flowers by Aubrey
          </p>
          <p className="mt-3 max-w-md font-mono text-sm font-bold leading-6 text-[#fff2df]">
            Bold, thoughtful florals for everyday beauty and meaningful moments.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df]">
          <a href="https://instagram.com" className="transition hover:text-[#c7da38]">
            Instagram
          </a>
          <a
            href="mailto:hello@flowersbyaubrey.com"
            className="transition hover:text-[#c7da38]"
          >
            Contact
          </a>
          <a href="#order" className="transition hover:text-[#c7da38]">
            Order
          </a>
        </div>
      </div>
    </footer>
  );
}
