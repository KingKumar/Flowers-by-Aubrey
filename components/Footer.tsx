export function Footer() {
  return (
    <footer className="border-t border-[#eadfcf] bg-[#fffaf0] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-2xl font-medium tracking-normal text-[#2f2a25]">
            Flowers by Aubrey
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#756b61]">
            Thoughtful, romantic florals for everyday beauty and meaningful
            moments.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#4b463f]">
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
