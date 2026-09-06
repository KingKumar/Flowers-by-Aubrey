"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/custom-order", label: "Custom Order" },
  { href: "/event-inquiry", label: "Event Inquiry" },
  { href: "/floral-program", label: "Floral Program" },
  { href: "/contact", label: "Contact Me" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOutside(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className="relative z-40 bg-[#fff2df] lg:sticky lg:top-0 lg:shadow-[0_2px_0_rgba(27,18,12,0.12)]">
      <div className="bg-[#f24b12] px-5 py-2 text-center font-mono text-xs font-black uppercase tracking-[0.12em] text-[#1b120c]">
        Los Angeles floral design studio &rarr;
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-7 sm:px-8 lg:px-12">
        <div aria-hidden="true" className="h-12 w-[88px] shrink-0 lg:hidden" />
        <div
          ref={menuRef}
          className="fixed left-5 top-[calc(4rem+env(safe-area-inset-top,0px))] z-50 sm:left-8 lg:hidden"
        >
          <button
            ref={buttonRef}
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-12 items-center justify-center gap-2 border-2 border-[#1b120c] bg-white px-2.5 text-3xl text-[#ed2b82] shadow-[3px_3px_0_#f26a21] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed2b82]"
          >
            <span aria-hidden="true">✿</span>
            <span className="font-mono text-xs font-black uppercase text-[#253712]">
              Menu
            </span>
          </button>
          {menuOpen && (
            <nav
              id="mobile-navigation"
              aria-label="Main navigation"
              className="absolute left-0 top-full z-50 mt-3 max-h-[calc(100dvh-9rem-env(safe-area-inset-top,0px))] w-64 max-w-[calc(100vw-2.5rem)] overflow-y-auto border-2 border-[#1b120c] bg-[#fff2df] p-2 shadow-[5px_5px_0_#ed2b82]"
            >
              {navigation.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 font-mono text-sm font-black text-[#253712] hover:bg-white aria-[current=page]:text-[#ed2b82]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <nav
          aria-label="Main navigation"
          className="hidden flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm font-black text-[#253712] lg:flex"
        >
          {navigation.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="transition hover:text-[#f24b12] aria-[current=page]:text-[#ed2b82]"
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          aria-label="Aubrey Florals home"
          onClick={() => setMenuOpen(false)}
          className="shrink-0 text-3xl font-black uppercase leading-none tracking-[0.08em] text-[#f24b12]"
        >
          Aubrey<span className="block">Florals</span>
        </Link>
      </div>
    </header>
  );
}
