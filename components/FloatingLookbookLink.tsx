"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function FloatingLookbookLink() {
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const heroLink = document.getElementById("hero-lookbook-link");
    if (!heroLink) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Show only after the original link has scrolled above the viewport.
      setShowLink(
        !entry.isIntersecting && entry.boundingClientRect.bottom <= 0,
      );
    });

    observer.observe(heroLink);
    return () => observer.disconnect();
  }, []);

  if (!showLink) return null;

  return (
    <div
      className="fixed inset-x-5 z-30 lg:hidden"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <Link
        href="/lookbook"
        className="flex min-h-12 items-center justify-center border-2 border-[#1b120c] bg-[#f24b12] px-7 py-3 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#fff2df] shadow-[4px_4px_0_#1b120c] transition hover:bg-[#ed2b82] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed2b82]"
      >
        View lookbook &rarr;
      </Link>
    </div>
  );
}
