export function Footer() {
  return (
    <footer className="border-t-2 border-[#171512] bg-[#fffaf0] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-3xl font-black uppercase leading-none tracking-normal text-[#171512]">
            Flowers by Aubrey
          </p>
          <p className="mt-3 max-w-md text-sm font-medium leading-6 text-[#5d574f]">
            Bold, thoughtful florals for everyday beauty and meaningful moments.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-black uppercase tracking-[0.08em] text-[#171512]">
          <a href="https://instagram.com" className="transition hover:text-[#8d7652]">
            Instagram
          </a>
          <a
            href="mailto:hello@flowersbyaubrey.com"
            className="transition hover:text-[#8d7652]"
          >
            Contact
          </a>
          <a href="#inquiry" className="transition hover:text-[#8d7652]">
            Inquire
          </a>
        </div>
      </div>
    </footer>
  );
}
